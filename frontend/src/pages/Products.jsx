import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../api/axios";

const categories = ["Shirt", "Pants", "Skirt", "Tie", "Blazer", "Shoes", "Sports Kit"];
const categoryArt = { Shirt: "👕", Pants: "👖", Skirt: "🩳", Tie: "👔", Blazer: "🧥", Shoes: "👟", "Sports Kit": "🏃" };

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ query: searchParams.get("query") || "", school: searchParams.get("school") || "", grade: searchParams.get("grade") || "", category: searchParams.get("category") || "" });

  const fetchProducts = async (f) => {
    setLoading(true); setError("");
    const params = Object.fromEntries(Object.entries(f).filter(([, v]) => v));
    try { const { data } = await api.get("/products", { params }); setProducts(Array.isArray(data) ? data : []); }
    catch { setError("We couldn't load the catalogue. Please try again."); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(filters); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => { e.preventDefault(); setSearchParams(Object.fromEntries(Object.entries(filters).filter(([, v]) => v))); fetchProducts(filters); };
  const chooseCategory = (category) => { const next = { ...filters, category }; setFilters(next); setSearchParams(Object.fromEntries(Object.entries(next).filter(([, v]) => v))); fetchProducts(next); };

  return (
    <div className="page catalog-page">
      <div className="catalog-hero"><div><span className="section-tag">THE UNIFORM EDIT</span><h1>Find your <span>everyday favourites.</span></h1><p>Uniform essentials, sportswear and finishing touches — ready to explore.</p></div><div className="catalog-hero-art" aria-hidden="true"><span className="catalog-art-one">👕</span><span className="catalog-art-two">👟</span><span className="catalog-art-three">🎒</span><i>✦</i></div></div>
      <div className="catalog-category-row"><button type="button" className={!filters.category ? "category-chip active" : "category-chip"} onClick={() => chooseCategory("")}>✦ All items</button>{categories.map((c) => <button type="button" key={c} className={filters.category === c ? "category-chip active" : "category-chip"} onClick={() => chooseCategory(c)}><span>{categoryArt[c]}</span>{c}</button>)}</div>
      <form onSubmit={handleSearch} className="filter-bar catalog-filter">
        <input aria-label="Search products" placeholder="Search products..." value={filters.query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} />
        <input aria-label="School" placeholder="School" value={filters.school} onChange={(e) => setFilters({ ...filters, school: e.target.value })} />
        <input aria-label="Grade" placeholder="Grade (e.g. Grade 7)" value={filters.grade} onChange={(e) => setFilters({ ...filters, grade: e.target.value })} />
        <select aria-label="Category" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}><option value="">All Categories</option>{categories.map((c) => <option key={c} value={c}>{c}</option>)}</select>
        <button type="submit" className="btn">Find items ↗</button>
      </form>
      <div className="catalog-results-heading"><div><span className="section-tag">MADE FOR SCHOOL DAYS</span><h2>{filters.category || "All uniform essentials"}</h2></div><span className="catalog-count">{loading ? "Loading..." : `${products.length} items found`}</span></div>
      {loading ? <div className="catalog-loading"><span className="loader-orbit">✦</span><p>Getting the good stuff ready...</p></div> : error ? <div className="empty-state"><span>🛍️</span><h3>Catalogue taking a break</h3><p>{error}</p><button type="button" className="btn" onClick={() => fetchProducts(filters)}>Try again</button></div> : (
        <div className="card-grid catalog-product-grid">
          {products.map((p, index) => <Link to={`/products/${p._id}`} key={p._id} className={`card product-card product-tone-${index % 4}`}>
            <span className="product-art" aria-hidden="true">{categoryArt[p.category] || "🎒"}</span><span className="product-category-label">{p.category || "School essential"}</span><h3>{p.name}</h3><p className="muted">{p.color || "Everyday essential"}</p><p className="price">₹{p.price}</p><p className="muted small">{p.school?.name || "Shop by school"}</p><span className="product-card-link">View item <b>↗</b></span>
          </Link>)}
          {products.length === 0 && <div className="empty-state"><span>🧺</span><h3>No items found just yet</h3><p>Try a different search or choose another category.</p><button type="button" className="btn" onClick={() => { const reset = { query: "", school: "", grade: "", category: "" }; setFilters(reset); setSearchParams({}); fetchProducts(reset); }}>Clear filters</button></div>}
        </div>
      )}
    </div>
  );
}
