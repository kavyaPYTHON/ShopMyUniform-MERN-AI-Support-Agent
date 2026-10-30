import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const active = (path) => location.pathname === path ? "nav-item active" : "nav-item";

  return (
    <nav className="navbar">
      <Link to="/" className="brand"><span className="brand-mark">✦</span><span>ShopMy<span className="brand-accent">Uniform</span></span></Link>
      <div className="nav-links nav-pill">
        <span className="nav-glow-dot nav-dot-one" aria-hidden="true" /><span className="nav-glow-dot nav-dot-two" aria-hidden="true" />
        <Link to="/schools" className={active("/schools")}>Schools</Link>
        <Link to="/products" className={active("/products")}>Catalogue</Link>
        <Link to="/cart" className={active("/cart")}>Cart <span className="cart-count">{itemCount}</span></Link>
        {user ? <>
          <Link to="/orders" className={active("/orders")}>My Orders</Link>
          <Link to="/profile" className={active("/profile")}>Profile</Link>
          <button className="nav-item nav-logout" onClick={() => { logout(); navigate("/"); }}>Logout</button>
        </> : <>
          <Link to="/login" className={active("/login")}>Login</Link>
          <Link to="/register" className="nav-register">Get started <span>↗</span></Link>
        </>}
      </div>
    </nav>
  );
}
