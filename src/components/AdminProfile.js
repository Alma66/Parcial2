import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.js';
import styles from '../css/AdminProfile.module.css';

const AdminProfile = () => {
  const { user, getAuthAxios } = useAuth();
  const [profileData, setProfileData] = useState({ name: '', apellido: '', number: '' });
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const api = getAuthAxios();
        const res = await api.get('/api/admins/me');
        setProfileData(res.data);
      } catch (err) {
        console.error('Error al cargar perfil:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const updateProfile = async () => {
    try {
      const api = getAuthAxios();
      await api.put('/api/admins/me', profileData);
      alert('Perfil actualizado');
    } catch (err) {
      alert('Error al actualizar: ' + err.response?.data?.message);
    }
  };

  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div className={styles.adminProfile}>
      <h2>Mi Perfil de Administrador</h2>
      <div className={styles.menu}>
        <button onClick={() => setActiveMenu(activeMenu === 'datos' ? null : 'datos')}>Datos Personales</button>
        {activeMenu === 'datos' && (
          <div className={styles.subMenu}>
            <button onClick={() => setActiveSubMenu(activeSubMenu === 'editar' ? null : 'editar')}>Editar Datos</button>
            {activeSubMenu === 'editar' && (
              <form onSubmit={(e) => { e.preventDefault(); updateProfile(); }}>
                <input type="text" placeholder="Nombre" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} />
                <input type="text" placeholder="Apellido" value={profileData.apellido} onChange={(e) => setProfileData({ ...profileData, apellido: e.target.value })} />
                <input type="number" placeholder="Número de Administrador" value={profileData.number} onChange={(e) => setProfileData({ ...profileData, number: e.target.value })} />
                <button type="submit">Actualizar</button>
              </form>
            )}
          </div>
        )}
        <button onClick={() => setActiveMenu(activeMenu === 'seguridad' ? null : 'seguridad')}>Seguridad</button>
        {activeMenu === 'seguridad' && (
          <div className={styles.subMenu}>
            <button>Cambiar Contraseña</button>
            <button>Ver Logs de Acceso</button>
          </div>
        )}
        <button onClick={() => setActiveMenu(activeMenu === 'gestion' ? null : 'gestion')}>Gestionar Usuarios</button>
        {activeMenu === 'gestion' && (
          <div className={styles.subMenu}>
            <button>Ver Usuarios Activos</button>
            <button>Bloquear Usuario</button>
          </div>
        )}
        <button onClick={() => setActiveMenu(activeMenu === 'estadisticas' ? null : 'estadisticas')}>Ver Estadísticas</button>
        {activeMenu === 'estadisticas' && (
          <div className={styles.subMenu}>
            <button>Ventas Mensuales</button>
            <button>Productos Más Vendidos</button>
          </div>
        )}
        <button onClick={() => setActiveMenu(activeMenu === 'config' ? null : 'config')}>Configuración de Sistema</button>
        {activeMenu === 'config' && (
          <div className={styles.subMenu}>
            <button>Configurar Envío</button>
            <button>Actualizar Políticas</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;