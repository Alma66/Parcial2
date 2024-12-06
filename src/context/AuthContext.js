import React, { createContext, useContext, useState } from 'react';

// SimulamR una DB usurios y roles
let fakeUsersDB = [
  { username: 'admin', password: 'admin123', role: 'Administrador' },
  { username: 'user1', password: 'user123', role: 'Usuario' },
  { username: 'user2', password: 'user123', role: 'Usuario' }
];

// Crear  el contexto de autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para almacenar user actual
  const [users, setUsers] = useState(fakeUsersDB); // Lista de usuarios

  // Función = iniciar sesión
  const login = (username, password) => {
    // Busca el usuario  = nombre y password
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      return null;
    } else {
      return 'Usuario o contraseña incorrectos';
    }
  };

  const register = (username, password) => {
    const userExists = users.some((user) => user.username === username);
    if (userExists) {
      return 'El usuario ya existe.';
    }

        // Si el usuario no existe, lo agrega a la lista
    const newUser = { username, password, role: 'Usuario' };
    setUsers([...users, newUser]); // Actualizar lista de usuarios
    setUser(newUser);
    return null;
  };

  // Función = cerrar sesión
  const logout = () => setUser(null);

  // Función = actualizar roles
  const updateUserRole = (username, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.username === username ? { ...u, role: newRole } : u
      )
    );
  };

  // Función = eliminar usuarios
  const deleteUser = (username) => {
    setUsers((prevUsers) => prevUsers.filter((u) => u.username !== username));
  };

  return (
    <AuthContext.Provider value={{ user, users, login, logout, register, updateUserRole, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
