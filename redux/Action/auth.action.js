import API from "@/api";
import ToastNotification from "@/controller/ToastNotification";
import {
  ADD_BIO,
  ADD_PLATFORM,
  ALL_PLATEFORM,
  AUTH,
  CHECK_EMAILPHONE,
  CHECK_USERNAME,
  EDIT_USER,
  EMAIL_LOGIN,
  EMAIL_REGISTER,
  ERROR,
  FACEBOOK_DATA,
  GET_ANALYTICS_link,
  GET_BIO,
  GET_NEWSLATTER,
  GET_SINGLE_APP_INFO,
  LOADER,
  OTP_RESET,
  OTP_VERIFY,
  SEARCH_DATA_APP,
} from "../action.type";
import { deleteCookie, setCookie } from "cookies-next/client";
import { persistor } from "../store";

export const checkUserName = (data) => {
  return async (dispatch) => {
    try {
      const userName = await API({
        url: `/users/username/${data}`,
        method: "get",
      });
      if (userName?.data) {
        dispatch({
          type: CHECK_USERNAME,
          payload: userName?.data,
        });
      }
    } catch (error) {
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
      dispatch({
        type: CHECK_USERNAME,
        payload: null,
      });
    }
  };
};
export const checkEmailPhone = (data) => {
  return async (dispatch) => {
    try {
      const userName = await API({
        url: `/users/identifier/${data}`,
        method: "get",
      });
      if (userName?.data) {
        dispatch({
          type: CHECK_EMAILPHONE,
          payload: userName?.data,
        });
      }
    } catch (error) {
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
      dispatch({
        type: CHECK_EMAILPHONE,
        payload: null,
      });
    }
  };
};
export const socialLogin = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const userName = await API({
        url: `/users/social-login`,
        method: "post",
        data: data,
      });
      if (userName?.status === 200 || userName?.status === 304) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        if (userName?.data?.data?.profile) {
          // ToastNotification.success("Login successfully!");
        } else if (!userName?.data?.data?.social_login) {
          ToastNotification.info("User not found!");
        }
        setCookie("token", userName?.data?.data?.token, {
          maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
          path: "/", // Ensure it's accessible throughout the site
        });
        dispatch({
          type: AUTH,
          payload: userName?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const thirdPartyAuth = (data, user_name) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const userName = await API({
        url: `/app/auth/${data?.encrypted ? data?.encrypted : data}`,
        method: "get",
        data: data,
      });
      if (userName?.status === 200 || userName?.status === 304) {
        ToastNotification.success(userName?.data?.message);
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch(getBio(user_name));
      }
      return userName?.data;
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const editUser = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({
        url: `/users/edit`,
        method: "patch",
        data: data,
      });
      if (apiCall?.status === 200 || apiCall?.status === 304) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: EDIT_USER,
          payload: apiCall?.data,
        });
        dispatch(getUser(apiCall?.data?.data?.username));
        ToastNotification.success("User details updated successfully!");
        return apiCall?.data;
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const addPlatfrom = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ADD_PLATFORM,
        payload: data,
      });
    } catch (error) {
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const addBio = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({
        url: `/bio`,
        method: "post",
        data: data,
      });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: ADD_BIO,
          payload: apiCall?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const emailLogin = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({
        url: `users/login`,
        method: "post",
        data: data,
      });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        // if (apiCall?.data?.data?.profile) {
        //   ToastNotification.success("Login successfully!");
        // }
        setCookie("token", apiCall?.data?.data?.token, {
          maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
          path: "/", // Ensure it's accessible throughout the site
        });
        localStorage.setItem("username", apiCall?.data?.data?.username);
        dispatch({
          type: EMAIL_LOGIN,
          payload: apiCall?.data?.data,
        });
        return apiCall?.data?.data;
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const forgetPassword = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({
        url: `users/forgot-password`,
        method: "patch",
        data: data,
      });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        if (apiCall?.data?.data?.profile) {
          ToastNotification.success("Forgot password successfully!");
        }
        dispatch({
          type: EMAIL_LOGIN,
          payload: apiCall?.data?.data,
        });
        return apiCall?.data;
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const getShopData = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({
        url: `app/shop/${data}`,
        method: "get",
        data: data,
      });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        return apiCall?.data;
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const registration = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });

      const apiCall = await API({
        url: `users/register`,
        method: "post",
        data: data,
      });

      if (apiCall?.data?.code === 201) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: EMAIL_REGISTER,
          payload: apiCall?.data,
        });
        ToastNotification.success(apiCall?.data?.message);
        return apiCall?.data; // Return the API response
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      ToastNotification.error(error?.message || "An error occurred");
      dispatch({
        type: ERROR,
        payload: error,
      });
      throw error; // Throw the error to handle it in the caller
    }
  };
};

