import { useState } from 'react'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import LeaderboardPage from './components/LeaderboardPage'
import Methodology from './components/Methodology'

export default function App() {
  const [view, setView] = useState('landing')
  const [company, setCompany] = useState(null)

  function handleSelectCompany(c) {
    setCompany(c)
    setView('dashboard')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleBack() {
    setCompany(null)
    setView('landing')
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-brand">
          <button
            className="topbar-home-btn"
            type="button"
            onClick={() => { setView('landing'); setCompany(null); window.scrollTo({ top: 0 }) }}
          >
            <span className="topbar-title">BRSR AI Tracker</span>
          </button>
          <span className="topbar-subtitle">AI environmental disclosure gap analysis</span>
        </div>
        <nav className="topbar-nav">
          <button
            type="button"
            className={`topbar-nav-link${view === 'leaderboard' ? ' topbar-nav-active' : ''}`}
            onClick={() => { setView('leaderboard'); window.scrollTo({ top: 0 }) }}
          >
            Leaderboard
          </button>
          <button
            type="button"
            className={`topbar-nav-link${view === 'methodology' ? ' topbar-nav-active' : ''}`}
            onClick={() => { setView('methodology'); window.scrollTo({ top: 0 }) }}
          >
            Methodology
          </button>
          {view === 'dashboard' && (
            <button className="btn-ghost" type="button" onClick={handleBack}>
              ← Back
            </button>
          )}
        </nav>
      </header>

      <main className="main-content">
        {view === 'landing' && (
          <Landing
            onSelectCompany={handleSelectCompany}
            onShowLeaderboard={() => { setView('leaderboard'); window.scrollTo({ top: 0 }) }}
          />
        )}
        {view === 'dashboard' && company && (
          <Dashboard company={company} />
        )}
        {view === 'leaderboard' && (
          <LeaderboardPage onSelectCompany={handleSelectCompany} onBack={handleBack} />
        )}
        {view === 'methodology' && (
          <Methodology onBack={handleBack} />
        )}
      </main>

    </div>
  )
}
