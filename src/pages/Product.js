import React, { useState } from 'react'; //useState para manejar el estado
// Importar los contextos = acceder al carrito y la autenticación
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; 
import styles from '../css/Products.module.css';

// Importar las imágenes
import anillo1 from '../assets/images/eclat_rubis.png';
import anillo2 from '../assets/images/flamme_rouge.png';
import anillo3 from '../assets/images/serenite_emeraude.png';
import anillo4 from '../assets/images/legende_verte.png';
import anillo5 from '../assets/images/emeraude_royale.png';
import aretes1 from '../assets/images/etoile_argentee.png';
import aretes2 from '../assets/images/reflet_lune.png';
import brazalete1 from '../assets/images/monnaie_dor.png';
import brazalete2 from '../assets/images/cirque_dargent.png';
import brazalete3 from '../assets/images/flamme_imperiale.png';
import collar1 from '../assets/images/saphir_celeste.png';
import collar2 from '../assets/images/lumiere_azur.png';
import collar3 from '../assets/images/eclat_saphir.png';
import collar4 from '../assets/images/couronne_rubis.png';
import collar5 from '../assets/images/rouge_eternel.png';
import collar6 from '../assets/images/emeraude_enchantee.png';
import collar7 from '../assets/images/harmonie_royale.png';

const Products = () => {
  // Usar el estado = manejar  búsqueda de productos
  const [searchQuery, setSearchQuery] = useState('');
  // Obtener las funciones de agregar al carrito y las notificaciones del contexto Cart
  const { addToCart, notification } = useCart();
  // Obtener el usuario autenticado desde el contexto Auth
  const { user } = useAuth();  
  
  const products = [
    { id: 1, name: 'Éclat Rubis', price: 100, image: anillo1 },
    { id: 2, name: 'Flamme Rouge', price: 200, image: anillo2 },
    { id: 3, name: 'Sérénité Émeraude', price: 300, image: anillo3 },
    { id: 4, name: 'Légende Verte', price: 100, image: anillo4 },
    { id: 5, name: 'Émeraude Royale', price: 200, image: anillo5 },
    { id: 6, name: 'Étoile Argentée', price: 300, image: aretes1 },
    { id: 7, name: 'Reflet de Lune', price: 100, image: aretes2 },
    { id: 8, name: 'Monnaie d Or', price: 200, image: brazalete1 },
    { id: 9, name: 'Cirque d Argent', price: 300, image: brazalete2 },
    { id: 10, name: 'Flamme Impériale', price: 100, image: brazalete3 },
    { id: 11, name: 'Saphir Céleste', price: 200, image: collar1 },
    { id: 12, name: 'Lumière Azur', price: 300, image: collar2 },
    { id: 13, name: 'Éclat Saphir', price: 300, image: collar3 },
    { id: 14, name: 'Couronne de Rubis', price: 300, image: collar4 },
    { id: 15, name: 'Rouge Éternel', price: 300, image: collar5 },
    { id: 16, name: 'Émeraude Enchantée', price: 300, image: collar6 },
    { id: 17, name: 'Harmonie Royale', price: 300, image: collar7 },
  ];

  // Filtrar los productos en barra de busqueda
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product) => {
    if (user) {
      addToCart(product); // Agregar el producto al carrito
    } else {
      alert('Debes iniciar sesión para agregar productos al carrito'); // Mostrar un mensaje si no está autenticado
    }
  };


  return (
    <div className={styles.productsWrapper}>
      <h2>Productos</h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Actualizar  búsqueda al escribir
        className={styles.searchBar}
      />
      {notification && (
        <div className={styles.notification}>{notification}</div>  // Mostrar la notificación
      )}
      <div className={styles.productsContainer}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button
                onClick={() => handleAddToCart(product)} // Llamar a la función para agregar al carrito
                className={styles.addToCartButton}
                disabled={!user}  // Desactivar el botón = no hay usuario autenticado
              >
                {user ? 'Agregar al carrito' : 'Inicia sesión para agregar'}
              </button>
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
