import React, { createContext, useContext, useState } from 'react';

// Creamr contexto para carrito
const CartContext = createContext();

// Componente proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); /// Estado = almacenar los productos
  const [notification, setNotification] = useState('');  // Estado = la notificación

  // Función = agregar un producto 
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]); //Agregar producto
    setNotification(`¡${product.name} agregado al carrito!`);  // Mensaje de  notificación
    setTimeout(() => setNotification(''), 3000);  // Limpiar la notificación después de 3 segundos
  };

  // Función = eliminar producto por id
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  // Función para limpiar el carrito
  const clearCart = () => {
    setCart([]); //Borrar todos los productos
  };

  // Estado y las funciones necesarias para interactuar 
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, notification }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para acceder al contexto del carrito
export const useCart = () => useContext(CartContext);
