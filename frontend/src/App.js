import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleProduct from "./screens/SingleProduct";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route to path="/" element={<HomeScreen />}></Route>
          <Route to path="/product/:id" element={<SingleProduct />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
