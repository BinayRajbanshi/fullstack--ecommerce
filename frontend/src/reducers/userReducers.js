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
  USER_LIST_RESET,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_DETAILS_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_SINGLE_REQUEST,
  USER_SINGLE_SUCCESS,
  USER_SINGLE_FAIL,
  USER_ADMIN_UPDATE_REQUEST,
  USER_ADMIN_UPDATE_SUCCESS,
  USER_ADMIN_UPDATE_FAIL,
  USER_ADMIN_UPDATE_RESET,
  USER_SINGLE_RESET,
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
  if (action.type === USER_LOGOUT) {
    return {};
  }
  return state;
};

export const userListReducer = (state = { users: [] }, action) => {
  if (action.type === USER_LIST_REQUEST) {
    return { loading: true };
  }
  if (action.type === USER_LIST_SUCCESS) {
    return { loading: false, users: action.payload };
  }
  if (action.type === USER_LIST_FAIL) {
    return { loading: false, error: action.payload };
  }
  if (action.type === USER_LIST_RESET) {
    return { users: [] };
  }
  return state;
};

export const userDetailsReducer = (state = {}, action) => {
  if (action.type === USER_DETAILS_REQUEST) {
    return { loading: true };
  }
  if (action.type === USER_DETAILS_SUCCESS) {
    return { loading: false, userDetail: action.payload };
  }
  if (action.type === USER_DETAILS_FAIL) {
    return { loading: false, error: action.payload };
  }
  if (action.type === USER_DETAILS_RESET) {
    return {};
  }
  return state;
};

export const userUpdateReducer = (state = {}, action) => {
  if (action.type === USER_UPDATE_REQUEST) {
    return { loading: true };
  }
  if (action.type === USER_UPDATE_SUCCESS) {
    return { loading: false, success: true };
  }
  if (action.type === USER_UPDATE_FAIL) {
    return { loading: false, error: action.payload };
  }
  if (action.type === USER_UPDATE_RESET) {
    return {};
  }
  return state;
};

export const userDeleteReducer = (state = {}, action) => {
  if (action.type === USER_DELETE_REQUEST) {
    return { loading: true };
  }
  if (action.type === USER_DELETE_SUCCESS) {
    return { loading: false, success: true };
  }
  if (action.type === USER_DETAILS_FAIL) {
    return { loading: false, error: action.payload };
  }
  return state;
};

export const userSingleReducer = (state = {}, action) => {
  if (action.type === USER_SINGLE_REQUEST) {
    return { loading: true };
  }
  if (action.type === USER_SINGLE_SUCCESS) {
    return { loading: false, user: action.payload };
  }
  if (action.type === USER_SINGLE_FAIL) {
    return {
      loading: false,
      error: action.payload,
    };
  }
  if (action.type === USER_SINGLE_RESET) {
    return {};
  }
  return state;
};

export const userAdminUpdateReducer = (state = {}, action) => {
  if (action.type === USER_ADMIN_UPDATE_REQUEST) {
    return { loading: false };
  }
  if (action.type === USER_ADMIN_UPDATE_SUCCESS) {
    return {
      loading: false,
      success: true,
    };
  }
  if (action.type === USER_ADMIN_UPDATE_FAIL) {
    return {
      loading: false,
      error: action.payload,
    };
  }
  if (action.type === USER_ADMIN_UPDATE_RESET) {
    return {};
  }
  return state;
};
