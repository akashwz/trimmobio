import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CloudUpload, Code } from "react-bootstrap-icons";
import PollsFormComponent from "../PollsFormComponent/PollsFormComponent";
import ToastNotification from "@/controller/ToastNotification";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import SeparatorFormComponent from "../SeparatorFormComponent/SeparatorFormComponent";
import DigitalDownloadsComponent from "../DigitalDownloadsComponent/DigitalDownloadsComponent";
import FaceBookComponent from "../FaceBookComponent/FaceBookComponent";
import GitHubComponent from "../GitHubComponent/GitHubComponent";
import DiscountCodeComponent from "../DiscountCodeComponent/DiscountCodeComponent";
import MobileAppComponent from "../MobileAppComponent/MobileAppComponent";
import FaqComponent from "../FaqComponent/FaqComponent";
import NewsLetterSection from "../NewsLetterSection/NewsLetterSection";

const AppSwitchCaseController = ({
  appPlaceholderData,
  loader,
  handleDefaultImageUpload,
  removeDefaultImage,
  addDefaultApp,
  setAddDefaultApp,
  saveDefaultApp,
}) => {
  const [error, setError] = useState(false);
  const renderInputField = () => {
    switch (appPlaceholderData?.name?.toLowerCase()) {
      case "rich-texts":
        return (
          <div className="mb-4">
            <RichTextEditor setAddDefaultApp={setAddDefaultApp} />
          </div>
        );
      case "polls":
        return (
          <div className="mb-4">
            <PollsFormComponent setAddDefaultApp={setAddDefaultApp} />
          </div>
        );
      // case "instagram":
      //   return (
      //     <div className="inline-flex file-tag-hover relative flex-col mt-4 mb-2 items-center border-solid border-[2px] w-full h-[40px] justify-center cursor-pointer main-border-color rounded-[6px]">
      //       <input
      //         type="url"
      //         className="w-full text-gray-400 placeholder-gray-400 outline-none h-[40px] pl-2"
      //         placeholder={appPlaceholderData?.placeholder}
      //         value={addDefaultApp?.username}
      //         onChange={(e) => {
      //           setAddDefaultApp({
      //             ...addDefaultApp,
      //             url: appPlaceholderData?.initUrl + e.target.value,
      //           });
      //         }}
      //       />
      //     </div>
      //   );

      case "separator":
        return (
          <div className="mb-4">
            <SeparatorFormComponent setAddDefaultApp={setAddDefaultApp} />
          </div>
        );

      case "trustpilot review":
        return (
          <>
            <label className="text-left w-full flex items-center mb-1">
              Enter URL&nbsp;
              <div
                className="cursor-pointer"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.open(
                      addDefaultApp?.name === "Trustpilot Review"
                        ? "https://www.trustpilot.com/"
                        : "",
                      "_blank",
                    );
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-up-right-square"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707z"
                  />
                </svg>
              </div>
            </label>
            <input
              type="url"
              className="w-full mb-2 bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
              placeholder={appPlaceholderData?.placeholder}
              value={addDefaultApp?.username}
              onChange={(e) => {
                setAddDefaultApp({
                  ...addDefaultApp,
                  url: appPlaceholderData?.initUrl + e.target.value,
                });
              }}
            />
          </>
        );

      case "digital downloads":
        return (
          <div className="mb-4">
            <DigitalDownloadsComponent setAddDefaultApp={setAddDefaultApp} />
          </div>
        );

      case "facebook":
        return (
          <div className="mb-4">
            <FaceBookComponent setAddDefaultApp={setAddDefaultApp} />
          </div>
        );

      case "github repo list":
        return (
          <div className="mb-4">
            <GitHubComponent setAddDefaultApp={setAddDefaultApp} />
          </div>
        );
      case "discount code":
        return (
          <div className="mb-4">
            <DiscountCodeComponent setAddDefaultApp={setAddDefaultApp} />
          </div>
        );
      case "mobile app":
        return (
          <div className="mb-4">
            <MobileAppComponent setAddDefaultApp={setAddDefaultApp} />
          </div>
        );
      case "faqs":
        return (
          <div className="mb-4">
            <FaqComponent setAddDefaultApp={setAddDefaultApp} />
          </div>
        );

      case "newsletter":
        return <NewsLetterSection setAddDefaultApp={setAddDefaultApp} />;

      default:
        return "";
    }
  };

  const getAcceptedFileTypes = () => {
    switch (appPlaceholderData?.name?.toLowerCase()) {
      case "video":
        return "video/mp4, video/avi, video/mov, video/mkv";
      case "music":
        return "audio/mpeg, audio/wav, audio/ogg, audio/aac";
      case "gallery":
        return "image/jpeg, image/png, image/jpg, image/webp";
      default:
        return "";
    }
  };
  const isMediaType = ["video", "music", "gallery"].includes(
    appPlaceholderData?.name?.toLowerCase(),
  );

  const isOnlyURLType = [
    "calendly",
    "youtube",
    "vimeo",
    "spotify",
    "soundcloud",
    "topmate",
  ].includes(appPlaceholderData?.name?.toLowerCase());

  const handleURLChange = (e) => {
    let value = e.target.value.trim();
    const urlPattern = /^https:\/\/[^\s/$.?#].[^\s]*$/;
    if (value && !urlPattern.test(value)) {
      setError(true);
    } else {
      setError(false);
    }
    setAddDefaultApp({ ...addDefaultApp, url: value });
  };

  useEffect(() => {
    setAddDefaultApp({ ...addDefaultApp, name: appPlaceholderData?.name });
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow-md border border-gray-200 p-4 mt-4 duration-300 transition-transform">
      <div className="flex items-center justify-center">
        <p className="font-bold capitalize">Add {appPlaceholderData?.name}</p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="w-full flex items-center">
          <div className="w-full">
            {isMediaType && (
              <>
                <div className="mb-4 flex items-center justify-center relative input">
                  {!loader && (!addDefaultApp?.url || addDefaultApp?.url?.length === 0) ? (
                    <label className="inline-flex file-tag-hover relative flex-col items-center border-dashed border-[2px] w-full h-[120px] justify-center cursor-pointer main-border-color rounded-[6px]">
                      <input
                        id="dropzone-file"
                        type="file"
                        name="file"
                        accept={getAcceptedFileTypes()}
                        onChange={(e) => handleDefaultImageUpload(e.target.files)}
                        disabled={loader}
                        className="hidden peer"
                        multiple={appPlaceholderData?.name?.toLowerCase() === "gallery"} // Allow multiple only for gallery
                      />
                      <CloudUpload className="w-9 h-9" />
                      <span className="text-sm block font-medium">
                        Click to upload {appPlaceholderData?.name}
                      </span>
                    </label>
                  ) : loader ? (
                    <Skeleton className="min-h-[100px] w-[100px]" variant="rounded-[6px]" />
                  ) : (
                    <div className="flex flex-wrap gap-2 items-center justify-center">
                      {appPlaceholderData?.name?.toLowerCase() === "gallery" &&
                      Array.isArray(addDefaultApp?.url.split(",")) ? (
                        addDefaultApp?.url.split(",").map((imageUrl, index) => (
                          <div key={index} className="relative">
                            <img
                              src={imageUrl.trim()}
                              className="max-w-[100px] max-h-[100px] rounded-[6px] border main-border-color"
                              alt={`Uploaded image ${index + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updatedUrls = addDefaultApp.url
                                  .split(",")
                                  .filter((_, i) => i !== index)
                                  .join(",");

                                setAddDefaultApp({ ...addDefaultApp, url: updatedUrls });
                              }}
                              className="absolute top-0 right-0 bg-red-500 text-white w-[20px] h-[20px] flex items-center justify-center rounded-full text-xs"
                            >
                              ✖
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="flex relative items-center h-[200px] w-[200px] justify-center border main-border-color rounded-[6px] cursor-pointer">
                          {appPlaceholderData?.name?.toLowerCase() === "video" ? (
                            <video className="max-w-[200px] max-h-[200px]" controls>
                              <source src={addDefaultApp?.url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : appPlaceholderData?.name?.toLowerCase() === "music" ? (
                            <audio controls className="w-full">
                              <source src={addDefaultApp?.url} type="audio/mpeg" />
                              Your browser does not support the audio element.
                            </audio>
                          ) : (
                            <img
                              src={addDefaultApp?.url}
                              className="max-w-[200px] max-h-[200px]"
                              alt="Uploaded media"
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => removeDefaultImage()}
                            className="absolute top-0 rounded-tr right-0 z-30 w-[25px] h-[25px] flex items-center justify-center text-red-600 primary-bg-color border-s border-b main-border-color text-xs"
                          >
                            ✖
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <span className="flex items-center justify-center capitalize">OR</span>
                <div className="inline-flex file-tag-hover relative flex-col mt-2 mb-2 items-center w-full h-[40px] justify-center cursor-pointer">
                  <input
                    type="url"
                    className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
                    placeholder={
                      appPlaceholderData?.name?.toLowerCase() === "gallery"
                        ? "Enter URL(s), separated by commas"
                        : "Enter URL"
                    }
                    value={
                      appPlaceholderData?.name?.toLowerCase() === "gallery"
                        ? Array.isArray(addDefaultApp?.url)
                          ? addDefaultApp?.url.join(", ")
                          : addDefaultApp?.url || ""
                        : addDefaultApp?.url || ""
                    }
                    onChange={(e) => {
                      let value = e.target.value.trim();
                      setAddDefaultApp({
                        ...addDefaultApp,
                        url: value.replace(/\n/g, ", ").replace(/\s*,\s*/g, ", "),
                      });
                    }}
                  />
                </div>
              </>
            )}

            {isOnlyURLType && (
              <>
                <label className="text-left w-full flex items-center mb-1">
                  Enter URL&nbsp;
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.open(
                          addDefaultApp?.name === "Soundcloud"
                            ? "https://soundcloud.com/"
                            : addDefaultApp?.name === "Spotify"
                            ? "https://open.spotify.com/"
                            : addDefaultApp?.name === "Vimeo"
                            ? "https://vimeo.com/"
                            : addDefaultApp?.name === "Calendly"
                            ? "https://calendly.com/"
                            : "https://www.youtube.com/",
                          "_blank",
                        );
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-up-right-square"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707z"
                      />
                    </svg>
                  </div>
                </label>
                <input
                  type="url"
                  className="w-full mb-2 bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
                  placeholder="Enter URL"
                  value={addDefaultApp?.url}
                  onChange={handleURLChange}
                />
                {error && (
                  <p className="text-red-500 text-start mb-2">Only HTTPS URLs are allowed.</p>
                )}
              </>
            )}

            <div>{renderInputField()}</div>
            <div className="flex items-center mb-2">
              <input
                type="text"
                className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
                placeholder="Name"
                value={addDefaultApp?.name}
                onChange={(e) => setAddDefaultApp({ ...addDefaultApp, name: e.target.value })}
              />
            </div>

            <div className="flex items-center">
              <input
                type="text"
                className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
                placeholder="Description"
                value={addDefaultApp?.description}
                onChange={(e) =>
                  setAddDefaultApp({ ...addDefaultApp, description: e.target.value })
                }
              />
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                disabled={!addDefaultApp?.name}
                onClick={saveDefaultApp}
                className="w-full mt-2 mx-auto md:w-[50%] bg-green-400 hover:bg-[#ebff57] hover:text-[#000] text-white font-medium py-2 px-8 rounded-full shadow-md transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSwitchCaseController;
