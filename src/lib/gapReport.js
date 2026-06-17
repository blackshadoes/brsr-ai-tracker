import { getClaudeClient, CLAUDE_MODEL } from './anthropicClient'
import { COMPANIES, COMPANY_NAMES } from '../data/companies'
import { estimateAIFootprint, formatNumber } from './estimate'
import { CHECKLIST_ITEMS, STATUS_LABEL } from '../data/checklist'

function buildPeerContext(company) {
  return COMPANY_NAMES.map((name) => {
    const c = COMPANIES[name]
    const est = estimateAIFootprint(c)
    return {
      name: c.name,
      isTarget: c.name === company.name,
      aiEnergyMWh: est.aiEnergyMWh,
      aiCarbonTco2e: est.aiCarbonTco2e,
      aiWaterKL: est.aiWaterKL,
    }
  }).sort((a, b) => b.aiCarbonTco2e - a.aiCarbonTco2e)
}

function checklistSummaryText(checklist) {
  return CHECKLIST_ITEMS.map((item) => {
    const entry = checklist[item.id] || { status: 'not_disclosed', note: '' }
    const note = entry.note ? ` — note: ${entry.note}` : ''
    return `- [${STATUS_LABEL[entry.status]}] ${item.label}${note}`
  }).join('\n')
}

function disclosedCount(checklist) {
  return CHECKLIST_ITEMS.filter((item) => checklist[item.id]?.status === 'disclosed').length
}

export function buildReportContext(company, checklist, pdfFindings) {
  const estimate = estimateAIFootprint(company)
  const peers = buildPeerContext(company)
  const rank = peers.findIndex((p) => p.isTarget) + 1
  return { estimate, peers, rank, disclosed: disclosedCount(checklist) }
}

export async function generateGapReport({ company, checklist, pdfFindings }) {
  const client = getClaudeClient()
  const context = buildReportContext(company, checklist, pdfFindings)

  if (!client) {
    return {
      text: buildFallbackReport(company, checklist, context),
      source: 'fallback',
    }
  }

  const { estimate, peers, rank } = context

  const peerLines = peers
    .map(
      (p, idx) =>
        `${idx + 1}. ${p.name}${p.isTarget ? ' (target)' : ''} — est. ${formatNumber(p.aiCarbonTco2e)} tCO2e/yr AI-attributable carbon`
    )
    .join('\n')

  const pdfSection = pdfFindings
    ? `\nThe consultant also ran the actual BRSR PDF through automated analysis. Summary of what the document itself states: "${pdfFindings.summary}"\n`
    : ''

  const prompt = `You are an ESG consultant specializing in AI environmental disclosure gaps for Indian IT/BRSR reporting.

COMPANY: ${company.name} (${company.ticker}), ${company.sector}
Employees: ${formatNumber(company.employees)} | Revenue: $${company.revenueUsdBn}B | Flagship AI initiative: ${company.aiInitiative}
BRSR reporting year: ${company.brsr.reportingYear}

DISCLOSED IN BRSR (company-wide totals, not AI-specific):
- Total energy consumption: ${formatNumber(estimate.totalEnergyMWh)} MWh
- Scope 1: ${formatNumber(company.brsr.scope1Tco2e)} tCO2e | Scope 2: ${formatNumber(company.brsr.scope2Tco2e)} tCO2e
- Water withdrawal: ${formatNumber(company.brsr.waterWithdrawalKL)} KL
- Renewable energy share: ${company.renewableEnergyPercent}%

MODELED AI-ATTRIBUTABLE FOOTPRINT (estimate, NOT disclosed by the company — methodology: GPU-hour modeling x PUE, India grid emission factor 0.71 tCO2e/MWh, data-center WUE benchmark 1.8 L/kWh):
- Estimated AI energy consumption: ${formatNumber(estimate.aiEnergyMWh)} MWh/yr (~${formatNumber(estimate.aiShareOfTotalEnergyPercent, 1)}% of disclosed total energy)
- Estimated AI water usage: ${formatNumber(estimate.aiWaterKL)} KL/yr (~${formatNumber(estimate.aiShareOfWaterPercent, 1)}% of disclosed total water withdrawal)
- Estimated AI carbon emissions: ${formatNumber(estimate.aiCarbonTco2e)} tCO2e/yr (~${formatNumber(estimate.aiShareOfScope2Percent, 1)}% of disclosed Scope 2)

CONSULTANT'S 8-ITEM AI DISCLOSURE CHECKLIST (as assessed against the company's actual BRSR report):
${checklistSummaryText(checklist)}
${pdfSection}
PEER RANKING by modeled AI-attributable carbon emissions (highest first), ${company.name} ranks #${rank} of ${peers.length}:
${peerLines}

Write a full AI Disclosure Gap Report as plain text (no markdown symbols, use simple ALL-CAPS section headers and dashes for sub-bullets — this will be downloaded as a .txt file). Include exactly these sections, in this order:

1. ENERGY GAP — quantify the gap between disclosed total energy and the modeled AI-specific energy, and what's missing from BRSR.
2. WATER GAP — same, for water usage.
3. WORKFORCE GAP — assess the workforce disclosure checklist items (reskilling, displacement, governance) and what's missing.
4. TOP PRIORITY ACTION — the single most important, specific disclosure action this company should take next reporting cycle, and why it's the highest leverage one.
5. PEER CONTEXT — how this company compares to the other 4 Indian IT majors on AI environmental disclosure maturity and modeled footprint.

Keep it concise, specific, and written for an ESG consultant briefing a client. Reference actual numbers from above.`

  try {
    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    })
    const text = response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
    return { text, source: 'claude' }
  } catch (err) {
    return {
      text: buildFallbackReport(company, checklist, context),
      source: 'fallback',
      error: err.message,
    }
  }
}

