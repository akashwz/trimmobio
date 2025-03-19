"use client";

import ConfirmationPopUp from "@/components/confirmation-popup/ConfirmationPopUp";
import {
  deleteAuthorizedApp,
  getAllPlateform,
  getBio,
  thirdPartyAuth,
} from "@/redux/Action/auth.action";
import { allWidget } from "@/utils/allWidget";
import { encryptDevData } from "@/utils/encryptionUtils";
import { socket } from "@/utils/socket";
import { CircularProgress, Dialog, Slide, Tooltip } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { X } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";

const Transition = (props) => {
  return <Slide direction="up" {...props} />;
};

const Apps = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const dispatch = useDispatch();
  const { allPlateformItems } = useSelector((state) => state?.authReducer);
  const { bioData, userData } = useSelector((state) => state?.authReducer);
  const [isPopupClose, setIsPopupClose] = useState(false);
  const [removeAppId, setRemoveAppId] = useState(false);
  const [socketData, setSocketData] = useState(null);
  const [authApps, setAuthApps] = useState(bioData?.authorize_app);
  const { loader } = useSelector((state) => state.errorReducer);

  const handleOpenDialog = (widget) => {
    setSelectedWidget(widget);
    setIsPopupOpen(true);
  };

  const handleRemoveDialog = (id) => {
    setRemoveAppId(id);
    setIsPopupClose(true);
  };

  const handleCloseRemoveDialog = () => {
    setIsPopupClose(false);
    setRemoveAppId(null);
  };

  const deleteAuthItem = async (id) => {
    try {
      const apiData = await dispatch(deleteAuthorizedApp(id ? id : removeAppId, bioData?.username));
      if (apiData?.code === 200) {
        // dispatch(getAllPlateform(["third party", "shop", "open app"]));
        setIsPopupClose(false);
        setRemoveAppId(null);
      }
    } catch (error) {
      console.error("Error in handleInstallNow:", error);
    }
  };

  const handleInstallNow = async (item) => {
    try {
      if (!item?._id) {
        console.error("Invalid item ID");
        return;
      }
      let authCode = encryptDevData({ app: item?._id, code: "public" });
      const apiData = await dispatch(thirdPartyAuth(authCode, bioData?.username));
      // if (apiData?.code === 200) {
      //   dispatch(getAllPlateform(["third party", "shop", "open app"]));
      // } else {
      // }
    } catch (error) {
      console.error("Error in handleInstallNow:", error);
    }
  };
  useEffect(() => {
    socket.connect(); // Ensure socket connects

    const handleConnect = () => {
      socket.emit("registerUser", userData?.data?._id?.toString());
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected");
    };

    const handleAuthorize = (data) => {
      const updateData = authApps?.find((x) => x?._id?.toString() === data?.app_id);
      setSocketData(data);
      if (data.success) {
        setAuthApps([...authApps, { _id: data?.app_id }]);
      } else {
        const updateData = authApps?.filter((x) => x?._id?.toString() !== data?.app_id);
        setAuthApps(updateData);
      }
    };

    // Register event listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("authorize", handleAuthorize);

    return () => {
      // Cleanup event listeners and disconnect socket on unmount
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("authorize", handleAuthorize);
      socket.disconnect();
    };
  }, [userData?.data?._id, authApps]);

  const handleCloseDialog = () => {
    setIsPopupOpen(false);
    setSelectedWidget(null);
  };

  useEffect(() => {
    dispatch(getAllPlateform(["third party", "shop", "open app"]));
    dispatch(getBio(userData?.data?.username));
  }, [dispatch]);

  // const handleRedirectUrl = (url, id) => {
  //   const newUrl = `${url}&app=${id}`;
  //   const popupFeatures = "width=600,height=600,top=100,left=100,scrollbars=yes,resizable=yes";
  //   // window.open(newUrl, "_blank");
  //   window.open(newUrl, "popupWindow", popupFeatures);
  // };

  const handleRedirectUrl = useCallback((url, id) => {
    if (typeof window !== "undefined") {
      const newUrl = `${url}&app=${id}`;
      const popupFeatures = "width=600,height=600,top=100,left=100,scrollbars=yes,resizable=yes";
      window.open(newUrl, "popupWindow", popupFeatures);
    }
  }, []);

  const [loadingState, setLoadingState] = useState(null);

  const handleInstall = async (item) => {
    setLoadingState(item._id);
    try {
      if (item.type === "open app") {
        await handleInstallNow(item);
      } else {
        await handleRedirectUrl(item.redirect_url, item._id);
      }
    } finally {
      setLoadingState(null);
    }
  };

  const handleUninstall = async (item) => {
    setLoadingState(item._id);
    try {
      await deleteAuthItem(item._id);
    } finally {
      setLoadingState(null);
    }
  };

  return (
    <>
      <div className="relative flex-grow p-2 lg:p-5 overflow-y-auto h-screen">
        <div className="w-[100%] lg:w-[80%] flex flex-col p-4 mx-auto mb-14">
          <h1 className="sm:text-[1.75rem] text-lg font-semibold">My apps</h1>

          <div className="mt-6">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {allPlateformItems?.map((item, index) => {
                const authStatus = authApps?.find((app) => app?._id === item?._id);
                return (
                  <div
                    key={index}
                    className="group flex flex-col items-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition transform hover:scale-105 justify-between cursor-pointer"
                    onClick={() => handleOpenDialog(item)}
                  >
                    <div className="p-3 bg-[#F5F5F5] rounded-lg border border-[#00000012]">
                      <img src={item?.svg} alt="widget" className="w-15 h-15 object-contain" />
                    </div>

                    <div>
                      <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-200 text-center">
                        {item?.name}
                      </h3>

                      <p className="mt-2 text-center text-gray-600 dark:text-gray-400 text-sm">
                        {item?.short_description}
                      </p>
                    </div>
                    {authStatus ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleUninstall(item);
                        }}
                        disabled={loadingState === item._id}
                        className="mt-4 flex items-center gap-2 bg-white text-black border border-black px-4 py-2 rounded-md shadow-md transition group-hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>Uninstall</span>
                        {loadingState === item._id ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="black"
                            className="bi bi-check-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                          </svg>
                        )}
                      </button>
                    ) : (
                      <button
                        className="mt-4 bg-[#26D367] text-black px-4 py-2 rounded-md shadow-md transition hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleInstall(item);
                        }}
                        aria-label={"Install App"}
                        disabled={loadingState === item._id}
                      >
                        Install Now
                        {loadingState === item._id && (
                          <CircularProgress color="inherit" size={20} />
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={isPopupOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            maxWidth: "800px !important",
            width: "100%",
            borderRadius: "12px",
          },
        }}
      >
        {selectedWidget && (
          <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 close-btn hover:bg-gray-200"
              onClick={handleCloseDialog}
            >
              <Tooltip title="close">
                <X size={24} />
              </Tooltip>
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* <div className="p-3 bg-[#FAFAFA] rounded-lg border-[1px] border-[#00000012] border-solid">
                <div dangerouslySetInnerHTML={{ __html: selectedWidget?.svg }} />
              </div> */}
              <div className="p-3 bg-[#FAFAFA] rounded-lg border-[1px] border-[#00000012] border-solid">
                <img src={selectedWidget?.svg} alt="widget" className="w-10 h-10 object-contain" />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
                  {selectedWidget?.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  {selectedWidget?.short_description}
                </p>
              </div>
              {authApps?.find((app) => app?._id === selectedWidget?._id) ||
              (socketData?.app_id === selectedWidget?._id && socketData?.success) ? (
                <button
                  onClick={() => handleRemoveDialog(selectedWidget?._id)}
                  disabled={loader}
                  className="mt-4 flex items-center gap-2 bg-white text-black border border-black px-4 py-2 rounded-md shadow-md transition group-hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white justify-center"
                >
                  {/* <span>Remove Authorized</span> */}
                  <span>Uninstall</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="black"
                    className="bi bi-check-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                  </svg>{" "}
                  &nbsp; {loader && <CircularProgress color="inherit" size={20} />}
                </button>
              ) : (
                <button
                  className="bg-[#26D367] text-black px-4 py-2 mt-3 rounded-md shadow-md transition hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white items-center flex justify-center"
                  onClick={() =>
                    selectedWidget?.type === "open app"
                      ? handleInstallNow(selectedWidget)
                      : handleRedirectUrl(selectedWidget?.redirect_url, selectedWidget?._id)
                  }
                  disabled={loader}
                >
                  {/* {selectedWidget?.type === "open app" ? "Install Now" : "Add to your bio"} */}
                  Install Now &nbsp;
                  {loader && <CircularProgress color="inherit" size={20} />}
                </button>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="w-full h-48 bg-red-900 rounded-lg"></div>
              <div className="w-full h-48 bg-red-900 rounded-lg"></div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Overview</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {selectedWidget?.long_description}
              </p>
            </div>
          </div>
        )}
      </Dialog>
      {isPopupClose && (
        <ConfirmationPopUp
          heading="Remove This Authorization?"
          subheading="Are you sure you want to remove this Authorization?"
          confirmationPopup={isPopupClose}
          runFunction={deleteAuthItem}
          handleCloseConfirm={handleCloseRemoveDialog}
          confirmButton="Yes"
        />
      )}
    </>
  );
};

export default Apps;
