import {
  GET_JOBS,
  JOB_ERROR,
  GET_JOB,
  DELETE_APPLICATION,
  APPLIED_TO_JOB,
  CREATE_JOB,
  UPDATE_JOB,
  DELETE_JOB,
  GET_APPLICATIONS,
  PUT_IN_CONSIDERATION,
  NOT_SELECT,
  FILTER_JOBS,
  CLEAR_FILTER,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";

// Get jobs
export const getJobs = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/jobs");

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

// filter jobs
export const filterJobs = (text) => (dispatch) => {
  dispatch({
    type: FILTER_JOBS,
    payload: text,
  });
};
// clear filter jobs
export const clearFilter = () => (dispatch) => {
  dispatch({
    type: CLEAR_FILTER,
  });
};

// Get a single job
export const getJob = (jobId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);

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

// apply for a job
export const applyToJob = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `http://localhost:5000/api/jobs/apply/${id}`,
      {},
      config
    );

    dispatch({
      type: APPLIED_TO_JOB,
      payload: res.data,
    });

    dispatch(setAlert("applied to job succesfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};
// unapply for a job
export const unapplyToJob = (job_id, application_id) => async (dispatch) => {
  try {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    await axios.delete(
      `http://localhost:5000/api/jobs/unapply/${job_id}/${application_id}`
    );

    dispatch({
      type: DELETE_APPLICATION,
      payload: application_id,
    });

    dispatch(setAlert("application deleted succesfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

// create a new job as an employer
export const createJob = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `http://localhost:5000/api/jobs`,
      formData,
      config
    );

    dispatch({
      type: CREATE_JOB,
      payload: res.data,
    });

    dispatch(setAlert("job created successfully", "success"));

    history.push("/jobs/myjobs");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

// update a job as an employer
export const updateJob = (id, formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      `http://localhost:5000/api/jobs/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_JOB,
      payload: res.data,
    });

    dispatch(setAlert("job updated successfully", "success"));

    history.push("/jobs/myjobs");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

// delete a job
export const deleteJob = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/jobs/${id}`);

    dispatch({
      type: DELETE_JOB,
      payload: id,
    });

    dispatch(setAlert("job deleted successfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};
// get all applications of a job
export const getApplications = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/jobs/applications/${id}`
    );

    dispatch({
      type: GET_APPLICATIONS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

// put an applicant in consideration
export const putInConsideration = (jobId, application_id, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      `http://localhost:5000/api/jobs/${jobId}/in_consideration/${application_id}`,
      {},
      config
    );

    dispatch({
      type: PUT_IN_CONSIDERATION,
      payload: res.data.applications,
    });

    dispatch(
      setAlert(
        "applicant put in consideration successfully, the applicant will be able to view the job status under his applications section",
        "success",
        6000
      )
    );

    history.push(`/jobs/myjobs/applications/${jobId}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};
// not select ann applicant
export const notSelect = (jobId, application_id, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      `http://localhost:5000/api/jobs/${jobId}/not_selected/${application_id}`,
      {},
      config
    );

    dispatch({
      type: NOT_SELECT,
      payload: res.data.applications,
    });

    dispatch(
      setAlert(
        "applicant NOT SELECTED successfully, the applicant will be able to view the job status under his applications section",
        "warning",
        6000
      )
    );

    history.push(`/jobs/myjobs/applications/${jobId}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};
