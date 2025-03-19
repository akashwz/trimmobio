"use client";

import React from "react";
import { Eye, Link45deg, Percent, PersonAdd } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

const Timeline = () => {
  const { analyticsData } = useSelector((state) => state?.analyticsReducer);
  const { analyticsTotalData } = useSelector((state) => state?.analyticsTotalReducer);

  return (
    <div className="flex flex-col gap-4 px-4 pb-[140px] md:pb-4">
      <div className="p-8 bg-white rounded-lg w-full scroll-mt-[150px] sm:scroll-mt-[125px]">
        <div className="flex items-center gap-2 mb-5">
          <p className="text-black text-md font-semibold leading-heading !text-lg">Lifetime</p>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2">
            <div className="order-1 md:order-1 flex gap-4 items-center">
              <div className="rounded-[12px] h-16 w-16 p-4 shrink-0 bg-[#f1f0e6] flex items-center justify-center overflow-hidden">
                <Eye className="w-14 h-14" />
              </div>
              <div className="flex-wrap items-center">
                <h3 className="text-3xl font-semibold leading-heading">
                  {analyticsTotalData?.totalViews}
                </h3>
                <p className="text-[#676B5F] text-sm leading-none">Views</p>
              </div>
            </div>
            <div className="order-1 md:order-1 flex gap-4 items-center">
              <div className="rounded-[12px] h-16 w-16 p-4 shrink-0 bg-[#f1f0e6] flex items-center justify-center overflow-hidden">
                <Link45deg className="w-14 h-14" />
              </div>
              <div className="flex-wrap items-center">
                <h3 className="text-3xl font-semibold leading-heading">
                  {analyticsTotalData?.totalClicks}
                </h3>
                <p className="text-[#676B5F] text-sm leading-none">Clicks</p>
              </div>
            </div>

            <div className="order-1 md:order-1 flex gap-4 items-center">
              <div className="rounded-[12px] h-16 w-16 p-4 shrink-0 bg-[#f1f0e6] flex items-center justify-center overflow-hidden">
                <PersonAdd className="w-14 h-14" />
              </div>
              <div className="flex-wrap items-center">
                <h3 className="text-3xl font-semibold leading-heading">
                  {analyticsTotalData?.uniqueViews}
                </h3>
                <p className="text-[#676B5F] text-sm leading-none">Unique Views</p>
              </div>
            </div>
            <div className="order-1 md:order-1 flex gap-4 items-center">
              <div className="rounded-[12px] h-16 w-16 p-4 shrink-0 bg-[#f1f0e6] flex items-center justify-center overflow-hidden">
                <Percent className="w-14 h-14" />
              </div>
              <div className="flex-wrap items-center">
                <h3 className="text-3xl font-semibold leading-heading">
                  {analyticsTotalData?.uniqueClicks}
                </h3>
                <p className="text-[#676B5F] text-sm leading-none">Unique Clicks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
