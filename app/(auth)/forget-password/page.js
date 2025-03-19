"use client";

import { forgetPassword } from "@/redux/Action/auth.action";
import { CircularProgress } from "@mui/material";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loader } = useSelector((state) => state.errorReducer);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const validateForm = () => {
    if (!newPassword || !confirmPassword) {
      setError("Both password fields are required.");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    setError("");
    return true;
  };

  const handleForgetPassword = async () => {
    if (!validateForm()) {
      return;
    }
    const emailData = localStorage.getItem("email");
    try {
      const response = await dispatch(
        forgetPassword({
          identifier: emailData,
          new_password: newPassword,
        }),
      );

      if (response?.success === true) {
        router.push("/login");
        getCookie("forgetPassword", false);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full m-auto md:w-[60%] xl:w-[50%] text-center">
      <h2 className="mb-3">Reset Your Password</h2>
      <p className="info-text block w-full mx-auto">
        Please enter your email address and create a new password.
      </p>
      <div className="flex w-full flex-col border-opacity-50 gap-4 mt-4 items-center justify-center">
        <div className="relative mb-4 w-[50%] flex flex-col">
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-0 top-[50%] -translate-y-[50%] text-sm mr-4 text-gray-500 hover:text-gray-700"
          >
            {isPasswordVisible ? (
              <EyeSlashFill className="w-4 h-4" />
            ) : (
              <EyeFill className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="relative mb-4 w-[50%] flex flex-col">
          <input
            type={isConfirmPasswordVisible ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
          />
          <button
            type="button"
            onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
            className="absolute right-0 top-[50%] -translate-y-[50%] text-sm mr-4 text-gray-500 hover:text-gray-700"
          >
            {isConfirmPasswordVisible ? (
              <EyeSlashFill className="w-4 h-4" />
            ) : (
              <EyeFill className="w-4 h-4" />
            )}
          </button>
        </div>

        {error && <p className="text-red-500 text-center text-sm mt-1">{error}</p>}

        <button
          className="w-full sm:w-[50%] mx-auto bg-green-400 hover:bg-[#ebff57] hover:text-[#000] text-white cursor-pointer font-medium py-2 px-8 rounded-full shadow-md transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white items-center flex justify-center"
          onClick={handleForgetPassword}
          disabled={!newPassword || !confirmPassword || loader}
        >
          Reset Password &nbsp; {loader && <CircularProgress color="inherit" size={20} />}
        </button>
      </div>

      <p className="info-text block w-full mt-4">
        Back to  
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="font-medium underline hover:text-[#539568] duration-150"
        >
          Log in
        </button>
      </p>
    </div>
  );
};

export default Page;
