import { ERROR, LOADER } from '../action.type';
const intialState = {
  error: null,
  loader: false
};

export const errorReducer = (state = intialState, action) => {
  switch (action.type) {
    case LOADER:
      return {
        ...state,
        loader: action.payload || false
      }
    case ERROR:
      return {
        ...state,
        error: action.payload || false
      }
    default:
      return state;
  }
};
