import React from 'react';

const SvgSection = ({ svgContent, width, height, fill, stroke, maxWidth, maxHeight, className }) => {
  const updatedSvgContent = React.useMemo(() => {
    if (!svgContent) return null;

    const hasTextColorClass = /className=["'][^"']*text-[a-zA-Z]+[^"']*["']/.test(svgContent);

    const parser = new DOMParser();
    const svgDocument = parser?.parseFromString(svgContent, 'image/svg+xml');
    const svgElement = svgDocument?.querySelector('svg');

    if (svgElement) {
      const elements = svgElement?.querySelectorAll('path, circle, polygon');

      elements?.forEach((element) => {
        if (fill) {
          element?.setAttribute('fill', fill);
        } else if (!hasTextColorClass) {
          if (fill) element?.setAttribute('fill', fill);
        }
        if (stroke) element?.setAttribute('stroke', stroke);
      });

      if (width) svgElement?.setAttribute('width', width);
      if (height) svgElement?.setAttribute('height', height);

      let existingStyle = svgElement?.getAttribute('style') || '';

      if (maxWidth) {
        existingStyle += ` max-width: ${maxWidth};`;
      }
      if (maxHeight) {
        existingStyle += ` max-height: ${maxHeight};`;
      }

      svgElement?.setAttribute('style', existingStyle);

      return svgElement.outerHTML;
    }

    return null;
  }, [svgContent, fill, stroke, width, height, maxWidth, maxHeight]);

  if (!updatedSvgContent) return null;

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: updatedSvgContent }} />
  );
};

export default SvgSection;
