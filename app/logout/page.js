"use client";

import { logOut } from "@/redux/Action/auth.action";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Logout = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const loginParam = searchParams.get("login");

    if (searchParams.toString() === "logout=yes") {
      dispatch(logOut());
    }
  }, [searchParams, dispatch]);

  return <div></div>;
};

export default Logout;
