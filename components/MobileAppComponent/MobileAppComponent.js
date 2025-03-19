"use client";
import React, { useEffect, useState } from "react";

const MobileAppComponent = ({ setAddDefaultApp, widgetData }) => {
  const editData = widgetData?.thumbnail ? JSON.parse(widgetData.thumbnail) : null;

  const [apkList, setApkList] = useState([]);
  const [item, setItem] = useState({
    appstore_link: editData?.appstore_link,
    playstore_link: editData?.playstore_link,
  });
  const [errors, setErrors] = useState({ appstore_link: "", playstore_link: "" });

  const images = [
    "/images/app-store-dark-button.svg",
    "/images/play-store-dark-button.svg",
    "/images/app-store-light-button.svg",
    "/images/play-store-light-button.svg",
  ];

  const [selectedImage, setSelectedImage] = useState({
    group: editData?.grop,
    index: editData?.index || -1,
  });

  const handleImageSelect = (index) => {
    if (index === "group1") {
      setSelectedImage({ group: "group1", index });
    } else {
      setSelectedImage({ group: "group2", index });
    }
  };

  useEffect(() => {
    setAddDefaultApp((prev) => ({
      ...prev,
      thumbnail: JSON.stringify({
        appstore_link: item?.appstore_link,
        playstore_link: item?.playstore_link,
        selectedImage: selectedImage,
      }),
    }));
  }, [selectedImage, item?.appstore_link, item?.playstore_link, setAddDefaultApp]);

  const handleApkNameChange = (e) => {
    const value = e.target.value;
    setItem((prev) => ({ ...prev, playstore_link: value }));
  };

  const handleFileLinkChange = (e) => {
    const url = e.target.value;
    setItem((prev) => ({ ...prev, appstore_link: url }));
  };

  const handleRemoveApk = (index) => {
    setApkList(apkList?.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white border rounded-lg px-4 py-2 mx-auto my-4 w-full">
      <form>
        <div className="mb-2 text-start">
          <div className="my-2 text-start flex items-center">
            Play store link &nbsp;
            <div
              className="cursor-pointer"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.open("https://play.google.com/store/games?hl=en", "_blank");
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-up-right-square"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707z"
                />
              </svg>
            </div>
          </div>

          <input
            type="text"
            className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
            value={item?.playstore_link}
            onChange={handleApkNameChange}
          />
          {errors?.playstore_link && <p className="text-red-500 mt-1">{errors?.playstore_link}</p>}
        </div>

        <div className="mb-2 text-start">
          <div className="my-2 text-start flex items-center">
            App store link &nbsp;{" "}
            <div
              className="cursor-pointer"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.open("https://www.apple.com/in/app-store/", "_blank");
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-up-right-square"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707z"
                />
              </svg>
            </div>
          </div>
          <input
            type="text"
            className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
            value={item?.appstore_link}
            onChange={handleFileLinkChange}
          />
          {errors?.appstore_link && <p className="text-red-500 mt-1">{errors?.appstore_link}</p>}
        </div>

        <div className="flex flex-col gap-4">
          <div
            className={`flex cursor-pointer justify-center gap-4 ${
              selectedImage?.group === "group1"
                ? "border-2 border-black rounded-lg"
                : "border border-gray-300"
            }`}
            onClick={() => handleImageSelect("group1")}
          >
            {images.slice(0, 2).map((img, index) => (
              <img key={index} src={img} alt={`Image ${index}`} className={`cursor-pointer p-2 `} />
            ))}
          </div>

          <div
            className={`flex cursor-pointer justify-center gap-4 ${
              selectedImage?.group === "group2"
                ? "border-2 border-black rounded-lg"
                : "border border-gray-300"
            }`}
            onClick={() => handleImageSelect("group2")}
          >
            {images.slice(2).map((img, index) => (
              <img
                key={index + 2}
                src={img}
                alt={`Image ${index + 2}`}
                className={`cursor-pointer p-2 `}
              />
            ))}
          </div>
        </div>
      </form>

      {apkList?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">APK List</h3>
          <ul className="border rounded-lg p-4 bg-gray-100 space-y-2">
            {apkList?.map((apk, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-2 rounded-lg shadow"
              >
                <div>
                  <p className="font-medium">{apk?.apk_name}</p>
                  {apk?.selectedImage.src && (
                    <img src={apk?.selectedImage?.src} alt="Selected" className="w-16 h-16 mt-1" />
                  )}
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  onClick={() => handleRemoveApk(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileAppComponent;
