"use client";
import API from "@/api";
import ToastNotification from "@/controller/ToastNotification";
import { Transition } from "@/controller/Transitions";
import useDebounce from "@/customhooks/useDebounce";
import { checkUserName, editUser, getBio } from "@/redux/Action/auth.action";
import { CircularProgress, Dialog, Skeleton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CloudUpload, InfoCircle, X } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";

const EditBio = ({ userName, bioPopup, handleBioCloseConfirm }) => {
  const dispatch = useDispatch();
  const { editData, bioData } = useSelector((state) => state?.authReducer);
  const [userData, setUserData] = useState({
    name: "",
    bio: "",
    profile_picture: "",
    select_profile: "",
    cover_image: "",
  });
  const { loader } = useSelector((state) => state.errorReducer);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelect = (type) => {
    setUserData({ ...userData, select_profile: type });
    setSelectedImage(type);
  };

  const [userNameError, setUserNameError] = useState(false);
  // const userNameRegex = /^[a-zA-Z][a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{2,15}$/;
  const userNameRegex = /^[a-z0-9-]+$/;
  const debouncedUserName = useDebounce(userData?.name, 1000);
  // useEffect(() => {
  //   if (debouncedUserName) {
  //     dispatch(checkUserName(debouncedUserName));
  //   }
  // }, [debouncedUserName]);
  useEffect(() => {
    if (userName) {
      dispatch(getBio(userName));
    }
  }, [userName]);
  useEffect(() => {
    if (bioData) {
      setUserData({
        name: bioData?.name,
        bio: bioData?.bio,
        profile_picture: bioData?.profile_picture,
        cover_image: bioData?.cover_image,
        avatar_profile: bioData?.avatar_profile,
        select_profile: bioData?.select_profile,
      });
      setSelectedImage(bioData?.select_profile);
    }
  }, [bioData]);
  useEffect(() => {
    if (editData?.code === 200) {
      handleBioCloseConfirm();
    }
  }, [editData]);
  const handleUpdate = async () => {
    const editUserData = await dispatch(editUser(userData));
  };
  const [loaderCustom, setLoaderCustom] = useState(false);
  // const handleImage = async (file) => {
  //   setLoaderCustom(true);
  //   let fileName = file?.name;
  //   const formData = new FormData();

  //   formData.append("file", file);
  //   formData.append("folder", "profile");
  //   try {
  //     const apiCall = await API({
  //       url: `/bio/fileupload`,
  //       method: "post",
  //       params: { isLogo: true },
  //       data: formData,
  //     });
  //     if (apiCall?.status === 200 || apiCall?.status === 304) {
  //       setUserData({
  //         ...userData,
  //         profile_picture: apiCall?.data?.data?.url,
  //       });
  //     }
  //   } catch (error) {
  //     ToastNotification.error(error);
  //   } finally {
  //     setLoaderCustom(false);
  //   }
  // };

  const handleImage = async (file) => {
    // Allowed file types (Images + GIF + Videos)
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/webm",
      "video/ogg",
    ];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!file) {
      ToastNotification.error("No file selected.");
      return;
    }

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      ToastNotification.error("Invalid file type. Only images, GIF, and video files are allowed.");
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      ToastNotification.error("File size exceeds 2MB limit.");
      return;
    }

    setLoaderCustom(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "profile");

    try {
      const apiCall = await API({
        url: `/bio/fileupload`,
        method: "post",
        // params: { isLogo: true },
        data: formData,
      });

      if (apiCall?.status === 200 || apiCall?.status === 304) {
        setUserData((prev) => ({
          ...prev,
          profile_picture: apiCall?.data?.data?.url,
        }));
        ToastNotification.success("File uploaded successfully!");
      }
    } catch (error) {
      ToastNotification.error(error?.response?.data?.message || "File upload failed.");
    } finally {
      setLoaderCustom(false);
    }
  };

  const removeImage = async () => {
    try {
      const apiCall = await API({
        url: `/bio/delete_file_s3?file_url=${userData?.profile_picture}`,
        method: "delete",
      });
      if (apiCall.status === 200 || apiCall.status === 304) {
        setUserData({ ...userData, profile_picture: "" });
      }
    } catch (error) {
      ToastNotification.error(error);
    }
  };
  const handleImageCover = async (file) => {
    setLoaderCustom(true);
    let fileName = file?.name;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "profile");
    try {
      const apiCall = await API({
        url: `/bio/fileupload`,
        method: "post",
        data: formData,
      });
      if (apiCall?.status === 200 || apiCall?.status === 304) {
        setUserData({
          ...userData,
          cover_image: apiCall?.data?.data?.url,
        });
      }
    } catch (error) {
      ToastNotification.error(error);
    } finally {
      setLoaderCustom(false);
    }
  };
  const removeImageCover = async () => {
    try {
      const apiCall = await API({
        url: `/bio/delete_file_s3?file_url=${userData?.cover_image}`,
        method: "delete",
      });
      if (apiCall.status === 200 || apiCall.status === 304) {
        setUserData({ ...userData, cover_image: "" });
      }
    } catch (error) {
      ToastNotification.error(error);
    }
  };
  return (
    <>
      <Dialog
        open={bioPopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleBioCloseConfirm()}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            maxWidth: "800px !important",
            width: "100%",
            borderRadius: "12px",
          },
        }}
      >
        <div className="w-full secondary-bg-color p-6 rounded-full">
          <div className="flex text-primary items-center justify-between w-full">
            <div className="flex-1 text-center">
              <p className="text-lg font-medium">Display name and bio</p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleBioCloseConfirm();
              }}
              className="close-btn hover:bg-gray-200"
            >
              <Tooltip title="close">
                <X className="w-7 h-7" />
              </Tooltip>
            </button>
          </div>

          <hr className="my-4 main-border-color"></hr>
          <form
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            method="post"
            className="w-full"
          >
            <div className="flex flex-col sm:flex-row sm:justify-evenly gap-4 w-full">
              <div
                className={`mb-4 flex flex-col items-center justify-center relative w-full sm:w-[220px] ${
                  selectedImage === "profile" ? "border-black border-[2px]" : "border-gray-300"
                } rounded-lg overflow-hidden`}
                onClick={() => handleSelect("profile")}
              >
                {!loaderCustom && !userData?.profile_picture ? (
                  <label className="inline-flex file-tag-hover relative flex-col items-center justify-center w-full h-[220px] cursor-pointer rounded-lg  transition-all duration-300">
                    <input
                      id="dropzone-file"
                      type="file"
                      name="image"
                      accept="image/jpeg, image/png, image/jpg, image/webp, image/svg"
                      onChange={(e) => handleImage(e.target.files[0])}
                      disabled={loaderCustom}
                      className="hidden"
                    />
                    <CloudUpload className="w-10 h-10 text-gray-400" />
                    <span className="text-sm block font-medium text-gray-500 mt-2">
                      Click to upload profile photo
                    </span>
                  </label>
                ) : loaderCustom ? (
                  <div className="flex items-center justify-center w-full h-[220px] border border-gray-300 rounded-lg">
                    <CircularProgress color="inherit" size={30} />
                  </div>
                ) : (
                  <div className="relative flex items-center justify-center w-full h-[220px] border border-gray-300 rounded-lg overflow-hidden">
                    <img
                      src={userData?.profile_picture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                      className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-300 text-blue-500 hover:bg-blue-100 transition-all duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <p className="mt-2 text-sm text-gray-600 font-medium">Profile</p>
              </div>

              <div
                className={`mb-4 flex flex-col items-center justify-center relative input ${
                  selectedImage === "avatar_profile"
                    ? "border-black border-[2px]"
                    : "border-gray-300"
                }`}
                onClick={() => handleSelect("avatar_profile")}
              >
                <div className="flex relative items-center h-[200px] w-full sm:w-[200px] justify-center border rounded-[6px] cursor-pointer">
                  <img
                    src={bioData?.avatar_profile}
                    className="max-w-[180px] max-h-[180px]"
                    alt="Avatar Profile"
                  />
                </div>
                <p className="mt-2">Avatar</p>
              </div>
            </div>

            <div className="mb-4 relative input">
              <label>Name</label>
              <input
                type="text"
                placeholder="name"
                value={userData?.name}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    name: e.target.value,
                  })
                }
                // onBlur={(e) => {
                //   if (userNameRegex?.test(e.target.value)) {
                //     setUserNameError(false);
                //   } else {
                //     setUserNameError(true);
                //   }
                // }}
                className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
              />
              <div className="flex items-start mt-1">
                {userNameError && (
                  <p className="flex items-center gap-1 text-red-500">
                    <InfoCircle className="w-4 h-4" fill="red" /> Username is not valid
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4 relative input">
              <div className="flex justify-between">
                <label>Bio</label>
                <label>allowed 80 characters</label>
              </div>
              <textarea
                type="text"
                placeholder="bio"
                value={userData?.bio}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    bio: e.target.value,
                  })
                }
                maxLength="80"
                className="w-full bg-transparent rounded-lg border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
              />
            </div>
            <button
              type="button"
              disabled={userNameError || loader}
              onClick={handleUpdate}
              className="w-full mx-auto md:w-[50%] bg-green-400 hover:bg-[#ebff57] hover:text-[#000] text-white font-medium py-2 px-8 rounded-full shadow-md transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white items-center flex justify-center"
            >
              Update &nbsp; {loader && <CircularProgress color="inherit" size={20} />}
            </button>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default EditBio;
