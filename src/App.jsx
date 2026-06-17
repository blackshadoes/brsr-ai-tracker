import { useState } from 'react'
import Home from './components/Home'
import Dashboard from './components/Dashboard'

export default function App() {
  const [company, setCompany] = useState(null)

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-brand">
          <span>
            <span className="logo-dot" />
            <span className="topbar-title">BRSR AI Tracker</span>
          </span>
          <span className="topbar-subtitle">AI environmental disclosure gap analysis</span>
        </div>
        {company && (
          <button className="btn-ghost" onClick={() => setCompany(null)}>
            ← Analyse another company
          </button>
        )}
      </header>

      <main className="main-content">
        {company ? <Dashboard company={company} /> : <Home onSelectCompany={setCompany} />}
      </main>

      <footer className="footer-disclaimer">
        Figures shown are modeled estimates for ESG advisory use, not verified or audited
        disclosures. Always confirm against the company's latest BRSR filing.
      </footer>
    </div>
  )
}
