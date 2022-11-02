import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  if (action.type === USER_LOGIN_REQUEST) {
    return { loading: true };
  }
  if (action.type === USER_LOGIN_SUCCESS) {
    return { loading: false, userInfo: action.payload };
  }
  if (action.type === USER_LOGIN_FAIL) {
    return { loading: false, error: action.payload };
  }
  if (action.type === USER_LOGOUT) {
    return {};
  }
  return state;
};

export const userRegisterReducer = (state = {}, action) => {
  if (action.type === USER_REGISTER_REQUEST) {
    return { loading: true };
  }
  if (action.type === USER_REGISTER_SUCCESS) {
    return { loading: false, userInfo: action.payload };
  }
  if (action.type === USER_REGISTER_FAIL) {
    return { loading: false, error: action.payload };
  }
  return state;
};

export const userListReducer = (state = {}, action) => {
  if (action.type === USER_LIST_REQUEST) {
    return { loading: true };
  }
  if (action.type === USER_LIST_SUCCESS) {
    return { loading: false, users: action.payload };
  }
  if (action.type === USER_LIST_FAIL) {
    return { loading: false, error: action.payload };
  }
  return state;
};
