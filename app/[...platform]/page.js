"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { socialLogin, thirdPartyAuth } from "@/redux/Action/auth.action";
import { encryptDevData } from "@/utils/encryptionUtils";
import { CircularProgress } from "@mui/material";

const Callback = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const code = searchParams.get("code");
  const unwrappedParams = React.use(params);
  const platform = unwrappedParams?.platform;
  const [loading, setLoading] = useState(true);

  const fetchDataToken = async () => {
    if (token) {
      const socialData = { shopeasyToken: token };
      await dispatch(socialLogin(socialData));
      router.push("/about-yourself");
    } else if (code) {
      let authCode;
      const platformMapping = {
        instagram: "67a03fb743859a78cba940fa",
        thread: "67a03fb743859a78cba94102",
        facebook: "67a03fb743859a78cba940f9",
        shopeasy: null,
        pinterest: "67a03fb743859a78cba940fb",
        reddit: "67a03fb743859a78cba940fe",
      };
      if (platform[0] && platformMapping[platform[0]]) {
        authCode = encryptDevData({
          app: platformMapping[platform[0]],
          code: ["67a03fb743859a78cba94102"].includes(platformMapping[platform[0]])
            ? code.replace(/#_$/, "")
            : code,
        });
      } else {
        authCode = code;
      }
      const apiData = await dispatch(thirdPartyAuth(authCode));
      if (apiData?.code === 200 && typeof window !== "undefined") {
        window.close();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDataToken();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      {loading ? (
        <div className="flex flex-col items-center">
          <CircularProgress color="inherit" />
          <p className="mt-4 text-lg text-gray-700">Processing authentication...</p>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Authentication Complete</h1>
          <p className="text-gray-600 mt-2">You may close this window now.</p>
        </div>
      )}
    </div>
  );
};

export default Callback;
