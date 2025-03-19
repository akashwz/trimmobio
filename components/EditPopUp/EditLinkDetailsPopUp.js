"use client";
import { Transition } from "@/controller/Transitions";
import { CircularProgress, Dialog, Tooltip } from "@mui/material";
import React from "react";
import { X } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import PollsFormComponent from "../PollsFormComponent/PollsFormComponent";
import SeparatorFormComponent from "../SeparatorFormComponent/SeparatorFormComponent";
import DigitalDownloadsComponent from "../DigitalDownloadsComponent/DigitalDownloadsComponent";
import FaceBookComponent from "../FaceBookComponent/FaceBookComponent";
import GitHubComponent from "../GitHubComponent/GitHubComponent";
import DiscountCodeComponent from "../DiscountCodeComponent/DiscountCodeComponent";
import MobileAppComponent from "../MobileAppComponent/MobileAppComponent";
import FaqComponent from "../FaqComponent/FaqComponent";
import NewsLetterSection from "../NewsLetterSection/NewsLetterSection";

const EditLinkDetailsPopUp = ({
  heading,
  confirmationPopup,
  handleUpdateClick,
  handleCloseConfirm,
  isEditDetail,
  widgetData,
  inputValues,
  handleInputChange,
  appPlaceholderData,
  addDefaultApp,
  setAddDefaultApp,
}) => {
  const { loader } = useSelector((state) => state.errorReducer);

  const renderInputField = () => {
    switch (widgetData?.app_name?.toLowerCase()) {
      case "rich-texts":
        return (
          <div className="mb-4">
            <RichTextEditor setAddDefaultApp={setAddDefaultApp} widgetData={widgetData} />
          </div>
        );
      case "polls":
        return (
          <div className="mb-4">
            <PollsFormComponent setAddDefaultApp={setAddDefaultApp} widgetData={widgetData} />
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
            <SeparatorFormComponent setAddDefaultApp={setAddDefaultApp} widgetData={widgetData} />
          </div>
        );

      case "trustpilot review":
        return (
          <div className="inline-flex file-tag-hover relative flex-col mt-4 mb-2 items-center w-full h-[40px] justify-center cursor-pointer">
            <input
              type="url"
              className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
              placeholder={appPlaceholderData?.placeholder}
              value={addDefaultApp?.username}
              onChange={(e) => {
                setAddDefaultApp({
                  ...addDefaultApp,
                  url: appPlaceholderData?.initUrl + e.target.value,
                });
              }}
            />
          </div>
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
            <GitHubComponent setAddDefaultApp={setAddDefaultApp} widgetData={widgetData} />
          </div>
        );
      case "discount code":
        return (
          <div className="mb-4">
            <DiscountCodeComponent setAddDefaultApp={setAddDefaultApp} widgetData={widgetData} />
          </div>
        );
      case "mobile app":
        return (
          <div className="mb-4">
            <MobileAppComponent setAddDefaultApp={setAddDefaultApp} widgetData={widgetData} />
          </div>
        );
      case "faqs":
        return (
          <div className="mb-4">
            <FaqComponent setAddDefaultApp={setAddDefaultApp} widgetData={widgetData} />
          </div>
        );

      case "newsletter":
        return <NewsLetterSection setAddDefaultApp={setAddDefaultApp} widgetData={widgetData} />;

      default:
        return "";
    }
  };

  return (
    <>
      <Dialog
        open={confirmationPopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleCloseConfirm()}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            maxWidth: "800px !important",
            width: "100%",
            borderRadius: "12px",
          },
        }}
      >
        <div className="w-full bg-white p-8 rounded-[8px] shadow-xl">
          <div className="flex text-gray-800 items-center justify-between">
            <p className="text-2xl font-semibold">{heading}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleCloseConfirm();
              }}
              className="hover:bg-gray-100 rounded-full p-1 transition-all duration-300"
            >
              <Tooltip title="Close">
                <X className="w-6 h-6 text-gray-500 hover:text-gray-800" />
              </Tooltip>
            </button>
          </div>
          <hr className="my-4 border-gray-200" />

          <div>{renderInputField()}</div>

          {widgetData?.widget_name === "social media" ? (
            <></>
          ) : (
            <div className="mb-4">
              <label className="block text-gray-600 font-medium">Name</label>
              <input
                type="text"
                value={inputValues?.name}
                className="w-full mt-2 bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
                placeholder="Enter a name"
                disabled={!isEditDetail}
                onChange={(e) => handleInputChange(e, "name")}
              />
            </div>
          )}

          {widgetData?.app_name?.toLowerCase() === "polls" ||
          widgetData?.app_name?.toLowerCase() === "discount code" ||
          widgetData?.app_name?.toLowerCase() === "faqs" ||
          widgetData?.app_name?.toLowerCase() === "github repo list" ? (
            ""
          ) : (
            <div className="mb-4">
              <label className="block text-gray-600 font-medium">URL</label>
              <input
                type="text"
                value={inputValues?.url}
                className="w-full mt-2 bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
                placeholder="Enter a URL"
                disabled={!isEditDetail}
                onChange={(e) => handleInputChange(e, "url")}
              />
            </div>
          )}

          {widgetData?.widget_name === "social media" ? (
            <></>
          ) : (
            <div className="mb-4">
              <label className="block text-gray-600 font-medium">Description</label>
              <input
                type="text"
                value={inputValues?.description}
                className="w-full mt-2 bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
                placeholder="Enter a description"
                disabled={!isEditDetail}
                onChange={(e) => handleInputChange(e, "description")}
              />
            </div>
          )}

          <div className="space-x-2 flex">
            <button
              className="bg-green-400 hover:bg-[#ebff57] hover:text-[#000] text-white font-medium py-2 px-8 rounded-full shadow-md transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white items-center flex justify-center"
              onClick={(e) => {
                e.preventDefault();
                handleUpdateClick(widgetData);
              }}
              disabled={loader}
            >
              Save Changes &nbsp; {loader && <CircularProgress color="inherit" size={20} />}
            </button>
            <button
              className="px-5 py-2 text-sm rounded-full text-black font-medium bg-transparent border border-black  transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                handleCloseConfirm();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default EditLinkDetailsPopUp;
