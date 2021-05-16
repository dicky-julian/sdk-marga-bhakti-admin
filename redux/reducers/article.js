import { SET_IS_LOADING_ARTICLE, SET_DATA_ARTICLE } from "../actionTypes";

const initialState = {
  isLoadingArticle: false,
  dataArticle: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING_ARTICLE:
      return {
        ...state,
        isLoadingArticle: action.payload,
      };
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
