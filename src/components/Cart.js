import React from 'react';
import { useCart } from '../context/CartContext.js';
import '../css/cart-styles.override.css';

const Cart = () => {
const { cart, removeFromCart, clearCart } = useCart();


// Calculamos el precio total (considera qty si existe)
const totalPrice = cart.reduce((acc, item) => acc + (item.price * (item.qty || 1)), 0);


return (
<div className="cart" role="region" aria-label="Shopping cart">
<div className="cartLeft">
<div className="cartHeader">
<h2>Shopping cart</h2>
<div className="itemsCount">{cart.length} items</div>
</div>


{cart.length === 0 ? (
<p>No hay productos en el carrito.</p>
) : (
<ul className="cartItemsList">
{cart.map((item, index) => (
<li key={item.id ?? index} className="cartItem">
<div className="thumb">
{item.image ? <img src={item.image} alt={item.name} /> : <img src="/placeholder-72.png" alt="thumb" />}
</div>
<div className="metaWrap">
<h3>{item.name}</h3>
<div className="meta">Color: {item.color || '—'}, size {item.size || '—'}</div>
<div className="qty">Qty: {item.qty || 1}</div>
</div>


<div className="price">${(item.price * (item.qty || 1)).toFixed(2)}</div>


<button className="remove" aria-label={`Eliminar ${item.name}`} onClick={() => removeFromCart(item.id)}>
✕
</button>
</li>
))}
</ul>
)}
</div>


<aside className="cartSummary">
<div className="section">
<label>Jessica Taylor</label>
<div className="value">Neubaugasse 30<br/>1070 Vienna<br/>Austria</div>
<div className="edit" style={{marginTop:8}}>Edit</div>
</div>


<div className="section">
<label>Payment method</label>
<div className="value">Credit Card •••• 5057</div>
<div className="edit" style={{marginTop:8}}>Edit</div>
</div>


<div className="coupon">
<input type="text" placeholder="Your code here" aria-label="Coupon code" />
<button>APPLY</button>
</div>


<div className="totals">
<div className="line"><div className="label">Subtotal ({cart.length} items)</div><div className="value">${totalPrice.toFixed(2)}</div></div>
<div className="line"><div className="label">Shipping costs</div><div className="value">FREE!</div></div>
<div className="line"><div className="label">Discount</div><div className="value">-</div></div>
<div className="line total"><div className="label">Total (incl. VAT)</div><div className="total">${totalPrice.toFixed(2)}</div></div>
</div>


<button className="checkout">CHECKOUT</button>


<div style={{marginTop:12}}>
<button onClick={clearCart} style={{background:'transparent',border:'none',color:'var(--muted)',cursor:'pointer'}}>Vaciar carrito</button>
</div>
</aside>
</div>
);
};


export default Cart;