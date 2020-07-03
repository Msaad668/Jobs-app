import { combineReducers } from "redux";
import alert from "./alert";
import job from "./jobs";
import auth from "./auth";

export default combineReducers({
  alert,
  job,
  auth,
});
