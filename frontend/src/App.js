import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleProduct from "./screens/SingleProductScreen";
import UserListScreen from "./screens/UserListScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderScreen from "./screens/OrderScreen";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import UserEditScreen from "./screens/UserEditScreen";
import AdminOrdersScreen from "./screens/AdminOrdersScreen";

function App() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
      }}
    >
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route to path="/order/:orderId" element={<OrderScreen />}></Route>
            <Route to path="/placeOrder" element={<PlaceOrderScreen />}></Route>
            <Route to path="/payment" element={<PaymentScreen />}></Route>
            <Route to path="/shipping" element={<ShippingScreen />}></Route>
            <Route to path="/profile" element={<ProfileScreen />}></Route>
            <Route to path="/login" element={<LoginScreen />}></Route>
            <Route to path="/register" element={<RegisterScreen />}></Route>
            <Route to path="/" element={<HomeScreen />}></Route>
            <Route to path="/search/:keyword" element={<HomeScreen />}></Route>
            <Route to path="/product/:id" element={<SingleProduct />} />
            <Route to path="/cart" element={<Cart />} />
            <Route to path="/cart/:id" element={<Cart />} />
            <Route to path="/admin/users" element={<UserListScreen />} />
            <Route to path="/admin/orders" element={<AdminOrdersScreen />} />
            <Route
              to
              path="/admin/users/:userId/edit"
              element={<UserEditScreen />}
            />
            {/* admin product screen  */}
            <Route to path="/admin/products" element={<ProductListScreen />} />
            <Route
              to
              path="/admin/product/:productId/edit"
              element={<ProductEditScreen />}
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
