import { Skeleton } from "@mui/material";
import React from "react";
import { CloudUpload, X } from "react-bootstrap-icons";

const ThumbnailSetting = ({ elem, item, loader, removeWidgetImage, handleWidgetLogoUpload }) => {
  return (
    <div className="p-6 mt-4 bg-white shadow-xl rounded-2xl border border-gray-200 w-full mx-auto transition-all duration-300 hover:shadow-2xl">
      <div className="mb-4 flex items-center justify-center relative">
        {!loader && !item?.logo ? (
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out">
            <input
              id="dropzone-file"
              type="file"
              name="image"
              accept="image/jpeg, image/png, image/jpg, image/webp, image/svg"
              onChange={(e) => handleWidgetLogoUpload(e.target.files[0], elem)}
              disabled={loader}
              className="hidden peer"
            />
            <CloudUpload className="w-12 h-12 text-gray-500 hover:text-blue-500 transition duration-300" />
            <span className="text-sm font-medium text-gray-600 mt-2">Click to upload logo</span>
          </label>
        ) : loader ? (
          <Skeleton className="min-h-[160px] w-[160px] rounded-xl" variant="rectangular" />
        ) : (
          <div className="relative group">
            <img
              src={item?.logo}
              className="max-w-full max-h-40 rounded-xl shadow-md border border-gray-200 object-cover transition-transform duration-300 group-hover:scale-105"
              alt="logo"
            />
            <button
              type="button"
              onClick={() => removeWidgetImage(item?.logo, elem)}
              className="absolute top-2 right-2 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition duration-300 flex items-center justify-center w-7 h-7"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThumbnailSetting;
