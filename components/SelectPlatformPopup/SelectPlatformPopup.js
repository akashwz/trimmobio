"use client";

import { Transition } from "@/controller/Transitions";
import { createBio, getAllPlateform } from "@/redux/Action/auth.action";
import { Dialog, Tooltip } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { X } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";

const SelectPlatformPopup = ({ showPlatform, closePlatformPopup, username, activeTabPreview }) => {
  const dispatch = useDispatch();
  const [platform, setPlatform] = useState({});
  const { allPlateformItems } = useSelector((state) => state?.authReducer);

  const handleAddLink = () => {
    const payload = {
      ...platform,
      url: `${platform.initUrl}${platform.url}`,
      widget_name: "social media",
      layout_setting: platform?.default_layout || null,
      type: activeTabPreview === "Links" ? "link" : "shop",
    };

    delete payload?._id;
    dispatch(createBio(payload, username));
    setPlatform({});
    closePlatformPopup();
  };

  useEffect(() => {
    if (showPlatform) {
      dispatch(getAllPlateform(["social media"]));
    }
  }, [showPlatform]);

  return (
    <>
      <Dialog
        open={showPlatform}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => closePlatformPopup()}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            maxWidth: "800px !important",
            width: "100%",
            borderRadius: "12px",
          },
        }}
      >
        <div className="w-full p-6 overflow-hidden">
          <div className="flex items-center justify-between w-full mb-4">
            <p className="text-xl font-semibold text-gray-800 text-center flex-1">
              Select Platform
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                closePlatformPopup();
                setPlatform({});
              }}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <Tooltip title="close">
                <X className="w-7 h-7 hover:bg-gray-200" />
              </Tooltip>
            </button>
          </div>
          <hr className="my-4 border-gray-300"></hr>

          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddLink();
                closePlatformPopup();
                e.preventDefault();
              }
            }}
            className="w-full overflow-y-auto h-[500px] pb-4"
            style={{
              scrollbarWidth: "thin",
            }}
          >
            <div className="space-y-4">
              {allPlateformItems && Object.keys(platform).length <= 0 ? (
                allPlateformItems.map((elem, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer transition"
                    onClick={() => setPlatform(elem)}
                  >
                    <Image src={elem?.svg} height={35} width={35} alt={elem?.name} />
                    <span className="text-gray-800 font-medium">{elem?.name}</span>
                  </div>
                ))
              ) : Object.keys(platform).length > 0 ? (
                // Input for URL
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-100 rounded-md">
                    <span className="text-gray-600">{platform?.initUrl}</span>
                    <input
                      type="text"
                      placeholder={platform?.placeholder || "URL"}
                      value={platform?.url || ""}
                      className="w-full ml-2 bg-transparent outline-none peer"
                      onChange={(e) => setPlatform({ ...platform, url: e.target.value })}
                    />
                  </div>
                  <button
                    type="button"
                    className="w-full py-2 px-4 bg-green-500 text-white font-medium rounded-md shadow-md hover:bg-green-600 transition"
                    onClick={handleAddLink}
                  >
                    Add
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default SelectPlatformPopup;
