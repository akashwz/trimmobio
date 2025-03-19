import ToastNotification from "@/controller/ToastNotification";
import {
  ERROR,
  GET_ANALYTICS,
  GET_ANALYTICS_ID,
  GET_ANALYTICS_TOTAL,
  GET_ANALYTICS_TOTAL_CLICK,
  LOADER,
} from "../action.type";
import API from "@/api";

export const viewAnalytics = (startDate, endDate) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });

      const apiCall = await API({
        url: `/analytics/view-analytics?startDate=${startDate}&endDate=${endDate}`,
        method: "get",
      });

      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: GET_ANALYTICS,
          payload: apiCall?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      dispatch({
        type: GET_ANALYTICS,
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

export const viewAnalyticsIds = (startDate, endDate, id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });

      const apiCall = await API({
        url: `/analytics/view-analytics?startDate=${startDate}&endDate=${endDate}&link=${id}`,
        method: "get",
      });

      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: GET_ANALYTICS_ID,
          payload: apiCall?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      dispatch({
        type: GET_ANALYTICS_ID,
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

export const viewBioLinks = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });

      const apiCall = await API({
        url: `bio/getAllLinks`,
        method: "get",
      });

      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        // dispatch({
        //     type: GET_ANALYTICS,
        //     payload: apiCall?.data?.data,
        // });
        return apiCall?.data?.data;
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      dispatch({
        type: GET_ANALYTICS,
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

export const totalAnalytics = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({
        url: `/analytics/total-analytics`,
        method: "get",
      });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: GET_ANALYTICS_TOTAL,
          payload: apiCall?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      dispatch({
        type: GET_ANALYTICS_TOTAL,
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
export const totalClickAnalytics = (startDate, endDate) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADER,
        payload: true,
      });
      const apiCall = await API({
        url: `/analytics/click-rate-analytics?startDate=${startDate}&endDate=${endDate}`,
        method: "get",
      });
      if (apiCall?.data) {
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: GET_ANALYTICS_TOTAL_CLICK,
          payload: apiCall?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: LOADER,
        payload: false,
      });
      dispatch({
        type: GET_ANALYTICS_TOTAL_CLICK,
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
