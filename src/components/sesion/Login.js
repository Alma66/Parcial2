import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import styles from '../../css/Login.module.css';

const Login = () => {
  const { login, user } = useAuth(); //funciones de login y la información del usuario 
  const navigate = useNavigate();  // Inicializar useNavigate = realizar redirecciones
  const [username, setUsername] = useState(''); // Estado para guardar nombre user
  const [password, setPassword] = useState(''); // Estado para guardar contraseña
  const [error, setError] = useState(''); // Estado para manejar  errores 

   // Función  envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
  
     // Verificar si el nombre de usuario y la contraseña están vacíos
    if (!username || !password) {
      setError('Por favor, ingresa un usuario y una contraseña.');
      return;
    }

    // Intentar iniciar sesión 
    const loginError = login(username, password); // Captura el error devuelto por login

    if (loginError) {
      setError(loginError); // Si hay error, mostrarlo
    } else {
      setError(''); // Limpiar error si login funciona

      // Si el login funciona y el usuario es administrador, redirigir a AdminPanel
      if (user && user.role === 'Administrador') {
        navigate('/admin');  // Redirige a AdminPanel (ajusta la ruta si es necesario)
      } else {
        navigate('/');  // Si no es administrador, redirige a la página principal
      }
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginFormWrapper}>
        <h3>Iniciar sesión</h3>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;