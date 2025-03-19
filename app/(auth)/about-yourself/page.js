"use client";

import API from "@/api";
import { GET_BIO } from "@/redux/action.type";
import { clearBio, clearEditData, editUser } from "@/redux/Action/auth.action";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AboutYourSelf = ({ params }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { editData } = useSelector((state) => state.authReducer);
  const { loginData } = useSelector((state) => state?.authReducer);
  const { loader } = useSelector((state) => state.errorReducer);

  const unwrappedParams = React.use(params);
  const slug = unwrappedParams?.user;
  const [profile, setProfile] = useState("");
  const profileList = ["Creator", "Business", "Musician", "Real estate", "Personal", "Other"];
  useEffect(() => {
    if (editData?.data?.is_verified) {
      dispatch(clearEditData());
      router.push("/select-template");
    }
  }, [editData, dispatch, router]);

  return (
    <div className="flex items-center mb-5 justify-center w-full">
      <div className=" text-center aboutyourself w-full sm:w-[50%] ">
        <h2 className="mb-1 mt-5 lg:mb-3">Welcome to Trimmo</h2>
        <p className="info-text block">Select one category that best describes your Trimmo bio.</p>
        <div className="flex flex-col my-5 gap-4">
          {profileList?.map((elem, index) => (
            <button
              type="button"
              key={index}
              className={`${profile === elem ? "btn-black" : "btn-outline"}`}
              onClick={() => setProfile(elem)}
            >
              {elem}
            </button>
          ))}
        </div>
        {/* <button
          type="button"
          className="btn-green hover:bg-[#ebff57] hover:!text-[#000] !text-white hover:border-[#ebff57] "
          onClick={() => dispatch(editUser({ designation: profile }))}
        >
          Continue
        </button> */}
        <button
          type="button"
          disabled={!profile || loader}
          onClick={() => dispatch(editUser({ designation: profile }))}
          className="w-full mx-auto bg-green-400 hover:bg-[#ebff57] hover:text-[#000] text-white font-medium py-2 px-8 rounded-full shadow-md transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white items-center flex justify-center"
        >
          Continue &nbsp; {loader && <CircularProgress color="inherit" size={20} />}
        </button>
      </div>
    </div>
  );
};

export default AboutYourSelf;
