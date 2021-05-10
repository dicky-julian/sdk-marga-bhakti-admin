import {
  SET_IS_LOADING_LAYOUT,
  SET_DATA_LAYOUT,
  SET_DATA_ALERT_CONFIRM,
} from "../actionTypes";

const initialState = {
  isLoadingLayout: false,
  dataAlertConfirm: null,
  dataLayout: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING_LAYOUT:
      return {
        ...state,
        isLoadingLayout: action.payload,
      };
    case SET_DATA_ALERT_CONFIRM:
      return {
        ...state,
        dataAlertConfirm: action.payload,
      };
    case SET_DATA_LAYOUT:
      return {
        ...state,
        dataLayout: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
