import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.js';  
import Footer from './components/Footer.js'; 
import Home from './pages/Home.js';
import Contact from './pages/Contact.js';
import Products from './pages/Product.js';
import ProductDetail from './pages/ProductDetail.js'; // Nuevo: Vista detallada
import Cart from './components/Cart.js';
import { AuthProvider } from './context/AuthContext.js';
import { CartProvider } from './context/CartContext.js';
import Login from './components/sesion/Login.js';
import Register from './components/sesion/Register.js';
import Logout from './components/sesion/Logout.js';
import AdminPanel from './components/AdminPanel.js';
import SobreNosotros from './pages/SobreNosotros.js';
import UserProfile from './components/UserProfile.js';
import AdminProfile from './components/AdminProfile.js';
import { useAuth } from './context/AuthContext.js';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />  
            <Routes>
              <Route path="/" element={<Home />} />
               <Route path="/contact" element={<Contact />} />
              <Route path="/sobrenosotros" element={<SobreNosotros />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} /> {/* Nuevo: Vista detallada */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/admin" element={<AdminRoute />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/admin-profile" element={<AdminProfile />} />
            </Routes>
            <Footer />  
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

const AdminRoute = () => {
  const { user } = useAuth();
  return user && user.role === 'admin' ? <AdminPanel /> : <Home />;
};

export default App;