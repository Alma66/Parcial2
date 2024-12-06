import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from '../../css/Register.module.css';

const Register = () => {
  const { register, login } = useAuth(); // Funciones de registro e inicio de sesión
  const [username, setUsername] = useState(''); // Estado = nombre de usuario
  const [password, setPassword] = useState(''); // Estado = contraseña
  const [error, setError] = useState(''); // Para mostrar errores

  // Función que maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar que los campos no estén vacíos
    if (!username || !password) {
      setError('Por favor ingresa todos los campos.');
      return;
    }

    // Intentar registrar al nuevo usuario
    const errorMessage = register(username, password);

    if (errorMessage) {
      setError(errorMessage); // Si hubo un error (usuario ya existe)
    } else {
      // Si no hubo error, hacer login automáticamente
      login(username, password);
      setUsername('');
      setPassword('');
      setError('');
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
            onChange={(e) => setUsername(e.target.value)} // Cambiar el estado con el valor del input
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Cambiar el estado con el valor del input
          />
           {/* Botón de envío, se desactiva si falta algún campo */}
          <button type="submit" disabled={!username || !password}>Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;