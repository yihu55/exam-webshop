import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import axios from "axios";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { UserContextProvider } from "./context/UserContext";
import SignupPage from "./pages/SignupPage";
import { ProductProvider } from "./context/ProductContext";
import DashboardPage from "./pages/DashboardPage";
import ProductPage from "./pages/ProductPage";

function App() {
  axios.defaults.baseURL =
    process.env.REACT_APP_WEBSHOP_API || "http://localhost:4000";

  axios.interceptors.request.use((config) => {
    const jwt = localStorage.getItem("webshop");
    if (jwt) {
      config.headers["authorization"] = `Bearer ${jwt}`;
    }
    return config;
  });
  return (
    <UserContextProvider>
      <ProductProvider>
        <ShoppingCartProvider>
          <Navbar />
          <Container className='mb-4'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/dashboard' element={<DashboardPage />} />
              <Route path='/product/:id' element={<ProductPage />} />
            </Routes>
          </Container>
        </ShoppingCartProvider>
      </ProductProvider>
    </UserContextProvider>
  );
}

export default App;
