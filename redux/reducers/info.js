import { SET_DATA_INFO } from "../actionTypes";

const initialState = {
  dataInfo: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_INFO:
      return {
        ...state,
        dataInfo: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
