"use client";

import API from "@/api";
import { getSingleThemeData, getTheme } from "@/redux/Action/appearance.action";
import { clearBio, editUser } from "@/redux/Action/auth.action";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SelectTemplate = () => {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState(null);
  const [imageLoaded, setImageLoaded] = useState([]);
  const [imageData, setImageData] = useState([]);
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.errorReducer);

  useEffect(() => {
    fetchTheme();
  }, []);

  const fetchTheme = async () => {
    try {
      const data = await dispatch(getTheme());

      // setImageData(data.slice(0, 3));
      setImageData(data);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  const handleThemeSelect = async (id) => {
    setSelectedCard(id.toString());
  };

  const images = [
    "https://cdn.trimmo.bio/trimmo_bio/10.minimalist",
    "https://cdn.trimmo.bio/trimmo_bio/01.neon-vibes",
    "https://cdn.trimmo.bio/trimmo_bio/04.classic-mode",
  ];
  const { loginData } = useSelector((state) => state?.authReducer);

  useEffect(() => {
    setImageLoaded(new Array(images.length).fill(false));
  }, []);

  const handleCardSelect = (index) => {
    setSelectedCard(index);
  };

  const handleAddLocalStoreage = () => {
    localStorage.setItem("selectedCard", JSON.stringify(selectedCard));
  };

  const handleImageLoad = (index) => {
    setImageLoaded((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  return (
    <div className="w-full flex items-center justify-center overflow-auto m-auto md:w-[60%] xl:w-[50%] text-center">
      <div>
        <h2 className="mb-0 lg:mb-3">Welcome to Trimmo</h2>
        <p className="info-text block">Choose your Trimmo Theme. You can always change it later.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {imageData.map((image, index) => (
            <div
              key={index}
              className="flex items-center my-4 justify-center cursor-pointer"
              onClick={() => handleThemeSelect(image?._id)}
            >
              <div
                className={`border p-1 rounded-lg ${
                  selectedCard === image?._id ? "border-black" : "border-transparent"
                } hover:border-black`}
              >
                {!imageLoaded[index] && (
                  <div
                    className="skeleton-loader"
                    style={{
                      height: "340px",
                      width: "185px",
                    }}
                  ></div>
                )}
                <Image
                  src={image?.image}
                  alt={`template-0${index + 1}`}
                  height={1200}
                  width={1200}
                  className={`mx-auto ${!imageLoaded[index] ? "hidden" : ""}`}
                  onLoadingComplete={() => handleImageLoad(index)}
                  priority
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            router.push("/select-platform"),
              dispatch(
                editUser({
                  template: selectedCard,
                }),
              );
            handleAddLocalStoreage();
          }}
          disabled={selectedCard === null || loader}
          className="w-full mx-auto bg-green-400 hover:bg-[#ebff57] hover:text-[#000] text-white font-medium py-2 px-8 rounded-full shadow-md transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white items-center flex justify-center"
        >
          Continue &nbsp; {loader && <CircularProgress color="inherit" size={20} />}
        </button>
      </div>
    </div>
  );
};

export default SelectTemplate;
