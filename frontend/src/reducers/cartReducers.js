import { CART_REMOVE_ITEM, CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  if (action.type === CART_ADD_ITEM) {
    const item = action.payload;

    // for checkin if the item already exists in the cart
    const itemExists = state.cartItems.find(
      (cartItem) => item.product === cartItem.product
    );

    if (itemExists) {
      return {
        ...state,
        // if it already exists you gotta replace the existing item
        cartItems: state.cartItems.map((x) => {
          // return x.product === itemExists.product ? item : x
          if (x.product === itemExists.product) {
            return item;
          } else {
            return x;
          }
        }),
      };
    } else {
      return {
        ...state,
        // if it doesnot exist add the item
        cartItems: [...state.cartItems, item],
      };
    }
  }

  if (action.type === CART_REMOVE_ITEM) {
    return {
      ...state,
      cartItems: state.cartItems.filter(
        (item) => item.product !== action.payload
      ),
    };
  }

  return state;
};
