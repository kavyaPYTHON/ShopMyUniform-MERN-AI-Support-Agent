import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const schoolArt = ["🏫", "🎓", "📚", "🚌", "✏️", "🏛️"];

export default function Schools() {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/schools")
      .then((res) => setSchools(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError("We couldn't load schools right now. Please try again in a moment."))
      .finally(() => setLoading(false));
  }, []);

  const visibleSchools = useMemo(() => schools.filter((s) => `${s.name || ""} ${s.city || ""}`.toLowerCase().includes(search.toLowerCase())), [schools, search]);

  return (
    <div className="page schools-page">
      <div className="schools-hero">
        <div><span className="section-tag">ONE PLACE FOR EVERY SCHOOL KIT</span><h1>Find your <span>school.</span></h1><p>Choose your school to discover the right uniform collection.</p></div>
        <div className="schools-hero-art" aria-hidden="true"><span className="school-art-main">🏫</span><span className="school-art-cap">🎓</span><span className="school-art-pencil">✏️</span><i>✦</i></div>
      </div>
      <div className="schools-toolbar"><div><strong>{schools.length}</strong><span> schools in the directory</span></div><label className="school-search"><span>⌕</span><input aria-label="Search schools" placeholder="Search by school or city..." value={search} onChange={(e) => setSearch(e.target.value)} /></label></div>
      {loading ? <div className="catalog-loading"><span className="loader-orbit">✦</span><p>Finding your schools...</p></div> : error ? <div className="empty-state"><span>🌈</span><h3>Just a little pause</h3><p>{error}</p></div> : (
        <div className="card-grid school-grid">
          {visibleSchools.map((s, index) => <button type="button" key={s._id} className={`card school-card school-tone-${index % 4}`} onClick={() => navigate(`/products?school=${encodeURIComponent(s.name)}`)}>
            <span className="school-card-top"><span className="school-card-icon" aria-hidden="true">{schoolArt[index % schoolArt.length]}</span><span className="school-card-arrow">↗</span></span>
            <span className="school-card-name">{s.name}</span><span className="school-card-city">⌖ {s.city || "Location not listed"}</span>
            <span className="school-card-bottom"><span>{s.grades?.length || 0} grades supported</span><span className="school-explore">Explore uniforms →</span></span>
          </button>)}
          {visibleSchools.length === 0 && <div className="empty-state"><span>🔎</span><h3>{schools.length ? "No matching schools" : "Schools are on their way"}</h3><p>{schools.length ? "Try another school name or city." : "Once schools are added to the directory, they'll appear here."}</p></div>}
        </div>
      )}
    </div>
  );
}
