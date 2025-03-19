"use client";

import { resetOtp, verifyOtp } from "@/redux/Action/auth.action";
import { CircularProgress } from "@mui/material";
import { getCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OtpVerify = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60); // 60 seconds countdown
  const { loader } = useSelector((state) => state.errorReducer);

  const router = useRouter();
  const dispatch = useDispatch();
  const { otpData } = useSelector((state) => state.authReducer);
  const { otpResetData } = useSelector((state) => state.authReducer);

  useEffect(() => {
    let countdown;
    if (isResendDisabled) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            setIsResendDisabled(false); // Enable the resend button
            return 60; // Reset timer
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown); // Cleanup on unmount
  }, [isResendDisabled]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to the next input field
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    setError("");
    const otpVerify = await dispatch(
      verifyOtp({
        identifier: localStorage.getItem("resetIdentifier"),
        otp: enteredOtp,
      }),
    );
    if (getCookie("forgetPassword") === "true") {
      router.push("/forget-password");
    } else if (otpVerify?.success === true) {
      router.push("/about-yourself");
    }
  };

  const handleResend = async () => {
    try {
      const result = await dispatch(
        resetOtp({
          identifier: localStorage.getItem("resetIdentifier"),
        }),
      );
      setIsResendDisabled(true); // Disable the resend button
      setTimer(60); // Reset timer
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="otp-verify-container" style={{ textAlign: "center", marginTop: "50px" }}>
      <h2 className="mb-3">Verify OTP</h2>
      <p className="text-sm info-text block">Enter the 6-digit OTP sent to your phone number</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
        className="mt-4"
      >
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onFocus={(e) => e.target.select()}
            style={{
              width: "40px",
              height: "40px",
              textAlign: "center",
              fontSize: "20px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        ))}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="flex w-full justify-center">
        <button
          onClick={handleSubmit}
          className="w-auto bg-green-400 hover:bg-[#ebff57] hover:text-[#000] text-white font-medium py-2 px-8 rounded-full shadow-md transition-all duration-200 ease-in-out peer items-center flex justify-center"
          disabled={loader}
        >
          Verify &nbsp; {loader && <CircularProgress color="inherit" size={20} />}
        </button>
      </div>
      <p style={{ marginTop: "20px" }}>
        Didn’t receive the code?{" "}
        <button
          onClick={handleResend}
          disabled={isResendDisabled}
          className="font-medium underline hover:text-[#539568] duration-150"
        >
          Resend OTP {isResendDisabled && `(${timer}s)`}
        </button>
      </p>
    </div>
  );
};

export default OtpVerify;
