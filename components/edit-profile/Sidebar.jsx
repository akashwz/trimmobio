"use client";

import Image from "next/image";
import React, { useState } from "react";
import { BoxArrowLeft, Link45deg } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationPopUp from "../confirmation-popup/ConfirmationPopUp";
import { logOut } from "@/redux/Action/auth.action";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AppearanceIcon from "../IconComponent/AppearanceIcon";
import AnalyticsIcon from "../IconComponent/AnalyticsIcon";
import SettingsIcon from "../IconComponent/SettingsIcon";
import AppsIcon from "../IconComponent/AppsIcon";
import Newslatter from "../IconComponent/Newslatter";

const Sidebar = () => {
  const { bioData } = useSelector((state) => state?.authReducer);
  const hasNewsletterAccess = bioData?.authorize_app?.some(
    (app) => app._id === "67a03fb743859a78cba94114",
  );

  const menuItems = [
    { href: "/edit-profile", label: "Link", icon: <Link45deg className="w-6 h-6" /> },
    { href: "/appearance", label: "Appearance", icon: <AppearanceIcon /> },
    { href: "/analytics", label: "Analytics", icon: <AnalyticsIcon /> },
    { href: "/setting", label: "Settings", icon: <SettingsIcon /> },
    hasNewsletterAccess && {
      href: "/newslatter",
      label: "Newsletters",
      icon: <Newslatter />,
    },
    { href: "/apps", label: "Apps", icon: <AppsIcon /> },
  ].filter(Boolean);

  const dispatch = useDispatch();
  const location = usePathname();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [leaveModel, setLeaveModel] = useState(false);

  const closePopUp = () => {
    setShowModal(false);
    setLeaveModel(false);
  };
  const handleLogOut = () => {
    dispatch(logOut());
    setShowModal(false);
  };
  const handleLeave = () => {
    localStorage.setItem("isSaveEnabled", false);
    setLeaveModel(false);
  };
  const handleLeavePopup = () => {
    setLeaveModel(true);
    router.push("/edit-profile");
  };

  const handleNavigation = (e, path) => {
    e.stopPropagation();
    router.push(path);
  };

  return (
    <>
      {/* Sidebar for larger screens */}
      <div className="hidden md:block md:min-w-[230px] max-w-[230px] h-screen bg-[#F1F0E6] border-r border-[#000000] border-opacity-10">
        <div className="logo p-4">
          <Link href="/" passHref>
            <Image
              src="/images/trimmo-black-logo.svg"
              width={120}
              height={28}
              alt="trimmo-black-logo"
              className="max-w-[120px] hidden md:inline-block cursor-pointer"
            />
          </Link>
        </div>
        <div className="menu mt-4 px-2 sidebar">
          <ul className="p-0 flex flex-col m-0 cursor-pointer">
            {menuItems.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center text-[15px] font-semibold gap-1 ${
                  location === href ? "active" : ""
                }`}
              >
                {icon}
                <span className="hidden md:block">{label}</span>
              </Link>
            ))}

            <li
              className="flex items-center text-[15px] font-semibold gap-1 mt-1 hover:bg-red-200 rounded-[10px] pt-2 pb-2"
              onClick={() => setShowModal(true)}
            >
              <BoxArrowLeft fill="red" className="w-5 h-5 ml-2" />
              <span className="text-red-500 hidden md:block">Logout</span>
            </li>
          </ul>
        </div>
        <ConfirmationPopUp
          heading="Sign out"
          subheading="Are you sure you want to sign out?"
          confirmationPopup={showModal}
          runFunction={handleLogOut}
          handleCloseConfirm={closePopUp}
          confirmButton="Yes"
        />
        <ConfirmationPopUp
          heading="Leave page"
          subheading="Are you sure you want to leave this page?"
          confirmationPopup={leaveModel}
          runFunction={handleLeave}
          handleCloseConfirm={closePopUp}
          confirmButton="Leave"
        />
      </div>

      {/* Bottom navigation bar for smaller screens */}
      <div className="fixed bottom-0 w-full bg-[#F1F0E6] border-t border-[#000000] border-opacity-10 md:hidden flex justify-around items-center py-3 z-50">
        {menuItems.map(({ href, label, icon }) => (
          <button
            key={href}
            onClick={(e) => handleNavigation(e, href)}
            className={`${location === href ? "text-blue-500" : ""} flex flex-col items-center`}
          >
            {icon}
            <span className="text-[12px]">{label}</span>
          </button>
        ))}
        <div
          onClick={() => setShowModal(true)}
          className="flex flex-col items-center cursor-pointer"
        >
          <BoxArrowLeft fill="red" className="w-6 h-6" />
          <span className="text-[12px] text-red-500">Logout</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
