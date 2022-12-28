import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_MYLIST_REQUEST,
  ORDER_MYLIST_SUCCESS,
  ORDER_MYLIST_FAIL,
  ORDER_MYLIST_RESET,
  ORDER_ADMIN_LIST_REQUEST,
  ORDER_ADMIN_LIST_SUCCESS,
  ORDER_ADMIN_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

const orderCreateReducer = (state = {}, action) => {
  if (action.type === ORDER_CREATE_REQUEST) {
    return {
      loading: true,
    };
  }
  if (action.type === ORDER_CREATE_SUCCESS) {
    return {
      loading: false,
      success: true,
      orderDetails: action.payload,
    };
  }
  if (action.type === ORDER_CREATE_FAIL) {
    return { loading: false, error: action.payload };
  }
  return state;
};

const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  if (action.type === ORDER_DETAILS_REQUEST) {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === ORDER_DETAILS_SUCCESS) {
    return {
      loading: false,
      order: action.payload,
    };
  }
  if (action.type === ORDER_DETAILS_FAIL) {
    return {
      loading: false,
      error: action.payload,
    };
  }
  return state;
};

const orderPayReducer = (state = {}, action) => {
  if (action.type === ORDER_PAY_REQUEST) {
    return { loading: true };
  }
  if (action.type === ORDER_PAY_SUCCESS) {
    return {
      loading: false,
      success: true,
    };
  }
  if (action.type === ORDER_PAY_FAIL) {
    return {
      loading: false,
      error: action.payload,
    };
  }
  if (action.type === ORDER_PAY_RESET) {
    return {};
  }
  return state;
};

const listMyOrdersReducer = (state = { orders: [] }, action) => {
  if (action.type === ORDER_MYLIST_REQUEST) {
    return { state, loading: true };
  }
  if (action.type === ORDER_MYLIST_SUCCESS) {
    return { loading: false, orders: action.payload };
  }
  if (action.payload === ORDER_MYLIST_FAIL) {
    return { loading: false, error: action.payload };
  }
  if (action.payload === ORDER_MYLIST_RESET) {
    return { orders: [] };
  }
  return state;
};

const adminOrdersReducer = (state = {}, action) => {
  if (action.type === ORDER_ADMIN_LIST_REQUEST) {
    return { loading: true };
  }
  if (action.type === ORDER_ADMIN_LIST_SUCCESS) {
    return {
      loading: false,
      orders: action.payload,
    };
  }
  if (action.type === ORDER_ADMIN_LIST_FAIL) {
    return {
      loading: false,
      error: action.payload,
    };
  }
  return state;
};

const deliverOrderReducer = (state = {}, action) => {
  if (action.type === ORDER_DELIVER_REQUEST) {
    return { loading: true };
  }
  if (action.type === ORDER_DELIVER_SUCCESS) {
    return { loading: false, success: true };
  }
  if (action.type === ORDER_DELIVER_FAIL) {
    return { loading: false, error: action.payload };
  }
  if (action.type === ORDER_DELIVER_RESET) {
    return {};
  }
  return state;
};

export {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  listMyOrdersReducer,
  adminOrdersReducer,
  deliverOrderReducer,
};
