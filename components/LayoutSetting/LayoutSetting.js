import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

const LayoutSetting = ({
  activeTab,
  selectedOption,
  handleTabChange,
  handleOptionChange,
  handleOptionChangeLayout,
  elem,
  item,
}) => {
  return (
    <div className="w-full">
      <div className="p-6 mt-4 bg-white shadow-lg rounded-xl border border-gray-200 w-full">
        <div className="flex items-center justify-between border-b-2 w-full">
          <div className="flex space-x-4 w-full">
            {/* <button
              className={`pb-2 px-4 text-md transition-all duration-300 w-full text-left ${
                activeTab === "linkSettings"
                  ? "border-b-[1px] border-black text-black"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => handleTabChange("linkSettings")}
            >
              Link Settings
            </button> */}

            <button
              className={`pb-2 px-4 text-md transition-all duration-300 w-full text-left ${
                activeTab === "layout"
                  ? "border-b-[1px] border-black text-black"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => handleTabChange("layout")}
            >
              Layout
            </button>
          </div>
        </div>

        {/* {activeTab === "linkSettings" && (
          <div className="mt-4 p-4 rounded bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm w-full">
            <p className="mt-2 text-gray-600 text-sm">
              Choose to display this video on your Trimmo or link off to YouTube:
            </p>

            <div className="mt-4 space-y-3 w-full">
              <FormControl className="w-full">
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={item?.link_setting}
                  onChange={(e) => handleOptionChange(e, elem)}
                  className="w-full"
                >
                  <FormControlLabel
                    label="Display this video on my Trimmo"
                    control={<Radio />}
                    value="1"
                    className="flex w-full mt-2 items-center p-1 bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer"
                  />
                  <FormControlLabel
                    label="Link off to YouTube website"
                    control={<Radio />}
                    value="2"
                    className="flex w-full mt-2 items-center p-1 bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        )} */}

        {activeTab === "layout" && (
          <div className="mt-4 p-4 rounded bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm w-full">
            <p className="mt-2 text-gray-600 text-sm">Choose a layout for your link:</p>

            <FormControl component="fieldset" className="w-full">
              <RadioGroup
                value={item?.layout_setting}
                onChange={(e) => handleOptionChangeLayout(e, elem)}
                className="space-y-4 mt-4 w-full"
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={
                    <div
                      className={`flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer w-full ${
                        item?.layout_setting === "1" ? "border-black" : "border-gray-300"
                      }`}
                    >
                      <div>
                        <h4 className="font-semibold text-md">Classic</h4>
                        <p className="text-sm text-gray-500">Efficient, direct and compact.</p>
                      </div>
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    </div>
                  }
                  className="w-full"
                  disabled={item?.preview_layout === "featured"}
                />

                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label={
                    <div
                      className={`flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer w-full ${
                        item?.layout_setting === "2" ? "border-black" : "border-gray-300"
                      }`}
                    >
                      <div>
                        <h4 className="font-semibold text-md">Featured</h4>
                        <p className="text-sm text-gray-500">
                          Make your link stand out with a larger, more attractive display.
                        </p>
                      </div>
                      <div className="w-16 h-16 bg-gray-400 rounded-md"></div>
                    </div>
                  }
                  className="w-full"
                  disabled={item?.preview_layout === "classic"}
                />
              </RadioGroup>
            </FormControl>
          </div>
        )}
      </div>
    </div>
  );
};

export default LayoutSetting;
