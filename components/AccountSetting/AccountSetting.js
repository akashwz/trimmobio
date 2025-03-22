import { Transition } from "@/controller/Transitions";
import useDebounce from "@/customhooks/useDebounce";
import {
  checkUserName,
  deleteAccount,
  editUser,
  logOut,
  passwordChange,
} from "@/redux/Action/auth.action";
import { CircularProgress, Dialog, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { EyeFill, EyeSlashFill, X } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";

const AccountSetting = () => {
  const [openPopUp, setOpenPopUp] = useState();
  const [openPopUpPublish, setOpenPopUpPublish] = useState();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state?.authReducer);
  const { userNames, emailPhoneStatus } = useSelector((state) => state.authReducer);
  const url = process.env.NEXT_PUBLIC_APP_URL + `/${userData?.data?.username}`;
  const { loader } = useSelector((state) => state.errorReducer);

  const handlePopUpOpen = () => {
    setOpenPopUp(true);
  };

  const handlePopUpOpenPublish = () => {
    setOpenPopUpPublish(true);
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (userData?.data) {
      setFormData({
        username: userData.data.username || "",
        email: userData.data.email || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handlePopUpClose = () => {
    setOpenPopUp(false);
  };

  const handlePopUpClosePublish = () => {
    setOpenPopUpPublish(false);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editUser({
        username: formData?.username,
      }),
    );
  };

  const handleDelete = async () => {
    const deletData = await dispatch(deleteAccount());
    if (deletData?.code === 200) {
      dispatch(logOut());
    }
    setOpenPopUp(false);
  };

  const handleUnPublishAccount = async () => {
    const deletData = await dispatch(
      editUser({
        is_published: userData?.data?.is_published === false ? true : false,
      }),
    );
    if (deletData?.success) {
      setOpenPopUpPublish(false);
    }
  };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const userNameRegex = /^[a-z0-9-!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]{5,60}$/;
  const userNameRegex = /^[a-z0-9-]{5,60}$/;
  const debouncedUserName = useDebounce(formData?.username, 1000);
  const [userNameError, setUserNameError] = useState(false);
  const [userNameErrorContent, setUserNameErrorContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBlurUsername = async (e) => {
    const value = e.target.value;
    if (userNameRegex.test(value)) {
      setUserNameError(false);
      setUserNameErrorContent(userNames?.data?.message);
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLoading(false);

      dispatch(checkUserName(e.target.value));

      console.log(userNames?.data, "userNames?.data?.username-=->>");

      if (userNames?.data?.username === false) {
        setUserNameError(true);
        setUserNameErrorContent(userNames?.data?.message);
      }
    } else {
      setUserNameError(true);
      setUserNameErrorContent("Username is invalid format.");
    }
  };

  // useEffect(() => {
  //   if (debouncedUserName && !userNameError) {
  //     dispatch(checkUserName(debouncedUserName));
  //   }
  // }, [debouncedUserName]);

  const togglePasswordVisibility = (type) => {
    if (type === "current") {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (type === "new") {
      setShowNewPassword(!showNewPassword);
    } else if (type === "confirm") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
    validateForm(e.target.value, newPassword, confirmPassword);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    validateForm(currentPassword, e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validateForm(currentPassword, newPassword, e.target.value);
  };

  const validateForm = (currentPwd, newPwd, confirmPwd) => {
    const isValid =
      currentPwd.length > 0 && newPwd.length > 0 && confirmPwd.length > 0 && newPwd === confirmPwd;
    setIsButtonEnabled(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpVerify = await dispatch(
      passwordChange({
        password: currentPassword,
        new_password: newPassword,
      }),
    );
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full">
          <h1 className="text-lg font-semibold mb-4">My information</h1>
          <form onSubmit={handleUserSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={formData.username.toLowerCase()}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full mt-2 bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
                onBlur={handleBlurUsername}
              />
              <p className="w-full text-sm mt-1 text-gray-400">{url}</p>
              {userNameError && (
                <p className="w-full flex mx-auto text-sm text-left mt-0.5 text-red-500">
                  {userNameErrorContent}
                </p>
              )}

              {!userNameError && formData?.username?.length > 0 && loading && (
                <p className="w-full flex mx-auto text-sm text-left mt-0.5 text-blue-500">
                  Checking availability...
                </p>
              )}

              {!userNameError &&
                formData?.username?.length > 0 &&
                !loading &&
                userNames?.data?.username === true && (
                  <p className="w-full flex mx-auto text-sm text-left mt-0.5 text-green-500">
                    {userNameErrorContent}
                  </p>
                )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full mt-2 bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
                disabled
              />
            </div>

            <button
              type="submit"
              className="btn-green !py-2 hover:bg-[#ebff57] hover:!text-[#000] !text-white hover:border-[#ebff57] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white items-center flex justify-center"
              disabled={loader || userNames?.data?.username === false}
            >
              Save details &nbsp; {loader && <CircularProgress color="inherit" size={20} />}
            </button>
          </form>
        </div>
      </div>
      {!userData?.data?.social_login && (
        <div className="flex justify-center items-center mt-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full">
            <h1 className="text-lg font-semibold mb-4">Change Password</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="current-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    id="current-password"
                    placeholder="Enter your current password"
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                    className="w-full mt-1 bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showCurrentPassword ? (
                      <EyeSlashFill className="w-4 h-4" />
                    ) : (
                      <EyeFill className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="new-password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    className="w-full mt-1 bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showNewPassword ? (
                      <EyeSlashFill className="w-4 h-4" />
                    ) : (
                      <EyeFill className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="w-full mt-1 bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashFill className="w-4 h-4" />
                    ) : (
                      <EyeFill className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn-green !py-2 hover:bg-[#ebff57] hover:!text-[#000] !text-white hover:border-[#ebff57] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white items-center flex justify-center"
                disabled={loader}
              >
                Save details &nbsp; {loader && <CircularProgress color="inherit" size={20} />}
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-lg font-semibold mb-2">Publish profile</h1>
            <p>
              Your account has been unpublished. It is no longer visible to others, but you can
              republish it anytime to restore visibility.
            </p>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className={`w-full font-medium py-2 px-4 rounded-full cursor-pointer focus:outline-none focus:ring-2 transition-all duration-200 ${
                userData?.data?.is_published
                  ? "bg-red-600 text-white hover:bg-red-500 focus:ring-red-600"
                  : "bg-[#26D367] text-white hover:bg-green-500 focus:ring-[#26D367]"
              }`}
              onClick={handlePopUpOpenPublish}
            >
              {userData?.data?.is_published === false ? "Click to publish" : "Click to unpublished"}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div>
            <h1 className="text-lg font-semibold mb-2">Delete my bio</h1>
            <p>
              Your account will be permanently deleted after 90 days. However, if you attempt to log
              in within this period, your account and all associated profiles can be restored.
            </p>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full text-red-500 border-2 hover:bg-red-200 border-solid border-red-500 cursor-pointer font-medium py-2 px-4 rounded-full transition-all duration-200"
              onClick={handlePopUpOpen}
            >
              Delete account
            </button>
          </div>
        </div>
      </div>

      <Dialog
        open={openPopUp}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handlePopUpClose()}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            maxWidth: "800px !important",
            width: "100%",
            borderRadius: "12px",
          },
        }}
      >
        <div className="bg-white shadow-lg rounded-lg p-6 z-50">
          <div className="flex text-primary items-center justify-between">
            <p className="text-lg font-medium">
              Are you sure you want to delete this Trimmo account?
            </p>
            <button
              onClick={(e) => {
                e.preventDefault;
                handlePopUpClose();
              }}
              className="close-btn hover:bg-gray-200"
            >
              <Tooltip title="close">
                <X className="w-7 h-7" />
              </Tooltip>
            </button>
          </div>
          <hr className="my-4 main-border-color"></hr>
          <div className="flex space-x-2">
            <button
              className="px-5 w-[130px] py-2 me-2 text-sm rounded-full text-white bg-red-600 hover:bg-red-700 hover:shadow transition-all duration-300 items-center flex justify-center"
              onClick={() => handleDelete()}
            >
              Yes, delete &nbsp; {loader && <CircularProgress color="inherit" size={20} />}
            </button>
            <button
              className="px-5 py-2 text-sm rounded-full text-black font-medium bg-transparent border border-black  transition-all duration-300"
              onClick={() => handlePopUpClose()}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={openPopUpPublish}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handlePopUpClosePublish()}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            maxWidth: "800px !important",
            width: "100%",
            borderRadius: "12px",
          },
        }}
      >
        <div className="bg-white shadow-lg rounded-lg p-6 z-50">
          <div className="flex text-primary items-center justify-between">
            <p className="text-lg font-medium">
              Are you sure you want to{" "}
              {userData?.data?.is_published === false ? "publish" : "unpublished"} this Trimmo
              account?
            </p>
            <button
              onClick={(e) => {
                e.preventDefault;
                handlePopUpClosePublish();
              }}
              className="close-btn hover:bg-gray-200"
            >
              <Tooltip title="close">
                <X className="w-7 h-7" />
              </Tooltip>
            </button>
          </div>
          <hr className="my-4 main-border-color"></hr>
          <div className="flex space-x-2">
            <button
              className={`px-5 py-2 me-2 text-sm rounded-full ${
                userData?.data?.is_published
                  ? "bg-red-600 text-white hover:bg-red-500 focus:ring-red-600"
                  : "bg-[#26D367] text-white hover:bg-green-500 focus:ring-[#26D367]"
              } transition-all duration-300 items-center flex justify-center`}
              onClick={() => handleUnPublishAccount()}
            >
              Yes , &nbsp;
              {userData?.data?.is_published === false ? "publish" : "unpublished"} &nbsp;{" "}
              {loader && <CircularProgress color="inherit" size={20} />}
            </button>
            <button
              className="px-5 py-2 text-sm rounded-full text-black font-medium bg-transparent border border-black  transition-all duration-300"
              onClick={() => handlePopUpClosePublish()}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AccountSetting;
