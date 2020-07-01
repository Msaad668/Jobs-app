import { GET_JOBS, JOB_ERROR } from "./types";
import Axios from "axios";

// Get jobs
export const getJobs = () => async (dispatch) => {
  try {
    const res = await Axios.get("/api/jobs");

    dispatch({
      type: GET_JOBS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
