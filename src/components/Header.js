import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logout from './sesion/Logout';
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

       {/* Solo mostrar el enlace al carrito si el usuario es rol = USER -*/}
        {user && user.role !== 'Administrador' && <Link to="/cart">Carrito</Link>}

        {user ? (
          <div className={styles.userInfo}>
            <p>Bienvenido, {user.username}</p>
            <Logout className={styles.logoutButton} />
            {user.role === 'Administrador' && <Link to="/admin">Panel de Administración</Link>}
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
