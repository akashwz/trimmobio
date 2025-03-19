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
                        {item?.logo && (
                          <>
                            {item?.widget_name === "social media" ? (
                              <SvgSection
                                svgContent={item?.logo}
                                fill={
                                  isHovered === item?._id && item?.widget_name === "social media"
                                    ? changeAppearanceData?.buttonHoverFontColor
                                    : ""
                                }
                                className={`${
                                  item.widget_name !== "social media" ? "rounded-full" : ""
                                } h-8 w-8 ml-3`}
                                width="30px"
                                height="30px"
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
                        <div className={`w-full p-4 ${textAlign === "center" && "absolute"}`}>
                          <Tooltip title={item?.name}>
                            <h4
                              className={`block whitespace-nowrap overflow-hidden text-ellipsis ${
                                item?.logo && "ml-0"
                              } ${textAlignmentClass}`}
                            >
                              {item?.name}
                            </h4>
                          </Tooltip>
                          {item?.description && (
                            <span className={`block ${item?.logo && "ml-0"} ${textAlignmentClass}`}>
                              {item?.description}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mr-3"></div>
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
