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
  GET_ANALYTICS_link,
  GET_BIO,
  OTP_RESET,
  OTP_VERIFY,
  SEARCH_DATA_APP,
  FACEBOOK_DATA,
  GET_SINGLE_APP_INFO,
  GET_NEWSLATTER,
} from "../action.type";
const intialState = {
  userNames: null,
  userData: null,
  editData: null,
  platformData: null,
  bioData: null,
  anylaticsData: null,
  loginData: null,
  checkEmailPhoneData: null,
  registerData: null,
  otpData: null,
  otpResetData: null,
  allPlateformItems: null,
  searchDataApp: null,
  faceBookData: null,
  getThemeData: null,
  getSingleAppData: null,
  newslatterData: null,
};

export const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case CHECK_USERNAME:
      return {
        ...state,
        userNames: action.payload,
      };
    case CHECK_EMAILPHONE:
      return {
        ...state,
        checkEmailPhoneData: action.payload,
      };
    case AUTH:
      return {
        ...state,
        userData: action.payload,
      };
    case GET_SINGLE_APP_INFO:
      return {
        ...state,
        getSingleAppData: action.payload,
      };
    case EDIT_USER:
      return {
        ...state,
        editData: action.payload,
      };
    case ADD_PLATFORM:
      return {
        ...state,
        platformData: action.payload,
      };
    case ADD_BIO:
      return {
        ...state,
        bioData: action.payload,
      };
    case EMAIL_LOGIN:
      return {
        ...state,
        loginData: action.payload,
      };
    case EMAIL_REGISTER:
      return {
        ...state,
        registerData: action.payload,
      };
    case OTP_VERIFY:
      return {
        ...state,
        otpData: action.payload,
      };
    case OTP_RESET:
      return {
        ...state,
        otpResetData: action.payload,
      };
    case GET_BIO:
      return {
        ...state,
        bioData: action.payload,
      };
    case GET_NEWSLATTER:
      return {
        ...state,
        newslatterData: action.payload,
      };
    case GET_ANALYTICS_link:
      return {
        ...state,
        anylaticsData: action.payload,
      };
    case ALL_PLATEFORM:
      return {
        ...state,
        allPlateformItems: action.payload,
      };
    case SEARCH_DATA_APP:
      return {
        ...state,
        searchDataApp: action.payload,
      };
    case FACEBOOK_DATA:
      return {
        ...state,
        faceBookData: action.payload,
      };

    default:
      return state;
  }
};
