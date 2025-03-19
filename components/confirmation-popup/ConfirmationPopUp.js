"use client";
import { Transition } from "@/controller/Transitions";
import { Dialog, Tooltip } from "@mui/material";
import React from "react";
import { X } from "react-bootstrap-icons";

const ConfirmationPopUp = ({
  heading,
  subheading,
  confirmationPopup,
  runFunction,
  handleCloseConfirm,
  confirmButton,
}) => {
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
          <p className="text-base table-text">{subheading}</p>
          <button
            className="px-5 py-2 mt-5 me-2 text-sm rounded-full w-[90px] text-white bg-red-600 hover:bg-red-700 hover:shadow transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              runFunction();
            }}
          >
            {confirmButton || "Yes"}
          </button>
          <button
            className="px-5 py-2 mt-5 text-sm rounded-full text-black font-medium bg-transparent border border-black  transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              handleCloseConfirm();
            }}
          >
            Cancel
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default ConfirmationPopUp;
