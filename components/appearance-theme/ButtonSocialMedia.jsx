import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from "@mui/material";
import ColorPicker from "../Color/ColorPicker";

const ButtonSocialMedia = ({
  expandedButtonSocialMedia,
  changeAppearanceData,
  handleChangeButtonSocialMedia,
  showColorPicker,
  setShowColorPicker,
  handleCloseColor,
  handleSocialMediaButton,
}) => {
  return (
    <div className="mt-4">
      <Accordion expanded={expandedButtonSocialMedia} onChange={handleChangeButtonSocialMedia}>
        <AccordionSummary
          expandIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-caret-down"
              viewBox="0 0 16 16"
            >
              <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
            </svg>
          }
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span" variant="h6" style={{ fontWeight: 600 }}>
            Social media setting
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="socialMediaButton"
              checked={changeAppearanceData?.social_media_show_as_a_button}
              onChange={(e) =>
                handleSocialMediaButton(e.target.checked, "social_media_show_as_a_button")
              }
              className="w-5 h-5 accent-green-500 cursor-pointer peer"
            />
            <label
              htmlFor="socialMediaButton"
              className="text-gray-700 text-sm font-medium cursor-pointer"
            >
              Set social media Icon as a button
            </label>
          </div>
          {changeAppearanceData?.social_media_show_as_a_button === true && (
            <div>
              <div className="mt-2">Fill</div>
              <div className="flex flex-wrap gap-2 sm:gap-6 md:gap-8 lg:gap-4">
                <div
                  onClick={() => handleSocialMediaButton("fill-1", "selectedButtonSocialMedia")}
                  className={`${
                    changeAppearanceData?.selectedButtonSocialMedia === "fill-1"
                      ? "border-2 border-[#222]"
                      : "border-2 border-transparent"
                  } rounded-[8px]`}
                >
                  <div className="fill-button-first"></div>
                </div>
                <div
                  onClick={() => handleSocialMediaButton("fill-2", "selectedButtonSocialMedia")}
                  className={`${
                    changeAppearanceData?.selectedButtonSocialMedia === "fill-2"
                      ? "border-2 border-[#222]"
                      : "border-2 border-transparent"
                  } rounded-[8px]`}
                >
                  <div className="fill-button-second"></div>
                </div>
                <div
                  onClick={() => handleSocialMediaButton("fill-3", "selectedButtonSocialMedia")}
                  className={`${
                    changeAppearanceData?.selectedButtonSocialMedia === "fill-3"
                      ? "border-2 border-[#222]"
                      : "border-2 border-transparent"
                  } rounded-[8px]`}
                >
                  <div className="fill-button-third"></div>
                </div>
              </div>
              <div className="mt-2">Outline</div>
              <div className="flex flex-wrap gap-2 sm:gap-6 md:gap-8 lg:gap-4">
                <div
                  onClick={() => handleSocialMediaButton("outline-1", "selectedButtonSocialMedia")}
                  className={`${
                    changeAppearanceData?.selectedButtonSocialMedia === "outline-1"
                      ? "border-2 border-[#222]"
                      : "border-2 border-transparent"
                  } rounded-[8px]`}
                >
                  <div className="outlined-button-first"></div>
                </div>
                <div
                  onClick={() => handleSocialMediaButton("outline-2", "selectedButtonSocialMedia")}
                  className={`${
                    changeAppearanceData?.selectedButtonSocialMedia === "outline-2"
                      ? "border-2 border-[#222]"
                      : "border-2 border-transparent"
                  } rounded-[8px]`}
                >
                  <div className="outlined-button-second"></div>
                </div>
                <div
                  onClick={() => handleSocialMediaButton("outline-3", "selectedButtonSocialMedia")}
                  className={`${
                    changeAppearanceData?.selectedButtonSocialMedia === "outline-3"
                      ? "border-2 border-[#222]"
                      : "border-2 border-transparent"
                  } rounded-[8px]`}
                >
                  <div className="outlined-button-third"></div>
                </div>
              </div>
              <div className="mt-2">Soft shadow</div>
              <div className="flex flex-wrap gap-2 sm:gap-6 md:gap-8 lg:gap-4">
                <div
                  onClick={() =>
                    handleSocialMediaButton("soft-shadow-1", "selectedButtonSocialMedia")
                  }
                  className={`${
                    changeAppearanceData?.selectedButtonSocialMedia === "soft-shadow-1"
                      ? "border-2 border-[#222]"
                      : "border-2 border-transparent"
                  } rounded-[8px]`}
                >
                  <div className="h-[50px] w-[170px] m-[6px] cursor-pointer shadow-lg"></div>
                </div>
                <div
                  onClick={() =>
                    handleSocialMediaButton("soft-shadow-2", "selectedButtonSocialMedia")
                  }
                  className={`${
                    changeAppearanceData?.selectedButtonSocialMedia === "soft-shadow-2"
                      ? "border-2 border-[#222]"
                      : "border-2 border-transparent"
                  } rounded-[8px]`}
                >
                  <div className="h-[50px] w-[170px] rounded-[8px] m-[6px] cursor-pointer shadow-lg"></div>
                </div>
                <div
                  onClick={() =>
                    handleSocialMediaButton("soft-shadow-3", "selectedButtonSocialMedia")
                  }
                  className={`${
                    changeAppearanceData?.selectedButtonSocialMedia === "soft-shadow-3"
                      ? "border-2 border-[#222]"
                      : "border-2 border-transparent"
                  } rounded-[8px]`}
                >
                  <div className="h-[50px] w-[170px] rounded-full m-[6px] cursor-pointer shadow-lg"></div>
                </div>
              </div>
              <div className="mt-2">Hard shadow</div>
              <div className="flex flex-wrap gap-2 sm:gap-6 md:gap-8 lg:gap-4">
                <div
                  onClick={() =>
                    handleSocialMediaButton("hard-shadow-1", "selectedButtonSocialMedia")
                  }
                  className={`${
                    changeAppearanceData?.selectedButtonSocialMedia === "hard-shadow-1"
                      ? "border-2 border-[#222]"
                      : "border-2 border-transparent"
                  } rounded-[8px]`}
                >
                  <div className="h-[50px] w-[170px] border-[1px] border-[#212529] shadow-custom m-[6px] cursor-pointer"></div>
                </div>
                <div
                  onClick={() =>
                    handleSocialMediaButton("hard-shadow-2", "selectedButtonSocialMedia")
                  }
                  className={`${
                    changeAppearanceData?.selectedButtonSocialMedia === "hard-shadow-2"
                      ? "border-2 border-[#222]"
                      : "border-2 border-transparent"
                  } rounded-[8px]`}
                >
                  <div className="h-[50px] w-[170px] border-[1px] border-[#212529] shadow-custom rounded-[8px] m-[6px] cursor-pointer"></div>
                </div>
                <div
                  onClick={() =>
                    handleSocialMediaButton("hard-shadow-3", "selectedButtonSocialMedia")
                  }
                  className={`${
                    changeAppearanceData?.selectedButtonSocialMedia === "hard-shadow-3"
                      ? "border-2 border-[#222]"
                      : "border-2 border-transparent"
                  } rounded-[8px]`}
                >
                  <div className="h-[50px] w-[170px] border-[1px] border-[#212529] shadow-custom rounded-full m-[6px] cursor-pointer"></div>
                </div>
              </div>
              <Divider
                style={{
                  marginTop: "16px",
                }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <div>
                    <div className="mt-2">Button Color</div>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <div
                      className="w-[35px] shadow h-[35px] rounded-[6px] cursor-pointer"
                      style={{
                        backgroundColor: changeAppearanceData?.socialMediaButtonColor,
                      }}
                      onClick={() => setShowColorPicker("social_media_button_color")}
                    ></div>
                    <input
                      type="text"
                      value={changeAppearanceData?.socialMediaButtonColor}
                      onChange={(e) =>
                        handleSocialMediaButton(e.target.value, "socialMediaButtonColor")
                      }
                      className="cursor-pointer flex items-center border main-border-color w-full pl-1 py-[9px] rounded-[6px] space-x-2 text-sm font-medium table-text peer"
                      onClick={() => setShowColorPicker("social_media_button_color")}
                    />
                  </div>
                  {showColorPicker === "social_media_button_color" && (
                    <ColorPicker
                      handleChange={(color) =>
                        handleSocialMediaButton(color, "socialMediaButtonColor")
                      }
                      setting={changeAppearanceData?.socialMediaButtonColor}
                      handleCloseColor={handleCloseColor}
                    />
                  )}
                </div>
                <div className="relative">
                  <div>
                    <div className="mt-2">Button Text Color</div>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <div
                      className="w-[35px] shadow h-[35px] rounded-[6px] cursor-pointer"
                      style={{
                        backgroundColor: changeAppearanceData?.socialMediaButtonFontColor,
                      }}
                      onClick={() => setShowColorPicker("social_media_button_font_color")}
                    ></div>

                    <input
                      type="text"
                      value={changeAppearanceData?.socialMediaButtonFontColor}
                      onChange={(e) =>
                        handleSocialMediaButton(e.target.value, "socialMediaButtonFontColor")
                      }
                      className="cursor-pointer flex items-center border main-border-color w-full pl-1 py-[9px] rounded-[6px] space-x-2 text-sm font-medium table-text peer"
                      onClick={() => setShowColorPicker("social_media_button_font_color")}
                    />
                  </div>
                  {showColorPicker === "social_media_button_font_color" && (
                    <ColorPicker
                      handleChange={(color) =>
                        handleSocialMediaButton(color, "socialMediaButtonFontColor")
                      }
                      setting={changeAppearanceData?.socialMediaButtonFontColor}
                      handleCloseColor={handleCloseColor}
                    />
                  )}
                </div>
              </div>

              {changeAppearanceData?.selectedButtonSocialMedia === "soft-shadow-1" ||
              changeAppearanceData?.selectedButtonSocialMedia === "soft-shadow-2" ||
              changeAppearanceData?.selectedButtonSocialMedia === "soft-shadow-3" ||
              changeAppearanceData?.selectedButtonSocialMedia === "outline-1" ||
              changeAppearanceData?.selectedButtonSocialMedia === "outline-2" ||
              changeAppearanceData?.selectedButtonSocialMedia === "outline-3" ||
              changeAppearanceData?.selectedButtonSocialMedia === "fill-1" ||
              changeAppearanceData?.selectedButtonSocialMedia === "fill-2" ||
              changeAppearanceData?.selectedButtonSocialMedia === "fill-3" ||
              changeAppearanceData?.selectedButtonSocialMedia === "hard-shadow-1" ||
              changeAppearanceData?.selectedButtonSocialMedia === "hard-shadow-2" ||
              changeAppearanceData?.selectedButtonSocialMedia === "hard-shadow-3" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="relative">
                    <div>Button Hover Background Color</div>

                    <div className="flex gap-3 mt-2">
                      <div
                        className="w-[35px] shadow h-[35px] rounded-[6px] cursor-pointer"
                        style={{
                          backgroundColor: changeAppearanceData?.socialMediaButtonHoverBg,
                        }}
                        onClick={() => setShowColorPicker("social_media_button_hover_bg")}
                      ></div>
                      <input
                        type="text"
                        value={changeAppearanceData?.socialMediaButtonHoverBg}
                        onChange={(e) =>
                          handleSocialMediaButton(e.target.value, "socialMediaButtonHoverBg")
                        }
                        className="cursor-pointer flex items-center border main-border-color w-full pl-1 py-[9px] rounded-[6px] space-x-2 text-sm font-medium table-text peer"
                        onClick={() => setShowColorPicker("social_media_button_hover_bg")}
                      />
                    </div>
                    {showColorPicker === "social_media_button_hover_bg" && (
                      <ColorPicker
                        handleChange={(color) =>
                          handleSocialMediaButton(color, "socialMediaButtonHoverBg")
                        }
                        setting={changeAppearanceData?.socialMediaButtonHoverBg}
                        handleCloseColor={handleCloseColor}
                      />
                    )}
                  </div>
                  <div className="relative">
                    <div>Button Hover Text Color</div>

                    <div className="flex gap-3 mt-2">
                      <div
                        className="w-[35px] shadow h-[35px] rounded-[6px] cursor-pointer"
                        style={{
                          backgroundColor: changeAppearanceData?.socialMediaButtonHoverFontColor,
                        }}
                        onClick={() => setShowColorPicker("social_media_button_hover_font_color")}
                      ></div>
                      <input
                        type="text"
                        value={changeAppearanceData?.socialMediaButtonHoverFontColor}
                        onChange={(e) =>
                          handleSocialMediaButton(e.target.value, "socialMediaButtonHoverFontColor")
                        }
                        className="cursor-pointer flex items-center border main-border-color w-full pl-1 py-[9px] rounded-[6px] space-x-2 text-sm font-medium table-text peer"
                        onClick={() => setShowColorPicker("social_media_button_hover_font_color")}
                      />
                    </div>
                    {showColorPicker === "social_media_button_hover_font_color" && (
                      <ColorPicker
                        handleChange={(color) =>
                          handleSocialMediaButton(color, "socialMediaButtonHoverFontColor")
                        }
                        setting={changeAppearanceData?.socialMediaButtonHoverFontColor}
                        handleCloseColor={handleCloseColor}
                      />
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}

              {changeAppearanceData?.selectedButtonSocialMedia === "hard-shadow-1" ||
              changeAppearanceData?.selectedButtonSocialMedia === "hard-shadow-2" ||
              changeAppearanceData?.selectedButtonSocialMedia === "hard-shadow-3" ||
              changeAppearanceData?.selectedButtonSocialMedia === "soft-shadow-1" ||
              changeAppearanceData?.selectedButtonSocialMedia === "soft-shadow-2" ||
              changeAppearanceData?.selectedButtonSocialMedia === "soft-shadow-3" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <div>Shadow Color</div>

                    <div className="flex gap-3 mt-2">
                      <div
                        className="w-[35px] shadow h-[35px] rounded-[6px] cursor-pointer"
                        style={{
                          backgroundColor: changeAppearanceData?.socialMediaShadowColor,
                        }}
                        onClick={() => setShowColorPicker("social_media_shadow_color")}
                      ></div>
                      <input
                        type="text"
                        value={changeAppearanceData?.socialMediaShadowColor}
                        onChange={(e) =>
                          handleSocialMediaButton(e.target.value, "socialMediaShadowColor")
                        }
                        className="cursor-pointer flex items-center border main-border-color w-full pl-1 py-[9px] mb-2 rounded-[6px] space-x-2 text-sm font-medium table-text peer"
                        onClick={() => setShowColorPicker("social_media_shadow_color")}
                      />
                    </div>
                    {showColorPicker === "social_media_shadow_color" && (
                      <ColorPicker
                        handleChange={(color) =>
                          handleSocialMediaButton(color, "socialMediaShadowColor")
                        }
                        setting={changeAppearanceData?.socialMediaShadowColor}
                        handleCloseColor={handleCloseColor}
                      />
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ButtonSocialMedia;
