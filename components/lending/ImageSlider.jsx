"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const ImageSlider = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Mark the component as mounted to enable client-side rendering
      setIsMounted(true);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // Set initial width and add event listener
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      // Cleanup event listener
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const getSlidesToShow = () => {
    if (windowWidth > 1300) return 5;
    if (windowWidth > 991 && windowWidth <= 1300) return 4;
    if (windowWidth > 768 && windowWidth <= 991) return 3;
    if (windowWidth > 575 && windowWidth <= 768) return 2;
    return 1;
  };

  const settings = {
    infinite: true,
    speed: 3000,
    dots: false,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
  };

  // Render nothing until the component has mounted
  if (!isMounted) return null;

  return (
    <section className="lg:mt-10 overflow-x-hidden">
      <div className="container">
        <Image src="/images/image.svg" height={471} width={1470} alt="image-slider" />
      </div>
      <div>
        <Slider {...settings} className="mt-10">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <div key={index} className="px-2">
              <div
                className={`max-w-[345px] w-full overflow-hidden rounded-${
                  item === 2 ? "[70px]" : item === 4 ? "full" : "[10px]"
                } h-[345px] bg-[#A9A7FF]`}
              >
                <Image
                  src={`/images/${item}.svg`}
                  height={300}
                  width={300}
                  alt={`Slide ${item}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ImageSlider;
