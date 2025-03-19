import {
  GET_SINGLE_THEME_DATA,
  GET_THEME_DATA,
  UPDATE_APPERANCE,
  UPDATE_APPERANCE_THEME,
} from "../action.type";
const intialState = {
  userNames: null,
  appreanceTheme: null,
  getThemeData: null,
  singleThemeData: null,
  appreance: {
    bg_image: "",
    selectedBg: "flat_colour",
    basicColor: "#ffffff",
    buttonColor: "#f3f4f6",
    buttonFontColor: "#374151",
    buttonHoverBg: "#374151",
    buttonHoverFontColor: "#f3f4f6",
    shadowColor: "#1414b5",
    value: "gradient_up",
    selectedButton: "fill-2",
    form_color: "#d8b4fe",
    via_color: "#fbcfe8",
    to_color: "#fef08a",
    button_text_align: "center",
    username_text_color: "#000000",
    username_text_size: 18,
    description_text_color: "#000000",
    description_text_size: 14,
    bio_text_align: "center",
    bio_line_height: 20,
    profile_radius_top: 100,
    profile_radius_bottom: 100,
    profile_radius_left: 100,
    profile_radius_right: 100,
    social_media_show_as_a_button: false,
    background_box_shadow_spread: "#000000",
    profile_border_width: 2,
    profile_border_style: "solid",
    profile_border_color: "#ffffff",
  },
};

export const appreanceReducer = (state = intialState, action) => {
  switch (action.type) {
    case UPDATE_APPERANCE:
      return {
        ...state,
        appreance: action.payload,
      };
    case UPDATE_APPERANCE_THEME:
      return {
        ...state,
        appreanceTheme: action.payload,
      };
    case GET_THEME_DATA:
      return {
        ...state,
        getThemeData: action.payload,
      };
    case GET_SINGLE_THEME_DATA:
      return {
        ...state,
        singleThemeData: action.payload,
      };

    default:
      return state;
  }
};
