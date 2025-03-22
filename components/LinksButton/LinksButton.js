import { getShopData } from "@/redux/Action/auth.action";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SvgSection from "../SvgSection/SvgSection";
import ThirdPartyController from "../ThirdPartyController/ThirdPartyController";
import ThirdPartyControllerShowAsButton from "../ThirdPartyController/ThirdPartyControllerShowAsButton";
import { Tooltip } from "@mui/material";

const LinksButton = ({
  obj,
  changeAppearanceData,
  handleMouseEnter,
  isHovered,
  handleMouseLeave,
  handleButtonClick,
  activeTabPreview,
}) => {
  const { bioData } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const textAlign = changeAppearanceData?.button_text_align;
  const textAlignmentClass =
    textAlign === "left"
      ? "text-left ml-4"
      : textAlign === "right"
      ? "text-right pr-4"
      : textAlign === "center"
      ? "text-center mx-auto"
      : "text-left ml-4";
  const isOnlyURLType = [
    "youtube",
    "calendly",
    "instagram",
    "rich-texts",
    "video",
    "music",
    "separator",
    "gallery",
    "polls",
  ];

  return (
    <>
      <div className="p-[5px]">
        <>
          {obj?.display_widget_name === true && (
            <h3
              style={{
                color: changeAppearanceData?.username_text_color,
              }}
            >
              {obj?._id}
            </h3>
          )}
          {obj?.items
            ?.slice()
            .filter((item) => item?.status === true)
            .sort((a, b) =>
              obj?.items?.length < 5
                ? a.widget_order - b.widget_order
                : a.sort_order - b.sort_order,
            )
            .map((item, index) => {
              let buttonClass = "";
              let buttonStyle = {};
              const gradiantBefore = `[radial-gradient(circle_at_7px_17px,_white_10px,_black_10px)]`;
              const gradiantAfter = `[radial-gradient(circle_at_7px_-7px,_white_10px,_black_10px)]`;

              const fillColor =
                isHovered === item?._id
                  ? changeAppearanceData?.buttonHoverBg
                  : changeAppearanceData?.buttonColor;

              const svgString = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 235 40" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M178.071 2.92893C179.028 3.8859 180.972 3.88589 181.929 2.92893C183.804 1.05357 186.348 0 189 0C191.652 0 194.196 1.05357 196.071 2.92893C196.821 3.67899 198.179 3.67899 198.929 2.92893C200.804 1.05357 203.348 0 206 0C208.652 0 211.196 1.05357 213.071 2.92893C214.121 3.97855 216.879 3.97854 217.929 2.92893C219.804 1.05357 222.348 0 225 0C227.652 0 230.196 1.05357 232.071 2.92893C233.704 4.56144 234.713 6.70026 234.947 8.97631C234.949 8.98975 234.96 9 234.974 9C234.988 9 235 9.01178 235 9.0263V10V30C235 32.6522 233.946 35.1957 232.071 37.0711C230.196 38.9464 227.652 40 225 40C222.348 40 219.804 38.9464 217.929 37.0711C216.879 36.0215 214.121 36.0215 213.071 37.0711C211.196 38.9464 208.652 40 206 40C203.348 40 200.804 38.9464 198.929 37.0711C198.179 36.321 196.821 36.321 196.071 37.0711C194.196 38.9464 191.652 40 189 40C186.348 40 183.804 38.9464 181.929 37.0711C180.972 36.1141 179.028 36.1141 178.071 37.0711C176.196 38.9464 173.652 40 171 40C168.348 40 165.804 38.9464 163.929 37.0711C162.972 36.1141 161.028 36.1141 160.071 37.0711C158.196 38.9464 155.652 40 153 40C150.348 40 147.804 38.9464 145.929 37.0711C144.972 36.1141 143.028 36.1141 142.071 37.0711C140.196 38.9464 137.652 40 135 40C132.348 40 129.804 38.9464 127.929 37.0711C126.972 36.1141 125.028 36.1141 124.071 37.0711C122.196 38.9464 119.652 40 117 40C114.348 40 111.804 38.9464 109.929 37.0711C108.972 36.1141 107.028 36.1141 106.071 37.0711C104.196 38.9464 101.652 40 99 40C96.3478 40 93.8043 38.9464 91.9289 37.0711C91.1789 36.321 89.8211 36.321 89.0711 37.0711C87.1957 38.9464 84.6522 40 82 40C79.3478 40 76.8043 38.9464 74.9289 37.0711C73.972 36.1141 72.028 36.1141 71.0711 37.0711C69.1957 38.9464 66.6522 40 64 40C61.3478 40 58.8043 38.9464 56.9289 37.0711C55.972 36.1141 54.028 36.1141 53.0711 37.0711C51.1957 38.9464 48.6522 40 46 40C43.3478 40 40.8043 38.9464 38.9289 37.0711C37.972 36.1141 36.028 36.1141 35.0711 37.0711C33.1957 38.9464 30.6522 40 28 40C25.3478 40 22.8043 38.9464 20.9289 37.0711C19.972 36.1141 18.028 36.1141 17.0711 37.0711C15.1957 38.9464 12.6522 40 10 40C7.34784 40 4.8043 38.9464 2.92893 37.0711C1.05357 35.1957 0 32.6522 0 30L0 10L0 9.0263C0 9.01178 0.0117759 9 0.0263021 9C0.0398102 9 0.05112 8.98975 0.0525024 8.97631C0.286656 6.70026 1.29643 4.56144 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.028 3.88589 19.972 3.88589 20.9289 2.92893C22.8043 1.05357 25.3478 0 28 0C30.6522 0 33.1957 1.05357 35.0711 2.92893C36.028 3.8859 37.972 3.8859 38.9289 2.92893C40.8043 1.05357 43.3478 0 46 0C48.6522 0 51.1957 1.05357 53.0711 2.92893C54.028 3.8859 55.972 3.8859 56.9289 2.92893C58.8043 1.05357 61.3478 0 64 0C66.6522 0 69.1957 1.05357 71.0711 2.92893C72.028 3.88589 73.972 3.88589 74.9289 2.92893C76.8043 1.05357 79.3478 0 82 0C84.6522 0 87.1957 1.05357 89.0711 2.92893C89.8211 3.67899 91.1789 3.67899 91.9289 2.92893C93.8043 1.05357 96.3478 0 99 0C101.652 0 104.196 1.05357 106.071 2.92893C107.028 3.88589 108.972 3.88589 109.929 2.92893C111.804 1.05357 114.348 0 117 0C119.652 0 122.196 1.05357 124.071 2.92893C125.028 3.88589 126.972 3.88589 127.929 2.92893C129.804 1.05357 132.348 0 135 0C137.652 0 140.196 1.05357 142.071 2.92893C143.028 3.8859 144.972 3.88589 145.929 2.92893C147.804 1.05357 150.348 0 153 0C155.652 0 158.196 1.05357 160.071 2.92893C161.028 3.8859 162.972 3.88589 163.929 2.92893C165.804 1.05357 168.348 0 171 0C173.652 0 176.196 1.05357 178.071 2.92893Z" fill="${fillColor}"/>
</svg>
            `;

              const encodedSvg = `data:image/svg+xml;base64,${btoa(svgString)}`;

              switch (changeAppearanceData?.selectedButton) {
                case "fill-1":
                  buttonClass = "flex items-center mt-2 w-full h-[50px] py-2 text-sm font-medium";
                  buttonStyle = {
                    backgroundColor:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverBg
                        : changeAppearanceData?.buttonColor,
                    color:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverFontColor
                        : changeAppearanceData?.buttonFontColor,
                  };
                  break;

                case "fill-2":
                  buttonClass =
                    "flex items-center w-full h-[50px] py-2 text-sm font-medium rounded-[8px] hover:bg-gray-200";
                  buttonStyle = {
                    backgroundColor:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverBg
                        : changeAppearanceData?.buttonColor,
                    color:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverFontColor
                        : changeAppearanceData?.buttonFontColor,
                  };
                  break;

                case "fill-3":
                  buttonClass =
                    "flex items-center mt-2 w-full h-[50px] py-2 text-sm font-medium rounded-[50px] hover:bg-gray-200";
                  buttonStyle = {
                    backgroundColor:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverBg
                        : changeAppearanceData?.buttonColor,
                    color:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverFontColor
                        : changeAppearanceData?.buttonFontColor,
                  };
                  break;

                case "outline-1":
                  buttonClass =
                    "flex items-center mt-2 w-full h-[50px] py-2 text-sm font-medium transition-all duration-300";
                  buttonStyle = {
                    border:
                      isHovered === item?._id
                        ? "2px solid transparent"
                        : `2px solid ${changeAppearanceData?.buttonColor}`,
                    backgroundColor:
                      isHovered === item?._id ? changeAppearanceData?.buttonHoverBg : "transparent",
                    color:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverFontColor
                        : changeAppearanceData?.buttonFontColor,
                  };
                  break;

                case "outline-2":
                  buttonClass =
                    "flex items-center mt-2 w-full h-[50px] py-2 text-sm font-medium rounded-[8px]";
                  buttonStyle = {
                    border:
                      isHovered === item?._id
                        ? "2px solid transparent"
                        : `2px solid ${changeAppearanceData?.buttonColor}`,
                    backgroundColor:
                      isHovered === item?._id ? changeAppearanceData?.buttonHoverBg : "transparent",
                    color:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverFontColor
                        : changeAppearanceData?.buttonFontColor,
                  };
                  break;

                case "outline-3":
                  buttonClass =
                    "flex items-center mt-2 w-full h-[50px] py-2 text-sm font-medium rounded-[50px]";
                  buttonStyle = {
                    border:
                      isHovered === item?._id
                        ? "2px solid transparent"
                        : `2px solid ${changeAppearanceData?.buttonColor}`,
                    backgroundColor:
                      isHovered === item?._id ? changeAppearanceData?.buttonHoverBg : "transparent",
                    color:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverFontColor
                        : changeAppearanceData?.buttonFontColor,
                  };
                  break;

                case "soft-shadow-1":
                  buttonClass = "flex items-center mt-2 w-full h-[50px] py-2 text-sm font-medium";
                  buttonStyle = {
                    backgroundColor:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverBg
                        : changeAppearanceData?.buttonColor,
                    color:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverFontColor
                        : changeAppearanceData?.buttonFontColor,
                    boxShadow: `0px 4px 6px ${changeAppearanceData?.shadowColor}`,
                  };
                  break;

                case "soft-shadow-2":
                  buttonClass =
                    "flex items-center mt-2 w-full h-[50px] py-2 text-sm font-medium rounded-[8px]";
                  buttonStyle = {
                    backgroundColor:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverBg
                        : changeAppearanceData?.buttonColor,
                    color:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverFontColor
                        : changeAppearanceData?.buttonFontColor,
                    boxShadow: `0px 4px 6px ${changeAppearanceData?.shadowColor}`,
                  };
                  break;

                case "soft-shadow-3":
                  buttonClass =
                    "flex items-center mt-2 w-full h-[50px] py-2 text-sm font-medium rounded-[50px]";
                  buttonStyle = {
                    backgroundColor:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverBg
                        : changeAppearanceData?.buttonColor,
                    color:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverFontColor
                        : changeAppearanceData?.buttonFontColor,
                    boxShadow: `0px 4px 6px ${changeAppearanceData?.shadowColor}`,
                  };
                  break;

                case "hard-shadow-1":
                  buttonClass = "flex items-center mt-2 w-full h-[50px] py-2 text-sm font-medium";
                  buttonStyle = {
                    backgroundColor:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverBg
                        : changeAppearanceData?.buttonColor,
                    color:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverFontColor
                        : changeAppearanceData?.buttonFontColor,
                    boxShadow:
                      isHovered === item?._id
                        ? `3px 3px ${changeAppearanceData?.shadowColor}`
                        : `5px 5px ${changeAppearanceData?.shadowColor}`,
                  };
                  break;

                case "hard-shadow-2":
                  buttonClass =
                    "flex items-center mt-2 w-full h-[50px] py-2 text-sm font-medium rounded-[8px]";
                  buttonStyle = {
                    backgroundColor:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverBg
                        : changeAppearanceData?.buttonColor,
                    color:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverFontColor
                        : changeAppearanceData?.buttonFontColor,
                    boxShadow:
                      isHovered === item?._id
                        ? `3px 3px ${changeAppearanceData?.shadowColor}`
                        : `5px 5px ${changeAppearanceData?.shadowColor}`,
                  };
                  break;

                case "hard-shadow-3":
                  buttonClass =
                    "flex items-center mt-2 w-full h-[50px] py-2 text-sm font-medium rounded-[50px]";
                  buttonStyle = {
                    backgroundColor:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverBg
                        : changeAppearanceData?.buttonColor,
                    color:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverFontColor
                        : changeAppearanceData?.buttonFontColor,
                    boxShadow:
                      isHovered === item?._id
                        ? `3px 3px ${changeAppearanceData?.shadowColor}`
                        : `5px 5px ${changeAppearanceData?.shadowColor}`,
                  };
                  break;

                case "special-button-1":
                  buttonClass = `flex items-center mt-2 w-full h-[50px] py-2 text-sm font-medium`;
                  buttonStyle = {
                    // backgroundColor:
                    //   isHovered === item?._id
                    //     ? changeAppearanceData?.buttonHoverBg
                    //     : changeAppearanceData?.buttonColor,
                    color:
                      isHovered === item?._id
                        ? changeAppearanceData?.buttonHoverFontColor
                        : changeAppearanceData?.buttonFontColor,
                    backgroundImage: `url(${encodedSvg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                  };
                  break;

                default:
                  return null;
              }

              return (
                <div key={index} className="relative mt-3">
                  {item?.widget_name !== "social media" &&
                  (["classic", "none"].includes(item?.preview_layout) ||
                    item?.layout_setting === 1 ||
                    (item?.preview_layout === "both" && item?.layout_setting === 1)) ? (
                    <ThirdPartyController
                      item={item}
                      buttonStyle={buttonStyle}
                      buttonClass={buttonClass}
                      handleMouseEnter={handleMouseEnter}
                      handleMouseLeave={handleMouseLeave}
                      handleButtonClick={handleButtonClick}
                      bioData={bioData}
                      changeAppearanceData={changeAppearanceData}
                      activeTabPreview={activeTabPreview}
                      textAlign={textAlign}
                      textAlignmentClass={textAlignmentClass}
                    />
                  ) : item?.widget_name !== "social media" && item?.layout_setting === 2 ? (
                    <ThirdPartyControllerShowAsButton
                      item={item}
                      buttonStyle={buttonStyle}
                      buttonClass={buttonClass}
                      handleMouseEnter={handleMouseEnter}
                      handleMouseLeave={handleMouseLeave}
                      handleButtonClick={handleButtonClick}
                      bioData={bioData}
                      changeAppearanceData={changeAppearanceData}
                      activeTabPreview={activeTabPreview}
                      textAlign={textAlign}
                      textAlignmentClass={textAlignmentClass}
                    />
                  ) : (
                    <button
                      className={`${buttonClass} text-left`}
                      style={item?.name === "Rich-Texts" ? "" : buttonStyle}
                      onMouseEnter={() => handleMouseEnter(item?._id)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleButtonClick(item?.url, bioData?._id, item?._id)}
                    >
                      <div className="w-full flex items-center">
                        {/* Render logo */}
                        {item?.logo && (
                          <>
                            {item?.widget_name === "social media" ? (
                              <SvgSection
                                svgContent={obj?.logo}
                                stroke={
                                  changeAppearanceData?.icon_type === "border"
                                    ? isHovered === item?._id &&
                                      item?.widget_name === "social media"
                                      ? changeAppearanceData?.socialMediaButtonHoverFontColor
                                      : changeAppearanceData?.socialMediaButtonFontColor
                                    : "none"
                                }
                                fill={
                                  changeAppearanceData?.icon_type === "fill"
                                    ? isHovered === item?._id &&
                                      item?.widget_name === "social media"
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
                            ) : (
                              <img
                                src={item?.logo}
                                alt={item?.name || "Logo"}
                                className={`${
                                  item.widget_name !== "social media" ? "rounded-full" : ""
                                } h-8 w-8 ml-3`}
                              />
                            )}
                          </>
                        )}

                        {/* Render text and description */}
                        <div
                          className={`w-full p-4 ${textAlign === "center" ? "text-center" : ""}`}
                        >
                          <Tooltip title={item?.name}>
                            <h4
                              className={`block whitespace-nowrap overflow-hidden text-ellipsis ${
                                item?.logo ? "ml-0" : ""
                              } ${textAlignmentClass}`}
                            >
                              {item?.name}
                            </h4>
                          </Tooltip>
                          {item?.description && (
                            <span
                              className={`block ${item?.logo ? "ml-0" : ""} ${textAlignmentClass}`}
                            >
                              {item?.description}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              );
            })}
        </>
      </div>
    </>
  );
};

export default LinksButton;
