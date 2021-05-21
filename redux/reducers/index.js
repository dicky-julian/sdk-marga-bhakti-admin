import { combineReducers } from "redux";
import referenceReducer from "./reference";
import authReducer from "./auth";
import layoutReducer from "./layout";
import articleReducer from "./article";
import eventReducer from "./event";
import infoReducer from "./info";
import userReducer from "./user";

export default combineReducers({
  reference: referenceReducer,
  auth: authReducer,
  layout: layoutReducer,
  article: articleReducer,
  event: eventReducer,
  info: infoReducer,
  user: userReducer,
});
