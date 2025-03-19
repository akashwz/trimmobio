"use client";
import { Transition } from "@/controller/Transitions";
import { createBio, getProductCategory } from "@/redux/Action/auth.action";
import {
  CircularProgress,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CloudUpload, PlusCircle, X } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import AppSwitchCaseController from "../AppSwitchCaseController/AppSwitchCaseController";
import ToastNotification from "@/controller/ToastNotification";
import { checkValidationUtils } from "@/utils/AppValidation";

const WidgetPopUp = ({
  heading,
  confirmationPopup,
  handleCloseConfirm,
  allApps,
  handleAddAppWidget,
  openWidgetPlaceholder,
  handleSectionClose,
  appPlaceholderData,
  addSocialMedia,
  setAddSocialMedia,
  showAddSocialMedia,
  setShowOptions,
  setShowAddSocialMedia,
  removeImage,
  handleSocialImage,
  loaderCustom,
  createLink,
  activeShopTab,
  widgetSelected,
  addDefaultApp,
  setAddDefaultApp,
  handleDefaultImageUpload,
  removeDefaultImage,
  widgetShopData,
}) => {
  const { allPlateformItems } = useSelector((state) => state?.authReducer);
  const defaultApps = allPlateformItems?.filter((item) => item.type === "default");
  const shopApps = allPlateformItems?.filter((item) => item.type === "shop");
  const { bioData } = useSelector((state) => state?.authReducer);
  const { loader } = useSelector((state) => state.errorReducer);

  const openApps = allPlateformItems
    ?.filter((item) => item.type === "open app")
    ?.map((item) => ({
      ...item,
      isAuthorized: bioData?.authorize_app?.some((app) => app?._id === item?._id),
    }))
    ?.filter((item) => item?.isAuthorized);

  const socialMediaApps = allPlateformItems
    ?.filter((item) => item.type === "third party")
    ?.map((item) => ({
      ...item,
      isAuthorized: bioData?.authorize_app?.some((app) => app?._id === item?._id),
    }))
    ?.filter((item) => item?.isAuthorized);

  const { searchDataApp } = useSelector((state) => state?.authReducer);
  const { userData } = useSelector((state) => state?.authReducer);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(
    widgetShopData?.widget_type === "products" ? "product" : "categories",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryProduct, setSearchQueryProduct] = useState("");
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategoryItems, setSelectedCategoryItems] = useState([]);
  const [selectedProductItems, setSelectedProductItems] = useState([]);
  const [displayValue, setDisplayValue] = useState("list_view");
  const handleCategoryCheckboxChange = (data) => {
    setSelectedCategoryItems((prevItems) => {
      if (prevItems.some((item) => item._id === data._id)) {
        return prevItems.filter((item) => item._id !== data._id);
      } else {
        return [...prevItems, data];
      }
    });
  };

  const handleProductCheckboxChange = (data) => {
    setSelectedProductItems((prevItems) => {
      if (prevItems.some((item) => item._id === data._id)) {
        return prevItems.filter((item) => item._id !== data._id);
      } else {
        return [...prevItems, data];
      }
    });
  };

  const foundApp = bioData?.authorize_app?.find((app) => app?.name === "Shopeasy");

  const getThirdPartyAuthorize = (id) => {
    return bioData?.authorize_app?.find((app) => app?._id === id);
  };

  const handleChangeDisplayValue = (e) => {
    setDisplayValue(e.target.value);
  };

  const saveSelectedItems = () => {
    if (activeTab === "product") {
      const transformedProducts = selectedProductItems?.map((item) => ({
        name: item?.product_name,
        url: `${foundApp?.value}/product/${item?.product_slug_name}`,
        logo: item?.image,
        description: item?.selling_price,
        thumbnail: item?._id,
        link_type: "products",
        widget_name: widgetSelected,
        type: activeShopTab === "Links" ? "link" : "shop",
        display_type: displayValue,
      }));

      dispatch(createBio(transformedProducts, userData?.data?.username));
      handleCloseConfirm();
    } else {
      const transformedCotegories = selectedCategoryItems?.map((item) => ({
        name: item?.category_name,
        url: `${foundApp?.value}/category/${item?.category_slug_name}`,
        logo: item?.image,
        description: "",
        thumbnail: item?._id,
        link_type: "categories",
        widget_name: widgetSelected,
        type: activeShopTab === "Links" ? "link" : "shop",
        display_type: displayValue,
      }));

      dispatch(createBio(transformedCotegories, userData?.data?.username));
      handleCloseConfirm();
    }
  };

  const saveDefaultApp = () => {
    const validationError = checkValidationUtils(appPlaceholderData?.name, addDefaultApp);
    if (validationError) {
      ToastNotification.error(validationError);
      return;
    }
    if (!addDefaultApp?.name?.trim()) {
      ToastNotification.error("App name is required");
      return;
    }

    const payload = {
      ...addDefaultApp,
      widget_name: widgetSelected,
      type: activeShopTab === "Links" ? "link" : "shop",
      app_name: appPlaceholderData?.app_name || "",
      ref_id: appPlaceholderData?._id || "",
      layout_setting: appPlaceholderData?.default_layout || null,
    };

    dispatch(createBio(payload, userData?.data?.username));
    handleCloseConfirm();
  };

  const fetchResults = async (query, type) => {
    const response = await dispatch(getProductCategory(type, bioData?._id, query));
    if (type === "products") {
      setProductData(response?.data?.records);
    } else {
      setCategoryData(response?.data?.records);
    }
  };

  useEffect(() => {
    if (searchQuery.length >= 3) {
      const delayDebounce = setTimeout(() => {
        fetchResults(searchQuery, "categories");
      }, 500);

      return () => clearTimeout(delayDebounce);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQueryProduct.length >= 3) {
      const delayDebounce = setTimeout(() => {
        fetchResults(searchQueryProduct, "products");
      }, 500);

      return () => clearTimeout(delayDebounce);
    }
  }, [searchQueryProduct]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Dialog
      open={confirmationPopup}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleCloseConfirm()}
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
      {openWidgetPlaceholder === true ? (
        <div className="w-full dark:bg-gray-900 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <p
              className="text-xl font-semibold text-gray-800 dark:text-gray-200 cursor-pointer"
              onClick={handleSectionClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleCloseConfirm();
              }}
              className="close-btn hover:bg-gray-200"
            >
              <Tooltip title="Close">
                <X className="w-7 h-7" />
              </Tooltip>
            </button>
          </div>

          {showAddSocialMedia && (
            //  addSocialMedia?.widget_name === elem?._id &&
            <>
              {appPlaceholderData?.placeholder === "shop" ? (
                <div className="w-full sm:w-[24rem] md:w-[32rem] lg:w-[34rem] xl:w-[34rem] bg-white rounded-lg py-4 mt-4 duration-300 transition-transform">
                  <div className="flex bg-gray-500 rounded-full p-1 justify-between mt-4">
                    {widgetShopData?.widget_type === "categories" && (
                      <button
                        className={`px-6 w-full py-2 rounded-full font-bold transition-all duration-300 ${
                          activeTab === "categories" ? "bg-white text-black shadow" : "text-white"
                        }`}
                        onClick={() => handleTabClick("categories")}
                      >
                        Category
                      </button>
                    )}
                    {widgetShopData?.widget_type === "products" && (
                      <button
                        className={`px-6 w-full py-2 rounded-full font-bold transition-all duration-300 ${
                          activeTab === "product" ? "bg-white text-black shadow" : "text-white"
                        }`}
                        onClick={() => handleTabClick("product")}
                      >
                        Product
                      </button>
                    )}
                    {!widgetShopData?.widget_type && (
                      <>
                        <button
                          className={`px-6 w-full py-2 rounded-full font-bold transition-all duration-300 ${
                            activeTab === "categories" ? "bg-white text-black shadow" : "text-white"
                          }`}
                          onClick={() => handleTabClick("categories")}
                        >
                          Category
                        </button>
                        <button
                          className={`px-6 w-full py-2 rounded-full font-bold transition-all duration-300 ${
                            activeTab === "product" ? "bg-white text-black shadow" : "text-white"
                          }`}
                          onClick={() => handleTabClick("product")}
                        >
                          Product
                        </button>
                      </>
                    )}
                  </div>
                  <div className="shadow-md mt-4">
                    {activeTab === "categories" ? (
                      <div className="w-full md:w-full bg-white rounded-lg  p-4">
                        <input
                          type="text"
                          placeholder="Search category..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                        />
                      </div>
                    ) : (
                      <div className="w-full md:w-full bg-white rounded-lg  p-4">
                        <input
                          type="text"
                          placeholder="Search product..."
                          value={searchQueryProduct}
                          onChange={(e) => setSearchQueryProduct(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                        />
                      </div>
                    )}
                    <div className="px-4 py-4">
                      {activeTab === "categories"
                        ? categoryData.map((data) => (
                            <div key={data.id} className="flex gap-3 items-center mt-2">
                              <input
                                type="checkbox"
                                onChange={() => handleCategoryCheckboxChange(data)}
                                className="peer accent-green-500"
                              />
                              <img src={data.image} width={30} height={30} alt="category" />
                              <div>{data.category_name}</div>
                            </div>
                          ))
                        : productData?.map((data) => (
                            <div key={data.id} className="flex gap-3 items-center mt-2">
                              <input
                                type="checkbox"
                                onChange={() => handleProductCheckboxChange(data)}
                                className="peer accent-green-500"
                              />
                              <img src={data.image} width={30} height={30} alt="product" />
                              <div>{data.product_name}</div>
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              ) : (
                <AppSwitchCaseController
                  appPlaceholderData={appPlaceholderData}
                  loaderCustom={loaderCustom}
                  handleDefaultImageUpload={handleDefaultImageUpload}
                  removeDefaultImage={removeDefaultImage}
                  addDefaultApp={addDefaultApp}
                  setAddDefaultApp={setAddDefaultApp}
                  saveDefaultApp={saveDefaultApp}
                />
              )}
            </>
          )}
          {activeTab === "categories" ||
            (activeTab === "product" && (
              <>
                <label>Display view</label>
                <div>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={displayValue}
                      onChange={handleChangeDisplayValue}
                    >
                      <FormControlLabel
                        label="List view"
                        control={<Radio />}
                        value="list_view"
                        // disabled={widgetShopData?.display_type === "thumbnail_view"}
                      />
                      <FormControlLabel
                        label="Thumbnail view"
                        control={<Radio />}
                        value="thumbnail_view"
                        // disabled={widgetShopData?.display_type === "list_view"}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </>
            ))}
          {appPlaceholderData?.type === "shop" && (
            <button
              onClick={saveSelectedItems}
              disabled={selectedCategoryItems.length === 0 && selectedProductItems.length === 0}
              className="px-4 py-2 mt-2 bg-blue-500 text-white rounded"
            >
              Save Selected Item
            </button>
          )}
        </div>
      ) : (
        <div className="w-full dark:bg-gray-900 p-6 rounded-lg shadow-lg">
          <div className="sticky top-0 left-0 z-50 bg-white dark:bg-gray-900 p-4 border-b border-gray-300 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{heading}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleCloseConfirm();
                }}
                className="close-btn hover:bg-gray-200"
              >
                <Tooltip title="Close">
                  <X className="w-7 h-7" />
                </Tooltip>
              </button>
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar grid sm:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <div>Add link</div>
              {showAddSocialMedia && (
                //  addSocialMedia?.widget_name === elem?._id &&
                <div className="w-full bg-white rounded-lg shadow-md border border-gray-200 p-4 mt-4 duration-300 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold capitalize">Add custom link</p>
                    <div className="flex items-center justify-between gap-2">
                      <X
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => {
                          setAddSocialMedia({
                            icon: "",
                            name: "",
                            url: "",
                            description: "",
                          });
                          setShowAddSocialMedia(false);
                          setShowOptions(true);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-full flex items-center">
                      <div className="w-full">
                        <div className="mb-4 flex items-center justify-center relative input">
                          {!loaderCustom && !addSocialMedia?.logo ? (
                            <label className="inline-flex file-tag-hover relative flex-col items-center border-dashed border-[2px] w-full h-[120px] justify-center cursor-pointer main-border-color rounded-[6px]">
                              <input
                                id="dropzone-file"
                                type="file"
                                name="image"
                                accept={`image/jpeg, image/png, image/jpg, image/webp, image/svg`}
                                onChange={(e) => {
                                  handleSocialImage(e.target.files[0]);
                                }}
                                disabled={loaderCustom}
                                className="hidden peer"
                              />
                              <CloudUpload className="w-9 h-9" />
                              <span className="text-sm block font-medium">
                                Click to upload logo
                              </span>
                            </label>
                          ) : loaderCustom ? (
                            <Skeleton className="min-h-[100px] w-[100px]" variant="rounded-[6px]" />
                          ) : (
                            <div className="flex relative items-center h-[100px] w-[100px] justify-center border main-border-color rounded-[6px] cursor-pointer">
                              <img
                                src={addSocialMedia?.logo}
                                className="max-w-[100px] max-h-[100px]"
                                alt="image"
                              />
                              <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-0 rounded-tr right-0 z-30 w-[25px] h-[25px] flex items-center justify-center text-red-600 primary-bg-color border-s border-b main-border-color text-xs"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
                            placeholder="Name"
                            value={addSocialMedia?.name}
                            onChange={(e) =>
                              setAddSocialMedia({
                                ...addSocialMedia,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center mt-1">
                          <input
                            type="text"
                            className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
                            placeholder="Enter URL"
                            value={addSocialMedia?.url}
                            onChange={(e) => {
                              setAddSocialMedia({
                                ...addSocialMedia,
                                url: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div className="flex items-center mt-1">
                          <input
                            type="text"
                            className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
                            placeholder="Description"
                            value={addSocialMedia?.description}
                            onChange={(e) => {
                              setAddSocialMedia({
                                ...addSocialMedia,
                                description: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          disabled={!addSocialMedia?.name || !addSocialMedia?.url || loader}
                          onClick={createLink}
                          className="w-full mt-2 mx-auto md:w-[50%] bg-green-400 hover:bg-[#ebff57] hover:text-[#000] text-white font-medium py-2 px-8 rounded-full shadow-md transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white items-center flex justify-center"
                        >
                          Continue &nbsp; {loader && <CircularProgress color="inherit" size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="h-[45vh] overflow-auto custom-scrollbar">
              {defaultApps?.length > 0 && <div className="mt-4">Default Apps</div>}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                {defaultApps?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="group flex flex-col items-center p-2 dark:bg-gray-800 rounded-xl shadow-lg transition transform hover:scale-105 justify-between cursor-pointer"
                      onClick={() => handleAddAppWidget(item)}
                    >
                      <div className="p-2 bg-[#F5F5F5] rounded-lg border-[#00000012] border-[1px] border-solid">
                        <img src={item?.svg} alt="widget" className="w-10 h-10 object-contain" />
                      </div>

                      <p className="mt-2 text-gray-900 text-center">{item?.name}</p>
                    </div>
                  );
                })}
              </div>
              {socialMediaApps?.length > 0 && (
                <Divider
                  style={{
                    marginTop: "20px",
                  }}
                />
              )}
              {socialMediaApps?.length > 0 && <div className="mt-2">Third party Apps</div>}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                {socialMediaApps?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleAddAppWidget(item)}
                      className="group flex flex-col items-center p-2 dark:bg-gray-800 rounded-xl shadow-lg transition transform hover:scale-105 justify-between cursor-pointer"
                    >
                      <div className="p-2 bg-[#F5F5F5] rounded-lg border-[#00000012] border-[1px] border-solid">
                        <img src={item?.svg} alt="widget" className="w-10 h-10 object-contain" />
                      </div>

                      <p className="mt-2 text-gray-900 text-center">{item?.name}</p>
                    </div>
                  );
                })}
              </div>
              {openApps?.length > 0 && (
                <Divider
                  style={{
                    marginTop: "20px",
                  }}
                />
              )}
              {openApps?.length > 0 && <div className="mt-2">Open Apps</div>}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                {openApps?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleAddAppWidget(item)}
                      className="group flex flex-col items-center p-2 dark:bg-gray-800 rounded-xl shadow-lg transition transform hover:scale-105 justify-between cursor-pointer"
                    >
                      <div className="p-2 bg-[#F5F5F5] rounded-lg border-[#00000012] border-[1px] border-solid">
                        <img src={item?.svg} alt="widget" className="w-10 h-10 object-contain" />
                      </div>

                      <p className="mt-2 text-gray-900 text-center">{item?.name}</p>
                    </div>
                  );
                })}
              </div>
              {shopApps?.length > 0 && (
                <Divider
                  style={{
                    marginTop: "20px",
                  }}
                />
              )}
              {shopApps?.length > 0 && <div className="mt-2">Shop Apps</div>}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                {shopApps?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="group flex flex-col items-center p-2 dark:bg-gray-800 rounded-xl shadow-lg transition transform hover:scale-105 justify-between cursor-pointer"
                      onClick={() => handleAddAppWidget(item)}
                    >
                      <div className="p-2 bg-[#F5F5F5] rounded-lg border-[#00000012] border-[1px] border-solid">
                        <img src={item?.svg} alt="widget" className="w-10 h-10 object-contain" />
                      </div>

                      <p className="mt-2 text-gray-900 text-center">{item?.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default WidgetPopUp;
