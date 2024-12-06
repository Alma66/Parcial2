import React from 'react';
import { useAuth } from '../context/AuthContext';
import styles from '../css/AdminPanel.module.css';

const AdminPanel = () => {
  const { user, users, updateUserRole, deleteUser } = useAuth(); // Obtenemos funciones y datos desde el contexto

  // Verificar si el usuario tiene el rol "Administrador"
  if (user?.role !== "Administrador") {
    return <p>No tienes acceso a esta sección.</p>;
  }

  return (
    <div className={styles.adminPanel}>
      <h2>Panel de Administrador</h2>
      <p>Gestiona usuarios y roles.</p>
      {/* Tabla para mostrar los usuarios */}
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={index}>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>
                 {/* Botones para cambiar el rol del usuario */}
                <button onClick={() => updateUserRole(u.username, "Administrador")}>
                  Hacer Admin
                </button>
                <button onClick={() => updateUserRole(u.username, "Usuario")}>
                  Hacer Usuario
                </button>
                 {/* Botón para eliminar al usuario */}
                <button onClick={() => deleteUser(u.username)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default AdminPanel;
