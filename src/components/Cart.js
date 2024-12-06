import React from 'react';
import { useCart } from '../context/CartContext';
import styles from '../css/Cart.module.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();  // Obtenemos el carrito y funciones ELIMINAR UNO O TODOS

   // Calculamos el precio total 
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className={styles.cartWrapper}>
      <h2>Carrito</h2>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
             {/* Listamos los productos en el carrito */}
          <ul className={styles.cartItemsList}>
            {cart.map((item, index) => (  
              <li key={index}>
                {item.name} - ${item.price}
                <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          {/* Mostrar el precio total */}
          <p className={styles.totalPrice}>Total: ${totalPrice}</p>
         {/* Botón para vaciar el carrito */}
          <button className={styles.clearCartButton} onClick={clearCart}>Vaciar carrito</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
