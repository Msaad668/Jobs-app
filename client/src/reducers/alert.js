const { REMOVE_ALERT, SET_ALERT } = require("../actions/types");

const initialState = [];

export default function (state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload.id);
    default:
      return state;
  }
}
