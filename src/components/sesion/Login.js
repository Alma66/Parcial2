import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/Login.module.css';

const Login = () => {
  const { login, user } = useAuth(); // funciones del contexto
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!username || !password) {
    setError('Por favor, ingresa un usuario y una contraseña.');
    return;
  }

  setLoading(true);
  try {
    // dentro de handleSubmit después de obtener result:
const result = await login(username, password);
setLoading(false);

if (!result.ok) {
  setError(result.message || 'Error en el login');
  return;
}

// result.user contiene el payload decodificado (si el backend provee token)
const role = result.user?.role;

// Normalizamos role para comparar
const isAdmin =
  !!role &&
  (Array.isArray(role)
    ? role.map((r) => String(r).toLowerCase()).includes('admin')
    : String(role).toLowerCase() === 'admin');

if (isAdmin) navigate('/admin');
else navigate('/');


  } catch (err) {
    setLoading(false);
    setError('Ocurrió un error inesperado al iniciar sesión.');
    console.error('Login error:', err);
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
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
