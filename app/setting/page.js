"use client";

import API from "@/api";
import AccountSetting from "@/components/AccountSetting/AccountSetting";
import { UPDATE_APPERANCE, UPDATE_APPERANCE_THEME } from "@/redux/action.type";
import { getBio } from "@/redux/Action/auth.action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Setting = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state?.authReducer);

  useEffect(() => {
    apperanceDataGet();
  }, []);

  const apperanceDataGet = async () => {
    try {
      const apiCall = await API({
        url: `/bio/${userData?.data?.username}`,
        method: "get",
      });

      if (apiCall?.data?.data?.username) {
        dispatch({
          type: UPDATE_APPERANCE,
          payload: apiCall?.data?.data?.customize_theme,
        });
      }
    } catch (error) {
      dispatch(clearBio());
      router.push("/");
    }
  };

  useEffect(() => {
    if (userData?.data?.username) {
      dispatch(getBio(userData?.data?.username));
    }
  }, [userData]);

  return (
    <>
      <div
        className="relative flex-grow p-2 lg:p-5 overflow-y-auto h-screen"
        style={{
          scrollbarWidth: "thin",
        }}
      >
        <div className="w-[100%] lg:w-[80%] profile-detail flex flex-col p-4 mx-auto justify-center mb-12">
          <div className="w-full">
            <h1 className="sm:text-[1.75rem] text-lg font-semibold mr-4">Settings</h1>
          </div>
          <div className="mt-5">
            <AccountSetting />
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
