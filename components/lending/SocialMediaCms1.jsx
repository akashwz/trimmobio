import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'

const SocialMediaCms1 = () => {
  const iconsRef = useRef([]);
  const boxRef = useRef(null);

  const iconPaths = [
    "/social/facebook.png",
    "/social/instagram.png",
    "/social/linkedin.png",
    "/social/pintrest.png",
    "/social/snapchat.png",
    "/social/spotify.png",
    "/social/youtube.png",
  ];

  // useEffect(() => {
  //   const box = boxRef.current
  //   const icons = iconsRef.current

  //   const moveIconsRandomly = () => {
  //     icons.forEach(icon => {
  //       const boxRect = box?.getBoundingClientRect()
  //       const iconRect = icon?.getBoundingClientRect()

  //       const maxX = boxRect.width - iconRect.width
  //       const maxY = boxRect.height - iconRect.height

  //       const randomX = Math.floor(Math.random() * maxX)
  //       const randomY = Math.floor(Math.random() * maxY)

  //       gsap.to(icon, {
  //         x: randomX,
  //         y: randomY,
  //         duration: 10,
  //         ease: 'power2.inOut',
  //         onComplete: moveIconsRandomly
  //       })
  //     })
  //   }

  //   moveIconsRandomly();
  //   return () => {
  //       icons.forEach(icon => {
  //         gsap.killTweensOf(icon); // Stop all GSAP animations for the icons
  //       });
  //     };
  // }, [])

  useEffect(() => {
    const box = boxRef.current;
    const icons = Array.from(iconsRef.current); // Ensure it's an array

    let isMounted = true; // Track component state

    const moveIconsRandomly = () => {
      if (!isMounted) return;

      icons.forEach((icon) => {
        if (!box || !icon) return;

        const boxRect = box.getBoundingClientRect();
        const iconRect = icon.getBoundingClientRect();

        const maxX = boxRect.width - iconRect.width;
        const maxY = boxRect.height - iconRect.height;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        gsap.to(icon, {
          x: randomX,
          y: randomY,
          duration: 10,
          ease: "power2.inOut",
          onComplete: moveIconsRandomly, // Recursive call for infinite loop
        });
      });
    };

    moveIconsRandomly();

    return () => {
      isMounted = false;
      icons.forEach((icon) => gsap.killTweensOf(icon)); // Stop animations on unmount
    };
  }, []);

  return (
    <section>
      <div className="container">
        <div className="block my-10 lg:flex items-center">
          <div className="w-full lg:w-[50%]"></div>
          <div
            ref={boxRef}
            className="w-full lg:w-[40%] relative min-h-[400px] bg-[#E3E2D5] overflow-hidden"
          >
            {iconPaths.map((path, index) => (
              <img
                key={index}
                ref={(el) => (iconsRef.current[index] = el)}
                src={`/images${path}`}
                alt={`Icon ${index + 1}`}
                style={{
                  position: "absolute",
                  width: "70px",
                  height: "70px",
                  left: 0, // Initial position
                  top: 0, // Initial position
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialMediaCms1
