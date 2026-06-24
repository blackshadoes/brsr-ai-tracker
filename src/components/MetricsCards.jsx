import { estimateAIFootprint, formatNumber } from '../lib/estimate'
import Reveal from './Reveal'

export default function MetricsCards({ company }) {
  const est = estimateAIFootprint(company)

  return (
    <div className="section">
      <div className="section-title">Estimated AI Environmental Footprint (undisclosed in BRSR)</div>
      <div className="metrics-grid">
        <Reveal className="metric-card" delay={0}>
          <div className="metric-label">AI Energy Consumption</div>
          <div className="metric-value">
            {formatNumber(est.aiEnergyMWh)} <span className="metric-unit">MWh/yr</span>
          </div>
          <div className="metric-sub">
            ~{formatNumber(est.aiShareOfTotalEnergyPercent, 1)}% of disclosed total energy
          </div>
        </Reveal>
        <Reveal className="metric-card" delay={100}>
          <div className="metric-label">AI Water Usage</div>
          <div className="metric-value">
            {formatNumber(est.aiWaterKL)} <span className="metric-unit">KL/yr</span>
          </div>
          <div className="metric-sub">
            ~{formatNumber(est.aiShareOfWaterPercent, 1)}% of disclosed water withdrawal
          </div>
        </Reveal>
        <Reveal className="metric-card" delay={200}>
          <div className="metric-label">AI Carbon Emissions</div>
          <div className="metric-value">
            {formatNumber(est.aiCarbonTco2e)} <span className="metric-unit">tCO2e/yr</span>
          </div>
          <div className="metric-sub">
            ~{formatNumber(est.aiShareOfScope2Percent, 1)}% of disclosed Scope 2
          </div>
        </Reveal>
      </div>
      <div className="methodology-note">
        Methodology: estimated GPU-hours x avg. accelerator power x PUE for energy; India grid
        emission factor (0.71 tCO2e/MWh, dampened by renewable share) for carbon; data-center WUE
        benchmark (1.8 L/kWh) for water. These are modeled approximations to surface the
        disclosure gap, not figures reported by {company.name}.
      </div>
    </div>
  )
}
