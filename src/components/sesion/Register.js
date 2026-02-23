import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/Register.module.css';

const Register = () => {
  const { register, login } = useAuth(); // funciones del contexto
  const navigate = useNavigate();
  const [username, setUsername] = useState(''); // Estado = nombre de usuario
  const [password, setPassword] = useState(''); // Estado = contraseña
  const [error, setError] = useState(''); // Para mostrar errores
  const [loading, setLoading] = useState(false);

  // Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Verificar que los campos no estén vacíos
    if (!username || !password) {
      setError('Por favor ingresa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      // Intentar registrar al nuevo usuario (register espera un objeto payload)
      const res = await register({ username, password });

     setLoading(false);

if (!res.ok) {
  setError(res.message || 'No se pudo registrar el usuario.');
  return;
}

// Si register devolvió user (porque devolvió accessToken)
if (res.user) {
  // redirigir según rol
  const role = res.user.role;
  const isAdmin = Array.isArray(role)
  ? role.map(r => String(r).toLowerCase()).includes('admin')
  : String(role || '').toLowerCase() === 'admin';
  if (isAdmin) navigate('/admin');
  else navigate('/');
  return;
}

// Si no devolvió token, intentar logear automáticamente (como ya tenías)
const loginRes = await login(username, password);
if (!loginRes.ok) {
  setError(`Registro ok pero no se pudo iniciar sesión: ${loginRes.message || ''}`);
  return;
}
navigate('/');

      // Si todo ok => redirect a home
      navigate('/');
    } catch (err) {
      setLoading(false);
      console.error('Register error:', err);
      setError('Ocurrió un error inesperado al registrarse.');
    } finally {
      // Limpiar campos si querés (opcional)
      // setUsername('');
      // setPassword('');
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerFormWrapper}>
        <h3>Registrarse</h3>
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
            autoComplete="new-password"
          />
          <button type="submit" disabled={loading || !username || !password}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
