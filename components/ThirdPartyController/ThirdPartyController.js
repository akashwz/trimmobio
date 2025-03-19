"use client";
import { useState } from "react";
import NewsLetterComponent from "../NewsLetterComponent/NewsLetterComponent";
import { useSelector } from "react-redux";
import {
  CalendlyController,
  ConvertYouTubeURL,
  DiscountController,
  DownloadController,
  FaceBookController,
  FaqController,
  GalleryController,
  GitHubController,
  InstagramGrid,
  MobileAppController,
  MusicController,
  PintrestController,
  PollsController,
  RedditController,
  RichTextController,
  SeparatorController,
  SoundCloudController,
  SpotifyController,
  ThreadsController,
  TopmateController,
  TrustpilotReviewController,
  VimeoController,
} from "./SubSectionControll";
import { Dialog } from "@mui/material";
import { Transition } from "@/controller/Transitions";
import { X } from "react-bootstrap-icons";

const ThirdPartyController = ({
  item,
  buttonStyle,
  buttonClass,
  handleMouseEnter,
  handleMouseLeave,
  handleButtonClick,
  bioData,
  changeAppearanceData,
  activeTabPreview,
  textAlign,
  textAlignmentClass,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => setIsPopupOpen((prev) => !prev);

  const redirectItem = (url) => {
    if (url && typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  const renderThirdPartyWidget = () => {
    switch (item?.app_name) {
      case "calendly":
        return <CalendlyController isPopupOpen={isPopupOpen} item={item} />;
      case "youtube":
      case "video":
        return (
          <div className="flex justify-center items-center w-full">
            <iframe
              width="560"
              height="315"
              src={item?.app_name === "youtube" ? ConvertYouTubeURL(item?.url) : item?.url}
              title="Embedded Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg"
            />
          </div>
        );
      case "instagram":
        return (
          <InstagramGrid
            thumbnailString={item?.thumbnail}
            buttonClass={buttonClass}
            buttonStyle={buttonStyle}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleButtonClick={handleButtonClick}
            bioData={bioData}
            changeAppearanceData={changeAppearanceData}
            item={item}
          />
        );
      case "rich-texts":
        return (
          <div
          // className={`${buttonClass} text-left h-full flex flex-col items-center`}
          // style={buttonStyle}
          >
            <RichTextController item={item} />
          </div>
        );
      case "music":
        return <MusicController buttonClass={buttonClass} buttonStyle={buttonStyle} item={item} />;
      case "gallery":
        return (
          <GalleryController buttonClass={buttonClass} buttonStyle={buttonStyle} item={item} />
        );
      case "trustpilot review":
        return (
          <TrustpilotReviewController
            buttonClass={buttonClass}
            buttonStyle={buttonStyle}
            item={item}
          />
        );
      case "spotify":
        return (
          <SpotifyController buttonClass={buttonClass} buttonStyle={buttonStyle} item={item} />
        );

      case "vimeo":
        return <VimeoController item={item} />;

      case "digital downloads":
        return <DownloadController item={item} />;
      case "threads":
        return <ThreadsController item={item} />;

      case "facebook":
        return <FaceBookController item={item} />;

      case "soundcloud":
        return <SoundCloudController item={item} />;

      case "github repo list":
        return <GitHubController item={item} buttonStyle={buttonStyle} buttonClass={buttonClass} />;
      case "pinterest":
        return <PintrestController item={item} />;
      case "newsletter":
        return (
          <NewsLetterComponent item={item} bioData={bioData} activeTabPreview={activeTabPreview} />
        );
      case "reddit":
        return <RedditController item={item} />;

      case "discount code":
        return <DiscountController item={item} />;
      case "mobile app":
        return <MobileAppController item={item} />;
      case "topmate":
        return <TopmateController item={item} />;

      default:
        return <p>Unsupported widget</p>;
    }
  };

  return (
    <div className="relative flex justify-center items-center">
      {item?.app_name === "separator" ? (
        <SeparatorController item={item} />
      ) : item?.app_name === "polls" ? (
        <PollsController
          buttonClass={buttonClass}
          buttonStyle={buttonStyle}
          item={item}
          bioData={bioData}
          activeTabPreview={activeTabPreview}
        />
      ) : item?.app_name === "faqs" ? (
        <FaqController item={item} buttonClass={buttonClass} buttonStyle={buttonStyle} />
      ) : (
        <>
          <button
            className={`${buttonClass} `}
            style={buttonStyle}
            onClick={() => (item?.app_name ? togglePopup() : redirectItem(item?.url))}
            onMouseEnter={() => handleMouseEnter(item?._id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-full flex items-center">
              <div className={`w-full ${textAlign === "center" && "absolute"}`}>
                <h4 className={`block ${item?.logo && "ml-0"} ${textAlignmentClass}`}>
                  {item?.name || "Open Widget"}
                </h4>
                {item?.description && (
                  <span className={`w-full block text-${changeAppearanceData?.button_text_align}`}>
                    {item?.description}
                  </span>
                )}
              </div>
            </div>
          </button>

          {/* {isPopupOpen && (
            <div className="fixed inset-0  bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                  onClick={togglePopup}
                >
                  ✖
                </button>
                <h3 className="text-xl font-semibold mb-4 text-center">{item?.name}</h3>
                {renderThirdPartyWidget()}
              </div>
            </div>
          )} */}
          <Dialog
            open={isPopupOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={togglePopup}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{
              sx: {
                maxWidth: "800px !important",
                width: "100%",
                borderRadius: "12px",
              },
            }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-center">{item?.name}</h3>
                <X onClick={togglePopup} width={25} height={25} className="cursor-pointer" />
              </div>
              {renderThirdPartyWidget()}
            </div>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default ThirdPartyController;
