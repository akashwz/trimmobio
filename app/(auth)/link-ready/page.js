"use client";

import ConfettiComponent from "@/components/confetti/Confetti";
import SocialShare from "@/components/SocialShare/SocialShare";
import { getSingleThemeData } from "@/redux/Action/appearance.action";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LinkReady = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state?.authReducer);
  const [cardImage, setCardImage] = useState(null);
  const [userName, setUserName] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [imageData, setImageData] = useState();
  const [showSharePopup, setShowSharePopup] = useState(false);
  const url = process.env.NEXT_PUBLIC_APP_URL + `/${userData?.data?.username}`;
  const { loader } = useSelector((state) => state.errorReducer);

  const closeSharePopup = () => {
    setShowSharePopup(false);
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); // Stops after 5 seconds
  };
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const getCardIndex = window.localStorage.getItem("selectedCard");
  //     const getUserName = window.localStorage.getItem("name");
  //     setCardImage(getCardIndex);
  //     setUserName(getUserName);
  //   }
  // }, []);
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const getCardIndex = localStorage.getItem("selectedCard");
      const getUserName = localStorage.getItem("name");
      setCardImage(getCardIndex);
      setUserName(getUserName);
    }
  }, []);

  useEffect(() => {
    if (cardImage?.length > 0) {
      triggerConfetti();
    }
  }, [cardImage]);

  useEffect(() => {
    fatchData();
  }, []);

  // const fatchData = async () => {
  //   if (typeof window !== "undefined") {
  //     const getCardIndex = window.localStorage.getItem("selectedCard");
  //     const data = await dispatch(getSingleThemeData(JSON.parse(getCardIndex)));
  //     setImageData(data?.image);
  //   }
  // };
  const fatchData = async () => {
    const getCardIndex = localStorage.getItem("selectedCard");
    if (getCardIndex) {
      const data = await dispatch(getSingleThemeData(JSON.parse(getCardIndex)));
      setImageData(data?.image);
    }
  };

  const images = [
    "https://cdn.trimmo.bio/trimmo_bio/10.minimalist",
    "https://cdn.trimmo.bio/trimmo_bio/01.neon-vibes",
    "https://cdn.trimmo.bio/trimmo_bio/04.classic-mode",
  ];
  return (
    <div className=" w-full lg:flex overflow-hidden m-auto 2xl:me-auto 2xl:w-[70%] text-center items-center flex-col">
      <div className="text-center overflow-hidden">
        <ConfettiComponent runConfetti={showConfetti} />
      </div>
      <h3 className="mb-2 text-xl md:text-3xl">Your Trimmo Bio is ready!</h3>
      <p className="info-text block">It's time to share it with the world.</p>
      <img
        src={`${imageData}`}
        height={500}
        width={300}
        alt="hero-phone"
        className="block max-h-[60vh] mt-4 mx-auto "
      />
      <div className="flex link-ready gap-2 md:gap-4 mt-4 justify-center">
        <button
          type="button"
          className="w-auto bg-green-400 hover:bg-[#ebff57] hover:text-[#000] text-white font-medium py-2 px-4 md:px-8 rounded-full shadow-md text-sm md:text-base transition-all duration-200 ease-in-out mt-2"
          onClick={() => setShowSharePopup(true)}
        >
          Share your Bio
        </button>
        <button
          type="button"
          className="w-auto bg-transparent hover:bg-black text-black hover:text-white border-2 border-black font-medium py-2 text-sm md:text-base px-4 md:px-8 rounded-full shadow-md transition-all duration-200 ease-in-out mt-2 items-center flex justify-center"
          onClick={() => router.push("/edit-profile")}
        >
          Continue Editing &nbsp; {loader && <CircularProgress color="inherit" size={20} />}
        </button>
      </div>
      <SocialShare
        showSharePopup={showSharePopup}
        url={url}
        image={userData?.data?.og_image}
        closeSharePopup={closeSharePopup}
      />
    </div>
  );
};

export default LinkReady;
