"use client";
import { Transition } from "@/controller/Transitions";
import { CircularProgress, Dialog, Tooltip } from "@mui/material";
import React from "react";
import { X } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

const EditWidgetPopUp = ({
  heading,
  confirmationPopup,
  handleCustomWidgetName,
  handleCloseConfirm,
  widgetId,
  widgetIndex,
  handleWidgetNameChange,
  isEditable,
  widgetName,
  handleWidgetNameShowChange,
  widgetNameShow,
}) => {
  const { loader } = useSelector((state) => state.errorReducer);

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
        <div className="w-full secondary-bg-color p-6 rounded-[6px]">
          <div className="flex text-primary items-center justify-between">
            <p className="text-lg font-medium">{heading}</p>
            <button
              onClick={(e) => {
                e.preventDefault;
                handleCloseConfirm();
              }}
              className="close-btn hover:bg-gray-200"
            >
              <Tooltip title="close">
                <X className="w-7 h-7" />
              </Tooltip>
            </button>
          </div>
          <hr className="my-4 main-border-color"></hr>
          <div>
            <label className="block text-gray-600 font-medium">Widget Name</label>
            <input
              type="text"
              className="mt-2 rounded-md border border-gray-300 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 peer"
              placeholder="Enter a name"
              disabled={!isEditable}
              value={widgetName}
              onChange={(e) => handleWidgetNameChange(e, widgetId, widgetIndex)}
            />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="socialMediaButton"
              disabled={!isEditable}
              checked={widgetNameShow}
              onChange={(e) => handleWidgetNameShowChange(e, widgetId, widgetIndex)}
              className="w-5 h-5 accent-green-500 cursor-pointer peer"
            />
            <label
              htmlFor="socialMediaButton"
              className="text-gray-700 text-sm font-medium cursor-pointer"
            >
              Show Widget Name
            </label>
          </div>

          <div className="space-x-2 flex mt-4">
            <button
              className="bg-green-400 hover:bg-[#ebff57] hover:text-[#000] text-white font-medium py-2 px-8 rounded-full shadow-md transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white items-center flex justify-center"
              onClick={(e) => {
                e.preventDefault();
                handleCustomWidgetName();
              }}
              disabled={loader}
            >
              Edit &nbsp;
              {loader && <CircularProgress color="inherit" size={20} />}
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

export default EditWidgetPopUp;
