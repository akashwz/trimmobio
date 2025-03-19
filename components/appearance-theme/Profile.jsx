import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useState } from "react";
import EditBio from "../edit-bio/EditBio";
import { useDispatch, useSelector } from "react-redux";
import { clearEditData } from "@/redux/Action/auth.action";
import SelectPlatformPopup from "../SelectPlatformPopup/SelectPlatformPopup";

const Profile = ({ expandedProfile, handleChangeProfile }) => {
  const [bioPopup, setBioPopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { userData } = useSelector((state) => state?.authReducer);
  const [showPlatform, setShowPlatform] = useState(false);
  const [showOptions, setShowOptions] = useState({
    show: false,
    widget_name: "",
  });

  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const closeBioPopup = () => {
    setBioPopup(false);
    dispatch(clearEditData());
  };

  const closePlatformPopup = () => {
    setShowPlatform(false);
    setShowOptions({ show: false, widget_name: "" });
  };

  return (
    <div>
      <Accordion expanded={expandedProfile} onChange={handleChangeProfile}>
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
            Profile
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="space-y-4 p-4">
            <button
              className="flex items-center justify-center w-full p-4 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50"
              onClick={() => {
                setBioPopup(true);
                setAnchorEl(null);
              }}
            >
              <span className="mr-3">
                <img src="/images/gallery.svg" alt="Edit" className="w-5 h-5" />
              </span>
              <span className="text-gray-700 font-medium">Edit display name and bio</span>
            </button>

            <button
              className="flex items-center justify-center w-full p-4 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50"
              onClick={() => setShowPlatform(true)}
            >
              <span className="mr-3">
                <img src="/images/add-icon.svg" alt="Add Social Icons" className="w-5 h-5" />
              </span>
              <span className="text-gray-700 font-medium">Add social icons</span>
            </button>
          </div>
        </AccordionDetails>
      </Accordion>
      <EditBio
        userName={userData?.data?.username}
        bioPopup={bioPopup}
        handleBioCloseConfirm={closeBioPopup}
      />
      <SelectPlatformPopup
        showPlatform={showPlatform}
        closePlatformPopup={closePlatformPopup}
        username={userData?.data?.username}
      />
    </div>
  );
};

export default Profile;
