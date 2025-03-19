import API from "@/api";
import ToastNotification from "@/controller/ToastNotification";
import { updateApperance } from "@/redux/Action/appearance.action";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Dialog,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CloudUpload, X } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import ColorPicker from "../Color/ColorPicker";

const Background = ({
  selectedImage,
  userData,
  expanded,
  changeAppearanceData,
  setChangeAppearanceData,
  handleChange,
  handlebgSelect,
  isPopupOpen,
  closeSharePopup,
  setShowColorPicker,
  showColorPicker,
  handleCloseColor,
  handleGradiantColorChange,
}) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const threedImages = [
    "https://cdn.trimmo.bio/trimmo_bio/3d-01.webp",
    "https://cdn.trimmo.bio/trimmo_bio/3d-02.webp",
    "https://cdn.trimmo.bio/trimmo_bio/3d-03.webp",
  ];

  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (index) => {
    setLoadedImages((prevState) => ({
      ...prevState,
      [index]: true,
    }));
  };

  useEffect(() => {
    handleImageLoad();
  }, []);

  const AbstractsImages = [
    "https://cdn.trimmo.bio/trimmo_bio/colorful-01.webp",
    "https://cdn.trimmo.bio/trimmo_bio/colorful-02.webp",
    "https://cdn.trimmo.bio/trimmo_bio/colorful-03.webp",
    "https://cdn.trimmo.bio/trimmo_bio/colorful-04.webp",
    "https://cdn.trimmo.bio/trimmo_bio/colorful-05.webp",
    "https://cdn.trimmo.bio/trimmo_bio/colorful-06.webp",
  ];
  const bohoImages = [
    "https://cdn.trimmo.bio/trimmo_bio/boho-01.webp",
    "https://cdn.trimmo.bio/trimmo_bio/boho-02.webp",
    "https://cdn.trimmo.bio/trimmo_bio/boho-03.webp",
    "https://cdn.trimmo.bio/trimmo_bio/boho-04.webp",
    "https://cdn.trimmo.bio/trimmo_bio/boho-05.webp",
  ];
  const comicsImages = [
    "https://cdn.trimmo.bio/trimmo_bio/movie-big-hero.webp",
    "https://cdn.trimmo.bio/trimmo_bio/movie-black-widow.webp",
    "https://cdn.trimmo.bio/trimmo_bio/movie-dumbo.webp",
    "https://cdn.trimmo.bio/trimmo_bio/movie-kung-fu-panda.webp",
    "https://cdn.trimmo.bio/trimmo_bio/movie-spiderman.webp",
    "https://cdn.trimmo.bio/trimmo_bio/movie-the-angry-birds.webp",
    "https://cdn.trimmo.bio/trimmo_bio/movie-the-batman.webp",
  ];

  const handleImageClick = (imagePath) => {
    dispatch(
      updateApperance({
        ...changeAppearanceData,
        bg_image: imagePath,
      }),
    );
    setChangeAppearanceData({
      ...changeAppearanceData,
      bg_image: imagePath,
    });
  };

  const [loader, setLoader] = useState(false);
  const handleImage = async (file) => {
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

    setLoader(true);

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
        dispatch(
          updateApperance({
            ...changeAppearanceData,
            bg_image: apiCall?.data?.data?.url,
          }),
        );
        setChangeAppearanceData((prev) => ({
          ...prev,
          bg_image: apiCall?.data?.data?.url,
        }));

        ToastNotification.success("File uploaded successfully!");
      }
    } catch (error) {
      ToastNotification.error(error?.response?.data?.message || "File upload failed.");
    } finally {
      setLoader(false);
    }
  };

  const removeImage = async () => {
    try {
      const apiCall = await API({
        url: `/bio/delete_file_s3?file_url=${userData?.profile_picture}`,
        method: "delete",
      });
      if (apiCall.status === 200 || apiCall.status === 304) {
        dispatch(updateApperance({ ...changeAppearanceData, bg_image: "" }));
      }
    } catch (error) {
      ToastNotification.error(error);
    }
  };

  const defaultColors = [
    { color: "#ffffff", value: "#ffffff" },
    { color: "#ff0000", value: "#ff0000" },
    { color: "#00ff00", value: "#00ff00" },
    { color: "#0000ff", value: "#0000ff" },
    { color: "#ffff00", value: "#ffff00" },
  ];

  const defaultGradients = [
    {
      fromColor: "#84fab0",
      viaColor: "#ffffff",
      toColor: "#8fd3f4",
      name: "Gradient 1",
    },
    {
      fromColor: "#ff9a9e",
      viaColor: "#fce3e3",
      toColor: "#fad0c4",
      name: "Gradient 2",
    },
    {
      fromColor: "#a18cd1",
      viaColor: "#d8bfea",
      toColor: "#fbc2eb",
      name: "Gradient 3",
    },
    {
      fromColor: "#fbc2eb",
      viaColor: "#c6dbf7",
      toColor: "#a6c1ee",
      name: "Gradient 4",
    },
    {
      fromColor: "#ffecd2",
      viaColor: "#ffe5c1",
      toColor: "#fcb69f",
      name: "Gradient 5",
    },
  ];

  const handleClick = (item) => {
    handleGradiantColorChange(item?.fromColor, item?.viaColor, item?.toColor);
  };

  return (
    <div className="mt-4">
      <Accordion expanded={expanded} onChange={handleChange}>
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
          <Typography
            component="span"
            variant="h6"
            style={{
              fontWeight: 600,
            }}
          >
            Background
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start mt-2">
            <div
              onClick={() => handlebgSelect("flat_colour", "selectedBg")}
              className="w-full sm:w-auto"
            >
              <div
                className={`${
                  changeAppearanceData?.selectedBg === "flat_colour"
                    ? "border-2 border-[#222]"
                    : "border-2 border-transparent"
                } rounded-[8px] p-2 cursor-pointer`}
              >
                <div className="text-center text-sm sm:text-base">Flat Color</div>
              </div>
            </div>

            <div
              onClick={() => handlebgSelect("gradient", "selectedBg")}
              className="w-full sm:w-auto"
            >
              <div
                className={`${
                  changeAppearanceData?.selectedBg === "gradient"
                    ? "border-2 border-[#222]"
                    : "border-2 border-transparent"
                } rounded-[8px] p-2 cursor-pointer`}
              >
                <div className="text-center text-sm sm:text-base">Gradient</div>
              </div>
            </div>
            <div onClick={() => handlebgSelect("image", "selectedBg")} className="w-full sm:w-auto">
              <div
                className={`${
                  changeAppearanceData?.selectedBg === "image"
                    ? "border-2 border-[#222]"
                    : "border-2 border-transparent"
                } rounded-[8px] p-2 cursor-pointer`}
              >
                <div className="text-center text-sm sm:text-base">Image</div>
              </div>
            </div>
          </div>

          {changeAppearanceData?.selectedBg === "flat_colour" ? (
            <div className="relative">
              <div>
                <div className="mt-2">Default color</div>
              </div>
              <div className="flex gap-2 mt-2">
                {defaultColors.map((item, index) => (
                  <div
                    className="rounded-full m-[1px]"
                    key={index}
                    style={{
                      border:
                        changeAppearanceData?.basicColor === item?.color
                          ? "2px solid black"
                          : "2px solid transparent",
                    }}
                  >
                    <div
                      key={index}
                      className={`h-8 w-8 rounded-full border-2 cursor-pointer`}
                      style={{
                        backgroundColor: item.color,
                      }}
                      onClick={() => handlebgSelect(item.color, "basicColor")}
                    ></div>
                  </div>
                ))}
              </div>
              <div>
                <div className="mt-2">Custom color</div>
              </div>
              <div className="flex gap-3 mt-2">
                <div
                  className="w-[35px] shadow h-[35px] rounded-[6px] cursor-pointer"
                  style={{
                    backgroundColor: changeAppearanceData?.basicColor,
                  }}
                  onClick={() => setShowColorPicker("flat_colour")}
                ></div>
                <input
                  type="text"
                  value={changeAppearanceData?.basicColor}
                  onChange={(handleChange = (e) => handlebgSelect(e.target.value, "basicColor"))}
                  className="cursor-pointer flex items-center border main-border-color w-full pl-1 py-[9px] mb-2 rounded-[6px] space-x-2 text-sm font-medium table-text peer"
                  onClick={() => setShowColorPicker("flat_colour")}
                />
              </div>
              {showColorPicker === "flat_colour" && (
                <ColorPicker
                  handleChange={(color) => handlebgSelect(color, "basicColor")}
                  setting={changeAppearanceData?.basicColor}
                  handleCloseColor={handleCloseColor}
                />
              )}
            </div>
          ) : changeAppearanceData?.selectedBg === "gradient" ? (
            <>
              <div className="flex gap-2 mt-2">
                {defaultGradients.map((item, index) => (
                  <div
                    className="rounded-full m-[1px]"
                    key={index}
                    style={{
                      border:
                        changeAppearanceData?.form_color === item?.fromColor &&
                        changeAppearanceData?.via_color === item?.viaColor &&
                        changeAppearanceData?.to_color === item?.toColor
                          ? "2px solid black"
                          : "2px solid transparent",
                    }}
                  >
                    <div
                      key={index}
                      className={`h-8 w-8 rounded-full border-[2px] cursor-pointer`}
                      style={{
                        background: `linear-gradient(to bottom, ${item?.fromColor}, ${item?.viaColor}, ${item?.toColor})`,
                      }}
                      onClick={() => handleClick(item)}
                    ></div>
                  </div>
                ))}
              </div>
              <div>
                <div className="mt-2">Direction</div>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={changeAppearanceData?.value}
                    onChange={(e) => handlebgSelect(e.target.value, "value")}
                  >
                    <FormControlLabel label="Gradient Up" control={<Radio />} value="gradient_up" />
                    <FormControlLabel
                      label="Gradient Down"
                      control={<Radio />}
                      value="gradient_down"
                    />
                    <FormControlLabel
                      label="Gradient Left"
                      control={<Radio />}
                      value="gradient_left"
                    />
                    <FormControlLabel
                      label="Gradient Right"
                      control={<Radio />}
                      value="gradient_right"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="relative">
                  <div>Gradiant From Color</div>
                  <div className="flex gap-3 mt-2">
                    <div
                      className="w-[35px] shadow h-[35px] rounded-[6px] cursor-pointer"
                      style={{
                        backgroundColor: changeAppearanceData?.form_color,
                      }}
                      onClick={() => setShowColorPicker("form_colour")}
                    ></div>
                    <input
                      type="text"
                      value={changeAppearanceData?.form_color}
                      onChange={
                        (handleChange = (e) => handlebgSelect(e.target.value, "form_color"))
                      }
                      className="cursor-pointer flex items-center border main-border-color w-full pl-1 py-[9px] mb-2 rounded-[6px] space-x-2 text-sm font-medium table-text peer"
                      onClick={() => setShowColorPicker("form_colour")}
                    />
                  </div>
                  {showColorPicker === "form_colour" && (
                    <ColorPicker
                      handleChange={(color) => handlebgSelect(color, "form_color")}
                      setting={changeAppearanceData?.form_color}
                      handleCloseColor={handleCloseColor}
                    />
                  )}
                </div>
                <div className="relative">
                  <div>Gradiant Via Color</div>

                  <div className="flex gap-3 mt-2">
                    <div
                      className="w-[35px] shadow h-[35px] rounded-[6px] cursor-pointer"
                      style={{
                        backgroundColor: changeAppearanceData?.via_color,
                      }}
                      onClick={() => setShowColorPicker("via_colour")}
                    ></div>

                    <input
                      type="text"
                      value={changeAppearanceData?.via_color}
                      onChange={(handleChange = (e) => handlebgSelect(e.target.value, "via_color"))}
                      className="cursor-pointer flex items-center border main-border-color w-full pl-1 py-[9px] mb-2 rounded-[6px] space-x-2 text-sm font-medium table-text peer"
                      onClick={() => setShowColorPicker("via_colour")}
                    />
                  </div>
                  {showColorPicker === "via_colour" && (
                    <ColorPicker
                      handleChange={(color) => handlebgSelect(color, "via_color")}
                      setting={changeAppearanceData?.via_color}
                      handleCloseColor={handleCloseColor}
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="relative">
                  <div>Gradiant To Color</div>

                  <div className="flex gap-3 mt-2">
                    <div
                      className="w-[35px] shadow h-[35px] rounded-[6px] cursor-pointer"
                      style={{
                        backgroundColor: changeAppearanceData?.to_color,
                      }}
                      onClick={() => setShowColorPicker("to_colour")}
                    ></div>
                    <input
                      type="text"
                      value={changeAppearanceData?.to_color}
                      onChange={(handleChange = (e) => handlebgSelect(e.target.value, "to_color"))}
                      className="cursor-pointer flex items-center border main-border-color w-full pl-1 py-[9px] mb-2 rounded-[6px] space-x-2 text-sm font-medium table-text peer"
                      onClick={() => setShowColorPicker("to_colour")}
                    />
                  </div>
                  {showColorPicker === "to_colour" && (
                    <ColorPicker
                      handleChange={(color) => handlebgSelect(color, "to_color")}
                      setting={changeAppearanceData?.to_color}
                      handleCloseColor={handleCloseColor}
                    />
                  )}
                </div>
              </div>
            </>
          ) : changeAppearanceData?.selectedBg === "image" ? (
            <>
              <div onClick={() => handlebgSelect("image")} className="w-[210px] mt-4 h-[250px]">
                <div
                  className={`${
                    changeAppearanceData?.selectedBg === "image"
                      ? "border-2 border-[#222]"
                      : "border-2 border-transparent"
                  } rounded-[8px] flex items-center justify-center relative`}
                >
                  {/* {!loader && !userData?.data?.customize_theme?.bg_image ? (
                    <label className="inline-flex file-tag-hover relative flex-col items-center border-dashed border-[2px] w-full h-[120px] justify-center cursor-pointer main-border-color rounded-[6px]">
                      <input
                        id="dropzone-file"
                        type="file"
                        name="image"
                        accept={`image/jpeg, image/png, image/jpg, image/webp, image/svg`}
                        onChange={(e) => {
                          handleImage(e.target.files[0]);
                        }}
                        disabled={loader}
                        className="hidden peer"
                      />
                      <CloudUpload className="w-9 h-9" />
                      <span className="text-sm block font-medium">
                        Click to upload background photo
                      </span>
                    </label>
                  ) : loader ? (
                    <Skeleton
                      className="min-w-full min-h-[200px] max-w-full max-h-[200px]"
                      variant="rounded-[6px]"
                    />
                  ) : (
                    <div className="flex relative items-center h-[200px] w-[200px] justify-center">
                      <img
                        src={userData?.data?.customize_theme?.bg_image}
                        className="max-w-[180px] max-h-[180px]"
                        alt="image"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-0 rounded-tr right-0 z-30 w-[25px] h-[25px] flex items-center justify-center text-red-600 primary-bg-color border-s border-b main-border-color text-xs"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )} */}
                  {userData?.data?.customize_theme?.bg_image ? (
                    <>
                      {["webp", "gif", "jpg", "jpeg", "png"].includes(
                        userData?.data?.customize_theme?.bg_image?.split(".").pop(),
                      ) ? (
                        <img
                          src={
                            userData?.data?.customize_theme?.bg_image
                              ? userData?.data?.customize_theme?.bg_image
                              : "/images/background_image.svg"
                          }
                          alt="Background"
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <video
                          src={userData?.data?.customize_theme?.bg_image}
                          alt="Background"
                          className="w-full h-48 object-cover"
                          autoPlay
                          loop
                          muted
                        />
                      )}
                    </>
                  ) : (
                    <div>No background image selected</div>
                  )}
                </div>
                <div className="text-center mt-2 text-sm sm:text-base">Image</div>
              </div>
              <Dialog
                open={isPopupOpen}
                keepMounted
                onClose={closeSharePopup}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                  sx: {
                    maxWidth: "800px !important",
                    width: "100%",
                    borderRadius: "12px",
                  },
                }}
              >
                <div className="bg-white shadow-lg rounded-lg p-4 z-50">
                  <div className="flex items-center justify-between">
                    <h6>Background image</h6>
                    <Tooltip title="close">
                      <X
                        className="w-7 h-7 cursor-pointer hover:bg-gray-200"
                        onClick={closeSharePopup}
                      />
                    </Tooltip>
                  </div>

                  <Tabs
                    value={value}
                    onChange={handleChangeTab}
                    aria-label="custom tabs example"
                    TabIndicatorProps={{
                      style: { backgroundColor: "#26D367", height: "4px", borderRadius: "2px" },
                    }}
                    sx={{
                      "& .MuiTab-root": {
                        textTransform: "none",
                        color: "#000000",
                        fontSize: "1rem",
                        fontWeight: 500,
                        marginTop: "10px",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        transition: "all 0.3s ease",
                      },
                      "& .MuiTab-root:hover": {
                        backgroundColor: "#e8f5e9",
                      },
                      "& .Mui-selected": {
                        color: "#26d367 !important",
                        backgroundColor: "#e8f5e9",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Tab label="3D" {...a11yProps(0)} />
                    <Tab label="Abstracts" {...a11yProps(1)} />
                    <Tab label="Boho" {...a11yProps(2)} />
                    <Tab label="Comics" {...a11yProps(3)} />
                    <Tab label="Upload image" {...a11yProps(4)} />
                  </Tabs>
                  {value === 0 && (
                    <div className="h-[250px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                      {threedImages?.map((item, index) => {
                        return (
                          <div key={index} className="relative w-full">
                            {!loadedImages[index] && (
                              <div className="absolute flex justify-center items-center inset-0 bg-gray-100 rounded-md">
                                <div className="loader w-6 h-6 border-4 border-gray-300 border-t-[#222] rounded-full animate-spin">
                                  {" "}
                                </div>
                              </div>
                            )}
                            <img
                              src={item}
                              className={`w-full h-auto p-2 rounded-md object-cover cursor-pointer transition-opacity duration-300 ${
                                changeAppearanceData?.bg_image === item
                                  ? "border-2 border-[#222]"
                                  : "border-2 border-transparent"
                              } ${!loadedImages[index] ? "opacity-0" : "opacity-100"}`}
                              alt={`3D ${index + 1}`}
                              onLoad={() => handleImageLoad(index)}
                              onClick={() => handleImageClick(item)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {value === 1 && (
                    <div className="h-[250px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                      {AbstractsImages?.map((item, index) => {
                        return (
                          <div key={index} className="relative w-full">
                            {!loadedImages[index] && (
                              <div className="absolute flex justify-center items-center inset-0 bg-gray-100 rounded-md">
                                <div className="loader w-6 h-6 border-4 border-gray-300 border-t-[#222] rounded-full animate-spin">
                                  {" "}
                                </div>
                              </div>
                            )}
                            <img
                              src={item}
                              className={`w-full h-auto p-2 rounded-md object-cover cursor-pointer transition-opacity duration-300 ${
                                changeAppearanceData?.bg_image === item
                                  ? "border-2 border-[#222]"
                                  : "border-2 border-transparent"
                              } ${!loadedImages[index] ? "opacity-0" : "opacity-100"}`}
                              alt={`Abstract ${index + 1}`}
                              onLoad={() => handleImageLoad(index)}
                              onClick={() => handleImageClick(item)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {value === 2 && (
                    <div className="h-[250px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                      {bohoImages?.map((item, index) => {
                        return (
                          <div key={index} className="relative w-full">
                            {!loadedImages[index] && (
                              <div className="absolute flex justify-center items-center inset-0 bg-gray-100 rounded-md">
                                <div className="loader w-6 h-6 border-4 border-gray-300 border-t-[#222] rounded-full animate-spin">
                                  {" "}
                                </div>
                              </div>
                            )}
                            <img
                              src={item}
                              className={`w-full h-auto p-2 rounded-md object-cover cursor-pointer transition-opacity duration-300 ${
                                changeAppearanceData?.bg_image === item
                                  ? "border-2 border-[#222]"
                                  : "border-2 border-transparent"
                              } ${!loadedImages[index] ? "opacity-0" : "opacity-100"}`}
                              alt={`Boho ${index + 1}`}
                              onLoad={() => handleImageLoad(index)}
                              onClick={() => handleImageClick(item)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {value === 3 && (
                    <div className="h-[250px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                      {comicsImages?.map((item, index) => {
                        return (
                          <div key={index} className="relative w-full">
                            {!loadedImages[index] && (
                              <div className="absolute flex justify-center items-center inset-0 bg-gray-100 rounded-md">
                                <div className="loader w-6 h-6 border-4 border-gray-300 border-t-[#222] rounded-full animate-spin">
                                  {" "}
                                </div>
                              </div>
                            )}
                            <img
                              src={item}
                              className={`w-full h-auto p-2 rounded-md object-cover cursor-pointer transition-opacity duration-300 ${
                                changeAppearanceData?.bg_image === item
                                  ? "border-2 border-[#222]"
                                  : "border-2 border-transparent"
                              } ${!loadedImages[index] ? "opacity-0" : "opacity-100"}`}
                              alt={`Comics ${index + 1}`}
                              onLoad={() => handleImageLoad(index)}
                              onClick={() => handleImageClick(item)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {value === 4 && (
                    <div
                      onClick={() => handlebgSelect("image")}
                      className="w-[210px] mt-4 h-[250px]"
                    >
                      <div
                        className={`${
                          changeAppearanceData?.selectedBg === "image"
                            ? "border-2 border-[#222]"
                            : "border-2 border-transparent"
                        } rounded-[8px] flex items-center justify-center relative`}
                      >
                        {!loader && !userData?.data?.customize_theme?.bg_image ? (
                          <label className="inline-flex file-tag-hover relative flex-col items-center justify-center w-full h-[220px] cursor-pointer rounded-lg  transition-all duration-300">
                            <input
                              id="dropzone-file"
                              type="file"
                              name="image"
                              accept={`image/jpeg, image/png, image/jpg, image/webp, image/svg`}
                              onChange={(e) => {
                                handleImage(e.target.files[0]);
                              }}
                              disabled={loader}
                              className="hidden peer"
                            />
                            <CloudUpload className="w-10 h-10 text-gray-400" />
                            <span className="text-sm block font-medium">
                              Click to upload background photo
                            </span>
                          </label>
                        ) : loader ? (
                          <div className="flex items-center justify-center w-full h-[220px] border border-gray-300 rounded-lg">
                            <CircularProgress color="inherit" size={30} />
                          </div>
                        ) : (
                          <div className="relative flex items-center justify-center w-full h-[220px] border border-gray-300 rounded-lg overflow-hidden">
                            {["webp", "gif", "jpg", "jpeg", "png"].includes(
                              userData?.data?.customize_theme?.bg_image?.split(".").pop(),
                            ) ? (
                              <img
                                src={
                                  userData?.data?.customize_theme?.bg_image
                                    ? userData?.data?.customize_theme?.bg_image
                                    : "/images/background_image.svg"
                                }
                                alt="Background"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <video
                                src={userData?.data?.customize_theme?.bg_image}
                                alt="Background"
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                              />
                            )}
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-300 text-blue-500 hover:bg-blue-100 transition-all duration-200"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="text-center mt-2 text-sm sm:text-base">Image</div>
                    </div>
                  )}
                </div>
              </Dialog>
            </>
          ) : (
            ""
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Background;
