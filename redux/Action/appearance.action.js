import ToastNotification from "@/controller/ToastNotification";
import {
  ERROR,
  GET_SINGLE_THEME_DATA,
  GET_THEME_DATA,
  LOADER,
  UPDATE_APPERANCE,
  UPDATE_APPERANCE_THEME,
} from "../action.type";
import { editUser } from "./auth.action";
import API from "@/api";

export const updateApperance = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_APPERANCE,
        payload: data,
      });
      dispatch(editUser({ customize_theme: data }));
    } catch (error) {
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const updateApperanceTheme = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_APPERANCE_THEME,
        payload: data,
      });
      dispatch(editUser({ template: data }));
    } catch (error) {
      ToastNotification.error(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const getTheme = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({
        url: `/themes`,
        method: "get",
      });
      if (apiCall?.status === 200 || apiCall?.status === 304) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: GET_THEME_DATA,
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
export const getSingleThemeData = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({
        url: `/themes/${data}`,
        method: "get",
      });
      if (apiCall?.status === 200 || apiCall?.status === 304) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: GET_SINGLE_THEME_DATA,
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
