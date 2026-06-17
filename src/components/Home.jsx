import { useState } from 'react'
import { COMPANY_NAMES, findCompany } from '../data/companies'

export default function Home({ onSelectCompany }) {
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const company = findCompany(query)
    if (!company) {
      setError(`No preloaded data for "${query}". Try: ${COMPANY_NAMES.join(', ')}.`)
      return
    }
    setError('')
    onSelectCompany(company)
  }

  return (
    <div className="hero">
      <h1>
        What is <span className="accent-text">{`{Company}`}</span> not telling you about AI?
      </h1>
      <p>
        BRSR AI Tracker estimates the AI-driven energy, water and carbon costs that Indian IT
        companies leave out of their Business Responsibility and Sustainability Reports — then
        builds the disclosure gap report to take into the client meeting.
      </p>

      <form className="company-form" onSubmit={handleSubmit}>
        <input
          className="company-input"
          type="text"
          placeholder="Enter a company name, e.g. Infosys"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <button className="btn-primary" type="submit">
          Analyse
        </button>
      </form>

      {error && <div className="error-text">{error}</div>}

      <div className="preset-row">
        {COMPANY_NAMES.map((name) => (
          <button
            key={name}
            className="preset-chip"
            onClick={() => {
              setError('')
              setQuery(name)
              onSelectCompany(findCompany(name))
            }}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}
