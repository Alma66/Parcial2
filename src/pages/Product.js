import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Agregar Link para navegación
import { useCart } from '../context/CartContext.js';
import { useAuth } from '../context/AuthContext.js';
import styles from '../css/Products.module.css';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart, notification } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) throw new Error('Error al cargar productos');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || product.category?.name === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(p => p.category?.name).filter(Boolean))];

  if (loading) return <div className={styles.productsWrapper}><p>Cargando productos...</p></div>;
  if (error) return <div className={styles.productsWrapper}><p>Error: {error}</p></div>;

  return (
    <div className={styles.productsWrapper}>
      <h2>Productos</h2>

      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchBar}
      />

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className={styles.searchBar}
      >
        <option value="">Todas las categorías</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {notification && (
        <div className={styles.notification}>{notification}</div>
      )}

      <div className={styles.productsContainer}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className={styles.productImage}
              />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <p>Categoría: {product.category?.name || 'Sin categoría'}</p>
              {}
              <Link to={`/product/${product.id}`} className={styles.viewPieceButton}>
                Ver pieza
              </Link>
            </div>
          ))
        ) : (
          <p>No se encontraron productos</p>
        )}
      </div>
    </div>
  );
};

export default Products;