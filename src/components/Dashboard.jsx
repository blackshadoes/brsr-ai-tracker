import { useState } from 'react'
import MetricsCards from './MetricsCards'
import Checklist from './Checklist'
import GapReportPanel from './GapReportPanel'
import { createEmptyChecklistState } from '../data/checklist'

export default function Dashboard({ company }) {
  const [checklist, setChecklist] = useState(createEmptyChecklistState())

  function handleChecklistChange(id, status) {
    setChecklist((prev) => ({ ...prev, [id]: { ...prev[id], status } }))
  }

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h2>{company.name}</h2>
          <div className="meta">
            <span className="tag">{company.ticker}</span>
            <span className="tag">{company.sector}</span>
            {formatEmployees(company.employees)} employees · ${company.revenueUsdBn}B revenue · {company.aiInitiative}
          </div>
        </div>
      </div>

      <MetricsCards company={company} />
      <Checklist checklist={checklist} onChange={handleChecklistChange} />
      <GapReportPanel company={company} checklist={checklist} pdfFindings={null} />
    </div>
  )
}

function formatEmployees(n) {
  return n.toLocaleString('en-IN')
}
