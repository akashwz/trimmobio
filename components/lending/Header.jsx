import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { userData } = useSelector((state) => state?.authReducer || {});

  return (
    <header className="ps-3 lg:ps-6 sticky top-6 z-50 pe-3 lg:pe-4">
      <div className="logo">
        <img src="/images/Trimmo-Logo.svg" alt="logo" />
      </div>
      {/* <nav className='hidden lg:block'>
            <ul className='text-base gap-6'>
                <li>
                    <Link href="/">Templates</Link>
                </li>
                <li>
                    <Link href="/">Marketplace</Link>
                </li>
                <li>
                    <Link href="/">Discover</Link>
                </li>
                <li>
                    <Link href="/">Pricing Plan</Link>
                </li>
                <li>
                    <Link href="/">Learn</Link>
                </li>
            </ul>
        </nav> */}
      <div className="relative">
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href={getCookie("token") ? "/edit-profile" : "/login"}
            className="btn-outline hover:border-[#ebff57] hover:text-[#ebff57]"
          >
            {getCookie("token") ? "My Account" : "Log in"}
          </Link>
          {!getCookie("token") && (
            <Link href="/register" className="btn hover:bg-[#ebff57] hover:text-[#000]">
              Sign Up
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="flex md:hidden items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl focus:outline-none">
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="#ffffff"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="#ffffff"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
              </svg>
            )}
          </button>
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
            <Link href="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Log in
            </Link>
            <Link href="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
