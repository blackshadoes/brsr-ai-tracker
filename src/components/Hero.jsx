const STATS = [
  { value: '1.8L', label: 'water consumed per kWh of AI compute' },
  { value: '0', label: 'Indian IT companies disclose AI water use in BRSR' },
  { value: '50M+', label: 'litres estimated annual AI cooling water use across the top 20 IT companies' },
]

export default function Hero() {
  function scrollToSearch() {
    document.getElementById('company-search')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="hero-section">
      <h1 className="hero-headline">
        India's AI Boom Has a Hidden Environmental Cost.
        <br />
        <span className="accent-text">Nobody Is Disclosing It.</span>
      </h1>
      <p className="hero-subhead">
        BRSR AI Tracker estimates the AI-driven energy, water and carbon costs Indian IT majors
        leave out of their sustainability reports — and tracks which ones are starting to close
        the gap.
      </p>
      <button className="btn-primary btn-cta" type="button" onClick={scrollToSearch}>
        Check a Company →
      </button>

      <div className="stats-grid">
        {STATS.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
