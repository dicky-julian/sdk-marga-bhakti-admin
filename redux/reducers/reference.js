import { SET_DATA_REFERENCE } from "../actionTypes";

const initialState = {
  dataReference: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_REFERENCE:
      return {
        ...state,
        dataReference: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
