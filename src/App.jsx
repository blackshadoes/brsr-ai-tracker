import { useState } from 'react'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'

export default function App() {
  const [company, setCompany] = useState(null)

  function handleSelectCompany(c) {
    setCompany(c)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleBack() {
    setCompany(null)
    window.scrollTo({ top: 0 })
  }

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
          <button className="btn-ghost" onClick={handleBack}>
            ← Back to overview
          </button>
        )}
      </header>

      <main className="main-content">
        {company ? (
          <Dashboard company={company} />
        ) : (
          <Landing onSelectCompany={handleSelectCompany} />
        )}
      </main>

      <footer className="footer-disclaimer">
        Built by Chhaya Rani · ESG Researcher · Independent · brsr-ai-tracker.netlify.app
      </footer>
    </div>
  )
}
