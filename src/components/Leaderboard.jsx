import { getLeaderboard } from '../data/leaderboard'
import { findCompany } from '../data/companies'
import Reveal from './Reveal'

export default function Leaderboard({ onSelectCompany }) {
  const rows = getLeaderboard()

  return (
    <section className="leaderboard-section" id="leaderboard">
      <div className="section-heading">
        <h2>Company Leaderboard</h2>
        <p>
          AI environmental disclosure score for all 20 tracked Indian IT &amp; engineering
          services companies, scored against the 8-item checklist below.
        </p>
      </div>

      <div className="leaderboard-table">
        <div className="leaderboard-row leaderboard-head">
          <span>Rank</span>
          <span>Company</span>
          <span>Disclosure Score</span>
        </div>
        {rows.map((row, idx) => {
          const company = findCompany(row.name)
          const pct = Math.round((row.score / row.maxScore) * 100)
          return (
            <Reveal
              key={row.name}
              as="button"
              type="button"
              className="leaderboard-row leaderboard-row-clickable"
              delay={Math.min(idx * 25, 450)}
              onClick={() => company && onSelectCompany(company)}
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
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
