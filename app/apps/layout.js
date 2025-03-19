"use client";

import Sidebar from "@/components/edit-profile/Sidebar";
import { Backdrop, CircularProgress } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function RootLayout({ children }) {
  const router = useRouter();
  const { loader } = useSelector((state) => state.errorReducer);
  return (
    <div className="profile h-screen bg-[#F1F0E6] w-screen overflow-hidden flex">
      {/* {loader && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
          className="flex flex-col"
        >
          <CircularProgress color="inherit" />
          <p>Loading...</p>
        </Backdrop>
      )} */}
      <Sidebar />
      {children}
    </div>
  );
}
