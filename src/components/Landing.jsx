import Hero from './Hero'

export default function Landing({ onSelectCompany }) {
  return (
    <div className="landing">
      <Hero onSelectCompany={onSelectCompany} />
    </div>
  )
}
