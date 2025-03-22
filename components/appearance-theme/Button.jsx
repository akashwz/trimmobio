import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import ColorPicker from "../Color/ColorPicker";
import { useSelector } from "react-redux";

const Button = ({
  expandedButton,
  changeAppearanceData,
  handleChangeButton,
  showColorPicker,
  setShowColorPicker,
  handleCloseColor,
  handleChangeButtonAlignment,
}) => {
  const { appreance } = useSelector((state) => state?.appreanceReducer);

  return (
    <div className="mt-4">
      <Accordion expanded={expandedButton} onChange={handleChangeButton}>
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
            Buttons
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div>
              <div className="mt-2">Button text align</div>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={changeAppearanceData?.button_text_align}
                  onChange={(e) => handleChangeButtonAlignment(e.target.value, "button_text_align")}
                >
                  <FormControlLabel
                    label="Left"
                    control={
                      <Radio
                        sx={{
                          color: "#000000",
                          "&.Mui-checked": {
                            color: "#22c55e",
                          },
                        }}
                      />
                    }
                    value="left"
                  />
                  <FormControlLabel
                    label="Center"
                    control={
                      <Radio
                        sx={{
                          color: "#000000",
                          "&.Mui-checked": {
                            color: "#22c55e",
                          },
                        }}
                      />
                    }
                    value="center"
                  />
                  <FormControlLabel
                    label="Right"
                    control={
                      <Radio
                        sx={{
                          color: "#000000",
                          "&.Mui-checked": {
                            color: "#22c55e",
                          },
                        }}
                      />
                    }
                    value="right"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <Divider
              style={{
                marginTop: "4px",
              }}
            />
            <div className="mt-2">Fill</div>
            <div className="flex flex-wrap gap-2 sm:gap-6 md:gap-8 lg:gap-4">
              <div
                onClick={() => handleChangeButtonAlignment("fill-1", "selectedButton")}
                className={`${
                  changeAppearanceData?.selectedButton === "fill-1"
                    ? "border-2 border-[#222]"
                    : "border-2 border-transparent"
                } rounded-[8px]`}
              >
                <div className="fill-button-first"></div>
              </div>
              <div
                onClick={() => handleChangeButtonAlignment("fill-2", "selectedButton")}
                className={`${
                  changeAppearanceData?.selectedButton === "fill-2"
                    ? "border-2 border-[#222]"
                    : "border-2 border-transparent"
                } rounded-[8px]`}
              >
                <div className="fill-button-second"></div>
              </div>
              <div
                onClick={() => handleChangeButtonAlignment("fill-3", "selectedButton")}
                className={`${
                  changeAppearanceData?.selectedButton === "fill-3"
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
                onClick={() => handleChangeButtonAlignment("outline-1", "selectedButton")}
                className={`${
                  changeAppearanceData?.selectedButton === "outline-1"
                    ? "border-2 border-[#222]"
                    : "border-2 border-transparent"
                } rounded-[8px]`}
              >
                <div className="outlined-button-first"></div>
              </div>
              <div
                onClick={() => handleChangeButtonAlignment("outline-2", "selectedButton")}
                className={`${
                  changeAppearanceData?.selectedButton === "outline-2"
                    ? "border-2 border-[#222]"
                    : "border-2 border-transparent"
                } rounded-[8px]`}
              >
                <div className="outlined-button-second"></div>
              </div>
              <div
                onClick={() => handleChangeButtonAlignment("outline-3", "selectedButton")}
                className={`${
                  changeAppearanceData?.selectedButton === "outline-3"
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
                onClick={() => handleChangeButtonAlignment("soft-shadow-1", "selectedButton")}
                className={`${
                  changeAppearanceData?.selectedButton === "soft-shadow-1"
                    ? "border-2 border-[#222]"
                    : "border-2 border-transparent"
                } rounded-[8px]`}
              >
                <div className="h-[50px] w-[170px] m-[6px] cursor-pointer shadow-lg"></div>
              </div>
              <div
                onClick={() => handleChangeButtonAlignment("soft-shadow-2", "selectedButton")}
                className={`${
                  changeAppearanceData?.selectedButton === "soft-shadow-2"
                    ? "border-2 border-[#222]"
                    : "border-2 border-transparent"
                } rounded-[8px]`}
              >
                <div className="h-[50px] w-[170px] rounded-[8px] m-[6px] cursor-pointer shadow-lg"></div>
              </div>
              <div
                onClick={() => handleChangeButtonAlignment("soft-shadow-3", "selectedButton")}
                className={`${
                  changeAppearanceData?.selectedButton === "soft-shadow-3"
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
                onClick={() => handleChangeButtonAlignment("hard-shadow-1", "selectedButton")}
                className={`${
                  changeAppearanceData?.selectedButton === "hard-shadow-1"
                    ? "border-2 border-[#222]"
                    : "border-2 border-transparent"
                } rounded-[8px]`}
              >
                <div className="h-[50px] w-[170px] border-[1px] border-[#212529] shadow-custom m-[6px] cursor-pointer"></div>
              </div>
              <div
                onClick={() => handleChangeButtonAlignment("hard-shadow-2", "selectedButton")}
                className={`${
                  changeAppearanceData?.selectedButton === "hard-shadow-2"
                    ? "border-2 border-[#222]"
                    : "border-2 border-transparent"
                } rounded-[8px]`}
              >
                <div className="h-[50px] w-[170px] border-[1px] border-[#212529] shadow-custom rounded-[8px] m-[6px] cursor-pointer"></div>
              </div>
              <div
                onClick={() => handleChangeButtonAlignment("hard-shadow-3", "selectedButton")}
                className={`${
                  changeAppearanceData?.selectedButton === "hard-shadow-3"
                    ? "border-2 border-[#222]"
                    : "border-2 border-transparent"
                } rounded-[8px]`}
              >
                <div className="h-[50px] w-[170px] border-[1px] border-[#212529] shadow-custom rounded-full m-[6px] cursor-pointer"></div>
              </div>
            </div>

            {/* <div className="mt-2">Special</div>
            <div className="flex flex-wrap mt-2 gap-2 sm:gap-6 md:gap-8 lg:gap-4">
              <div
                className={`${
                  changeAppearanceData?.selectedButton === "special-button-1"
                    ? "border-2 border-[#222]"
                    : "border-2 border-transparent"
                } p-1`}
                onClick={() => handleChangeButtonAlignment("special-button-1", "selectedButton")}
              >
                <button className="wavy-button h-[50px] w-[180px] bg-black"></button>
              </div>
            </div> */}

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
                      backgroundColor: changeAppearanceData?.buttonColor,
                    }}
                    onClick={() => setShowColorPicker("button_color")}
                  ></div>
                  <input
                    type="text"
                    value={changeAppearanceData?.buttonColor}
                    onChange={(e) => handleChangeButtonAlignment(e.target.value, "buttonColor")}
                    className="cursor-pointer flex items-center border main-border-color w-full pl-1 py-[9px] rounded-[6px] space-x-2 text-sm font-medium table-text peer"
                    onClick={() => setShowColorPicker("button_color")}
                  />
                </div>
                {showColorPicker === "button_color" && (
                  <ColorPicker
                    handleChange={(color) => handleChangeButtonAlignment(color, "buttonColor")}
                    setting={changeAppearanceData?.buttonColor}
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
                      backgroundColor: changeAppearanceData?.buttonFontColor,
                    }}
                    onClick={() => setShowColorPicker("button_font_color")}
                  ></div>

                  <input
                    type="text"
                    value={changeAppearanceData?.buttonFontColor}
                    onChange={(e) => handleChangeButtonAlignment(e.target.value, "buttonFontColor")}
                    className="cursor-pointer flex items-center border main-border-color w-full pl-1 py-[9px] rounded-[6px] space-x-2 text-sm font-medium table-text peer"
                    onClick={() => setShowColorPicker("button_font_color")}
                  />
                </div>
                {showColorPicker === "button_font_color" && (
                  <ColorPicker
                    handleChange={(color) => handleChangeButtonAlignment(color, "buttonFontColor")}
                    setting={changeAppearanceData?.buttonFontColor}
                    handleCloseColor={handleCloseColor}
                  />
                )}
              </div>
            </div>

            {changeAppearanceData?.selectedButton === "soft-shadow-1" ||
            changeAppearanceData?.selectedButton === "soft-shadow-2" ||
            changeAppearanceData?.selectedButton === "soft-shadow-3" ||
            changeAppearanceData?.selectedButton === "outline-1" ||
            changeAppearanceData?.selectedButton === "outline-2" ||
            changeAppearanceData?.selectedButton === "outline-3" ||
            changeAppearanceData?.selectedButton === "fill-1" ||
            changeAppearanceData?.selectedButton === "fill-2" ||
            changeAppearanceData?.selectedButton === "fill-3" ||
            changeAppearanceData?.selectedButton === "hard-shadow-1" ||
            changeAppearanceData?.selectedButton === "hard-shadow-2" ||
            changeAppearanceData?.selectedButton === "hard-shadow-3" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="relative">
                  <div>Button Hover Background Color</div>

                  <div className="flex gap-3 mt-2">
                    <div
                      className="w-[35px] shadow h-[35px] rounded-[6px] cursor-pointer"
                      style={{
                        backgroundColor: changeAppearanceData?.buttonHoverBg,
                      }}
                      onClick={() => setShowColorPicker("button_hover_bg")}
                    ></div>
                    <input
                      type="text"
                      value={changeAppearanceData?.buttonHoverBg}
                      onChange={(e) => handleChangeButtonAlignment(e.target.value, "buttonHoverBg")}
                      className="cursor-pointer flex items-center border main-border-color w-full pl-1 py-[9px] rounded-[6px] space-x-2 text-sm font-medium table-text peer"
                      onClick={() => setShowColorPicker("button_hover_bg")}
                    />
                  </div>
                  {showColorPicker === "button_hover_bg" && (
                    <ColorPicker
                      handleChange={(color) => handleChangeButtonAlignment(color, "buttonHoverBg")}
                      setting={changeAppearanceData?.buttonHoverBg}
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
                        backgroundColor: changeAppearanceData?.buttonHoverFontColor,
                      }}
                      onClick={() => setShowColorPicker("button_hover_font_color")}
                    ></div>
                    <input
                      type="text"
                      value={changeAppearanceData?.buttonHoverFontColor}
                      onChange={(e) =>
                        handleChangeButtonAlignment(e.target.value, "buttonHoverFontColor")
                      }
                      className="cursor-pointer flex items-center border main-border-color w-full pl-1 py-[9px] rounded-[6px] space-x-2 text-sm font-medium table-text peer"
                      onClick={() => setShowColorPicker("button_hover_font_color")}
                    />
                  </div>
                  {showColorPicker === "button_hover_font_color" && (
                    <ColorPicker
                      handleChange={(color) =>
                        handleChangeButtonAlignment(color, "buttonHoverFontColor")
                      }
                      setting={changeAppearanceData?.buttonHoverFontColor}
                      handleCloseColor={handleCloseColor}
                    />
                  )}
                </div>
              </div>
            ) : (
              ""
            )}

            {changeAppearanceData?.selectedButton === "hard-shadow-1" ||
            changeAppearanceData?.selectedButton === "hard-shadow-2" ||
            changeAppearanceData?.selectedButton === "hard-shadow-3" ||
            changeAppearanceData?.selectedButton === "soft-shadow-1" ||
            changeAppearanceData?.selectedButton === "soft-shadow-2" ||
            changeAppearanceData?.selectedButton === "soft-shadow-3" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <div>Shadow Color</div>

                  <div className="flex gap-3 mt-2">
                    <div
                      className="w-[35px] shadow h-[35px] rounded-[6px] cursor-pointer"
                      style={{
                        backgroundColor: changeAppearanceData?.shadowColor,
                      }}
                      onClick={() => setShowColorPicker("shadow_color")}
                    ></div>
                    <input
                      type="text"
                      value={changeAppearanceData?.shadowColor}
                      onChange={(e) => handleChangeButtonAlignment(e.target.value, "shadowColor")}
                      className="cursor-pointer flex items-center border main-border-color w-full pl-1 py-[9px] mb-2 rounded-[6px] space-x-2 text-sm font-medium table-text peer"
                      onClick={() => setShowColorPicker("shadow_color")}
                    />
                  </div>
                  {showColorPicker === "shadow_color" && (
                    <ColorPicker
                      handleChange={(color) => handleChangeButtonAlignment(color, "shadowColor")}
                      setting={changeAppearanceData?.shadowColor}
                      handleCloseColor={handleCloseColor}
                    />
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Button;
