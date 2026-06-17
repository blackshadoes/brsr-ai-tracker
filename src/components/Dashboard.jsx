import { useState } from 'react'
import MetricsCards from './MetricsCards'
import Checklist from './Checklist'
import PdfUploader from './PdfUploader'
import GapReportPanel from './GapReportPanel'
import { createEmptyChecklistState } from '../data/checklist'

export default function Dashboard({ company }) {
  const [checklist, setChecklist] = useState(createEmptyChecklistState())
  const [pdfFindings, setPdfFindings] = useState(null)

  function handleChecklistChange(id, status) {
    setChecklist((prev) => ({ ...prev, [id]: { ...prev[id], status } }))
  }

  function handlePdfFindings(findings) {
    setChecklist((prev) => {
      const next = { ...prev }
      findings.items.forEach((item) => {
        if (next[item.id]) {
          next[item.id] = { status: item.status, note: item.evidence }
        }
      })
      return next
    })
    setPdfFindings(findings)
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
      <PdfUploader onFindings={handlePdfFindings} />
      <Checklist checklist={checklist} onChange={handleChecklistChange} />
      <GapReportPanel company={company} checklist={checklist} pdfFindings={pdfFindings} />
    </div>
  )
}

function formatEmployees(n) {
  return n.toLocaleString('en-IN')
}
