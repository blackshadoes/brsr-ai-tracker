import Hero from './Hero'

export default function Landing({ onSelectCompany, onShowLeaderboard }) {
  return (
    <div className="landing">
      <Hero onSelectCompany={onSelectCompany} onShowLeaderboard={onShowLeaderboard} />
    </div>
  )
}
