import { GET_JOBS, JOB_ERROR, GET_JOB } from "./types";
// import api from "../utils/api";
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
// Get a single job
export const getJob = (jobId) => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/jobs/${jobId}`);
    console.log(res.data);

    dispatch({
      type: GET_JOB,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};
