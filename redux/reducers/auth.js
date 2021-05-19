import { SET_DATA_USER, SET_DATA_SESSION } from "../actionTypes";

const initialState = {
  dataUser: null,
  dataSession: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_SESSION:
      return {
        ...state,
        dataSession: action.payload,
      };
    case SET_DATA_USER:
      return {
        ...state,
        dataUser: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
