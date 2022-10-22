import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleProduct from "./screens/SingleProductScreen";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route to path="/login" element={<LoginScreen />}></Route>
          <Route to path="/register" element={<RegisterScreen />}></Route>
          <Route to path="/" element={<HomeScreen />}></Route>
          <Route to path="/product/:id" element={<SingleProduct />} />
          <Route to path="/cart" element={<Cart />} />
          <Route to path="/cart/:id" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
