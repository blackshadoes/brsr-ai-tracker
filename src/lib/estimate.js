// Modeling layer: turns each company's baseline assumptions into estimated
// AI-attributable energy, water and carbon figures that BRSR reports leave out.
// Every constant below is a labeled industry-benchmark assumption, not a
// disclosed or measured value — surface that distinction in the UI.

export const ASSUMPTIONS = {
  gpuAvgPowerKW: 0.7, // blended draw of a modern AI accelerator under load, incl. host overhead
  gridEmissionFactorTco2ePerMWh: 0.71, // India grid average (CEA baseline)
  waterIntensityLPerKWh: 1.8, // data-center cooling water usage effectiveness (evaporative cooling benchmark)
  recDampening: 0.6, // unbundled renewable energy certificates only partially displace grid carbon
  gjPerMWh: 3.6,
}

export function estimateAIFootprint(company) {
  const gpuEnergyMWh = (company.estimatedAiGpuHoursPerYear * ASSUMPTIONS.gpuAvgPowerKW) / 1000
  const aiEnergyMWh = gpuEnergyMWh * company.pue
  const renewableShare = company.renewableEnergyPercent / 100
  const effectiveCarbonFactor =
    ASSUMPTIONS.gridEmissionFactorTco2ePerMWh * (1 - renewableShare * ASSUMPTIONS.recDampening)
  const aiCarbonTco2e = aiEnergyMWh * effectiveCarbonFactor
  const aiWaterKL = (aiEnergyMWh * 1000 * ASSUMPTIONS.waterIntensityLPerKWh) / 1000

  const totalEnergyMWh = company.brsr.totalEnergyConsumptionGJ / ASSUMPTIONS.gjPerMWh
  const aiShareOfTotalEnergyPercent = totalEnergyMWh > 0 ? (aiEnergyMWh / totalEnergyMWh) * 100 : null

  const totalScope2Tco2e = company.brsr.scope2Tco2e
  const aiShareOfScope2Percent =
    totalScope2Tco2e > 0 ? (aiCarbonTco2e / totalScope2Tco2e) * 100 : null

  const totalWaterKL = company.brsr.waterWithdrawalKL
  const aiShareOfWaterPercent = totalWaterKL > 0 ? (aiWaterKL / totalWaterKL) * 100 : null

  return {
    aiEnergyMWh,
    aiCarbonTco2e,
    aiWaterKL,
    totalEnergyMWh,
    aiShareOfTotalEnergyPercent,
    aiShareOfScope2Percent,
    aiShareOfWaterPercent,
  }
}

export function formatNumber(value, fractionDigits = 0) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return value.toLocaleString('en-IN', {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  })
}
