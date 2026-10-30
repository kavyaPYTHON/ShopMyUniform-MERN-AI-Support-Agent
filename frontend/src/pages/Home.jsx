import { Link } from "react-router-dom";

const highlights = [
  { icon: "🏫", title: "Choose your school", text: "Find the uniform collection made for your school.", tone: "pink" },
  { icon: "🎒", title: "Build your kit", text: "Explore everyday essentials and activity wear.", tone: "blue" },
  { icon: "✨", title: "Shop with ease", text: "Pick your items and keep everything in one place.", tone: "yellow" },
];

export default function Home() {
  return (
    <div className="home-wrap">
      <section className="page hero home-page">
        <span className="home-kicker"><span className="live-dot" /> THE SMART WAY TO SHOP SCHOOL UNIFORMS</span>
        <div className="home-orbit orbit-one" aria-hidden="true">✦</div>
        <div className="home-orbit orbit-two" aria-hidden="true">＋</div>
        <div className="home-float home-float-shirt" aria-hidden="true">👕</div>
        <div className="home-float home-float-bag" aria-hidden="true">🎒</div>
        <div className="home-float home-float-star" aria-hidden="true">⭐</div>
        <h1>School days,<br /><span>sorted in style.</span></h1>
        <p>Discover school-ready uniforms, sportswear and everyday essentials — all in one cheerful place.</p>
        <div className="hero-actions home-actions">
          <Link to="/schools" className="btn home-primary">Explore schools <span>↗</span></Link>
          <Link to="/products" className="btn secondary home-secondary">Browse catalogue</Link>
        </div>
        <div className="home-trust-row"><span>✦ Easy school-wise shopping</span><span>✦ Uniform essentials together</span><span>✦ Simple checkout</span></div>
        <div className="home-bottom-swoosh" aria-hidden="true" />
      </section>
      <section className="home-highlights page">
        <div className="section-intro"><span className="section-tag">YOUR UNIFORM SHOPPING SIDEKICK</span><h2>Everything for the school year</h2><p>Less searching, more getting-ready-for-the-day.</p></div>
        <div className="highlight-grid">
          {highlights.map((item) => <article className={`highlight-card highlight-${item.tone}`} key={item.title}>
            <div className="highlight-icon" aria-hidden="true">{item.icon}</div><h3>{item.title}</h3><p>{item.text}</p><span className="highlight-spark" aria-hidden="true">✧</span>
          </article>)}
        </div>
        <div className="home-bottom-cta"><div><span className="section-tag">READY WHEN YOU ARE</span><h2>Let's get the school kit ready.</h2></div><Link to="/schools" className="btn">Find your school <span>→</span></Link></div>
      </section>
    </div>
  );
}
