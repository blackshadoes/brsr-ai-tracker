import { useState, useRef, useEffect } from 'react'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import HeroParticles from './HeroParticles'
import WaterBackground from './WaterBackground'
import { COMPANY_NAMES, findCompany } from '../data/companies'
import { getLeaderboard } from '../data/leaderboard'

const STATS = [
  { value: '1.8L', label: 'water consumed per kWh of AI compute' },
  { value: '0', label: 'Indian IT companies disclose AI water use in BRSR' },
  { value: '50M+', label: 'litres estimated annual AI cooling water use across the top 20 IT companies' },
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

export default function Hero({ onSelectCompany }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const dropdownRef = useRef(null)
  const sortedNames = [...COMPANY_NAMES].sort()
  const leaderboardRows = getLeaderboard()

  useEffect(() => {
    if (!showDropdown) return
    function handleOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [showDropdown])

  function handleCompanySelect(name) {
    setShowDropdown(false)
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
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              className="btn-primary btn-cta"
              type="button"
              onClick={() => {
                setShowDropdown(v => !v)
                setShowLeaderboard(false)
              }}
            >
              Check a Company ▾
            </button>
            {showDropdown && (
              <div className="company-dropdown">
                {sortedNames.map(name => (
                  <button
                    key={name}
                    className="company-dropdown-item"
                    type="button"
                    onClick={() => handleCompanySelect(name)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="btn-primary btn-cta"
            type="button"
            onClick={() => {
              setShowLeaderboard(v => !v)
              setShowDropdown(false)
            }}
          >
            Leaderboard
          </button>
        </div>

        {showLeaderboard && (
          <div
            className="leaderboard-modal-backdrop"
            onMouseDown={e => { if (e.target === e.currentTarget) setShowLeaderboard(false) }}
          >
            <div className="leaderboard-modal">
              <div className="leaderboard-modal-header">
                <h3 className="leaderboard-modal-title">Company Leaderboard</h3>
                <button
                  className="btn-ghost"
                  type="button"
                  onClick={() => setShowLeaderboard(false)}
                >
                  ✕ Close
                </button>
              </div>
              <div className="leaderboard-modal-body">
                <div className="leaderboard-table">
                  <div className="leaderboard-row leaderboard-head">
                    <span>Rank</span>
                    <span>Company</span>
                    <span>Disclosure Score</span>
                  </div>
                  {leaderboardRows.map((row, idx) => {
                    const company = findCompany(row.name)
                    const pct = Math.round((row.score / row.maxScore) * 100)
                    return (
                      <button
                        key={row.name}
                        type="button"
                        className="leaderboard-row leaderboard-row-clickable"
                        onClick={() => {
                          setShowLeaderboard(false)
                          if (company) onSelectCompany(company)
                        }}
                      >
                        <span className="leaderboard-rank">{idx + 1}</span>
                        <span className="leaderboard-name">{row.name}</span>
                        <span className="leaderboard-score">
                          <span className="score-bar">
                            <span className="score-bar-fill" style={{ width: `${pct}%` }} />
                          </span>
                          <span className={`score-number${row.score === 0 ? ' score-zero' : ''}`}>
                            {row.score}/{row.maxScore}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="stats-grid">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  )
}
