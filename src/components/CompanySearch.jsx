import { useState } from 'react'
import { COMPANY_NAMES, findCompany } from '../data/companies'

export default function CompanySearch({ onSelectCompany }) {
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

  function selectPreset(name) {
    setError('')
    setQuery(name)
    onSelectCompany(findCompany(name))
  }

  return (
    <section className="company-search-section" id="company-search">
      <div className="section-heading">
        <h2>Check a Company</h2>
        <p>
          Pick one of the 20 tracked companies to see its modeled AI energy, water and carbon
          footprint, run the 8-item disclosure checklist, and generate a gap report.
        </p>
      </div>

      <form className="company-form" onSubmit={handleSubmit}>
        <input
          className="company-input"
          type="text"
          placeholder="Enter a company name, e.g. Infosys"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn-primary" type="submit">
          Analyse
        </button>
      </form>

      {error && <div className="error-text">{error}</div>}

      <div className="preset-row">
        {COMPANY_NAMES.map((name) => (
          <button key={name} className="preset-chip" onClick={() => selectPreset(name)}>
            {name}
          </button>
        ))}
      </div>
    </section>
  )
}
