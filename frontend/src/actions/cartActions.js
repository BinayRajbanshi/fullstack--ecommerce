import axios from "axios";
import { CART_REMOVE_ITEM, CART_ADD_ITEM } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const response = await axios.get(`/api/products/${id}`);
  const { image, _id, name, countInStock, price } = response.data;
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: _id,
      image,
      name,
      countInStock,
      price,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
