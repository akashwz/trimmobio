"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import LinksButton from "../LinksButton/LinksButton";
import ThumbView from "../LinksButton/ThumbView";
import SvgSection from "../SvgSection/SvgSection";
import { fontMap } from "@/utils/fonts";

const ProfileViewTheme = ({
  socialMedia,
  userData,
  changeAppearanceData,
  activeTabPreview,
  handleTabClickPreview,
  shopData,
  fontName,
}) => {
  const { appreance, singleThemeData } = useSelector((state) => state?.appreanceReducer);
  const { bioData } = useSelector((state) => state?.authReducer);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredLogo, setIsHoveredLogo] = useState(false);

  const foundApp = bioData?.authorize_app?.find((app) => app.name === "Shopeasy");

  const fromColor = changeAppearanceData?.form_color;
  const viaColor = changeAppearanceData?.via_color;
  const toColor = changeAppearanceData?.to_color;
  const gradientTo =
    changeAppearanceData?.value === "gradient_up"
      ? "to top"
      : changeAppearanceData?.value === "gradient_down"
      ? "to bottom"
      : changeAppearanceData?.value === "gradient_left"
      ? "to left"
      : "to right";

  const handleMouseEnter = (id) => setIsHovered(id);
  const handleMouseLeave = () => setIsHovered(null);
  const handleMouseEnterLogo = (id) => setIsHoveredLogo(id);
  const handleMouseLeaveLogo = () => setIsHoveredLogo(null);
  const AllLinks = [
    {
      items:
        bioData?.social_links?.flatMap((widget) =>
          widget.items.filter((item) => item.status === true),
        ) || [],
    },
  ];

  const handleButtonClick = (url, userId, linkId) => {
    if (url && typeof window !== "undefined") {
      window.open(url, "_blank");
    } else {
      console.error("URL is not provided");
    }
  };

  const isVideo =
    changeAppearanceData?.bg_image?.endsWith(".webm") ||
    changeAppearanceData?.bg_image?.endsWith(".mp4");
  const isGif = changeAppearanceData?.bg_image?.endsWith(".gif");
  const isImage = changeAppearanceData?.bg_image?.match(/\.(jpeg|jpg|png|webp)$/);

  const fontClass = fontMap[fontName]?.fontFamily || "";
  // const fontClass = fontName;

  return (
    <div
      className={`flex items-center justify-center border-black border-[3px] border-solid rounded-[15px] bg-cover bg-no-repeat bg-center themeSection_font`}
      style={{
        backgroundImage: changeAppearanceData?.container_image
          ? `url(${changeAppearanceData?.container_image})`
          : "",
        padding: changeAppearanceData?.container_padding
          ? `${changeAppearanceData?.container_padding}px`
          : "0px",
        // "--theme-font": `${changeAppearanceData?.typography_font}`,
        "--theme-font": fontClass,
      }}
    >
      <div
        className="bg-white w-80 shadow-lg overflow-auto h-[60vh] custom-scrollbar"
        style={{
          borderRadius: changeAppearanceData?.container_image ? "" : "10px",
        }}
      >
        <div
          className="text-center !bg-cover !bg-no-repeat !bg-center flex flex-col h-full"
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: changeAppearanceData?.cover_image_show === true ? "" : "100%",
          }}
        >
          <div
            className="h-full flex flex-col justify-between overflow-auto custom-scrollbar !bg-cover !bg-no-repeat !bg-center relative"
            style={{
              zIndex: changeAppearanceData?.background_box_shadow_spread ? 3 : 0,
              boxShadow: changeAppearanceData?.background_box_shadow_spread
                ? `-101px 40px 35px ${changeAppearanceData?.basicColor}`
                : "none",
              position: changeAppearanceData?.background_box_shadow_spread ? "relative" : "",
              // background:
              //   changeAppearanceData?.selectedBg === "flat_colour"
              //     ? changeAppearanceData?.basicColor
              //     : changeAppearanceData?.selectedBg === "gradient"
              //     ? `linear-gradient(${gradientTo}, ${fromColor}, ${viaColor}, ${toColor})`
              //     : "none",
              background:
                changeAppearanceData?.selectedBg === "flat_colour"
                  ? changeAppearanceData?.basicColor
                  : changeAppearanceData?.selectedBg === "gradient"
                  ? `linear-gradient(${gradientTo}, ${fromColor}, ${viaColor}, ${toColor})`
                  : changeAppearanceData?.selectedBg === "image" && changeAppearanceData?.bg_image
                  ? changeAppearanceData?.bg_image.endsWith(".mp4") ||
                    changeAppearanceData?.bg_image.endsWith(".webm")
                    ? "none" // Video will be rendered separately
                    : `url(${changeAppearanceData?.bg_image})`
                  : "none",
            }}
          >
            {/* Background video */}
            {changeAppearanceData?.selectedBg === "image" && isVideo && (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-[100vh] object-cover z-[-1]"
              >
                <source src={changeAppearanceData?.bg_image} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            )}

            {/* Background GIF */}
            {/* {changeAppearanceData?.selectedBg === "image" && isGif && (
              <img
                src={changeAppearanceData?.bg_image}
                alt="Background GIF"
                className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
              />
            )} */}

            {/* Background Image */}
            {/* {changeAppearanceData?.selectedBg === "image" && isImage && (
              <img
                src={changeAppearanceData?.bg_image}
                alt="Background Image"
                className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
              />
            )} */}
            <div
              className={`relative ${
                changeAppearanceData?.cover_image_show === false && "top-[60px]"
              }`}
            >
              {changeAppearanceData?.cover_image_show === true && (
                <>
                  {["webp", "gif", "jpg", "jpeg", "png"].includes(
                    changeAppearanceData?.cover_image?.split(".").pop(),
                  ) ? (
                    <img
                      src={
                        changeAppearanceData?.cover_image
                          ? changeAppearanceData?.cover_image
                          : "/images/background_image.svg"
                      }
                      alt="Background"
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <video
                      src={changeAppearanceData?.cover_image}
                      alt="Background"
                      className="w-full h-48 object-cover"
                      autoPlay
                      loop
                      muted
                    />
                  )}
                </>
              )}
              {changeAppearanceData?.profile_image_show === true && (
                <div className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2`}>
                  {(userData?.data?.select_profile === "avatar_profile" &&
                    userData?.data?.avatar_profile) ||
                  (userData?.data?.select_profile === "profile" &&
                    userData?.data?.profile_picture) ? (
                    <div
                      className="relative w-[80px] h-full flex items-center justify-center text-white text-[30px]"
                      style={{
                        borderTopRightRadius: `${changeAppearanceData?.profile_radius_top}px`,
                        borderBottomLeftRadius: `${changeAppearanceData?.profile_radius_bottom}px`,
                        borderTopLeftRadius: `${changeAppearanceData?.profile_radius_left}px`,
                        borderBottomRightRadius: `${changeAppearanceData?.profile_radius_right}px`,
                      }}
                    >
                      <img
                        src={
                          userData?.data?.select_profile === "avatar_profile"
                            ? userData?.data?.avatar_profile
                            : userData?.data?.select_profile === "profile"
                            ? userData.data.profile_picture
                            : userData.data.profile_picture
                        }
                        alt="Avatar"
                        className="h-[80px] w-[80px]"
                        style={{
                          borderTopRightRadius: `${changeAppearanceData?.profile_radius_top}px`,
                          borderBottomLeftRadius: `${changeAppearanceData?.profile_radius_bottom}px`,
                          borderTopLeftRadius: `${changeAppearanceData?.profile_radius_left}px`,
                          borderBottomRightRadius: `${changeAppearanceData?.profile_radius_right}px`,
                          border: `${changeAppearanceData?.profile_border_width}px ${changeAppearanceData?.profile_border_style} ${changeAppearanceData?.profile_border_color}`,
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="relative capitalize w-[70px] h-[70px] bg-[#000000] flex items-center justify-center text-white text-[30px]"
                      style={{
                        borderTopRightRadius: `${changeAppearanceData?.profile_radius_top}px`,
                        borderBottomLeftRadius: `${changeAppearanceData?.profile_radius_bottom}px`,
                        borderTopLeftRadius: `${changeAppearanceData?.profile_radius_left}px`,
                        borderBottomRightRadius: `${changeAppearanceData?.profile_radius_right}px`,
                      }}
                    >
                      {userData?.data?.name?.charAt(0)}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div
              className="px-3"
              style={{
                zIndex: changeAppearanceData?.background_box_shadow_spread === true ? 3 : 0,
                boxShadow: changeAppearanceData?.background_box_shadow_spread
                  ? `0 -35px 40px 30px ${changeAppearanceData?.basicColor}`
                  : "none",
                position:
                  changeAppearanceData?.background_box_shadow_spread === true ? "relative" : "",
              }}
            >
              <div>
                <h2
                  className={`${
                    changeAppearanceData?.cover_image_show === false &&
                    changeAppearanceData?.profile_image_show === false
                      ? "mt-[3rem]"
                      : changeAppearanceData?.cover_image_show === false
                      ? "mt-[6rem]"
                      : changeAppearanceData?.profile_image_show === false
                      ? "mt-[0px]"
                      : "mt-[2rem]"
                  } text-lg font-bold flex justify-center`}
                  style={{
                    color: changeAppearanceData?.username_text_color,
                    fontSize: `${changeAppearanceData?.username_text_size}px`,
                    textAlign: changeAppearanceData?.bio_text_align,
                  }}
                >
                  {userData?.data?.name}&nbsp;
                  {userData?.data?.blue_tick === true ? (
                    <img src="./images/verified-account.svg" alt="blue-tick" />
                  ) : (
                    ""
                  )}
                </h2>
                <p
                  className="text-sm text-gray-200 mt-2"
                  style={{
                    color: userData?.data?.bio
                      ? changeAppearanceData?.description_text_color
                      : "E5E7EB",
                    fontSize: `${changeAppearanceData?.description_text_size}px`,
                    lineHeight: `${changeAppearanceData?.bio_line_height}px`,
                    textAlign: changeAppearanceData?.bio_text_align,
                  }}
                >
                  {userData?.data?.bio || "Bio not available"}
                </p>
              </div>

              {foundApp?.name === "Shopeasy" && (
                <>
                  <div
                    className={`flex border-2 border-${changeAppearanceData?.socialMediaButtonHoverBg} rounded-full justify-between mt-4`}
                    style={{
                      borderColor: changeAppearanceData?.socialMediaButtonHoverBg,
                    }}
                  >
                    <button
                      className={`px-6 w-full py-2 rounded-full font-bold transition-all duration-300 
                    `}
                      style={{
                        backgroundColor:
                          activeTabPreview === "Links"
                            ? changeAppearanceData?.socialMediaButtonHoverBg
                            : "transparent",
                        color:
                          activeTabPreview === "Links"
                            ? changeAppearanceData?.socialMediaButtonHoverFontColor
                            : changeAppearanceData?.socialMediaButtonFontColor,
                      }}
                      onClick={() => handleTabClickPreview("Links")}
                    >
                      Links
                    </button>

                    <button
                      className={`px-6 w-full py-2 rounded-full font-bold transition-all duration-300 
                  `}
                      style={{
                        backgroundColor:
                          activeTabPreview === "Shop"
                            ? changeAppearanceData?.socialMediaButtonHoverBg
                            : "transparent",
                        color:
                          activeTabPreview === "Shop"
                            ? changeAppearanceData?.socialMediaButtonHoverFontColor
                            : changeAppearanceData?.socialMediaButtonFontColor,
                      }}
                      onClick={() => handleTabClickPreview("Shop")}
                    >
                      Shop
                    </button>
                  </div>
                </>
              )}
              {activeTabPreview === "Shop" ? (
                <div className="w-full mt-4">
                  {shopData?.map((obj, index) => {
                    return (
                      <>
                        {obj?._id !== "social media" && obj?._id}
                        {obj?.widget_type === "products" || obj?.widget_type === "categories" ? (
                          <div>
                            <ThumbView
                              obj={obj}
                              changeAppearanceData={changeAppearanceData}
                              handleMouseEnter={handleMouseEnter}
                              isHovered={isHovered}
                              handleMouseLeave={handleMouseLeave}
                              handleButtonClick={handleButtonClick}
                            />
                          </div>
                        ) : (
                          <div
                            key={index}
                            className="w-full"
                            style={{
                              borderRadius:
                                changeAppearanceData?.button_container === true ? "10px" : "",
                              border:
                                changeAppearanceData?.button_container === true
                                  ? `2px solid ${changeAppearanceData?.socialMediaButtonFontColor}`
                                  : "",
                              padding:
                                changeAppearanceData?.button_container === true ? "10px" : "",
                            }}
                          >
                            <LinksButton
                              obj={obj}
                              changeAppearanceData={changeAppearanceData}
                              handleMouseEnter={handleMouseEnter}
                              isHovered={isHovered}
                              handleMouseLeave={handleMouseLeave}
                              handleButtonClick={handleButtonClick}
                              activeTabPreview={activeTabPreview}
                            />
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              ) : activeTabPreview === "Links" &&
                AllLinks[0]?.items?.length &&
                AllLinks[0]?.items?.length < 5 ? (
                <div className="w-full mt-4">
                  <LinksButton
                    obj={AllLinks[0]}
                    changeAppearanceData={changeAppearanceData}
                    handleMouseEnter={handleMouseEnter}
                    isHovered={isHovered}
                    handleMouseLeave={handleMouseLeave}
                    handleButtonClick={handleButtonClick}
                    activeTabPreview={activeTabPreview}
                  />
                </div>
              ) : (
                socialMedia &&
                socialMedia?.map((obj, index) => {
                  return obj?._id === "social media" ? (
                    <div
                      key={obj?._id}
                      className="w-full mt-4 flex flex-wrap justify-center gap-4 mb-4"
                    >
                      {obj?.items?.map((obj) => {
                        let buttonClass = "";
                        let buttonStyle = {};

                        switch (changeAppearanceData?.selectedButtonSocialMedia) {
                          case "fill-1":
                            buttonClass =
                              "flex items-center mt-2 h-[40px] w-[40px] py-2 text-sm font-medium";
                            buttonStyle = {
                              backgroundColor:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverBg
                                  : changeAppearanceData?.socialMediaButtonColor,
                              color:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverFontColor
                                  : changeAppearanceData?.socialMediaButtonFontColor,
                            };
                            break;

                          case "fill-2":
                            buttonClass =
                              "flex items-center mt-2 h-[40px] w-[40px] py-2 text-sm font-medium rounded-[8px]";
                            buttonStyle = {
                              backgroundColor:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverBg
                                  : changeAppearanceData?.socialMediaButtonColor,
                              color:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverFontColor
                                  : changeAppearanceData?.socialMediaButtonFontColor,
                            };
                            break;

                          case "fill-3":
                            buttonClass =
                              "flex items-center mt-2 h-[40px] w-[40px] py-2 text-sm font-medium rounded-[50px]";
                            buttonStyle = {
                              backgroundColor:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverBg
                                  : changeAppearanceData?.socialMediaButtonColor,
                              color:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverFontColor
                                  : changeAppearanceData?.socialMediaButtonFontColor,
                            };
                            break;

                          case "outline-1":
                            buttonClass =
                              "flex items-center mt-2 h-[40px] w-[40px] py-2 text-sm font-medium transition-all duration-300";
                            buttonStyle = {
                              border:
                                isHovered === obj?._id
                                  ? "2px solid transparent"
                                  : `2px solid ${changeAppearanceData?.socialMediaButtonColor}`,
                              backgroundColor:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverBg
                                  : "transparent",
                              color:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverFontColor
                                  : changeAppearanceData?.socialMediaButtonFontColor,
                            };
                            break;

                          case "outline-2":
                            buttonClass =
                              "flex items-center mt-2 h-[40px] w-[40px] py-2 text-sm font-medium rounded-[8px]";
                            buttonStyle = {
                              border:
                                isHovered === obj?._id
                                  ? "2px solid transparent"
                                  : `2px solid ${changeAppearanceData?.socialMediaButtonColor}`,
                              backgroundColor:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverBg
                                  : "transparent",
                              color:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverFontColor
                                  : changeAppearanceData?.socialMediaButtonFontColor,
                            };
                            break;

                          case "outline-3":
                            buttonClass =
                              "flex items-center mt-2 h-[40px] w-[40px] py-2 text-sm font-medium rounded-[50px]";
                            buttonStyle = {
                              border:
                                isHovered === obj?._id
                                  ? "2px solid transparent"
                                  : `2px solid ${changeAppearanceData?.socialMediaButtonColor}`,
                              backgroundColor:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverBg
                                  : "transparent",
                              color:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverFontColor
                                  : changeAppearanceData?.socialMediaButtonFontColor,
                            };
                            break;

                          case "soft-shadow-1":
                            buttonClass =
                              "flex items-center mt-2 h-[40px] w-[40px] py-2 text-sm font-medium";
                            buttonStyle = {
                              backgroundColor:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverBg
                                  : changeAppearanceData?.socialMediaButtonColor,
                              color:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverFontColor
                                  : changeAppearanceData?.socialMediaButtonFontColor,
                              boxShadow: `0px 4px 6px ${changeAppearanceData?.socialMediaShadowColor}`,
                            };
                            break;

                          case "soft-shadow-2":
                            buttonClass =
                              "flex items-center mt-2 h-[40px] w-[40px] py-2 text-sm font-medium rounded-[8px]";
                            buttonStyle = {
                              backgroundColor:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverBg
                                  : changeAppearanceData?.socialMediaButtonColor,
                              color:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverFontColor
                                  : changeAppearanceData?.socialMediaButtonFontColor,
                              boxShadow: `0px 4px 6px ${changeAppearanceData?.socialMediaShadowColor}`,
                            };
                            break;

                          case "soft-shadow-3":
                            buttonClass =
                              "flex items-center mt-2 h-[40px] w-[40px] py-2 text-sm font-medium rounded-[50px]";
                            buttonStyle = {
                              backgroundColor:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverBg
                                  : changeAppearanceData?.socialMediaButtonColor,
                              color:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverFontColor
                                  : changeAppearanceData?.socialMediaButtonFontColor,
                              boxShadow: `0px 4px 6px ${changeAppearanceData?.socialMediaShadowColor}`,
                            };
                            break;

                          case "hard-shadow-1":
                            buttonClass =
                              "flex items-center mt-2 h-[40px] w-[40px] py-2 text-sm font-medium";
                            buttonStyle = {
                              backgroundColor:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverBg
                                  : changeAppearanceData?.socialMediaButtonColor,
                              color:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverFontColor
                                  : changeAppearanceData?.socialMediaButtonFontColor,
                              boxShadow:
                                isHovered === obj?._id
                                  ? `3px 3px ${changeAppearanceData?.socialMediaShadowColor}`
                                  : `5px 5px ${changeAppearanceData?.socialMediaShadowColor}`,
                            };
                            break;

                          case "hard-shadow-2":
                            buttonClass =
                              "flex items-center mt-2 h-[40px] w-[40px] py-2 text-sm font-medium rounded-[8px]";
                            buttonStyle = {
                              backgroundColor:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverBg
                                  : changeAppearanceData?.socialMediaButtonColor,
                              color:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverFontColor
                                  : changeAppearanceData?.socialMediaButtonFontColor,
                              boxShadow:
                                isHovered === obj?._id
                                  ? `3px 3px ${changeAppearanceData?.socialMediaShadowColor}`
                                  : `5px 5px ${changeAppearanceData?.socialMediaShadowColor}`,
                            };
                            break;

                          case "hard-shadow-3":
                            buttonClass =
                              "flex items-center mt-2 h-[40px] w-[40px] py-2 text-sm font-medium rounded-[50px]";
                            buttonStyle = {
                              backgroundColor:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverBg
                                  : changeAppearanceData?.socialMediaButtonColor,
                              color:
                                isHovered === obj?._id
                                  ? changeAppearanceData?.socialMediaButtonHoverFontColor
                                  : changeAppearanceData?.socialMediaButtonFontColor,
                              boxShadow:
                                isHovered === obj?._id
                                  ? `3px 3px ${changeAppearanceData?.socialMediaShadowColor}`
                                  : `5px 5px ${changeAppearanceData?.socialMediaShadowColor}`,
                            };
                            break;

                          default:
                            return null;
                        }
                        if (obj?.status === true) {
                          return (
                            <div
                              key={obj?._id}
                              className={`flex justify-center items-center cursor-pointer ${buttonClass}`}
                              style={{
                                order: obj?.sort_order,
                                ...(changeAppearanceData?.social_media_show_as_a_button === true
                                  ? buttonStyle
                                  : {}),
                              }}
                              onMouseEnter={() => handleMouseEnter(obj?._id)}
                              onMouseLeave={handleMouseLeave}
                              onClick={() => handleButtonClick(obj?.url, bioData?._id, obj?._id)}
                            >
                              <SvgSection
                                svgContent={obj?.logo}
                                stroke={
                                  changeAppearanceData?.icon_type === "border"
                                    ? isHovered === obj?._id && obj?.widget_name === "social media"
                                      ? changeAppearanceData?.socialMediaButtonHoverFontColor
                                      : changeAppearanceData?.socialMediaButtonFontColor
                                    : "none"
                                }
                                fill={
                                  changeAppearanceData?.icon_type === "fill"
                                    ? isHovered === obj?._id && obj?.widget_name === "social media"
                                      ? changeAppearanceData?.socialMediaButtonHoverFontColor
                                      : changeAppearanceData?.socialMediaButtonFontColor
                                    : "none"
                                }
                                className={`${
                                  obj.widget_name !== "social media" && "rounded-full"
                                } h-8 w-8 flex justify-center items-center`}
                                width="25px"
                                height="25px"
                              />
                            </div>
                          );
                        }
                      })}
                    </div>
                  ) : (
                    <>
                      {obj?.widget_type === "products" || obj?.widget_type === "categories" ? (
                        <div>
                          <ThumbView
                            obj={obj}
                            changeAppearanceData={changeAppearanceData}
                            handleMouseEnter={handleMouseEnter}
                            isHovered={isHovered}
                            handleMouseLeave={handleMouseLeave}
                            handleButtonClick={handleButtonClick}
                          />
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="w-full"
                          style={{
                            borderRadius:
                              changeAppearanceData?.button_container === true ? "10px" : "",
                            border:
                              changeAppearanceData?.button_container === true
                                ? `2px solid ${changeAppearanceData?.socialMediaButtonFontColor}`
                                : "",
                            padding: changeAppearanceData?.button_container === true ? "10px" : "",
                          }}
                        >
                          <LinksButton
                            obj={obj}
                            changeAppearanceData={changeAppearanceData}
                            handleMouseEnter={handleMouseEnter}
                            isHovered={isHovered}
                            handleMouseLeave={handleMouseLeave}
                            handleButtonClick={handleButtonClick}
                            activeTabPreview={activeTabPreview}
                          />
                        </div>
                      )}
                    </>
                  );
                })
              )}
            </div>
            <div className="flex justify-center p-[10px] relative bottom-0">
              <img src="/images/trimmo-black-logo.svg" className="w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewTheme;
