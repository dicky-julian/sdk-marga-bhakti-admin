import { SET_DATA_ACHIEVEMENT } from "../actionTypes";

const initialState = {
  dataAchievement: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_ACHIEVEMENT:
      return {
        ...state,
        dataAchievement: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
