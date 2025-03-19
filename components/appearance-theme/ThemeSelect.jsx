import { getTheme } from "@/redux/Action/appearance.action";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ThemeSelect = ({
  expandedSelectTheme,
  handleChangeSelectTheme,
  selectedImage,
  handleThemeSelect,
}) => {
  const { appreanceTheme } = useSelector((state) => state?.appreanceReducer);
  const { getThemeData } = useSelector((state) => state?.appreanceReducer);
  const [theme, setTheme] = useState(appreanceTheme || "bold");
  const dispatch = useDispatch();

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  const fetchTheme = async () => {
    try {
      const data = await dispatch(getTheme());
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  return (
    <div className="mt-5">
      <Accordion expanded={expandedSelectTheme} onChange={handleChangeSelectTheme}>
        <AccordionSummary
          expandIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-caret-down"
              viewBox="0 0 16 16"
            >
              <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
            </svg>
          }
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span" variant="h6" style={{ fontWeight: 600 }}>
            Select Theme
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {getThemeData
              ?.filter((item) => item.status)
              .map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={item.image}
                    alt={`Phone ${index + 1}`}
                    className={`cursor-pointer p-2 ${
                      selectedImage === item?._id
                        ? "border-2 border-black"
                        : "border-2 border-transparent"
                    } rounded-lg`}
                    onClick={() => {
                      handleThemeSelect(index, item?._id);
                      handleThemeChange(item.themeType);
                    }}
                  />
                  <Typography variant="caption" className="mt-2">
                    {item.name}
                  </Typography>
                </div>
              ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ThemeSelect;
