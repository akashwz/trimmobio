import Image from "next/image";
import React from "react";

const Footer = () => {
  const productsArray = [
    {
      link: `The Trimmo Blog`,
      redirect: "/",
      target: `_self`,
    },
    {
      link: `Engineering Blog`,
      redirect: "/",
      target: `_self`,
    },
    {
      link: `Marketplace`,
      redirect: "/",
      target: `_self`,
    },
    {
      link: `What's New`,
      redirect: "/",
      target: `_self`,
    },
    {
      link: `About`,
      redirect: "/",
      target: `_self`,
    },
    {
      link: `Press`,
      redirect: "/",
      target: `_self`,
    },

    {
      link: `Careers`,
      redirect: "/",
      target: `_self`,
    },
  ];
  const shopeasyArray = [
    {
      link: `Trimmo for Enterprise`,
      redirect: "/",
      target: `_self`,
    },
    {
      link: `2023 Creator Report`,
      redirect: "/",
      target: `_self`,
    },
    {
      link: `Charities`,
      redirect: "/",
      target: `_self`,
    },
    {
      link: `What's Trending`,
      redirect: "/",
      target: `_self`,
    },
    {
      link: `Creator Profile Directory`,
      redirect: "/",
      target: `_self`,
    },
    {
      link: `Explore Templates`,
      redirect: "/",
      target: `_self`,
    },
  ];
  const developerArray = [
    {
      link: `Help Topics`,
      redirect: "/help",
      target: `_self`,
    },
    {
      link: `Getting Started`,
      redirect: "/",
      target: `_self`,
    },
    {
      link: `Trimmo Pro`,
      redirect: "/",
      target: `_self`,
    },
    {
      link: `Features & How-Tos`,
      redirect: "/",
      target: `_self`,
    },
    {
      link: `FAQs`,
      redirect: "/",
      target: `_self`,
    },
    {
      link: `Report a Violation`,
      redirect: "/",
      target: `_self`,
    },
  ];
  const supportArray = [
    {
      link: `Terms & Conditions`,
      redirect: "/",
      target: `_blank`,
    },
    {
      link: `Privacy Notice`,
      redirect: "/",
      target: `_blank`,
    },
    {
      link: `Cookie Notice`,
      redirect: "/",
      target: `_self`,
    },
    {
      link: `Trust Center`,
      redirect: "/",
      target: `_self`,
    },
    {
      link: `Cookie Preferences`,
      redirect: "/",
      target: `_self`,
    },
  ];

  return (
    <footer className="container ">
      <div className="grid p-6 lg:p-14 rounded-xl bg-[#29292B] grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-4">
        <div className="flex flex-col space-y-2">
          <h6 className="text-[#F1F0E6] font-medium mb-3 text-[24px]">Company</h6>
          {productsArray?.map((elem, index) => {
            return (
              <a
                key={index}
                target={elem?.target}
                className="text-[#F1F0E6] text-sm font-light"
                href={elem?.redirect}
              >
                {elem?.link}
              </a>
            );
          })}
        </div>
        <div className="flex flex-col space-y-2">
          <h6 className="text-[#F1F0E6] font-medium mb-3 text-[24px]">Community</h6>
          {shopeasyArray?.map((elem, index) => {
            return (
              <a
                key={index}
                target={elem?.target}
                className="text-[#F1F0E6] text-sm font-light"
                href={elem?.redirect}
              >
                {elem?.link}
              </a>
            );
          })}
        </div>
        <div className="flex flex-col space-y-2">
          <h6 className="text-[#F1F0E6] font-medium mb-3 text-[24px]">Support</h6>
          {developerArray?.map((elem, index) => {
            return (
              <a
                key={index}
                target={elem?.target}
                className="text-[#F1F0E6] text-sm font-light"
                href={elem?.redirect}
              >
                {elem?.link}
              </a>
            );
          })}
        </div>
        <div className="flex flex-col space-y-2">
          <h6 className="text-[#F1F0E6] font-medium mb-3 text-[24px]">Trust & Legal</h6>
          {supportArray?.map((elem, index) => {
            return (
              <a
                key={index}
                target={elem?.target}
                className="text-[#F1F0E6] text-sm font-light"
                href={elem?.redirect}
              >
                {elem?.link}
              </a>
            );
          })}
        </div>
      </div>
      {/* <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 rounded-xl bg-[#29292B] p-6 lg:p-10">
          <div className="flex items-center">
            <p className="text-[30px] font-bold m-0 text-[#F1F0E6]">We Are Available On</p>
          </div>
          <div className="flex flex-wrap items-center">
            <ul className="text-sm font-normal text-[#F1F0E6] flex flex-wrap items-center justify-center gap-4 text-center m-0 p-0">
              <li>Help Center</li>
              <li>|</li>
              <li>Terms of Service</li>
              <li>|</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="flex items-center justify-end">
            <Image src="/images/footer-img.svg" alt="footer-img" height={500} width={300} className="inline-block max-w-[95%] max-h-full"/>
          </div>
      </div> */}
    </footer>
  );
};

export default Footer;
