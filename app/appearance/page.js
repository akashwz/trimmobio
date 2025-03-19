"use client";

import API from "@/api";
import Background from "@/components/appearance-theme/Background";
import Button from "@/components/appearance-theme/Button";
import ButtonSocialMedia from "@/components/appearance-theme/ButtonSocialMedia";
import CustomizeTheme from "@/components/appearance-theme/CustomizeTheme";
import Profile from "@/components/appearance-theme/Profile";
import ThemeSelect from "@/components/appearance-theme/ThemeSelect";
import TypographyTheme from "@/components/appearance-theme/TypographyTheme";
import ProfileViewTheme from "@/components/profile-preview/ProfileViewTheme";
import { UPDATE_APPERANCE, UPDATE_APPERANCE_THEME } from "@/redux/action.type";
import { getSingleThemeData } from "@/redux/Action/appearance.action";
import { editUser, getBio } from "@/redux/Action/auth.action";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const lightenColor = (color, percent) => {
  let R = parseInt(color.slice(1, 3), 16);
  let G = parseInt(color.slice(3, 5), 16);
  let B = parseInt(color.slice(5, 7), 16);

  R = Math.round(R + (255 - R) * percent);
  G = Math.round(G + (255 - G) * percent);
  B = Math.round(B + (255 - B) * percent);

  return `#${R.toString(16).padStart(2, "0")}${G.toString(16).padStart(2, "0")}${B.toString(
    16,
  ).padStart(2, "0")}`;
};

const initialAppreance = {
  bg_image: "",
  cover_image: "",
  selectedBg: "flat_colour",
  basicColor: "#ffffff",
  buttonColor: "#f3f4f6",
  buttonFontColor: "#374151",
  buttonHoverBg: "#374151",
  buttonHoverFontColor: "#f3f4f6",
  shadowColor: "#1414b5",
  value: "gradient_up",
  selectedButton: "fill-2",
  form_color: "#d8b4fe",
  via_color: "#fbcfe8",
  to_color: "#fef08a",
  button_text_align: "center",
  username_text_color: "#000000",
  username_text_size: 18,
  description_text_color: "#000000",
  description_text_size: 14,
  bio_text_align: "center",
  bio_line_height: 20,
  profile_radius: 100,
  profile_radius_top: 100,
  profile_radius_bottom: 100,
  profile_radius_left: 100,
  profile_radius_right: 100,
  social_media_show_as_a_button: false,
  background_box_shadow_spread: "#000000",
  profile_border_width: 2,
  profile_border_style: "solid",
  profile_border_color: "#ffffff",
  profile_image_show: true,
  cover_image_show: true,
  container_padding: 20,
  container_image: "https://cdn.trimmo.bio/trimmo_bio/bg-cover-image.webp",
  button_container: false,
  typography_font: "roboto-slab",
  selectedButtonSocialMedia: "fill-2",
  socialMediaButtonColor: "#ffffff",
  socialMediaButtonFontColor: "#000000",
  socialMediaButtonHoverBg: "#000000",
  socialMediaButtonHoverFontColor: "#ffffff",
  socialMediaShadowColor: "#000000",
};

