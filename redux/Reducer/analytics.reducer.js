import {
  GET_ANALYTICS,
  GET_ANALYTICS_ID,
  GET_ANALYTICS_TOTAL,
  GET_ANALYTICS_TOTAL_CLICK,
} from "../action.type";
const intialState = {
  analyticsData: null,
  analyticsSingleIdData: null,
  analyticsTotalData: null,
  analyticsTotalClickData: null,
};

export const analyticsReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_ANALYTICS:
      return {
        ...state,
        analyticsData: action.payload,
      };

    default:
      return state;
  }
};
export const analyticsIdReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_ANALYTICS_ID:
      return {
        ...state,
        analyticsSingleIdData: action.payload,
      };

    default:
      return state;
  }
};
export const analyticsTotalReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_ANALYTICS_TOTAL:
      return {
        ...state,
        analyticsTotalData: action.payload,
      };

    default:
      return state;
  }
};
export const analyticsTotalClickReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_ANALYTICS_TOTAL_CLICK:
      return {
        ...state,
        analyticsTotalClickData: action.payload,
      };

    default:
      return state;
  }
};
