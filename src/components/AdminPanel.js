import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.js';
import styles from '../css/AdminPanel.module.css';

const AdminPanel = () => {
  const { user, hasRole, getAuthAxios } = useAuth();
  const [activeTable, setActiveTable] = useState('users'); // Tabla activa
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null); // Item en edición
  const [formData, setFormData] = useState({}); // Datos del formulario

  // Verificación de rol
  if (!hasRole('admin')) {
    return <p>No tienes acceso a esta sección.</p>;
  }

  // Endpoints y campos por tabla
  const tableConfig = {
    users: { endpoint: '/api/users', fields: ['id', 'name', 'email', 'createdAt'], relations: {} },
    admins: { endpoint: '/api/admins', fields: ['id', 'name', 'apellido', 'number', 'createdAt'], relations: {} },
    categories: { endpoint: '/api/categories', fields: ['id', 'name', 'createdAt'], relations: {} },
    products: { endpoint: '/api/products', fields: ['id', 'name', 'price', 'stockQuantity', 'categoryId', 'createdAt'], relations: { categoryId: 'category.name' } },
    cartItems: { endpoint: '/api/cart', fields: ['id', 'userId', 'productId', 'quantity', 'createdAt'], relations: { userId: 'user.name', productId: 'product.name' } },
    orders: { endpoint: '/api/orders', fields: ['id', 'userId', 'totalAmount', 'status', 'createdAt'], relations: { userId: 'user.name' } },
    orderItems: { endpoint: '/api/order-items', fields: ['id', 'orderId', 'productId', 'quantity', 'price'], relations: { orderId: 'order.id', productId: 'product.name' } },
  };

  // Cargar datos de la tabla activa
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const api = getAuthAxios();
        const res = await api.get(tableConfig[activeTable].endpoint);
        setData(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [activeTable]);

  // Resolver foreign keys (mostrar nombres en lugar de IDs)
  const resolveField = (item, field) => {
    const relation = tableConfig[activeTable].relations[field];
    if (relation) {
      const [relTable, relField] = relation.split('.');
      return item[relTable]?.[relField] || item[field];
    }
    return item[field];
  };

  // Crear nuevo item
  const createItem = async () => {
    try {
      const api = getAuthAxios();
      await api.post(tableConfig[activeTable].endpoint, formData);
      setFormData({});
      // Recargar datos
      const res = await api.get(tableConfig[activeTable].endpoint);
      setData(res.data || []);
    } catch (err) {
      alert('Error al crear: ' + err.response?.data?.message);
    }
  };

  // Actualizar item
  const updateItem = async () => {
    try {
      const api = getAuthAxios();
      await api.put(`${tableConfig[activeTable].endpoint}/${editingItem.id}`, formData);
      setEditingItem(null);
      setFormData({});
      // Recargar datos
      const res = await api.get(tableConfig[activeTable].endpoint);
      setData(res.data || []);
    } catch (err) {
      alert('Error al actualizar: ' + err.response?.data?.message);
    }
  };

  // Eliminar item
  const deleteItem = async (id) => {
    if (!window.confirm('¿Eliminar este item?')) return;
    try {
      const api = getAuthAxios();
      await api.delete(`${tableConfig[activeTable].endpoint}/${id}`);
      // Recargar datos
      const res = await api.get(tableConfig[activeTable].endpoint);
      setData(res.data || []);
    } catch (err) {
      alert('Error al eliminar: ' + err.response?.data?.message);
    }
  };

  // Iniciar edición
  const startEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
  };

  return (
    <div className={styles.adminPanel}>
      <div className={styles.sidebar}>
        <h3>Menú</h3>
        {Object.keys(tableConfig).map(table => (
          <button key={table} onClick={() => setActiveTable(table)} className={activeTable === table ? styles.active : ''}>
            {table.charAt(0).toUpperCase() + table.slice(1)}
          </button>
        ))}
      </div>
      <div className={styles.content}>
        <h2>Gestionar {activeTable.charAt(0).toUpperCase() + activeTable.slice(1)}</h2>
        {loading ? <p>Cargando...</p> : error ? <p>Error: {error}</p> : (
          <>
            {/* Formulario para crear/editar */}
            <form onSubmit={(e) => { e.preventDefault(); editingItem ? updateItem() : createItem(); }}>
              {tableConfig[activeTable].fields.filter(f => f !== 'id' && f !== 'createdAt').map(field => (
                <input
                  key={field}
                  type={field.includes('price') || field.includes('quantity') ? 'number' : 'text'}
                  placeholder={field}
                  value={formData[field] || ''}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  required
                />
              ))}
              <button type="submit">{editingItem ? 'Actualizar' : 'Crear'}</button>
              {editingItem && <button onClick={() => { setEditingItem(null); setFormData({}); }}>Cancelar</button>}
            </form>

            {/* Tabla */}
            <table>
              <thead>
                <tr>
                  {tableConfig[activeTable].fields.map(field => <th key={field}>{field}</th>)}
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id}>
                    {tableConfig[activeTable].fields.map(field => (
                      <td key={field}>{resolveField(item, field)}</td>
                    ))}
                    <td>
                      <button onClick={() => startEdit(item)}>Editar</button>
                      <button onClick={() => deleteItem(item.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;