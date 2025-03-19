import React from "react";
import { useSelector } from "react-redux";

const ZeroTheme = ({ platform }) => {
  const { userData } = useSelector((state) => state?.authReducer);

  return (
    <div className="flex ml-3 items-center justify-center">
      <div className="bg-white w-80 rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src="/images/background_image.svg"
            alt="Background"
            className="w-full h-32 object-cover"
          />
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <img src={"/images/avtar.svg"} alt="Avatar" className="w-20 h-20 rounded-[10px]" />
          </div>
        </div>
        <div className="text-center p-4">
          <h2 className="mt-8 text-lg font-bold">{userData?.data?.username || "Username"}</h2>
          <p className="text-sm text-gray-600 mt-2">{userData?.data?.bio || "Bio not available"}</p>

          <div className="mt-4">
            {platform?.map((item, index) => {
              return (
                <button
                  key={index}
                  className="mt-2 w-full h-[50px] py-2 text-sm rounded-[8px] font-medium bg-[#f3f4f6] font=[#374151] hover:bg-[#374151] hover:text-[#f3f4f6]"
                >
                  {item?.name}
                </button>
              );
            })}
          </div>

          <div className="flex justify-center mt-4">
            <img src="/images/trimmo-black-logo.svg" className="w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZeroTheme;
