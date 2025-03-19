"use client";

import { Transition } from "@/controller/Transitions";
import { Dialog, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { CheckCircleFill, Envelope, Facebook, Twitter, Whatsapp, X } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const SocialShare = ({ showSharePopup, url, closeSharePopup, image }) => {
  // const url = process.env.NEXT_PUBLIC_APP_URL + `/${userData?.data?.username}`;
  const { userData } = useSelector((state) => state?.authReducer || {});
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };
  return (
    <>
      <Dialog
        open={showSharePopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => closeSharePopup()}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            maxWidth: "800px !important",
            width: "100%",
            borderRadius: "12px",
          },
        }}
      >
        <div className="w-full secondary-bg-color sm:p-6 p-3 rounded-full">
          <div className="flex text-primary justify-between w-full">
            <div className="flex-1">
              <p className="text-lg font-medium">Share Profile</p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                closeSharePopup();
              }}
              className="close-btn hover:bg-gray-200"
            >
              <Tooltip title="close">
                <X className="w-7 h-7" />
              </Tooltip>
            </button>
          </div>
          <div className="flex flex-col md:flex-row mt-4 gap-6 items-center">
            {image && (
              <div className="w-full md:w-auto">
                <img
                  src={image}
                  alt="og-image"
                  width={700}
                  className="rounded-2xl max-w-full h-[240px]"
                />
              </div>
            )}
            <div className="flex w-full flex-col items-center justify-between my-3">
              <FacebookShareButton
                className="flex items-center justify-center w-full px-6 !text-white !cursor-pointer !bg-[#395498] rounded-full !p-2 mt-2 gap-2"
                url={url}
              >
                <Facebook className="w-5 h-5" fill="white" /> Share on Facebook
              </FacebookShareButton>

              <TwitterShareButton
                className="flex items-center justify-center w-full px-6 !text-white !cursor-pointer !bg-[#45a4e1] rounded-full !p-2 mt-2 gap-2"
                url={url}
              >
                <Twitter className="w-5 h-5" fill="white" /> Share on Twitter
              </TwitterShareButton>

              <WhatsappShareButton
                className="flex items-center justify-center w-full px-6 !text-white !cursor-pointer !bg-[#46c254] rounded-full !p-2 mt-2 gap-2"
                url={url}
              >
                <Whatsapp className="w-5 h-5" fill="white" /> Share on WhatsApp
              </WhatsappShareButton>

              <EmailShareButton
                className="flex items-center justify-center w-full px-6 !text-white !cursor-pointer !bg-[#60696c] rounded-full !p-2 mt-2 gap-2"
                url={url}
              >
                <Envelope className="w-5 h-5" fill="white" /> Share on Mail
              </EmailShareButton>

              <div className="relative mb-4 w-full h-[50px] px-4 pe-1 rounded-[30px] border border-black border-opacity-10 bg-[#F1F0E6] flex items-center justify-between mt-2">
                <span className="truncate">{url}</span>
                <button
                  type="button"
                  className="bg-[#26d36780] text-sm p-2 font-medium rounded-full copy-url"
                  onClick={handleCopy}
                >
                  {!copied ? (
                    "Copy URL"
                  ) : (
                    <CheckCircleFill className="input-icon w-5 h-5" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SocialShare;
