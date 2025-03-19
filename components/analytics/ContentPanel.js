"use client";

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ReactApexChart from "react-apexcharts";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import moment from "moment";
import { viewAnalytics, viewBioLinks, viewAnalyticsIds } from "@/redux/Action/analytics.action";

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

export default function ContentPanel() {
  const dispatch = useDispatch();
  const { analyticsSingleIdData } = useSelector((state) => state?.analyticsIdReducer);
  const { analyticsTotalClickData } = useSelector((state) => state?.analyticsTotalClickReducer);

  const [value, setValue] = useState(0);
  const [selectedLinkId, setSelectedLinkId] = useState("");
  const [selectedShopId, setSelectedShopId] = useState("");
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [linkData, setLinkData] = useState([]);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const chartWidth = isLargeScreen ? "100%" : isMediumScreen ? "90%" : "100%";
  const chartHeight = isLargeScreen ? 500 : isMediumScreen ? 400 : 300;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      const bioLinksData = await dispatch(viewBioLinks());
      setLinkData(bioLinksData?.social_media || []);
      setShopData(bioLinksData?.shop || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      const selectedId = value === 0 ? selectedLinkId : selectedShopId;
      if (selectedId) {
        dispatch(viewAnalyticsIds("", "", selectedId));
      }
    };
    fetchAnalyticsData();
  }, [selectedLinkId, selectedShopId, value, dispatch]);

  useEffect(() => {
    if (analyticsSingleIdData) {
      const totalClicks = analyticsSingleIdData?.map((elem) => elem?.totalClicks);
      const uniqueClicks = analyticsSingleIdData?.map((elem) => elem?.uniqueClicks);
      const date = analyticsSingleIdData.map((elem) =>
        elem?.date ? moment(elem.date).format("D MMM") : "",
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
      ]);
      setCategories(date);
    }
  }, [analyticsSingleIdData]);

  const handleOptionChange = (event) => {
    const newValue = event.target.value;

    if (value === 0) {
      setSelectedLinkId(newValue);
    } else {
      setSelectedShopId(newValue);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 2 }}>
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
          <Tab label="Links" {...a11yProps(0)} />
          <Tab label="Shop" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <Box sx={{ width: isLargeScreen ? "100%" : "auto", maxWidth: "1200px", mx: "auto" }}>
          <select className="border p-2" onChange={handleOptionChange} value={selectedLinkId}>
            <option value="">Select a Link</option>
            {linkData?.map((obj) => (
              <option key={obj?._id} value={obj?._id}>
                {obj?.name}
              </option>
            ))}
          </select>
          <ReactApexChart
            options={{ xaxis: { categories } }}
            series={chartData}
            type="area"
            width={chartWidth}
            height={chartHeight}
          />
        </Box>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <Box sx={{ width: isLargeScreen ? "100%" : "auto", maxWidth: "1200px", mx: "auto" }}>
          <select className="border p-2" onChange={handleOptionChange} value={selectedShopId}>
            <option value="">Select a Shop</option>
            {shopData?.map((obj) => (
              <option key={obj?._id} value={obj?._id}>
                {obj?.name}
              </option>
            ))}
          </select>
          <ReactApexChart
            options={{ xaxis: { categories } }}
            series={chartData}
            type="area"
            width={chartWidth}
            height={chartHeight}
          />
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
