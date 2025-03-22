import React from "react";
import ThirdPartyController from "../ThirdPartyController/ThirdPartyController";
import SvgSection from "../SvgSection/SvgSection";
import { useSelector } from "react-redux";
import LinksButton from "./LinksButton";

const ThumbView = ({
  obj,
  changeAppearanceData,
  handleMouseEnter,
  isHovered,
  handleMouseLeave,
  handleButtonClick,
}) => {
  const { bioData } = useSelector((state) => state.authReducer);
  const isOnlyURLType = ["youtube", "calendly"];
  return (
    <div>
      {obj?.display_type === "thumbnail_view" ? (
        <div className="grid grid-cols-3 gap-2 mb-5">
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
                    "flex items-center mt-2 w-full h-[50px] py-2 text-sm font-medium rounded-[8px] hover:bg-gray-200";
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
                <div key={index} className="relative">
                  {isOnlyURLType?.includes(item?.app_name) && item?.layout_setting === 2 ? (
                    <ThirdPartyController item={item} />
                  ) : (
                    <>
                      <button
                        className={`${buttonClass} text-left flex flex-col h-full`}
                        style={buttonStyle}
                        onMouseEnter={() => handleMouseEnter(item?._id)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleButtonClick(item?.url, bioData?._id, item?._id)}
                      >
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
                                  item.widget_name !== "social media" && "rounded-full"
                                } h-8 w-8 ml-3`}
                              />
                            )}
                          </>
                        )}
                        <div className="w-full">
                          <span
                            className={`w-full block text-${changeAppearanceData?.button_text_align}`}
                          >
                            {item?.name}
                          </span>
                          {item?.description && (
                            <span
                              className={`w-full block text-${changeAppearanceData?.button_text_align}`}
                            >
                              {item?.description}
                            </span>
                          )}
                        </div>
                        <div className="mr-3"></div>
                      </button>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      ) : (
        <LinksButton
          obj={obj}
          changeAppearanceData={changeAppearanceData}
          handleMouseEnter={handleMouseEnter}
          isHovered={isHovered}
          handleMouseLeave={handleMouseLeave}
          handleButtonClick={handleButtonClick}
        />
      )}
    </div>
  );
};

export default ThumbView;
