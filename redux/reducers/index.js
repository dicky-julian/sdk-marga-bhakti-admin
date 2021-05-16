import { combineReducers } from "redux";
import referenceReducer from "./reference";
import authReducer from "./auth";
import layoutReducer from "./layout";
import articleReducer from "./article";

export default combineReducers({
  reference: referenceReducer,
  auth: authReducer,
  layout: layoutReducer,
  article: articleReducer,
});
