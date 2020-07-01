import { combineReducers } from "redux";
import alert from "./alert";
import job from "./jobs";
export default combineReducers({
  alert,
  job,
});
