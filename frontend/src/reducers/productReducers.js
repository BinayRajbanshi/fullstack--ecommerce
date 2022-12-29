import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_RESET,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
} from "../constants/productConstants";
export const productListReducer = (
  state = { products: [], allCategories: [] },
  action
) => {
  if (action.type === PRODUCT_LIST_REQUEST) {
    return { loading: true, products: [] };
  }
  if (action.type === PRODUCT_LIST_SUCCESS) {
    return { loading: true, products: action.payload };
  }
  if (action.type === "GET_CATEGORIES") {
    return { ...state, allCategories: action.payload, loading: false };
  }
  if (action.type === PRODUCT_LIST_FAIL) {
    return { loading: false, error: action.payload };
  }
  return state;
};

export const productSearchReducer = (state = {}, action) => {
  if (action.type === PRODUCT_SEARCH_REQUEST) {
    return { loading: true };
  }
  if (action.type === PRODUCT_SEARCH_SUCCESS) {
    return { loading: false, product: action.payload };
  }
  if (action.type === PRODUCT_SEARCH_FAIL) {
    return { loading: false, error: action.payload };
  }
  return state;
};
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  if (action.type === PRODUCT_DETAILS_REQUEST) {
    return { ...state, loading: true };
  }
  if (action.type === PRODUCT_DETAILS_SUCCESS) {
    return { loading: false, product: action.payload };
  }
  if (action.type === PRODUCT_DETAILS_FAIL) {
    return { loading: false, error: action.payload };
  }
  return state;
};

// get the data in inital render

// this is the function for filtering the products when clicked on the button
export const productFilterReducer = (
  state = { filteredProducts: [] },
  action
) => {
  if ((action.type = "PROD_FILTER_REQ")) {
    return { loading: true, filteredProducts: [] };
  }
  if ((action.type = "PROD_FILTER_SUCCESS")) {
    return { loading: false, filteredProducts: action.payload };
  }
  return state;
};

export const productDeleteReducer = (state = {}, action) => {
  if (action.type === PRODUCT_DELETE_REQUEST) {
    return { loading: true };
  }
  if (action.type === PRODUCT_DELETE_SUCCESS) {
    return { loading: false, success: true };
  }
  if (action.type === PRODUCT_DELETE_FAIL) {
    return { loading: false, error: action.payload };
  }
  return state;
};

export const productCreateReducer = (state = {}, action) => {
  if (action.type === PRODUCT_CREATE_REQUEST) {
    return { loading: true };
  }
  if (action.type === PRODUCT_CREATE_SUCCESS) {
    return { loading: false, success: true, product: action.payload };
  }
  if (action.type === PRODUCT_CREATE_FAIL) {
    return { loading: false, error: action.payload };
  }
  if (action.type === PRODUCT_CREATE_RESET) {
    return {};
  }
  return state;
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  if (action.type === PRODUCT_UPDATE_REQUEST) {
    return { loading: true };
  }
  if (action.type === PRODUCT_UPDATE_SUCCESS) {
    return { loading: false, success: true, product: action.payload };
  }
  if (action.type === PRODUCT_UPDATE_FAIL) {
    return { loading: false, error: action.payload };
  }
  if (action.type === PRODUCT_UPDATE_RESET) {
    return { product: {} };
  }
  return state;
};

export const productReviewReducer = (state = {}, action) => {
  if (action.type === PRODUCT_REVIEW_REQUEST) {
    return { loading: true };
  }
  if (action.type === PRODUCT_REVIEW_SUCCESS) {
    return { loading: false, success: true };
  }
  if (action.type === PRODUCT_REVIEW_FAIL) {
    return { loading: false, error: action.payload };
  }
  if (action.type === PRODUCT_REVIEW_RESET) {
    return {};
  }
  return state;
};

export const productTopReducer = (state = {}, action) => {
  if (action.type === PRODUCT_TOP_REQUEST) {
    return { loading: true };
  }
  if (action.type === PRODUCT_TOP_SUCCESS) {
    return { loading: false, products: action.payload };
  }
  if (action.type === PRODUCT_DETAILS_FAIL) {
    return { loading: false, error: action.payload };
  }
  return state;
};
