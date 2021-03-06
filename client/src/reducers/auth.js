import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  EMPLOYER_REGISTER_SUCCESS,
  USER_REGISTER_SUCCESS,
  DELETE_APPLICATION,
  APPLIED_TO_JOB,
  CREATE_JOB,
  DELETE_JOB,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isEmployer: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        isEmployer: payload.isCompany,
      };
    case DELETE_APPLICATION:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: {
          ...state.user,
          jobsAppliedTo: state.user.jobsAppliedTo.filter(
            (job) => job.application !== payload
          ),
        },
      };
    case DELETE_JOB:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: {
          ...state.user,
          jobsPublished: state.user.jobsPublished.filter(
            (job) => job.job !== payload
          ),
        },
      };
    case APPLIED_TO_JOB:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: {
          ...state.user,
          jobsAppliedTo: payload,
        },
      };
    case CREATE_JOB:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: {
          ...state.user,
          jobsPublished: payload,
        },
      };
    // case UPDATE_JOB:
    //   return {
    //     ...state,
    //     isAuthenticated: true,
    //     loading: false,
    //     user: {
    //       ...state.user,
    //       jobsPublished: state.user.jobsPublished.map((job) => {
    //         if (job.job === payload.job) {
    //           job.title = payload.title;
    //         }
    //       }),
    //     },
    //   };
    case EMPLOYER_REGISTER_SUCCESS:
      if (payload.token) {
        localStorage.setItem("token", payload.token);
      }
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isEmployer: true,
        loading: false,
      };
    case USER_REGISTER_SUCCESS:
      if (payload.token) {
        localStorage.setItem("token", payload.token);
      }
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isEmployer: false,
        loading: false,
      };
    case LOGIN_SUCCESS:
      if (payload.token) {
        localStorage.setItem("token", payload.token);
      }
      return {
        ...state,
        ...payload,
        isAuthenticated: true,

        loading: false,
      };
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isEmployer: false,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
}
