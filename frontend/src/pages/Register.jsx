import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "parent", studentName: "", grade: "", school: "", phone: "" });
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { api.get("/schools").then((res) => setSchools(res.data)).catch(() => {}); }, []);
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault(); setError("");
    try { await register(form); navigate("/"); }
    catch (err) { setError(err.response?.data?.message || "Registration failed"); }
  };

  return (
    <main className="page auth-page register-page">
      <div className="auth-orbit orbit-one" /><div className="auth-orbit orbit-two" />
      <span className="floating-uniform uniform-shirt" aria-hidden="true">👕</span>
      <span className="floating-uniform uniform-cap" aria-hidden="true">🧢</span>
      <span className="floating-uniform uniform-shoe" aria-hidden="true">👟</span>
      <section className="auth-card register-card">
        <div className="auth-art register-art">
          <span className="art-spark spark-a">✦</span><span className="art-spark spark-b">✧</span>
          <div className="register-art-stack"><span>🎒</span><span>👕</span><span>👟</span></div>
          <p className="art-kicker">A FRESH START</p>
          <h2>Make school<br /><em>days brighter.</em></h2>
          <p className="art-copy">Create your account and find the right fit for every school day.</p>
          <div className="art-pill">✨ Uniform shopping made easy</div>
        </div>
        <div className="auth-content register-content">
          <div className="auth-eyebrow">JOIN OUR COMMUNITY</div>
          <h1>Create Account</h1>
          <p className="auth-subtitle">A few details and you're ready to go.</p>
          <form onSubmit={handleSubmit} className="form auth-form register-form">
            <label>Parent / Account name<input placeholder="Your Name" value={form.name} onChange={update("name")} required /></label>
            <label>Email address<input type="email" placeholder="you@example.com" value={form.email} onChange={update("email")} required /></label>
            <label>Password<input type="password" placeholder="Create a password" value={form.password} onChange={update("password")} required /></label>
            <label>Phone number <span className="optional-label">(optional)</span><input placeholder="Phone" value={form.phone} onChange={update("phone")} /></label>
            <div className="register-two-col">
              <label>Account type<select value={form.role} onChange={update("role")}><option value="parent">Parent</option><option value="student">Student</option></select></label>
              <label>Grade<select value={form.grade} onChange={update("grade")}><option value="">Select Grade</option>{Array.from({ length: 10 }, (_, i) => `Grade ${i + 1}`).map((g) => <option key={g} value={g}>{g}</option>)}</select></label>
            </div>
            <label>Student name<input placeholder="Student Name" value={form.studentName} onChange={update("studentName")} /></label>
            <label>School<select value={form.school} onChange={update("school")}><option value="">Select School</option>{schools.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}</select></label>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="btn auth-submit">Create my account <span>→</span></button>
          </form>
          <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </section>
    </main>
  );
}
