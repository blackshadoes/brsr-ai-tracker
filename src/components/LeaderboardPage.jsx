import { getLeaderboard } from '../data/leaderboard'
import { COMPANIES } from '../data/companies'

export default function LeaderboardPage({ onSelectCompany, onBack }) {
  const rows = getLeaderboard()

  return (
    <div className="lboard-page">
      <div className="lboard-page-header">
        <div className="lboard-page-header-text">
          <h1 className="lboard-page-title">AI Disclosure Leaderboard</h1>
          <p className="lboard-page-sub">
            20 Indian IT &amp; engineering services companies scored against an 8-item AI
            environmental disclosure checklist. Scores are derived exclusively from verified BRSR
            regulatory filings (FY24) — PR materials and marketing pages are excluded.
            All 20 companies currently score 0/8.
          </p>
        </div>
      </div>

      <table className="lboard-full-table">
        <thead>
          <tr>
            <th className="lboard-th lboard-th-rank">#</th>
            <th className="lboard-th lboard-th-name">Company</th>
            <th className="lboard-th lboard-th-ticker">NSE Ticker</th>
            <th className="lboard-th lboard-th-sector">Sector</th>
            <th className="lboard-th lboard-th-score">Score</th>
            <th className="lboard-th lboard-th-bar">Disclosure</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const c = COMPANIES[row.name]
            const pct = Math.round((row.score / row.maxScore) * 100)
            return (
              <tr
                key={row.name}
                className="lboard-tr"
                onClick={() => c && onSelectCompany(c)}
              >
                <td className="lboard-td lboard-td-rank">{idx + 1}</td>
                <td className="lboard-td lboard-td-name">{row.name}</td>
                <td className="lboard-td lboard-td-ticker">{c?.ticker}</td>
                <td className="lboard-td lboard-td-sector">{c?.sector}</td>
                <td className="lboard-td lboard-td-score">
                  <span className={`score-number${row.score === 0 ? ' score-zero' : ''}`}>
                    {row.score}/{row.maxScore}
                  </span>
                </td>
                <td className="lboard-td lboard-td-bar">
                  <div className="score-bar">
                    <div className="score-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <p className="lboard-click-note">
        Click any row to view that company's full AI environmental estimate and disclosure checklist.
      </p>
    </div>
  )
}
