import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Logout = () => {
  const { logout } = useAuth(); // función logout del AuthContext

   // Función que maneja el evento de cerrar sesión
  const handleLogout = () => {
    logout(); // Función logout para cerrar sesión
  };

  return (
    <div>
      {/* Botón para cerrar sesión = ejecuta handleLogout*/}
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Logout;
