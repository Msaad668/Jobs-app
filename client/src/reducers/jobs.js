import {
  GET_JOBS,
  JOB_ERROR,
  GET_JOB,
  GET_APPLICATIONS,
} from "../actions/types";

const initialState = {
  jobs: [],
  job: null,
  loading: true,
  error: {},
  applications: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: payload,
        loading: false,
      };
    case GET_APPLICATIONS:
      return {
        ...state,
        applications: payload,
        loading: false,
      };
    case GET_JOB:
      return {
        ...state,
        job: payload,
        loading: false,
      };
    case JOB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
