import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import Logout from './sesion/Logout.js';
import styles from '../css/Header.module.css'; 

const Header = () => {
  const { user } = useAuth(); // Obtener el usuario actual desde el contexto

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Ébano & Bronce</h1>
      <nav className={styles.nav}>
        <Link to="/">Inicio</Link>
        <Link to="/sobrenosotros">Sobre Nosotros</Link>
        <Link to="/products">Productos</Link>

        {/* Mostrar carrito solo para users, Admin Panel solo para admins */}
        {user && user.role !== 'admin' && <Link to="/cart">Carrito</Link>}
        {user && user.role === 'admin' && <Link to="/admin">Admin Panel</Link>}

        {user ? (
          <div className={styles.userInfo}>
            {/* Solo "Bienvenido, nombre" y clic para ir a perfil */}
            <Link to={user.role === 'admin' ? '/admin-profile' : '/user-profile'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <p>Bienvenido, {user.name || user.username}!</p>
            </Link>
            <Logout className={styles.logoutButton} />
          </div>
        ) : (
          <>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;