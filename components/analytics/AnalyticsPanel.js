"use client";

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ReactApexChart from "react-apexcharts";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AnalyticsPanel() {
  const { analyticsData } = useSelector((state) => state?.analyticsReducer);
  const { analyticsTotalClickData } = useSelector((state) => state?.analyticsTotalClickReducer);
  const [value, setValue] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [chartClickData, setChartClickData] = useState([]);
  const [categories, setCategories] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const options = {
    xaxis: {
      categories: categories,
    },
  };
  useEffect(() => {
    if (analyticsData) {
      const totalClicks = analyticsData?.map((elem) => elem?.totalClicks);
      const totalViews = analyticsData?.map((elem) => elem?.totalViews);
      const uniqueClicks = analyticsData?.map((elem) => elem?.uniqueClicks);
      const uniqueViews = analyticsData?.map((elem) => elem?.uniqueViews);
      const date = analyticsData.map((elem) =>
        elem?.date ? moment(elem.date).format("D MMM ") : "",
      );
      setChartData([
        {
          name: "TotalClicks",
          data: totalClicks,
        },
        {
          name: "UniqueClicks",
          data: uniqueClicks,
        },
        {
          name: "TotalViews",
          data: totalViews,
        },
        {
          name: "UniqueViews",
          data: uniqueViews,
        },
      ]);
      setCategories(date);
    }
  }, [analyticsData]);

  useEffect(() => {
    if (analyticsTotalClickData) {
      const totalClickRate = analyticsTotalClickData?.map((elem) => elem?.clickRate);

      const date = analyticsTotalClickData.map((elem) =>
        elem?.date ? moment(elem.date).format("D MMM") : "",
      );
      setChartClickData([
        {
          name: "TotalClickRate",
          data: totalClickRate,
        },
      ]);
      setCategories(date);
    }
  }, [analyticsTotalClickData]);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const chartWidth = isLargeScreen ? "100%" : isMediumScreen ? "90%" : "100%";
  const chartHeight = isLargeScreen ? 500 : isMediumScreen ? 400 : 300;

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          pb: 2,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="custom tabs example"
          TabIndicatorProps={{
            style: { backgroundColor: "#26D367", height: "4px", borderRadius: "2px" },
          }}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              color: "#000000",
              fontSize: "1rem",
              fontWeight: 500,
              padding: "10px 20px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
            },
            "& .MuiTab-root:hover": {
              backgroundColor: "#e8f5e9",
            },
            "& .Mui-selected": {
              color: "#26D367",
              backgroundColor: "#e8f5e9",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <Tab label="Views and Clicks" {...a11yProps(0)} />
          <Tab label="Click Rate" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* <div>
          <ReactApexChart
            options={options}
            series={chartData}
            type="area"
            width={1000}
          />
        </div> */}
        <Box
          sx={{
            width: isLargeScreen ? "100%" : "auto",
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          <ReactApexChart
            options={options}
            series={chartData}
            type="area"
            width={chartWidth}
            height={chartHeight}
          />
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box
          sx={{
            width: isLargeScreen ? "100%" : "auto",
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          <ReactApexChart
            options={options}
            series={chartClickData}
            type="area"
            width={chartWidth}
            height={chartHeight}
          />
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
