"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const HeroSection = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const handleUserName = () => {
    localStorage.setItem("username", userName);
    router.push("/register");
  };
  return (
    <section className="pb-10 pt-[20px] sm:pt-[70px] md:py-10 herosection">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
          <div className="w-full flex flex-col justify-center">
            <h1 className="mb-2 containe-font">
              All Your Social Media Links, One Simple Bio Link.
            </h1>
            <p className="info-text">
              Trimo.bio helps you set up and manage all of your social media links in one spot.
              Create a personalized, shareable bio link for Instagram, TikTok, Twitter, and other
              platforms.
            </p>
            <div className="username relative claim flex items-center justify-between mt-10">
              <span className="pl-2 text-white text-lg">trimmo.bio/</span>
              <input
                type="text"
                value={userName}
                className="bg-transparent w-full ps-1 grow outline-none border-0 placeholder-white peer"
                placeholder="username"
                onChange={(e) => setUserName(e.target.value)}
              />
              <button
                type="button"
                className="btn inline-flex items-center hover:bg-[#ebff57] hover:text-[#000]"
                onClick={handleUserName}
              >
                Claim <span className="hidden xl:inline-block">Your URL</span>
              </button>
            </div>
          </div>
          <div className="w-full">
            <div className="mx-auto relative max-w-full flex justify-center w-full">
              {/* <Image src="/images/hero-headphone.svg" height={500} width={300} alt="hero-headphone" className='absolute max-w-[45%] hidden md:block -left-5 top-10'/>
                        <Image src="/images/Phone.svg" height={500} width={300} alt="hero-phone" className='block hero-phone relative z-10 mx-auto max-h-[500px] md:max-h-max'/>
                        <Image src="/images/hero-tshirt.svg" height={500} width={300} alt="hero-tshirt" className='absolute max-w-[45%] hidden md:block -right-5 -bottom-2'/> */}
              <img
                src="/images/hero-mainImage.svg"
                className="max-w-full block mx-auto"
                alt="hero-image"
                // className="absolute max-w-[45%] hidden md:block -right-5 -bottom-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
