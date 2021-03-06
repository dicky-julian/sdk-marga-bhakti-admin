import { SET_DATA_ARTICLE } from "../actionTypes";

const initialState = {
  dataArticle: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_ARTICLE:
      return {
        ...state,
        dataArticle: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
