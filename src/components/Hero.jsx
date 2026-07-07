import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import HeroParticles from './HeroParticles'
import WaterBackground from './WaterBackground'
import { COMPANY_NAMES, COMPANIES, findCompany } from '../data/companies'

const STATS = [
  { value: '0.1–1.8L', label: 'Industry range based on disclosed hyperscaler data (UC Riverside, 2026). Indian IT companies disclose none of it.' },
  { value: '0', label: 'Indian IT companies disclose AI water use in BRSR' },
  { value: '~40M', label: 'Estimated annual AI cooling water use across top 20 Indian IT companies — based on modelled GPU hours and 1.8 L/kWh WUE upper bound. No company discloses this figure.' },
]

function StatCard({ stat, delay }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const display = useCountUp(stat.value, { start: inView })

  return (
    <div
      ref={ref}
      className={`stat-card reveal${inView ? ' reveal-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="stat-value">{display}</div>
      <div className="stat-label">{stat.label}</div>
    </div>
  )
}

export default function Hero({ onSelectCompany, onShowLeaderboard }) {
  const [showPicker, setShowPicker] = useState(false)
  const sortedNames = [...COMPANY_NAMES].sort()

  function handleCompanySelect(name) {
    setShowPicker(false)
    onSelectCompany(findCompany(name))
  }

  return (
    <section className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <WaterBackground />
      <HeroParticles />
      <div className="hero-content">
        <h1 className="hero-headline hero-anim">
          India's AI Boom Has a Hidden Environmental Cost.
          <br />
          <span className="accent-text">Nobody Is Disclosing It.</span>
        </h1>
        <p className="hero-subhead hero-anim hero-anim-delay-1">
          BRSR AI Tracker estimates the AI-driven energy, water and carbon costs Indian IT majors
          leave out of their sustainability reports — and tracks which ones are starting to close
          the gap.
        </p>

        <div className="hero-cta-row hero-anim hero-anim-delay-2">
          <button
            className="btn-primary btn-cta"
            type="button"
            onClick={() => setShowPicker(true)}
          >
            Check a Company
          </button>
          <button
            className="btn-primary btn-cta"
            type="button"
            onClick={onShowLeaderboard}
          >
            All 20 Companies
          </button>
        </div>

        <div className="stats-grid">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} delay={i * 150} />
          ))}
        </div>
        <p className="stats-footnote">
          * All figures are modelled estimates using publicly available benchmarks. Actual
          values are unknown because no Indian IT company discloses AI-specific water
          consumption in their BRSR filing.
        </p>
      </div>

      {showPicker && (
        <div
          className="company-picker-backdrop"
          onMouseDown={e => { if (e.target === e.currentTarget) setShowPicker(false) }}
        >
          <div className="company-picker-modal">
            <div className="company-picker-header">
              <span className="company-picker-title">Select a Company</span>
              <button className="btn-ghost" type="button" onClick={() => setShowPicker(false)}>
                ✕ Close
              </button>
            </div>
            <div className="company-picker-list">
              {sortedNames.map(name => (
                <button
                  key={name}
                  className="company-picker-item"
                  type="button"
                  onClick={() => handleCompanySelect(name)}
                >
                  <span className="company-picker-name">{name}</span>
                  <span className="company-picker-ticker">NSE: {COMPANIES[name]?.ticker}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
