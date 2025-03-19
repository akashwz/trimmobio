"use client";

import API from "@/api";
import ProfileViewTheme from "@/components/profile-preview/ProfileViewTheme";
import FirstTheme from "@/components/Selected-Theme/FirstTheme";
import SecondTheme from "@/components/Selected-Theme/SecondTheme";
import ZeroTheme from "@/components/Selected-Theme/ZeroTheme";
import { clearBio, editUser, getBio } from "@/redux/Action/auth.action";
import { CircularProgress, Skeleton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CloudUpload, X } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { editData } = useSelector((state) => state.authReducer);
  const { bioData } = useSelector((state) => state?.authReducer);
  const { loginData } = useSelector((state) => state?.authReducer);
  const { userData } = useSelector((state) => state?.authReducer);
  const { loader } = useSelector((state) => state.errorReducer);

  const [userDetails, setUserDetails] = useState({
    name: "",
    bio: "",
    profile_picture: "",
  });
  const [cardImage, setCardImage] = useState(null);
  const [loaderCustom, setLoaderCustom] = useState(false);

  useEffect(() => {
    const getCardIndex = JSON.parse(localStorage.getItem("selectedCard"));
    setCardImage(getCardIndex);
  }, []);

  const handleImageCover = async (file) => {
    setLoaderCustom(true);
    let fileName = file?.name;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "profile");
    try {
      const apiCall = await API({
        url: `/bio/fileupload`,
        method: "post",
        data: formData,
      });
      if (apiCall?.status === 200 || apiCall?.status === 304) {
        setUserDetails({
          ...userDetails,
          profile_picture: apiCall?.data?.data?.url,
        });
      }
    } catch (error) {
      ToastNotification.error(error);
    } finally {
      setLoaderCustom(false);
    }
  };
  const removeImageCover = async () => {
    try {
      const apiCall = await API({
        url: `/bio/delete_file_s3?file_url=${userDetails?.profile_picture}`,
        method: "delete",
      });
      if (apiCall.status === 200 || apiCall.status === 304) {
        setUserDetails({ ...userDetails, profile_picture: "" });
      }
    } catch (error) {
      ToastNotification.error(error);
    }
  };

  return (
    <div className="w-full mx-auto 2xl:w-[70%] text-center">
      <div className="grid mt-5 grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Profile Form */}
        <div className="ml-auto">
          <h2 className="mb-3 text-xl font-bold">Add Profile Details</h2>
          <p className="info-text block mb-4">Select Profile Image</p>
          <div className="flex justify-center">
            {!loaderCustom && !userDetails?.profile_picture ? (
              <label className="inline-flex file-tag-hover relative flex-col items-center border-dashed border-[2px] w-[120px] h-[100px] justify-center cursor-pointer rounded-[6px]">
                <input
                  id="dropzone-file"
                  type="file"
                  name="image"
                  accept="image/jpeg, image/png, image/jpg, image/webp, image/svg"
                  onChange={(e) => handleImageCover(e.target.files[0])}
                  disabled={loaderCustom}
                  className="hidden peer"
                />
                <CloudUpload className="w-9 h-9" />
                <span className="text-sm block font-medium text-center">
                  Click to upload profile photo
                </span>
              </label>
            ) : loaderCustom ? (
              <Skeleton className="w-[120px] h-[100px]" variant="rounded" />
            ) : (
              <div className="flex relative items-center w-[120px] h-[100px] justify-center border rounded-[6px] cursor-pointer">
                <img
                  src={userDetails?.profile_picture}
                  className="max-w-[180px] max-h-[180px] object-cover"
                  alt="Profile"
                  height={50}
                  width={50}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImageCover();
                  }}
                  className="absolute top-0 right-0 rounded-tr w-[25px] h-[25px] flex items-center justify-center text-red-600 bg-white border border-gray-300 text-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <span className="block text-sm font-medium my-4">Add title and bio</span>
          <input
            type="text"
            placeholder="Profile Title"
            className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
            value={userDetails?.name}
            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
          />
          <textarea
            placeholder="Bio"
            // className="w-full mt-2 bg-transparent rounded-lg border border-gray-300 focus:border-black focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out"
            className="w-full mt-2 bg-transparent rounded-lg border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
            value={userDetails?.bio}
            maxLength="80"
            onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}
          />
          <button
            type="button"
            disabled={!userDetails?.name || loader}
            className={`${
              !userDetails?.name ? "cursor-not-allowed opacity-50" : ""
            } w-full bg-green-400 hover:bg-[#ebff57] hover:text-[#000] text-white cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white font-medium py-2 px-8 rounded-full shadow-md transition-all duration-200 ease-in-out mt-5 items-center flex justify-center`}
            onClick={() => {
              dispatch(editUser(userDetails));
              router.push("/link-ready");
            }}
          >
            Continue &nbsp; {loader && <CircularProgress color="inherit" size={20} />}
          </button>
        </div>

        {/* Right Column: Theme Preview */}
        <div className="flex justify-center w-full">
          <ProfileViewTheme
            changeAppearanceData={userData?.data?.customize_theme}
            // socialMedia={platform}
            userData={userData}
            // shopData={platform}
            activeTabPreview={"Links"}
          />
          {/* {cardImage === 0 ? (
                        <div className="w-full sm:w-[60%]">
                            <ZeroTheme platform={bioData?.social_media} />
                        </div>
                    ) : cardImage === 1 ? (
                        <div className="w-full sm:w-[60%]">
                            <FirstTheme platform={bioData?.social_media} />
                        </div>
                    ) : cardImage === 2 ? (
                        <div className="w-full sm:w-[60%]">
                            <SecondTheme platform={bioData?.social_media} />
                        </div>
                    ) : (
                        <p className="text-gray-500">No theme selected</p>
                    )} */}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
