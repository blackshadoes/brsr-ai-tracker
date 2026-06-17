// Pre-loaded company baseline data.
// Figures are approximate public-domain scale references (employee counts, revenue,
// disclosed BRSR totals) used purely to seed the modeling layer in src/lib/estimate.js.
// They are NOT live or audited numbers — refresh from the company's latest BRSR/annual
// report before using this tool in real client work.

export const COMPANIES = {
  Infosys: {
    name: 'Infosys',
    ticker: 'INFY',
    sector: 'IT Services & Consulting',
    employees: 317000,
    revenueUsdBn: 18.6,
    aiInitiative: 'Infosys Topaz',
    cloudRegions: 12,
    estimatedAiGpuHoursPerYear: 4200000,
    pue: 1.45,
    renewableEnergyPercent: 47,
    brsr: {
      reportingYear: 'FY24',
      totalEnergyConsumptionGJ: 1150000,
      scope1Tco2e: 9800,
      scope2Tco2e: 168000,
      waterWithdrawalKL: 3450000,
      disclosesAIEnergyBreakdown: false,
      disclosesAIWaterUsage: false,
      disclosesAIWorkforceImpact: false,
    },
  },
  TCS: {
    name: 'TCS',
    ticker: 'TCS',
    sector: 'IT Services & Consulting',
    employees: 607000,
    revenueUsdBn: 29.1,
    aiInitiative: 'TCS AI Cloud',
    cloudRegions: 18,
    estimatedAiGpuHoursPerYear: 6800000,
    pue: 1.4,
    renewableEnergyPercent: 51,
    brsr: {
      reportingYear: 'FY24',
      totalEnergyConsumptionGJ: 1980000,
      scope1Tco2e: 14200,
      scope2Tco2e: 241000,
      waterWithdrawalKL: 5120000,
      disclosesAIEnergyBreakdown: false,
      disclosesAIWaterUsage: false,
      disclosesAIWorkforceImpact: false,
    },
  },
  Wipro: {
    name: 'Wipro',
    ticker: 'WIPRO',
    sector: 'IT Services & Consulting',
    employees: 234000,
    revenueUsdBn: 10.8,
    aiInitiative: 'Wipro ai360',
    cloudRegions: 9,
    estimatedAiGpuHoursPerYear: 2400000,
    pue: 1.5,
    renewableEnergyPercent: 38,
    brsr: {
      reportingYear: 'FY24',
      totalEnergyConsumptionGJ: 780000,
      scope1Tco2e: 7100,
      scope2Tco2e: 119000,
      waterWithdrawalKL: 2380000,
      disclosesAIEnergyBreakdown: false,
      disclosesAIWaterUsage: false,
      disclosesAIWorkforceImpact: false,
    },
  },
  'HCL Technologies': {
    name: 'HCL Technologies',
    ticker: 'HCLTECH',
    sector: 'IT Services & Consulting',
    employees: 223000,
    revenueUsdBn: 13.3,
    aiInitiative: 'HCLTech AI Force',
    cloudRegions: 10,
    estimatedAiGpuHoursPerYear: 2900000,
    pue: 1.48,
    renewableEnergyPercent: 41,
    brsr: {
      reportingYear: 'FY24',
      totalEnergyConsumptionGJ: 840000,
      scope1Tco2e: 6900,
      scope2Tco2e: 128000,
      waterWithdrawalKL: 2510000,
      disclosesAIEnergyBreakdown: false,
      disclosesAIWaterUsage: false,
      disclosesAIWorkforceImpact: false,
    },
  },
  'Tech Mahindra': {
    name: 'Tech Mahindra',
    ticker: 'TECHM',
    sector: 'IT Services & Consulting',
    employees: 148000,
    revenueUsdBn: 6.5,
    aiInitiative: 'Project Indus / TechM Gen AI Studio',
    cloudRegions: 7,
    estimatedAiGpuHoursPerYear: 1500000,
    pue: 1.52,
    renewableEnergyPercent: 33,
    brsr: {
      reportingYear: 'FY24',
      totalEnergyConsumptionGJ: 460000,
      scope1Tco2e: 4200,
      scope2Tco2e: 79000,
      waterWithdrawalKL: 1640000,
      disclosesAIEnergyBreakdown: false,
      disclosesAIWaterUsage: false,
      disclosesAIWorkforceImpact: false,
    },
  },
}

export const COMPANY_NAMES = Object.keys(COMPANIES)

export function findCompany(query) {
  if (!query) return null
  const trimmed = query.trim().toLowerCase()
  const exact = COMPANY_NAMES.find((n) => n.toLowerCase() === trimmed)
  if (exact) return COMPANIES[exact]
  const aliasMatch = COMPANY_NAMES.find((n) => {
    const c = COMPANIES[n]
    return (
      c.ticker.toLowerCase() === trimmed ||
      n.toLowerCase().includes(trimmed) ||
      trimmed.includes(n.toLowerCase())
    )
  })
  return aliasMatch ? COMPANIES[aliasMatch] : null
}
