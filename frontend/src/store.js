import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userListReducer,
  userDetailsReducer,
  userUpdateReducer,
  userDeleteReducer,
  userSingleReducer,
  userAdminUpdateReducer,
} from "./reducers/userReducers";
import {
  adminOrdersReducer,
  deliverOrderReducer,
  listMyOrdersReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  adminOrders: adminOrdersReducer,
  myOrders: listMyOrdersReducer,
  orderPay: orderPayReducer,
  orderDeliver: deliverOrderReducer,
  orderDetailsss: orderDetailsReducer,
  orderCreate: orderCreateReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userAdminList: userListReducer,
  userDetail: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  userSingleById: userSingleReducer,
  userAdminUpdate: userAdminUpdateReducer,
});
// get things from localstorage
const cartItemsfromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressfromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const userInfofromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsfromLocalStorage,
    shippingAddress: shippingAddressfromLocalStorage,
  },
  userLogin: {
    userInfo: userInfofromLocalStorage,
  },
  userRegister: {
    userInfo: userInfofromLocalStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