function buildFallbackReport(company, checklist, context) {
  const { estimate, peers, rank, disclosed } = context
  const peerLines = peers
    .map(
      (p, idx) =>
        `  ${idx + 1}. ${p.name}${p.isTarget ? ' (target)' : ''} - est. ${formatNumber(p.aiCarbonTco2e)} tCO2e/yr`
    )
    .join('\n')

  return `AI DISCLOSURE GAP REPORT - ${company.name} (${company.ticker})
Locally generated estimate - set VITE_ANTHROPIC_API_KEY for a full Claude-authored report.

ENERGY GAP
BRSR discloses ${formatNumber(estimate.totalEnergyMWh)} MWh of total energy consumption for ${company.brsr.reportingYear} with no AI/compute breakdown.
Modeling suggests AI workloads (${company.aiInitiative}) account for roughly ${formatNumber(estimate.aiEnergyMWh)} MWh/yr, ~${formatNumber(estimate.aiShareOfTotalEnergyPercent, 1)}% of that total - none of it itemized in the report.

WATER GAP
Disclosed water withdrawal is ${formatNumber(company.brsr.waterWithdrawalKL)} KL with no data-center cooling breakout.
Estimated AI-attributable water usage is ${formatNumber(estimate.aiWaterKL)} KL/yr (~${formatNumber(estimate.aiShareOfWaterPercent, 1)}% of disclosed withdrawal).

WORKFORCE GAP
${disclosed} of 8 checklist items are marked "Disclosed" for this company. Items most commonly missing relate to AI workforce reskilling/displacement reporting and a named AI environmental governance body - both absent from current BRSR disclosure.

TOP PRIORITY ACTION
Publish a segmented energy and emissions breakdown for AI/cloud compute separate from blended IT infrastructure totals - this is the single disclosure gap that most undermines comparability with global tech peers already reporting AI-specific Scope 2/3 figures.

PEER CONTEXT
${company.name} ranks #${rank} of ${peers.length} Indian IT majors by modeled AI-attributable carbon emissions:
${peerLines}

METHODOLOGY NOTE
AI energy/water/carbon figures are modeled estimates (GPU-hour x PUE, India grid factor 0.71 tCO2e/MWh, WUE 1.8 L/kWh) - not company-disclosed data. Use for directional gap analysis only.`
}
