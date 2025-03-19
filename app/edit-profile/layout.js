"use client";

import Sidebar from "@/components/edit-profile/Sidebar";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

export default function RootLayout({ children }) {
  const { loader } = useSelector((state) => state.errorReducer);
  return (
    <div className="profile h-screen bg-[#F1F0E6] justify-between w-screen overflow-hidden flex items-start">
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
