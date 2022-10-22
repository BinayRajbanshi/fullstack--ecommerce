import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
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
