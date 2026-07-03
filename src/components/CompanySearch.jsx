import { useState } from 'react'
import { COMPANY_NAMES, findCompany } from '../data/companies'

const SORTED_NAMES = [...COMPANY_NAMES].sort()

export default function CompanySearch({ onSelectCompany }) {
  const [selected, setSelected] = useState('')

  function handleChange(e) {
    const name = e.target.value
    setSelected(name)
    if (name) onSelectCompany(findCompany(name))
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

      <select
        className="company-select"
        value={selected}
        onChange={handleChange}
      >
        <option value="">Select a company…</option>
        {SORTED_NAMES.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
    </section>
  )
}
