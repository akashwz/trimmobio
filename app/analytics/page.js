"use client";

import AnalyticsPanel from "@/components/analytics/AnalyticsPanel";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  totalAnalytics,
  totalClickAnalytics,
  viewAnalytics,
  viewAnalyticsIds,
} from "@/redux/Action/analytics.action";
import Timeline from "@/components/analytics/Timeline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ContentPanel from "@/components/analytics/ContentPanel";

const Analytics = () => {
  const dispatch = useDispatch();

  const today = new Date();
  const last7Days = new Date(today);
  last7Days.setDate(today.getDate() - 7);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState([last7Days, today]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (startDate && endDate) {
      callAPIs(startDate, endDate);
    }
  }, []);

  // useEffect(() => {
  //   if (startDate && endDate) {
  //     callAPIsContentId(startDate, endDate);
  //   }
  // }, []);

  const handleFilterClick = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const handleDateChange = (update) => {
    setDateRange(update);

    if (update[0] && update[1]) {
      callAPIs(update[0], update[1]);
    }
  };

  const handleContentDateChange = (update) => {
    setDateRange(update);

    if (update[0] && update[1]) {
      callAPIsContentId(update[0], update[1]);
    }
  };

  const callAPIs = (start, end) => {
    const formattedStartDate = start.toISOString().split("T")[0];
    const formattedEndDate = end.toISOString().split("T")[0];
    setIsCalendarOpen(false);
    dispatch(viewAnalytics(formattedStartDate, formattedEndDate));
    dispatch(totalAnalytics(formattedStartDate, formattedEndDate));
    dispatch(totalClickAnalytics(formattedStartDate, formattedEndDate));
  };

  const callAPIsContentId = (start, end) => {
    const formattedStartDate = start.toISOString().split("T")[0];
    const formattedEndDate = end.toISOString().split("T")[0];
    setIsCalendarOpen(false);
    dispatch(viewAnalyticsIds(formattedStartDate, formattedEndDate, selectedId));
  };

  const [selectedId, setSelectedId] = useState("");

  const handleDropdownChange = async (event) => {
    const [startDate, endDate] = dateRange;
    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];
    setSelectedId(event.target.value);
    dispatch(viewAnalyticsIds(formattedStartDate, formattedEndDate, event.target.value));
  };

  return (
    <div className="h-screen overflow-auto w-full">
      <div className="w-full flex items-center justify-between rounded-lg md:h-[6.25rem] p-6">
        <div className="w-full">
          <h1 className="sm:text-[1.75rem] text-lg font-semibold mr-4">Analytics</h1>
        </div>
      </div>
      <div>
        <Timeline />
      </div>
      <div className="flex-col gap-4 px-4 pb-[140px] md:pb-4 grid sm:grid-cols-2 grid-cols-1">
        <div className="p-8 bg-white rounded-lg w-full scroll-mt-[150px] sm:scroll-mt-[125px]">
          <div className="flex items-start justify-between mb-4 sm:mb-3 relative">
            <div className="flex items-center gap-2">
              <p className="text-black text-md font-semibold leading-heading !text-lg">Activity</p>
            </div>
            <div className="inline-flex relative">
              <button
                onClick={handleFilterClick}
                className="bg-white flex gap-2 items-center px-4 py-3 rounded-[12px] border border-1 border-sand tracking-tight leading-none select-none hover:bg-chalk hover:duration-0 transition focus:outline-none focus:ring-2 ring-offset-1 ring-black active:bg-sand/40 active:duration-150 active:ring-offset-0"
              >
                <span className="font-semibold flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-funnel-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
                  </svg>
                  &nbsp; Filter
                </span>
              </button>
              {isCalendarOpen && (
                <div className="absolute top-12 right-0 z-50 bg-white shadow-lg p-4 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Date Range</label>
                    <DatePicker
                      selected={startDate}
                      onChange={handleDateChange}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      inline
                      maxDate={new Date()}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="flex items-baseline justify-between">
              <AnalyticsPanel />
            </div>
          </div>
        </div>
        <div className="p-8 bg-white rounded-lg w-full scroll-mt-[150px] sm:scroll-mt-[125px]">
          <div className="flex items-start justify-between mb-4 sm:mb-3 relative">
            <div className="flex items-center gap-2">
              <p className="text-black text-md font-semibold leading-heading !text-lg">Content</p>
            </div>
            <div className="inline-flex relative">
              <button
                onClick={handleFilterClick}
                className="bg-white flex gap-2 items-center px-4 py-3 rounded-[12px] border border-1 border-sand tracking-tight leading-none select-none hover:bg-chalk hover:duration-0 transition focus:outline-none focus:ring-2 ring-offset-1 ring-black active:bg-sand/40 active:duration-150 active:ring-offset-0"
              >
                <span className="font-semibold flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-funnel-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
                  </svg>
                  &nbsp; Filter
                </span>
              </button>
              {isCalendarOpen && (
                <div className="absolute top-12 right-0 z-50 bg-white shadow-lg p-4 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Date Range</label>
                    <DatePicker
                      selected={startDate}
                      onChange={handleContentDateChange}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      inline
                      maxDate={new Date()}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="flex items-baseline justify-between">
              <ContentPanel handleDropdownChange={handleDropdownChange} selectedId={selectedId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
