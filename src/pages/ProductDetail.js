import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Para obtener ID y navegar
import { useCart } from '../context/CartContext.js';
import { useAuth } from '../context/AuthContext.js';
import styles from '../css/ProductDetail.module.css';

const ProductDetail = () => {
  const { id } = useParams(); // Obtener ID del producto desde URL
  const navigate = useNavigate(); // Para redirigir al login si no autenticado
  const { addToCart, notification } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) throw new Error('Producto no encontrado');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login'); // Redirigir al login si no autenticado
      return;
    }
    addToCart(product); // Agregar al carrito si autenticado
  };

  if (loading) return <div className={styles.productDetail}><p>Cargando producto...</p></div>;
  if (error) return <div className={styles.productDetail}><p>Error: {error}</p></div>;
  if (!product) return <div className={styles.productDetail}><p>Producto no encontrado</p></div>;

  return (
    <div className={styles.productDetail}>
      <div className={styles.productContainer}>
        <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
        <div className={styles.productInfo}>
          <h1>{product.name}</h1>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.category}>Categoría: {product.category?.name || 'Sin categoría'}</p>
          <button onClick={handleAddToCart} className={styles.addToCartButton}>
            Agregar al carrito
          </button>
        </div>
      </div>
      {notification && <div className={styles.notification}>{notification}</div>}
    </div>
  );
};

export default ProductDetail;