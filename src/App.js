import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  
import Footer from './components/Footer';  a
import Home from './pages/Home';  // Página principal
import Products from './pages/Product';  // Página de productos
import Cart from './components/Cart';  // Componente para el carrito
import { AuthProvider } from './context/AuthContext';  // Contexto de autenticación
import { CartProvider } from './context/CartContext';  // Contexto del carrito
import Login from './components/sesion/Login';  // Componente de login
import Register from './components/sesion/Register';  // Componente de registro
import Logout from './components/sesion/Logout';  // Componente de cierre de sesión
import AdminPanel from './components/AdminPanel';  // Panel de administración
import SobreNosotros from './pages/SobreNosotros';  // Página sobre nosotros

function App() {
  return (
    // AuthProvider y CartProvider = datos de la autenticación y el carrito
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />  
            <Routes>
              <Route path="/" element={<Home />} />  {/* Ruta principal */}
              <Route path="/sobrenosotros" element={<SobreNosotros />} />  {/* Ruta sobre nosotros */}
              <Route path="/products" element={<Products />} /> {/* Ruta para productos */}
              <Route path="/cart" element={<Cart />} />  {/* Ruta para el carrito */}
              <Route path="/login" element={<Login />} />  {/* Ruta para login */}
              <Route path="/register" element={<Register />} />  {/* Ruta para registro */}
              <Route path="/logout" element={<Logout />} />  {/* Ruta para logout */}
              <Route path="/admin" element={<AdminRoute />} />  {/* Ruta para panel de administrador */}
            </Routes>
            <Footer />  
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

// Componente = solo permitir el acceso al AdminPanel a administradores
const AdminRoute = () => {
  const { user } = useAuth();  // Obtener el usuario =  contexto de autenticación
  // Administrador = AdminPanel / User = Pagina Principal
  return user && user.role === 'Administrador' ? <AdminPanel /> : <Home />;
};

export default App;  
