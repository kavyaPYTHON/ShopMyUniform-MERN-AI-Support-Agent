import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="page auth-page login-page">
      <div className="auth-orbit orbit-one" /><div className="auth-orbit orbit-two" />
      <span className="floating-uniform uniform-shirt" aria-hidden="true">👕</span>
      <span className="floating-uniform uniform-tie" aria-hidden="true">👔</span>
      <span className="floating-uniform uniform-bag" aria-hidden="true">🎒</span>
      <section className="auth-card login-card">
        <div className="auth-art login-art">
          <span className="art-spark spark-a">✦</span><span className="art-spark spark-b">✧</span>
          <div className="art-circle"><span>👕</span><span>👔</span><span>🎒</span></div>
          <p className="art-kicker">THE SCHOOL STYLE STORE</p>
          <h2>Ready for a<br /><em>great school day?</em></h2>
          <p className="art-copy">Your school essentials, all in one happy place.</p>
        </div>
        <div className="auth-content">
          <div className="auth-eyebrow">WELCOME BACK</div>
          <h1>Login</h1>
          <p className="auth-subtitle">Sign in to continue your uniform shopping.</p>
          <form onSubmit={handleSubmit} className="form auth-form">
            <label>Email address<input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
            <label>Password<input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="btn auth-submit">Login to your account <span>→</span></button>
          </form>
          <p className="auth-switch">New to ShopMyUniform? <Link to="/register">Create an account</Link></p>
        </div>
      </section>
    </main>
  );
}
