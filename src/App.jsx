import { useState } from 'react'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import LeaderboardPage from './components/LeaderboardPage'
import Methodology from './components/Methodology'
import Benchmarks from './components/Benchmarks'
import About from './components/About'

const NAV = [
  { id: 'leaderboard', label: 'Companies' },
  { id: 'methodology', label: 'Methodology' },
  { id: 'benchmarks',  label: 'Benchmarks' },
  { id: 'about',       label: 'About' },
]

export default function App() {
  const [view, setView] = useState('landing')
  const [company, setCompany] = useState(null)

  function nav(id) {
    setView(id)
    window.scrollTo({ top: 0 })
  }

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
            onClick={() => nav('landing')}
          >
            <span className="topbar-title">BRSR AI Tracker</span>
          </button>
          <span className="topbar-subtitle">AI environmental disclosure gap analysis</span>
        </div>
        <nav className="topbar-nav">
          {NAV.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`topbar-nav-link${view === id ? ' topbar-nav-active' : ''}`}
              onClick={() => nav(id)}
            >
              {label}
            </button>
          ))}
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
            onShowLeaderboard={() => nav('leaderboard')}
          />
        )}
        {view === 'dashboard' && company && <Dashboard company={company} />}
        {view === 'leaderboard'  && <LeaderboardPage />}
        {view === 'methodology'  && <Methodology />}
        {view === 'benchmarks'   && <Benchmarks />}
        {view === 'about'        && <About />}
      </main>
    </div>
  )
}
