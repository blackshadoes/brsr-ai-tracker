import Hero from './Hero'
import Leaderboard from './Leaderboard'
import CompanySearch from './CompanySearch'

export default function Landing({ onSelectCompany }) {
  return (
    <div className="landing">
      <Hero />
      <Leaderboard onSelectCompany={onSelectCompany} />
      <CompanySearch onSelectCompany={onSelectCompany} />
    </div>
  )
}
