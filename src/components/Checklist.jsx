import { CHECKLIST_ITEMS, DISCLOSURE_STATUSES, STATUS_LABEL } from '../data/checklist'
import Reveal from './Reveal'

export default function Checklist({ checklist, onChange }) {
  const disclosedCount = CHECKLIST_ITEMS.filter(
    (item) => checklist[item.id]?.status === 'disclosed'
  ).length

  return (
    <div className="section">
      <div className="section-title">8-Item AI Disclosure Checklist</div>
      <Reveal className="checklist">
        {CHECKLIST_ITEMS.map((item, idx) => {
          const current = checklist[item.id]?.status || 'not_disclosed'
          return (
            <div className="checklist-item" key={item.id}>
              <div className="checklist-item-text">
                {idx + 1}. {item.label}
              </div>
              <div className="checklist-status-group">
                {DISCLOSURE_STATUSES.map((status) => (
                  <button
                    key={status}
                    className={`status-btn ${status}${current === status ? ' active' : ''}`}
                    onClick={() => onChange(item.id, status)}
                    type="button"
                  >
                    {STATUS_LABEL[status]}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </Reveal>
      <div className="checklist-summary">
        <strong>{disclosedCount} of {CHECKLIST_ITEMS.length}</strong> items disclosed for this
        company's BRSR report.
      </div>
    </div>
  )
}
