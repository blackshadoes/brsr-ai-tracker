import { COMPANY_NAMES, COMPANIES } from '../data/companies'

const SORTED = [...COMPANY_NAMES].sort()

export default function LeaderboardPage() {
  return (
    <div className="lboard-page">
      <div className="lboard-page-header">
        <div className="lboard-page-header-text">
          <h1 className="lboard-page-title">Companies Under Analysis</h1>
          <p className="lboard-page-sub">
            20 Indian IT and engineering services companies tracked for AI environmental
            disclosure in their BRSR regulatory filings.
          </p>
        </div>
      </div>

      <div className="companies-pending-note">
        Disclosure scores will be published after manual review of each company's BRSR
        filing. Analysis in progress.
      </div>

      <table className="lboard-full-table">
        <thead>
          <tr>
            <th className="lboard-th lboard-th-rank">#</th>
            <th className="lboard-th lboard-th-name">Company</th>
            <th className="lboard-th lboard-th-ticker">NSE Ticker</th>
            <th className="lboard-th lboard-th-sector">Sector</th>
          </tr>
        </thead>
        <tbody>
          {SORTED.map((name, idx) => {
            const c = COMPANIES[name]
            return (
              <tr key={name} className="lboard-tr lboard-tr-static">
                <td className="lboard-td lboard-td-rank">{idx + 1}</td>
                <td className="lboard-td lboard-td-name">{name}</td>
                <td className="lboard-td lboard-td-ticker">{c?.ticker}</td>
                <td className="lboard-td lboard-td-sector">{c?.sector}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
