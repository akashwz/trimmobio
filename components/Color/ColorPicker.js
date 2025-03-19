import React, { useState, useEffect, useRef } from "react";
import Chrome from "@uiw/react-color-chrome";

const ColorPicker = ({ handleChange, setting, handleCloseColor }) => {
  const [hex, setHex] = useState(setting);
  const colorPickerRef = useRef(null);

  useEffect(() => {
    handleChange(hex);
  }, [hex]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        handleCloseColor();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleCloseColor]);

  return (
    <div ref={colorPickerRef}>
      <Chrome
        color={hex}
        onChange={(color) => {
          setHex(color.hex);
        }}
      />
    </div>
  );
};

export default ColorPicker;
