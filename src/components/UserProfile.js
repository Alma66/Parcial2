import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.js';
import styles from '../css/UserProfile.module.css';

const UserProfile = () => {
  const { user, getAuthAxios } = useAuth();
  const [profileData, setProfileData] = useState({ name: '', email: '' });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const api = getAuthAxios();
        const userRes = await api.get('/api/users/me');
        setProfileData(userRes.data);
        const ordersRes = await api.get('/api/orders');
        setOrders(ordersRes.data);
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
      await api.put('/api/users/me', profileData);
      alert('Perfil actualizado');
    } catch (err) {
      alert('Error al actualizar: ' + err.response?.data?.message);
    }
  };

  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div className={styles.userProfile}>
      <h2>Mi Perfil</h2>
      <div className={styles.menu}>
        <button onClick={() => setActiveMenu(activeMenu === 'datos' ? null : 'datos')}>Datos Personales</button>
        {activeMenu === 'datos' && (
          <div className={styles.subMenu}>
            <button onClick={() => setActiveSubMenu(activeSubMenu === 'editar' ? null : 'editar')}>Editar Datos</button>
            {activeSubMenu === 'editar' && (
              <form onSubmit={(e) => { e.preventDefault(); updateProfile(); }}>
                <input type="text" placeholder="Nombre" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} />
                <input type="email" placeholder="Email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} />
                <button type="submit">Actualizar</button>
              </form>
            )}
          </div>
        )}
        <button onClick={() => setActiveMenu(activeMenu === 'seguridad' ? null : 'seguridad')}>Seguridad</button>
        {activeMenu === 'seguridad' && (
          <div className={styles.subMenu}>
            <button>Cambiar Contraseña</button>
            <button>Ver Dispositivos Conectados</button>
          </div>
        )}
        <button onClick={() => setActiveMenu(activeMenu === 'compras' ? null : 'compras')}>Mis Compras</button>
        {activeMenu === 'compras' && (
          <div className={styles.subMenu}>
            <button onClick={() => setActiveSubMenu(activeSubMenu === 'ver' ? null : 'ver')}>Ver Órdenes</button>
            {activeSubMenu === 'ver' && (
              <ul>
                {orders.map(order => (
                  <li key={order.id}>Orden #{order.id} - Total: ${order.totalAmount} - Estado: {order.status}</li>
                ))}
              </ul>
            )}
            <button>Descargar Facturas</button>
          </div>
        )}
        <button onClick={() => setActiveMenu(activeMenu === 'pagos' ? null : 'pagos')}>Métodos de Pago</button>
        {activeMenu === 'pagos' && (
          <div className={styles.subMenu}>
            <button>Agregar Tarjeta</button>
            <button>Ver Tarjetas Guardadas</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;