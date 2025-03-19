"use client";

import ProfileViewTheme from "@/components/profile-preview/ProfileViewTheme";
import FirstTheme from "@/components/Selected-Theme/FirstTheme";
import SecondTheme from "@/components/Selected-Theme/SecondTheme";
import ZeroTheme from "@/components/Selected-Theme/ZeroTheme";
import { addBio, getAllPlateform } from "@/redux/Action/auth.action";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SelectPlateForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { bioData } = useSelector((state) => state.authReducer);
  const { userData } = useSelector((state) => state.authReducer);
  const [platform, setPlatform] = useState([]);
  const [socialMedia, setSocialMedia] = useState([]);
  const [cardImage, setCardImage] = useState(null);
  const { allPlateformItems } = useSelector((state) => state?.authReducer);
  const { loader } = useSelector((state) => state.errorReducer);

  const selectPlateform = async (value) => {
    if (platform?.includes(value)) {
      const array = platform?.filter((v) => v?.name !== value?.name);
      setPlatform(array);
    } else {
      setPlatform([...platform, value]);
    }
  };
  const handleSocialMedia = (e, elem) => {
    const updatedValue = e.target.value;
    const updatedSocialMedia = socialMedia.map((item) =>
      item.name === elem.name ? { ...item, url: updatedValue } : item,
    );
    if (!socialMedia.some((item) => item.name === elem.name)) {
      updatedSocialMedia.push({
        name: elem?.name,
        initUrl: elem?.initUrl,
        url: updatedValue,
        logo: elem?.logo,
      });
    }
    setSocialMedia(updatedSocialMedia);
  };
  const handleSubmit = () => {
    if (socialMedia?.length > 0) {
      const payload = socialMedia?.map((elem) => {
        return {
          ...elem,
          url: `${elem?.initUrl}${elem?.url}`,
          status: elem?.url ? true : false,
        };
      });
      dispatch(addBio({ social_media: payload }));
    } else if (platform?.length > 0) {
      dispatch(addBio({ social_media: platform }));
    }
  };
  useEffect(() => {
    if (bioData?.user) {
      setSocialMedia([]);
      router?.push("/profile-details");
    }
  }, [bioData]);

  useEffect(() => {
    const getCardIndex = JSON.parse(localStorage.getItem("selectedCard"));
    setCardImage(getCardIndex);
    dispatch(getAllPlateform(["social media"]));
  }, []);

  return (
    <div className="w-full lg:flex m-auto 2xl:me-auto 2xl:w-[70%] text-center items-center">
      <div>
        <h3 className="mb-2 mt-5 text-xl md:text-3xl">Which Platforms are you on?</h3>
        <p className="info-text block">Select Profile Image</p>
        <div className="flex flex-wrap items-center justify-center mt-4 gap-4">
          {allPlateformItems &&
            allPlateformItems?.map((elem, index) => (
              <div
                key={index}
                className={`${
                  platform?.find((x) => x.name === elem?.name)
                    ? "border-2 rounded-lg border-black"
                    : "border border-transparent"
                } w-[80px] h-[80px]  md:w-[100px] md:h-[100px] flex items-center justify-center flex-col rounded-[10px] bg-[#000000] bg-opacity-5 hover:border-gray-400 cursor-pointer`}
                onClick={() => selectPlateform({ ...elem, layout_setting: elem?.default_layout })}
              >
                <Image
                  src={elem?.svg}
                  height={45}
                  width={45}
                  className="w-[30px] object-contain h-[30px] md:w-[45px] md:h-[45px]"
                  alt={elem?.name}
                />
                <span className="text-xs md:text-sm mt-1">{elem?.name}</span>
              </div>
            ))}
        </div>
        <div>
          {platform?.map((elem, index) => (
            <div key={index} className="flex items-center mt-4 w-full gap-2">
              <Image
                src={elem?.svg}
                height={35}
                width={35}
                alt={elem?.name}
                className="inline-block max-w-full"
              />
              {/* <span>{elem?.initUrl}</span> */}
              <div className="flex username grow bg-[#29292B] text-[#29292B] text-left bg-opacity-10 px-4 py-2.5 text-sm rounded-md">
                <input
                  type="text"
                  placeholder={` ${elem?.placeholder}`}
                  // value={elem?.url || ""}
                  className="w-full border-0 outline-none bg-transparent peer"
                  onBlur={(e) => handleSocialMedia(e, elem)}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="w-full bg-green-400 hover:bg-[#ebff57] hover:text-[#000] text-white cursor-pointer font-medium py-2 px-8 rounded-full shadow-md transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white mt-5 items-center flex justify-center"
          disabled={platform?.length <= 0 || loader}
          onClick={handleSubmit}
        >
          Continue &nbsp; {loader && <CircularProgress color="inherit" size={20} />}
        </button>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-8 mt-8 justify-center">
        <ProfileViewTheme
          changeAppearanceData={userData?.data?.customize_theme}
          socialMedia={platform}
          userData={userData}
          shopData={platform}
          activeTabPreview={"Links"}
        />
        {/* {cardImage === 0 ? (
          <ZeroTheme platform={platform} />
        ) : cardImage === 1 ? (
          <FirstTheme platform={platform} />
        ) : cardImage === 2 ? (
          <SecondTheme platform={platform} />
        ) : (
          <></>
        )} */}
      </div>
    </div>
  );
};

export default SelectPlateForm;
