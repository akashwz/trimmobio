"use client";

import { forgetPassword, resetOtp } from "@/redux/Action/auth.action";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const { loader } = useSelector((state) => state.errorReducer);

  const validateEmailOrPhone = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    if (!value) {
      return "Email or phone number is required.";
    }
    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      return "Please enter a valid email or phone number.";
    }
    return "";
  };

  const handleBlur = () => {
    const validationError = validateEmailOrPhone(email);
    setError(validationError);
    setIsValid(!validationError);
  };

  const handleEmailLogin = async () => {
    const resetPassword = await dispatch(resetOtp({ identifier: email }));
    if (resetPassword?.success === true) {
      router.push("/otp-verify");
      localStorage.setItem("resetIdentifier", email);
    }
  };

  return (
    <div className="w-full m-auto md:w-[60%] xl:w-[50%] text-center">
      <h2 className="mb-3">Forget password!</h2>
      {/* <p className="info-text block w-full mx-auto">
                Access your tools and resources to enhance your productivity.
                Please log in to continue.
            </p> */}
      <div className="flex w-[full] flex-col border-opacity-50 gap-4 mt-4 items-center">
        <div className="relative mb-0 md:mb-4 w-full flex flex-col">
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleBlur}
            placeholder="Enter your email"
            className="w-full sm:w-[50%] mx-auto bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
          />
          {error && (
            <p className="w-full flex sm:w-[50%] mx-auto text-red-500 text-center text-sm mt-1">
              {error}
            </p>
          )}
        </div>
        <button
          type="button"
          disabled={!isValid || loader}
          onClick={handleEmailLogin}
          className="w-full mx-auto md:w-[50%] bg-green-400 hover:bg-[#ebff57] hover:text-[#000] text-white font-medium py-2 px-8 rounded-full shadow-md transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white items-center flex justify-center"
        >
          Continue &nbsp; {loader && <CircularProgress color="inherit" size={20} />}
        </button>
        <p className="info-text block w-full mt-4">
          Already have an account? 
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="font-medium underline hover:text-[#539568] duration-150"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Page;
