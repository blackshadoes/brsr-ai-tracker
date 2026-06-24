import { useRef, useState } from 'react'
import { analyzeBrsrPdf } from '../lib/pdfAnalysis'
import { hasApiKey } from '../lib/anthropicClient'
import { STATUS_LABEL } from '../data/checklist'
import Reveal from './Reveal'

export default function PdfUploader({ onFindings }) {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle') // idle | analyzing | done | error
  const [findings, setFindings] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const inputRef = useRef(null)

  function handleFileChange(e) {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setFindings(null)
    setStatus('idle')
    setErrorMsg('')
  }

  async function handleAnalyze() {
    if (!file) return
    setStatus('analyzing')
    setErrorMsg('')
    try {
      const result = await analyzeBrsrPdf(file)
      setFindings(result)
      setStatus('done')
      onFindings(result)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  return (
    <div className="section">
      <div className="section-title">BRSR PDF Upload (optional, AI-assisted)</div>
      <Reveal className={`upload-box${file ? ' has-file' : ''}`}>
        <div>
          {file ? (
            <>
              <div className="upload-filename">{file.name}</div>
              <div className="upload-info">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
            </>
          ) : (
            <div className="upload-info">
              Upload the company's actual BRSR PDF to auto-analyse disclosure gaps with Claude.
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <label className="file-input-label">
            {file ? 'Change file' : 'Choose PDF'}
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
          <button
            className="btn-primary"
            type="button"
            disabled={!file || status === 'analyzing' || !hasApiKey}
            onClick={handleAnalyze}
          >
            {status === 'analyzing' ? (
              <>
                <span className="spinner" /> Analysing…
              </>
            ) : (
              'Analyse with Claude'
            )}
          </button>
        </div>
      </Reveal>

      {!hasApiKey && (
        <div className="warning-banner">
          VITE_ANTHROPIC_API_KEY is not set — PDF auto-analysis is disabled. The disclosure
          checklist below can still be filled in manually.
        </div>
      )}

      {status === 'error' && <div className="warning-banner">Analysis failed: {errorMsg}</div>}

      {findings && (
        <div className="findings-summary">
          <strong>Claude's read of the document:</strong> {findings.summary}
          <div style={{ marginTop: 8, color: 'var(--grey)' }}>
            {findings.items.length} checklist items auto-classified (
            {findings.items.filter((i) => i.status === 'disclosed').length} {STATUS_LABEL.disclosed},{' '}
            {findings.items.filter((i) => i.status === 'partial').length} {STATUS_LABEL.partial},{' '}
            {findings.items.filter((i) => i.status === 'not_disclosed').length}{' '}
            {STATUS_LABEL.not_disclosed}) and applied to the checklist below.
          </div>
        </div>
      )}
    </div>
  )
}
