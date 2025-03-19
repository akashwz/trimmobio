import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Typography,
} from "@mui/material";
import ColorPicker from "../Color/ColorPicker";
import { CloudUpload, Crop, X } from "react-bootstrap-icons";
import { useState } from "react";

const CustomizeTheme = ({
  expandedTheme,
  handleChangeTheme,
  changeAppearanceData,
  setShowColorPicker,
  showColorPicker,
  handleCloseColor,
  handleChangeAppearance,
  loaderCustom,
  handleImageCover,
  removeImageCover,
  removeImageContainer,
  handleImageContainer,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenRedius = () => {
    if (open === false) {
      setOpen(true);
    } else if (open === true) {
      setOpen(false);
    }
  };

  return (
    <div className="mt-5">
      <Accordion expanded={expandedTheme} onChange={handleChangeTheme}>
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
            Profile setting
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div>
              <div>Title color</div>
              <div className="flex gap-3 mt-2">
                <div
                  className="w-[35px] shadow h-[35px] rounded-[6px] cursor-pointer"
                  style={{
                    backgroundColor: changeAppearanceData?.username_text_color,
                  }}
                  onClick={() => setShowColorPicker("username_text_color")}
                ></div>

                <input
                  type="text"
                  value={changeAppearanceData?.username_text_color}
                  onChange={(e) => handleChangeAppearance(e.target.value, "username_text_color")}
                  className="cursor-pointer flex items-center border main-border-color w-full pl-1 py-[9px] rounded-[6px] space-x-2 text-sm font-medium table-text peer"
                  onClick={() => setShowColorPicker("username_text_color")}
                />
              </div>
              {showColorPicker === "username_text_color" && (
                <ColorPicker
                  handleChange={(color) => handleChangeAppearance(color, "username_text_color")}
                  setting={changeAppearanceData?.username_text_color}
                  handleCloseColor={handleCloseColor}
                />
              )}
            </div>
            <div>
              <div>Title size</div>
              <input
                type="number"
                id="text_size"
                name="text_size"
                value={changeAppearanceData?.username_text_size}
                onChange={(e) => handleChangeAppearance(e.target.value, "username_text_size")}
                placeholder="Text size"
                className="w-full mt-2 bg-transparent rounded-md border border-gray-300 focus:border-black focus:ring-0 text-sm outline-none text-gray-700 py-[3px] px-4 leading-8 transition-colors duration-200 ease-in-out peer"
              />
            </div>
          </div>

          <Divider
            style={{
              marginTop: "16px",
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div>
              <div>Text color</div>
              <div className="flex gap-3 mt-2">
                <div
                  className="w-[35px] shadow h-[35px] rounded-[6px] cursor-pointer"
                  style={{
                    backgroundColor: changeAppearanceData?.description_text_color,
                  }}
                  onClick={() => setShowColorPicker("description_text_color")}
                ></div>
                <input
                  type="text"
                  value={changeAppearanceData?.description_text_color}
                  onChange={(e) => handleChangeAppearance(e.target.value, "description_text_color")}
                  className="cursor-pointer flex items-center border main-border-color w-full pl-1 py-[9px] rounded-[6px] space-x-2 text-sm font-medium table-text peer"
                  onClick={() => setShowColorPicker("description_text_color")}
                />
              </div>
              {showColorPicker === "description_text_color" && (
                <ColorPicker
                  handleChange={(color) => handleChangeAppearance(color, "description_text_color")}
                  setting={changeAppearanceData?.description_text_color}
                  handleCloseColor={handleCloseColor}
                />
              )}
            </div>
            <div>
              <div>Text size</div>
              <input
                type="number"
                id="text_size"
                name="text_size"
                value={changeAppearanceData?.description_text_size}
                onChange={(e) => handleChangeAppearance(e.target.value, "description_text_size")}
                placeholder="Text size"
                className="w-full mt-2 bg-transparent rounded-md border border-gray-300 focus:border-black focus:ring-0 text-sm outline-none text-gray-700 py-[3px] px-4 leading-8 transition-colors duration-200 ease-in-out peer"
              />
            </div>
          </div>

          <div>
            <div className="mt-2">Text line height</div>
            <input
              type="number"
              id="text_size"
              name="text_size"
              value={changeAppearanceData?.bio_line_height}
              onChange={(e) => handleChangeAppearance(e.target.value, "bio_line_height")}
              placeholder="Text size"
              className="w-full mt-2 sm:w-[50%] mx-auto bg-transparent rounded-md border border-gray-300 focus:border-black focus:ring-0 text-sm outline-none text-gray-700 py-[3px] px-4 leading-8 transition-colors duration-200 ease-in-out peer"
            />
          </div>
          <Divider
            style={{
              marginTop: "16px",
            }}
          />
          <div>
            <div className="mt-2">Text alignment</div>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={changeAppearanceData?.bio_text_align}
                onChange={(e) => handleChangeAppearance(e.target.value, "bio_text_align")}
              >
                <FormControlLabel
                  label="Left"
                  control={
                    <Radio
                      value="left"
                      sx={{
                        color: "#000000",
                        "&.Mui-checked": {
                          color: "#22c55e",
                        },
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="Center"
                  control={
                    <Radio
                      value="center"
                      sx={{
                        color: "#000000",
                        "&.Mui-checked": {
                          color: "#22c55e",
                        },
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="Right"
                  control={
                    <Radio
                      value="right"
                      sx={{
                        color: "#00000",
                        "&.Mui-checked": {
                          color: "#22c55e",
                        },
                      }}
                    />
                  }
                />
              </RadioGroup>
            </FormControl>
          </div>
          <Divider
            style={{
              marginTop: "4px",
            }}
          />
          <div>
            {/* <div className="flex items-center gap-2">
              <div className="text-lg">Profile radius</div>
              <div className="flex items-center mt-2">
                <input
                  type="number"
                  value={changeAppearanceData?.profile_radius}
                  onChange={(e) => handleChangeAppearance(e.target.value, "profile_radius")}
                  placeholder="Enter value"
                  min={0}
                  max={100}
                  className="w-full bg-transparent rounded-md border border-gray-300 focus:border-black focus:ring-0 text-sm outline-none text-gray-700 py-2 px-4 transition-colors duration-200 ease-in-out peer"
                />
              </div>
              <button className="p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300">
                <Crop className="w-5 h-5" onClick={handleOpenRedius} />
              </button>
            </div> */}

            {open === true && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                {[
                  { label: "Top", key: "profile_radius_top" },
                  { label: "Bottom", key: "profile_radius_bottom" },
                  { label: "Left", key: "profile_radius_left" },
                  { label: "Right", key: "profile_radius_right" },
                ].map((item) => (
                  <div key={item.key} className="flex flex-col">
                    <label>{item.label}</label>
                    <input
                      type="number"
                      value={changeAppearanceData[item.key]}
                      onChange={(e) => handleChangeAppearance(e.target.value, item.key)}
                      placeholder="Enter value"
                      min={0}
                      max={100}
                      className="w-full bg-transparent rounded-md border border-gray-300 focus:border-black focus:ring-0 text-sm outline-none text-gray-700 py-2 px-4 transition-colors duration-200 ease-in-out peer"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* <Divider
            style={{
              marginTop: "16px",
            }}
          /> */}
          <div className="mt-2 text-lg">Avatar setting</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <div className="mt-2">Border width</div>
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="range"
                  id="text_size"
                  name="text_size"
                  value={changeAppearanceData?.profile_border_width}
                  onChange={(e) => handleChangeAppearance(e.target.value, "profile_border_width")}
                  min={0}
                  max={10}
                  className="w-full appearance-none h-2 rounded-full bg-green-200 cursor-pointer accent-green-500 peer"
                />
                <span className="text-sm font-medium text-gray-700">
                  {changeAppearanceData?.profile_border_width}
                </span>
              </div>
            </div>

            <div>
              <div className="mt-2">Border style</div>
              <select
                id="profile_border_style"
                name="profile_border_style"
                value={changeAppearanceData?.profile_border_style}
                onChange={(e) => handleChangeAppearance(e.target.value, "profile_border_style")}
                className="w-full mx-auto bg-transparent rounded-md border border-gray-300 focus:border-black focus:ring-0 text-sm outline-none text-gray-700 py-[10px] px-4 leading-8 transition-colors duration-200 ease-in-out"
              >
                <option value="none">None</option>
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
                <option value="double">Double</option>
                <option value="groove">Groove</option>
                <option value="ridge">Ridge</option>
                <option value="inset">Inset</option>
                <option value="outset">Outset</option>
              </select>
            </div>
            <div>
              <div className="mt-2">Border color</div>
              <div className="flex gap-3">
                <div
                  className="w-[40px] shadow h-[35px] rounded-[6px] cursor-pointer"
                  style={{
                    backgroundColor: changeAppearanceData?.profile_border_color,
                  }}
                  onClick={() => setShowColorPicker("profile_border_color")}
                ></div>
                <input
                  type="text"
                  value={changeAppearanceData?.profile_border_color}
                  onChange={(e) => handleChangeAppearance(e.target.value, "profile_border_color")}
                  className="cursor-pointer flex items-center border main-border-color w-full pl-1 py-[9px] mb-2 rounded-[6px] space-x-2 text-sm font-medium table-text peer"
                  onClick={() => setShowColorPicker("profile_border_color")}
                />
              </div>
              {showColorPicker === "profile_border_color" && (
                <ColorPicker
                  handleChange={(color) => handleChangeAppearance(color, "profile_border_color")}
                  setting={changeAppearanceData?.profile_border_color}
                  handleCloseColor={handleCloseColor}
                />
              )}
            </div>
          </div>
          <Divider
            style={{
              marginTop: "4px",
            }}
          />
          {changeAppearanceData?.cover_image_show === true && (
            <div>
              <div className="mt-2">Cover image</div>
              <div className="flex flex-col items-center sm:flex-row relative input gap-4 mt-2">
                {!loaderCustom && !changeAppearanceData?.cover_image ? (
                  <label className="inline-flex file-tag-hover relative flex-col items-center justify-center w-full h-[220px] cursor-pointer rounded-lg  transition-all duration-300">
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
                    <span className="text-sm block font-medium text-gray-500 mt-2">
                      Click to upload cover image
                    </span>
                  </label>
                ) : loaderCustom ? (
                  <div className="flex items-center justify-center w-full h-[220px] border border-gray-300 rounded-lg">
                    <CircularProgress color="inherit" size={30} />
                  </div>
                ) : (
                  <div className="relative flex items-center justify-center w-full h-[220px] border border-gray-300 rounded-lg overflow-hidden">
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
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={changeAppearanceData?.cover_image}
                        alt="Background"
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                      />
                    )}

                    <button
                      type="button"
                      onClick={removeImageCover}
                      className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-300 text-blue-500 hover:bg-blue-100 transition-all duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {changeAppearanceData?.container_padding && (
            <div>
              <div className="mt-2">Container image</div>
              <div className="flex flex-col items-center sm:flex-row justify-center relative input gap-4">
                {!loaderCustom && !changeAppearanceData?.container_image ? (
                  <label className="inline-flex file-tag-hover relative flex-col items-center border-dashed border-[2px] w-full h-[120px] sm:h-[200px] justify-center cursor-pointer main-border-color rounded-[6px]">
                    <input
                      id="dropzone-file"
                      type="file"
                      name="image"
                      accept="image/jpeg, image/png, image/jpg, image/webp, image/svg"
                      onChange={(e) => handleImageContainer(e.target.files[0])}
                      disabled={loaderCustom}
                      className="hidden peer"
                    />
                    <CloudUpload className="w-9 h-9" />
                    <span className="text-sm block font-medium text-center">
                      Click to upload cover image
                    </span>
                  </label>
                ) : loaderCustom ? (
                  <Skeleton className="w-full h-[200px]" variant="rounded" />
                ) : (
                  <div className="flex relative items-center h-[200px] w-full justify-center border main-border-color rounded-[6px] cursor-pointer">
                    <img
                      src={changeAppearanceData?.container_image}
                      className="max-w-[180px] max-h-[180px] sm:max-w-[340px] w-[340px] sm:max-h-[180px]"
                      alt="Cover Image"
                    />
                    <button
                      type="button"
                      onClick={removeImageContainer}
                      className="absolute top-0 rounded-tr right-0 z-30 w-[25px] h-[25px] flex items-center justify-center text-red-600 primary-bg-color border-s border-b main-border-color text-xs"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CustomizeTheme;
