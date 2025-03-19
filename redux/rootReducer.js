import { combineReducers } from "redux";
import { authReducer } from "./Reducer/auth.reducer";
import { errorReducer } from "./Reducer/error.reducer";
import { appreanceReducer } from "./Reducer/appearance.reducer";
import {
  analyticsIdReducer,
  analyticsReducer,
  analyticsTotalClickReducer,
  analyticsTotalReducer,
} from "./Reducer/analytics.reducer";
const rootReducer = combineReducers({
  authReducer,
  errorReducer,
  appreanceReducer,
  analyticsReducer,
  analyticsTotalReducer,
  analyticsTotalClickReducer,
  analyticsIdReducer,
});

export default rootReducer;