const Appearance = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userData } = useSelector((state) => state?.authReducer);
  const { bioData } = useSelector((state) => state?.authReducer);
  const { appreanceTheme, singleThemeData } = useSelector((state) => state?.appreanceReducer);
  const [socialMedia, setSocialMedia] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [expandedButton, setExpandedButton] = useState(true);
  const [expandedButtonSocialMedia, setExpandedButtonSocialMedia] = useState(true);
  const [expandedProfile, setExpandedProfile] = useState(true);
  const [expandedTheme, setExpandedTheme] = useState(true);
  const [expandedThemeTypography, setExpandedThemeTypography] = useState(true);
  const [expandedSelectTheme, setExpandedSelectTheme] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeTabPreview, setActiveTabPreview] = useState("Links");
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const { loader } = useSelector((state) => state.errorReducer);

  const handleTabClickPreview = async (tab) => {
    setActiveTabPreview(tab);
  };

  const [changeAppearanceData, setChangeAppearanceData] = useState(initialAppreance);

  useEffect(() => {
    if (JSON.stringify(changeAppearanceData) !== JSON.stringify(bioData?.customize_theme)) {
      setIsSaveEnabled(true);
    } else {
      setIsSaveEnabled(false);
    }
  }, [changeAppearanceData]);

  useEffect(() => {
    apperanceDataGet();
    apperanceThemeDataGet();
    setSelectedImage(appreanceTheme);
  }, [appreanceTheme]);

  const apperanceThemeDataGet = async () => {
    const username = localStorage.getItem("name");
    try {
      const apiCall = await API({
        url: `/bio/${userData?.data?.username}`,
        method: "get",
      });

      if (apiCall?.data?.data?.username) {
        dispatch({
          type: UPDATE_APPERANCE_THEME,
          payload: apiCall?.data?.data?.template,
        });
      }
    } catch (error) {
      dispatch(clearBio());
      router.push("/");
    }
  };

  const apperanceDataGet = async () => {
    const username = localStorage.getItem("name");
    try {
      const apiCall = await API({
        url: `/bio/${userData?.data?.username}`,
        method: "get",
      });

      if (apiCall?.data?.data?.username) {
        dispatch({
          type: UPDATE_APPERANCE,
          payload: apiCall?.data?.data?.customize_theme,
        });
        setChangeAppearanceData(apiCall?.data?.data?.customize_theme);
      }
    } catch (error) {
      dispatch(clearBio());
      router.push("/");
    }
  };

  const handleApperanceChanges = async () => {
    if (!isSaveEnabled) return;

    await dispatch(
      editUser({ customize_theme: changeAppearanceData, template: selectedImage?.toString() }),
    );

    setIsSaveEnabled(false);
  };

  const handleThemeSelect = async (imageIndex, id) => {
    setSelectedImage(id);
    try {
      const data = await dispatch(getSingleThemeData(id));
      setChangeAppearanceData(data?.theme_css_setting);
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
    setIsSaveEnabled(true);
  };

  const baseColor = "#000000";

  const lightColor = lightenColor(baseColor, 0.5);

  useEffect(() => {
    if (userData?.data?.username) {
      dispatch(getBio(userData?.data?.username));
    }
  }, [userData]);

  useEffect(() => {
    if (bioData?.social_links) {
      setSocialMedia(bioData?.social_links);
    }
    if (bioData?.shop) {
      setShopData(bioData?.shop);
    }
  }, [bioData]);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const handleChangeButton = () => {
    setExpandedButton(!expandedButton);
  };

  const handleChangeButtonSocialMedia = () => {
    setExpandedButtonSocialMedia(!expandedButtonSocialMedia);
  };

  const handleChangeProfile = () => {
    setExpandedProfile(!expandedProfile);
  };

  const handleChangeTheme = () => {
    setExpandedTheme(!expandedTheme);
  };

  const handleChangeThemeTypography = () => {
    setExpandedThemeTypography(!expandedThemeTypography);
  };

  const handleChangeSelectTheme = () => {
    setExpandedSelectTheme(!expandedSelectTheme);
  };

  const [isPopupOpen, setIsPopupOpen] = useState();

  const closeSharePopup = () => {
    setIsPopupOpen(false);
  };
  const handleCloseColor = () => {
    setShowColorPicker(false);
  };

  const handlebgSelect = (value, type) => {
    const bgSelect = {
      ...changeAppearanceData,
      [type]: value,
    };
    setChangeAppearanceData(bgSelect);
    setIsPopupOpen(true);
    setIsSaveEnabled(true);
  };
  const handleGradiantColorChange = (fromColor, viaColor, toColor) => {
    const colorSelect = {
      ...changeAppearanceData,
      form_color: fromColor,
      via_color: viaColor,
      to_color: toColor,
    };
    setChangeAppearanceData(colorSelect);
    setIsSaveEnabled(true);
  };

  const [loaderCustom, setLoaderCustom] = useState(false);

  // const handleImageCover = async (file) => {
  //   setLoaderCustom(true);
  //   let fileName = file?.name;
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("folder", "profile");
  //   try {
  //     const apiCall = await API({
  //       url: `/bio/fileupload`,
  //       method: "post",
  //       data: formData,
  //     });
  //     if (apiCall?.status === 200 || apiCall?.status === 304) {
  //       setChangeAppearanceData({
  //         ...changeAppearanceData,
  //         cover_image: apiCall?.data?.data?.url,
  //       });
  //     }
  //   } catch (error) {
  //     ToastNotification.error(error);
  //   } finally {
  //     setLoaderCustom(false);
  //   }
  // };

  const handleImageCover = async (file) => {
    // Allowed file types (Images + GIF + Videos)
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/webm",
      "video/ogg",
    ];
    const maxSize = 20 * 1024 * 1024; // 20MB

    if (!file) {
      ToastNotification.error("No file selected.");
      return;
    }

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      ToastNotification.error("Invalid file type. Only images, GIF, and video files are allowed.");
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      ToastNotification.error("File size exceeds 20MB limit.");
      return;
    }

    setLoaderCustom(true);
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
        setChangeAppearanceData((prev) => ({
          ...prev,
          cover_image: apiCall?.data?.data?.url,
        }));
        ToastNotification.success("File uploaded successfully!");
      }
    } catch (error) {
      ToastNotification.error(error?.response?.data?.message || "File upload failed.");
    } finally {
      setLoaderCustom(false);
    }
  };

  const removeImageCover = async () => {
    try {
      const apiCall = await API({
        url: `/bio/delete_file_s3?file_url=${userData?.cover_image}`,
        method: "delete",
      });
      if (apiCall.status === 200 || apiCall.status === 304) {
        setChangeAppearanceData({ ...changeAppearanceData, cover_image: "" });
      }
    } catch (error) {
      ToastNotification.error(error);
    }
  };

  const handleImageContainer = async (file) => {
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
        setChangeAppearanceData({
          ...changeAppearanceData,
          container_image: apiCall?.data?.data?.url,
        });
      }
    } catch (error) {
      ToastNotification.error(error);
    } finally {
      setLoaderCustom(false);
    }
  };
  const removeImageContainer = async () => {
    try {
      const apiCall = await API({
        url: `/bio/delete_file_s3?file_url=${userData?.container_image}`,
        method: "delete",
      });
      if (apiCall.status === 200 || apiCall.status === 304) {
        setChangeAppearanceData({ ...changeAppearanceData, container_image: "" });
      }
    } catch (error) {
      ToastNotification.error(error);
    }
  };

  const handleChangeAppearance = (value, type) => {
    setChangeAppearanceData((prevData) => ({
      ...prevData,
      [type]: value,
    }));
    setIsSaveEnabled(true);
  };

  const handleChangeButtonAlignment = (value, type) => {
    const selectedItem = {
      ...changeAppearanceData,
      [type]: value,
    };
    setChangeAppearanceData(selectedItem);
    setIsSaveEnabled(true);
  };

  const handleSocialMediaButton = (value, type) => {
    const selectedItem = {
      ...changeAppearanceData,
      [type]: value,
    };
    setChangeAppearanceData(selectedItem);
    setIsSaveEnabled(true);
  };

  return (
    <>
      <div
        className="relative flex-grow p-2 lg:p-5 overflow-y-auto h-screen"
        style={{
          scrollbarWidth: "thin",
        }}
      >
        <div className="w-[100%] lg:w-[80%] profile-detail flex flex-col p-4 mx-auto justify-center">
          <div className="w-full">
            <h1 className="sm:text-[1.75rem] text-lg font-semibold  mr-4">Appearance</h1>
          </div>
          <div className="mt-5">
            <Profile expandedProfile={expandedProfile} handleChangeProfile={handleChangeProfile} />
            <ThemeSelect
              expandedSelectTheme={expandedSelectTheme}
              handleChangeSelectTheme={handleChangeSelectTheme}
              changeAppearanceData={changeAppearanceData}
              selectedImage={selectedImage}
              handleThemeSelect={handleThemeSelect}
            />
            <Background
              selectedImage={selectedImage}
              userData={userData}
              expanded={expanded}
              changeAppearanceData={changeAppearanceData}
              setChangeAppearanceData={setChangeAppearanceData}
              handleChange={handleChange}
              handlebgSelect={handlebgSelect}
              isPopupOpen={isPopupOpen}
              closeSharePopup={closeSharePopup}
              baseColor={baseColor}
              lightColor={lightColor}
              setShowColorPicker={setShowColorPicker}
              showColorPicker={showColorPicker}
              handleCloseColor={handleCloseColor}
              handleGradiantColorChange={handleGradiantColorChange}
            />
            <Button
              expandedButton={expandedButton}
              handleChangeButton={handleChangeButton}
              changeAppearanceData={changeAppearanceData}
              setShowColorPicker={setShowColorPicker}
              showColorPicker={showColorPicker}
              handleCloseColor={handleCloseColor}
              handleChangeButtonAlignment={handleChangeButtonAlignment}
            />
            <ButtonSocialMedia
              expandedButtonSocialMedia={expandedButtonSocialMedia}
              handleChangeButtonSocialMedia={handleChangeButtonSocialMedia}
              changeAppearanceData={changeAppearanceData}
              setShowColorPicker={setShowColorPicker}
              showColorPicker={showColorPicker}
              handleCloseColor={handleCloseColor}
              handleSocialMediaButton={handleSocialMediaButton}
            />
            <CustomizeTheme
              expandedTheme={expandedTheme}
              showColorPicker={showColorPicker}
              setShowColorPicker={setShowColorPicker}
              handleChangeTheme={handleChangeTheme}
              changeAppearanceData={changeAppearanceData}
              selectedImage={selectedImage}
              handleChangeAppearance={handleChangeAppearance}
              loaderCustom={loaderCustom}
              handleImageCover={handleImageCover}
              removeImageCover={removeImageCover}
              handleCloseColor={handleCloseColor}
              handleImageContainer={handleImageContainer}
              removeImageContainer={removeImageContainer}
            />
            <TypographyTheme
              expandedThemeTypography={expandedThemeTypography}
              showColorPicker={showColorPicker}
              setShowColorPicker={setShowColorPicker}
              handleChangeThemeTypography={handleChangeThemeTypography}
              changeAppearanceData={changeAppearanceData}
              selectedImage={selectedImage}
              handleChangeAppearance={handleChangeAppearance}
              loaderCustom={loaderCustom}
              handleImageCover={handleImageCover}
              removeImageCover={removeImageCover}
              handleCloseColor={handleCloseColor}
              handleImageContainer={handleImageContainer}
              removeImageContainer={removeImageContainer}
            />
          </div>
        </div>

        <div className="lg:hidden flex justify-center">
          <div className="w-[100%] lg:w-[77%] profile-share-link absolute mb-4 left-[50%] -translate-x-[50%] h-[50px] ps-4 pe-1 rounded-[30px] z-10 bg-[#F1F0E6] flex items-center justify-between cursor-pointer">
            <button
              type="button"
              className="btn-green hover:bg-[#ebff57] hover:!text-[#000] !text-white hover:border-[#ebff57] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white items-center flex justify-center "
              onClick={handleApperanceChanges}
              disabled={!isSaveEnabled || loader}
            >
              Save changes &nbsp; {loader && <CircularProgress color="inherit" size={20} />}
            </button>
          </div>
          <div className="px-5 my-auto">
            <div className="px-5 my-auto mb-24 z-10 relative">
              <ProfileViewTheme
                socialMedia={socialMedia}
                userData={userData}
                shopData={shopData}
                changeAppearanceData={changeAppearanceData}
                handleTabClickPreview={handleTabClickPreview}
                activeTabPreview={activeTabPreview}
                fontName={changeAppearanceData?.typography_font}
              />
            </div>
          </div>
          <div
            className="inline-block fixed bottom-4 right-4 group copy-share-icon"
            onClick={handleApperanceChanges}
            disabled={!isSaveEnabled}
          >
            <div className="bottom-14 w-12 h-12 btn-green text-white rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer relative">
              Save
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen hidden overflow-auto lg:flex border-l border-[#000000] border-opacity-10 flex-col">
        <div className="px-5 flex justify-end mt-4">
          <button
            type="button"
            className="btn-green hover:bg-[#ebff57] hover:!text-[#000] !text-white hover:border-[#ebff57] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white items-center flex justify-center "
            onClick={handleApperanceChanges}
            disabled={!isSaveEnabled || loader}
          >
            Save changes &nbsp; {loader && <CircularProgress color="inherit" size={20} />}
          </button>
        </div>

        <div className="px-5 my-auto">
          <div className="px-5 my-auto">
            <ProfileViewTheme
              socialMedia={socialMedia}
              shopData={shopData}
              userData={userData}
              changeAppearanceData={changeAppearanceData}
              handleTabClickPreview={handleTabClickPreview}
              activeTabPreview={activeTabPreview}
              fontName={changeAppearanceData?.typography_font}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Appearance;
