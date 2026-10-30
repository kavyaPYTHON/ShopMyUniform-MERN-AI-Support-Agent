import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <main className="page cart-page cart-empty-page">
        <div className="cart-confetti" aria-hidden="true"><span>✦</span><span>✧</span><span>✦</span></div>
        <section className="empty-cart-card"><div className="empty-cart-art"><span className="empty-bag">🛍️</span><span className="empty-shirt">👕</span><span className="empty-star">✦</span></div>
          <p className="cart-eyebrow">YOUR SHOPPING BAG</p><h1>Your cart is waiting<br />for a little <em>colour!</em></h1>
          <p className="muted">Looks like you haven't added any school essentials yet.</p>
          <Link className="btn cart-shop-btn" to="/products">Explore the catalogue <span>→</span></Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page cart-page">
      <div className="cart-heading"><div><p className="cart-eyebrow">ALMOST READY FOR SCHOOL</p><h1>Your Shopping <em>Bag</em></h1><p className="muted">A great school day starts with the right essentials.</p></div><div className="cart-count">{cart.length} {cart.length === 1 ? "ITEM" : "ITEMS"}</div></div>
      <div className="cart-layout">
        <div className="cart-list">
          {cart.map((item, index) => (
            <article key={`${item.productId}-${item.size}`} className="cart-item cart-item-animated" style={{ animationDelay: `${index * 90}ms` }}>
              <div className="cart-product-art"><span>{/shoe/i.test(item.name) ? "👟" : /tie/i.test(item.name) ? "👔" : /bag/i.test(item.name) ? "🎒" : /skirt/i.test(item.name) ? "👗" : "👕"}</span></div>
              <div className="cart-product-info"><strong>{item.name}</strong><p className="muted small">School uniform essential</p><span className="cart-size">SIZE: {item.size}</span><button className="cart-remove" onClick={() => removeFromCart(item.productId, item.size)}>Remove item</button></div>
              <div className="cart-quantity"><span>QUANTITY</span><input aria-label={`Quantity for ${item.name}`} type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.productId, item.size, Math.max(1, Number(e.target.value)))} /></div>
              <strong className="cart-line-price">₹{item.price * item.quantity}</strong>
            </article>
          ))}
          <Link to="/products" className="continue-shopping">← Continue shopping</Link>
        </div>
        <aside className="cart-summary"><div className="summary-top"><span>ORDER SUMMARY</span><span>✦</span></div><h2>One step closer<br />to a <em>great fit.</em></h2><div className="summary-row"><span>Items ({cart.length})</span><strong>₹{total}</strong></div><div className="summary-row"><span>Delivery</span><strong className="delivery-note">Calculated at checkout</strong></div><div className="summary-total"><span>Subtotal</span><strong>₹{total}</strong></div><button className="btn checkout-btn" onClick={() => (user ? navigate("/checkout") : navigate("/login"))}>Proceed to Checkout <span>→</span></button><p className="secure-note">🔒 Secure checkout experience</p></aside>
      </div>
    </main>
  );
}
