"use client";

import { auth, googleProvider } from "@/controller/firebase";
import ToastNotification from "@/controller/ToastNotification";
import useDebounce from "@/customhooks/useDebounce";
import {
  checkEmailPhone,
  checkUserName,
  registration,
  socialLogin,
} from "@/redux/Action/auth.action";
import { CircularProgress } from "@mui/material";
import { getCookie } from "cookies-next/client";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EyeFill, EyeSlashFill, Phone } from "react-bootstrap-icons";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userNames, emailPhoneStatus } = useSelector((state) => state.authReducer);
  const { checkEmailPhoneData } = useSelector((state) => state.authReducer);
  const { registerData } = useSelector((state) => state.authReducer);
  const { userData } = useSelector((state) => state?.authReducer);
  const recaptchaRef = useRef(null);
  const { loader } = useSelector((state) => state.errorReducer);

  const [userName, setUserName] = useState("");
  const debouncedUserName = useDebounce(userName, 1000);
  const [isShow, setIsShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailCheckMsg, setEmailCheckMsg] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // const userNameRegex = /^[a-z0-9-!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]{5,60}$/;
  const userNameRegex = /^[a-z0-9-]{5,60}$/;
  const [userNameError, setUserNameError] = useState(false);
  const [userNameErrorContent, setUserNameErrorContent] = useState("");

  const [loading, setLoading] = useState(false);

  const handleBlurUsername = async (e) => {
    const value = e.target.value;
    if (userNameRegex.test(value)) {
      setUserNameError(false);
      setUserNameErrorContent(userNames?.data?.message);

      setLoading(true);

      dispatch(checkUserName(e.target.value));

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLoading(false);

      if (userNames?.data?.username === false) {
        setUserNameError(true);
        setUserNameErrorContent(userNames?.data?.message);
      }
    } else {
      setUserNameError(true);
      setUserNameErrorContent("Username is invalid format.");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const username = localStorage.getItem("username");
      if (username) {
        setUserName(username);
        localStorage.removeItem("username");
      }
    }
  }, []);

  const handleBlur = async () => {
    if (!email.trim()) {
      setError("Email or phone number is required.");
      setIsValid(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(email) && !phoneRegex.test(email)) {
      setError("Please enter a valid email or phone number.");
      setIsValid(false);
      return;
    }

    setError(""); // Clear previous errors if input is valid

    try {
      const result = await dispatch(checkEmailPhone(email));

      if (checkEmailPhoneData?.data?.identifier === false) {
        setError(checkEmailPhoneData?.message || "Invalid email or phone number.");
        setIsValid(false);
        setEmailCheckMsg("");
      } else {
        setEmailCheckMsg(checkEmailPhoneData?.message);
        setError("");
        setIsValid(true);
      }
    } catch (error) {
      console.error("API Error:", error);
      setError("Something went wrong. Please try again.");
      setIsValid(false);
    }
  };

  const handleDataSubmit = async () => {
    // Save to local storage
    localStorage.setItem("email", email);

    try {
      const registerResponse = await dispatch(
        registration({
          identifier: email || Phone,
          password,
          username: userName,
        }),
      );

      if (registerResponse?.success) {
        router.push("/otp-verify");
        localStorage.setItem("resetIdentifier", email);
      } else {
        console.error("Registration failed:", registerResponse?.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  // useEffect(() => {
  //   if (debouncedUserName && !userNameError) {
  //     dispatch(checkUserName(debouncedUserName));
  //   }
  // }, [debouncedUserName]);

  useEffect(() => {
    if (userNames?.data?.username) {
      setIsShow(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("name", userName);
      }
    } else {
      setIsShow(false);
    }
  }, [userNames]);

  const [user, setUser] = useState(null);

  const usr = localStorage.getItem("username");
  const mongodbId = getCookie("mongodb_id");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(localStorage.getItem("name"));
    }
  }, []);

  useEffect(() => {
    if (userData?.data?.profile) {
      localStorage.removeItem("name");
      localStorage.removeItem("username");
      router.push("/edit-profile");
    } else if (userData?.data?.token) {
      localStorage.removeItem("name");
      localStorage.removeItem("username");
      router.push("/about-yourself");
    }
  }, [userData]);

  const handleLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const socialData = {
        username: user || usr,
        socialToken: result?.user?.stsTokenManager?.accessToken,
        mongodb_id: mongodbId,
      };
      dispatch(socialLogin(socialData));
    } catch (error) {
      console.error("Error logging in with provider:", error);
      ToastNotification.error(error);
    }
  };

  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000"}/callback`;
  const AUTH_URL = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3000";

  const handleShopeasyLogin = () => {
    if (typeof window !== "undefined") {
      const url = `${AUTH_URL}?redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`;
      window.location.href = url;
    }
  };

  const handleCaptchaVerify = (token) => {
    if (token) setCaptchaVerified(true);
  };

  return (
    <div className="w-full md:w-[60%] mx-auto xl:w-[50%] text-center">
      <h2 className="mb-3">Welcome to Trimmo</h2>
      <p className="text-sm info-text block">
        Choose your Trimmo username. You can always change it later.
      </p>
      <div className="w-full md:w-[50%] mx-auto mt-5 mb-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
          value={userName}
          onChange={(e) => setUserName(e.target.value.toLowerCase())}
          onBlur={handleBlurUsername}
        />

        {userNameError && (
          <p className="w-full flex mx-auto text-sm text-left mt-0.5 text-red-500">
            {userNameErrorContent}
          </p>
        )}

        {!userNameError && userName?.length > 0 && loading && (
          <p className="w-full flex mx-auto text-sm text-left mt-0.5 text-blue-500">
            Checking availability...
          </p>
        )}
        {/* 
        {!userNameError &&
          userName?.length > 0 &&
          !loading &&
          userNames?.data?.username === false && (
            <p className="w-full flex mx-auto text-sm text-left mt-0.5 text-red-500">
              Username is not available.
            </p>
          )} */}

        {!userNameError &&
          userName?.length > 0 &&
          !loading &&
          userNames?.data?.username === true && (
            <p className="w-full flex mx-auto text-sm text-left mt-0.5 text-green-500">
              {userNameErrorContent}
            </p>
          )}
      </div>
      <div></div>
      <div className="relative mb-4 w-full mx-auto md:w-[50%]">
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlur}
          placeholder="Email or Phone Number"
          className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
        />
        {error && (
          <p className="w-full flex mx-auto text-sm text-left mt-0.5 text-red-500">{error}</p>
        )}
        {checkEmailPhoneData?.data?.identifier === true && emailCheckMsg && (
          <p className="w-full flex mx-auto text-sm text-left mt-0.5 text-green-500">
            {emailCheckMsg}
          </p>
        )}
      </div>
      {checkEmailPhoneData?.data?.identifier === true && isValid && (
        <>
          {/* <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_APP_SITE_KEY}
            onChange={handleCaptchaVerify}
            className="sm:w-[50%] mx-auto"
          /> */}
          <div className="relative mb-4 w-full sm:w-[50%] mx-auto mt-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-[50%] -translate-y-[50%] text-sm mr-4 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeSlashFill className="w-4 h-4" />
              ) : (
                <EyeFill className="w-4 h-4" />
              )}
            </button>
          </div>
        </>
      )}

      <div className="flex flex-col">
        <button
          type="button"
          disabled={
            !isShow ||
            userNameError ||
            !password ||
            //  !captchaVerified ||
            loader
          }
          onClick={handleDataSubmit}
          className="w-full mx-auto md:w-[50%] bg-green-400 hover:bg-[#ebff57] hover:text-[#000] text-white font-medium py-2 px-8 rounded-full shadow-md transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white items-center flex justify-center"
        >
          Continue &nbsp;{loader && <CircularProgress color="inherit" size={20} />}
        </button>
        <span className="w-full capitalize font-medium mt-2">OR</span>
        <button
          type="button"
          className="w-auto sm:w-[50%] lg:w-[50%] mx-auto flex items-center justify-center bg-transparent border rounded-full border-black text-black text-sm py-2 px-4 lg:px-8 font-medium hover:bg-black hover:text-[#f1f0e6] transition mt-2"
          onClick={() => handleLogin(googleProvider)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15px"
            height="15px"
            fill="currentColor"
            className="bi bi-google mr-2"
            viewBox="0 0 16 16"
          >
            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
          </svg>
          Sign up with Google
        </button>
        <button
          type="button"
          className="w-auto sm:w-[50%] lg:w-[50%] mx-auto flex items-center justify-center gap-1 bg-transparent border rounded-full border-black text-black text-sm py-2 px-4 lg:px-8 font-medium hover:bg-black hover:text-[#f1f0e6] transition mt-2"
          onClick={handleShopeasyLogin}
        >
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 904 842"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current mr-2"
          >
            <g clipPath="url(#clip0_37_1062)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M351.289 674.91H793.8C845.01 674.91 856.81 636.84 864.85 600.6L902.05 295.416C905.9 277.041 901.91 258.392 891.14 244.336C880.35 230.265 845.36 223.611 827.34 223.611C827.34 223.611 410.771 168.849 287.713 134.993C267.795 129.513 251.104 124.568 237.413 96.8531C226.659 75.0841 198.513 26.523 198.513 26.523C193.765 10.743 179.786 -0.000976562 163.966 -0.000976562H36.2239C16.2239 -0.000976562 0.00488281 16.954 0.00488281 37.908C0.00488281 58.908 16.2209 75.9081 36.2239 75.9081C36.2239 75.9081 82.9759 77.717 107.902 76.481C132.265 75.274 140.11 81.398 148.359 107.987C169.145 174.987 258.2 594.287 258.2 594.287C268.682 637.747 296.447 674.827 346.708 674.827M505.865 260.238C514.476 260.238 515.057 261.058 518.212 263.317C522.637 266.485 523.681 272.769 525.969 278.146C530.497 288.785 534.902 299.86 539.693 310.768C554.275 343.977 583.66 363.848 617.26 378.387C628.75 383.357 655.43 388.831 649.48 408.044C646.06 419.097 630.46 422.023 620.24 426.431C598.14 435.973 571.77 448.287 558.19 466.172C547.678 479.888 538.862 494.825 531.936 510.657C528.055 519.551 525.614 534.534 517.615 539.128C517.332 539.291 517.015 539.413 516.727 539.582C503.293 547.324 495.495 534.65 494.921 533.838C492.709 530.702 492.375 527.971 490.765 524.3C487.565 517.007 483.228 509.05 480.024 501.76C477.724 496.535 476.359 491.66 473.461 486.932C463.942 471.4 451.25 456.91 436.467 446.598C422.258 436.686 403.386 429.405 386.942 422.279C377.462 418.171 369.316 416.588 366.655 405.671C362.728 389.566 385.801 384.271 395.296 380.171C429.436 365.421 453.696 349.928 472.268 319.671C479.842 307.329 484.968 291.531 490.768 278.152C492.556 274.024 493.06 269.703 495.541 266.289C499.135 261.331 503.776 260.238 505.865 260.238ZM663.2 488.838C670.91 504.377 676.9 520.66 690.25 530.538C695.974 534.752 702.137 538.335 708.63 541.226C713.43 543.326 718.71 544.662 721.07 548.946C723.36 553.253 721.87 556.846 718.67 559.368C705.82 567.658 690.43 570.738 681.36 582.798C677.505 587.732 673.942 592.887 670.69 598.238C667.99 602.898 667.72 608.548 664.77 613.078C664.106 614.01 663.259 614.797 662.281 615.39C661.302 615.983 660.213 616.37 659.08 616.528C658.734 616.568 658.384 616.561 658.04 616.508C646.19 615.178 647.26 604.128 642.24 595.858C636.67 586.678 628.73 577.228 619.72 571.508C610.77 565.828 599.51 562.408 593.42 556.938C592.09 556.667 591.54 551.076 593.05 548.946C595.55 541.963 608.34 540.746 614.39 537.07C625.53 530.276 634.878 520.908 641.65 509.754C644.93 504.354 646.4 492.736 651.72 488.754C652.261 487.962 653.002 487.327 653.868 486.915C654.734 486.503 655.694 486.328 656.65 486.408C659.08 486.414 662.08 486.566 663.2 488.836V488.838ZM429.673 724.6C441.233 724.594 452.535 728.017 462.149 734.435C471.764 740.853 479.259 749.978 483.688 760.656C488.116 771.334 489.278 783.086 487.027 794.424C484.777 805.763 479.214 816.18 471.043 824.357C462.872 832.534 452.459 838.104 441.122 840.363C429.785 842.622 418.033 841.469 407.352 837.048C396.67 832.628 387.54 825.139 381.115 815.529C374.69 805.919 371.259 794.62 371.256 783.06C371.251 767.561 377.403 752.696 388.358 741.732C399.313 730.769 414.174 724.607 429.673 724.6ZM685.92 724.6C697.48 724.595 708.781 728.018 718.395 734.437C728.01 740.855 735.505 749.98 739.932 760.658C744.36 771.336 745.522 783.088 743.271 794.426C741.02 805.765 735.457 816.181 727.286 824.358C719.115 832.534 708.702 838.104 697.365 840.363C686.028 842.622 674.276 841.468 663.595 837.048C652.914 832.627 643.784 825.139 637.359 815.529C630.934 805.919 627.503 794.62 627.5 783.06C627.495 775.385 629.002 767.784 631.936 760.692C634.869 753.599 639.172 747.154 644.597 741.725C650.022 736.296 656.464 731.989 663.554 729.051C670.645 726.113 678.245 724.6 685.92 724.6Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_37_1062">
                <rect width="903.5" height="841.5" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Sign up with Shopeasy
        </button>
      </div>

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
  );
};

export default Register;