export const verifyOtp = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({
        url: `users/verify-otp`,
        method: "post",
        data: data,
      });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: OTP_VERIFY,
          payload: apiCall?.data,
        });
        if (apiCall?.data?.data) {
          ToastNotification.success("OTP verify successfully!");
        }
        if (!localStorage.getItem("forgetPassword") === true) {
          setCookie("token", apiCall?.data?.data?.token, {
            maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
            path: "/", // Ensure it's accessible throughout the site
          });
        }
        return apiCall?.data;
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      dispatch({
        type: OTP_VERIFY,
        payload: null,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const passwordChange = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({
        url: `users/change-password`,
        method: "patch",
        data: data,
      });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        if (apiCall?.data?.data) {
          ToastNotification.success("Password change successfully!");
        }
        return apiCall?.data;
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      dispatch({
        type: OTP_VERIFY,
        payload: null,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const resetOtp = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({
        url: `users/otp_send`,
        method: "post",
        data: data,
      });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        if (apiCall?.data) {
          ToastNotification.success("OTP sent in your email!");
        }
        dispatch({
          type: OTP_RESET,
          payload: apiCall,
        });
        return apiCall?.data;
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const getAnalytics = (userId, linkId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({
        url: `/analytics/${userId}?link=${linkId}`,
        method: "get",
      });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: GET_ANALYTICS_link,
          payload: apiCall?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      dispatch({
        type: GET_ANALYTICS_link,
        payload: null,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const getBio = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({ url: `/bio/${data}`, method: "get" });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: GET_BIO,
          payload: apiCall?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      dispatch({
        type: GET_BIO,
        payload: null,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const getNewslatter = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({ url: `/bio/getLinkDataById/${data}`, method: "get" });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: GET_NEWSLATTER,
          payload: apiCall?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      dispatch({
        type: GET_NEWSLATTER,
        payload: null,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const updateBio = (id, data, userName) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({
        url: `/bio/${id}`,
        method: "patch",
        data: data,
      });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        ToastNotification.success("Bio updated successfully!");
        dispatch(getBio(userName));
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const updateWidget = (id, data, userName) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({
        url: `/bio/widget/${id}`,
        method: "patch",
        data: data,
      });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        ToastNotification.success("Widget updated successfully!");
        dispatch(getBio(userName));
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const getSingleAppInfo = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({
        url: `/plateforms/${id}`,
        method: "get",
      });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: GET_SINGLE_APP_INFO,
          payload: apiCall?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const createBio = (data, userName) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({ url: `/bio`, method: "put", data: data });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        ToastNotification.success("Link added successfully!");
        dispatch(getBio(userName));
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const createWidget = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({ url: `/bio/widget`, method: "post", data: data });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        ToastNotification.success("Link added successfully!");
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const deleteBio = (id, userName, type) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({
        url: `/bio/${id}`,
        method: "delete",
        data: { type: type },
      });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        ToastNotification.success("Link deleted successfully!");
        dispatch(getBio(userName));
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const clearEditData = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: EDIT_USER,
        payload: null,
      });
    } catch (error) {
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const getUser = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      // const userName = await API({ url: `/users/${data}`, method: "get" });
      const userName = await API({ url: `/users`, method: "get" });
      if (userName?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: AUTH,
          payload: userName?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const deleteAccount = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const userName = await API({ url: `/users/delete-account`, method: "delete" });
      if (userName?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
      }
      return userName?.data;
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const logOut = () => {
  return async (dispatch) => {
    try {
      if (typeof window !== "undefined") {
        deleteCookie("token");
        persistor.purge();
        window.location.href = "/";
        localStorage.removeItem("selectedCard");
        localStorage.removeItem("name");
      }
    } catch (error) {
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const clearBio = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_BIO,
        payload: null,
      });
    } catch (error) {
      dispatch({
        type: GET_BIO,
        payload: null,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const getAllPlateform = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ALL_PLATEFORM,
        payload: null,
      });
      const plateforms = await API({
        url: `/plateforms?type[0]=${data[0]}&type[1]=${data[1]}&type[2]=${data[2]}&type[3]=${data[3]}&status=true`,
        method: "get",
      });
      if (plateforms?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: ALL_PLATEFORM,
          payload: plateforms?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ALL_PLATEFORM,
        payload: null,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const getProductCategory = (type, id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_DATA_APP,
        payload: null,
      });
      const plateforms = await API({
        url: `/app/shop/${type}/${id}?search=${data}`,
        method: "get",
      });
      if (plateforms?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: SEARCH_DATA_APP,
          payload: plateforms?.data?.data,
        });
        return plateforms?.data;
      }
    } catch (error) {
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const deleteAuthorizedApp = (id, userName) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({
        url: `/app/auth/remove/${id}`,
        method: "delete",
      });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        ToastNotification.success("Authorization Remove successfully!");
        dispatch(getBio(userName));
        return apiCall.data;
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const faceBookItem = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FACEBOOK_DATA,
        payload: null,
      });
      const plateforms = await API({
        url: `/app/fb/pages`,
        method: "get",
      });
      if (plateforms?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: FACEBOOK_DATA,
          payload: plateforms?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: FACEBOOK_DATA,
        payload: null,
      });
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
