"use client";

import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const ConfettiComponent = ({ runConfetti }) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      };
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  if (!isMounted) return null;
  return (
    <>
      {runConfetti && (
        <Confetti
          width={windowWidth}
          height={windowHeight}
          numberOfPieces={600}
          gravity={0.1}
          recycle={false}
        />
      )}
    </>
  );
};

export default ConfettiComponent;
