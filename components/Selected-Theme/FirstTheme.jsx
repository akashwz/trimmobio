import React from "react";
import { useSelector } from "react-redux";

const FirstTheme = ({ platform }) => {
  const { userData } = useSelector((state) => state?.authReducer);

  return (
    <div
      className="flex ml-3 flex-col h-auto px-5 items-center justify-center rounded-[10px]"
      style={{
        // background: "linear-gradient(to top, #d8b4fe, #fbcfe8, #fef08a)",
        background: "#024CAA",
      }}
    >
      <div className="text-center theme-2-container-theme p-3 mb-12">
        <div className="flex relative rounded-t-[50%] bottom-0 flex-col items-center">
          <div className="w-24 h-24 mt-8 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={
                userData?.data?.profile_picture
                  ? userData?.data?.profile_picture
                  : "/images/avtar.svg"
              }
              alt="Avatar"
              className="w-24 h-24 rounded-full"
            />
          </div>

          <div
            className="mt-16 h-[300px] overflow-auto w-full custom-scrollbar"
            style={{
              scrollbarWidth: "thin",
            }}
          >
            <h2 className="text-lg font-bold text-white">
              {userData?.data?.username || "Username"}
            </h2>
            <p className="text-sm text-white mt-2">{userData?.data?.bio || "Bio not available"}</p>
            {platform?.map((item, index) => {
              return (
                <button
                  key={index}
                  className="mt-2 w-full h-[50px] py-2 text-sm rounded-full font-medium bg-[#E7FF35] font=[#000000] hover:bg-[#374151] hover:text-[#f3f4f6]"
                >
                  {item?.name}
                </button>
              );
            })}
          </div>

          <div className="flex justify-center mt-4 mb-8">
            <img src="/images/trimmo-black-logo.svg" className="w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstTheme;
