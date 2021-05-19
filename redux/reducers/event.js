import { SET_DATA_EVENT } from "../actionTypes";

const initialState = {
  dataEvent: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_EVENT:
      return {
        ...state,
        dataEvent: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
