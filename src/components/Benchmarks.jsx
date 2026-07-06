export default function Benchmarks() {
  return (
    <div className="meth-page">
      <div className="meth-header">
        <h1 className="meth-title">Benchmarks</h1>
        <p className="meth-intro">
          Because none of the 20 companies disclose AI-specific environmental data in their
          BRSR filings, the figures shown in each company's dashboard are modeled estimates
          built from the technical assumptions below. They are labelled as estimates throughout
          and should not be treated as audited figures.
        </p>
      </div>

      <div className="meth-body">
        <section className="meth-section">
          <h2 className="meth-section-title">Water Usage Effectiveness — disclosed comparisons</h2>
          <p>
            Recent research provides the first peer-reviewed cross-hyperscaler WUE dataset.
            The table below shows disclosed figures alongside this tool's estimate.
          </p>
          <table className="meth-table bench-table bench-wue-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Metric</th>
                <th>Value</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Microsoft ESR FY24</td>
                <td>Data centre WUE</td>
                <td className="bench-val">0.30 L / kWh</td>
                <td>Direct disclosure, data centres only</td>
              </tr>
              <tr>
                <td>UC Riverside (Han et al. 2026)</td>
                <td>Hyperscaler WUE range</td>
                <td className="bench-val">0.06 – 1.36 L / kWh</td>
                <td>Computed from disclosed figures, arXiv:2603.02705</td>
              </tr>
              <tr>
                <td>UC Riverside (Han et al. 2026)</td>
                <td>Colocation WUE range</td>
                <td className="bench-val">0.06 – 1.28 L / kWh</td>
                <td>Computed from disclosed figures</td>
              </tr>
              <tr>
                <td>This tool</td>
                <td>Conservative upper bound</td>
                <td className="bench-val">1.80 L / kWh</td>
                <td>Upper end of industry range, used to surface maximum potential exposure</td>
              </tr>
            </tbody>
          </table>
          <p className="meth-note">
            <strong>Note:</strong> WUE (Water Usage Effectiveness) is defined as data centre
            water consumption divided by IT equipment energy. Whole-company water and energy
            figures are not equivalent to WUE and should not be compared directly. No Indian
            IT company currently discloses WUE or any AI-specific water metric.
          </p>
        </section>

        <section className="meth-section">
          <h2 className="meth-section-title">Technical assumptions</h2>
          <table className="meth-table bench-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value used</th>
                <th>Source</th>
                <th>Key limitation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Water Usage Effectiveness (WUE)</strong></td>
                <td className="bench-val">1.80 L / kWh</td>
                <td>Conservative upper bound based on industry range of 0.06–1.36 L/kWh (Han et al., arXiv:2603.02705, 2026) and older Indian data center profiles. Microsoft FY24 disclosed 0.30 L/kWh.</td>
                <td>Likely overstates consumption for companies using modern hyperscale infrastructure. Used deliberately to surface maximum potential exposure given zero disclosure from Indian IT companies.</td>
              </tr>
              <tr>
                <td><strong>India Grid Emission Factor</strong></td>
                <td className="bench-val">0.71 tCO₂e / MWh</td>
                <td>Central Electricity Authority, CO₂ Baseline Database for the Indian Power Sector, Version 18 (2023)</td>
                <td>National composite average. Varies significantly by state — Tamil Nadu, Karnataka, and Rajasthan have higher renewable penetration and lower actual grid intensity. No state-level attribution is attempted here.</td>
              </tr>
              <tr>
                <td><strong>AI Compute Fraction</strong></td>
                <td className="bench-val">18% of total IT energy</td>
                <td>IDC Worldwide AI and Generative AI Spending Guide 2024 (15–22% range for IT services); Goldman Sachs AI Data Center Power Demand (April 2024); Gartner Hype Cycle for AI 2024</td>
                <td>Uncertainty of approximately ±8 percentage points for any individual company. A company with a large GPU fleet running continuous inference will be at the high end; one primarily reselling cloud capacity may be lower.</td>
              </tr>
              <tr>
                <td><strong>Power Usage Effectiveness (PUE)</strong></td>
                <td className="bench-val">1.40 – 1.55 (1.48 default)</td>
                <td>Company BRSR and sustainability reports where published; Green Grid PUE Benchmark Report 2023; NASSCOM Data Centre Report 2023</td>
                <td>Where a company publishes its own PUE, that figure is used. Where not published, 1.48 is applied as a sector average. Best-in-class hyperscale facilities approach 1.2; older Indian data centers may exceed 1.6.</td>
              </tr>
              <tr>
                <td><strong>GPU Energy Intensity vs. CPU</strong></td>
                <td className="bench-val">3–5× per compute-hour</td>
                <td>MLCommons MLPerf Training and Inference Benchmarks 2023; Lawrence Berkeley National Laboratory, Recalibrating Global Data Center Energy-Use Estimates (2023)</td>
                <td>Highly model-dependent. Training runs are at the high end; batch inference may be closer to 3×. Real-time inference (e.g., copilot-style features) has a very different profile from scheduled batch jobs.</td>
              </tr>
              <tr>
                <td><strong>Estimated AI GPU Hours per Year</strong></td>
                <td className="bench-val">Derived per company</td>
                <td>Scaled from company employee count, revenue, disclosed cloud regions, and publicly announced GPU investment figures in annual reports and press releases</td>
                <td>No company discloses GPU fleet size or compute hours in their BRSR. These estimates carry the highest uncertainty of all inputs — actual figures could plausibly be 2–3× higher or lower than modeled.</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="meth-section">
          <h2 className="meth-section-title">How estimates are calculated</h2>
          <p>
            For each company, the estimation chain works as follows:
          </p>
          <div className="meth-limit-list">
            <div className="meth-limit">
              <div className="meth-limit-heading">Step 1 — AI GPU hours</div>
              <p>Estimated from company scale (employees, revenue, cloud regions) relative to
              peers with known GPU deployments. Where a company has disclosed GPU counts or
              AI infrastructure investment, those anchor the estimate.</p>
            </div>
            <div className="meth-limit">
              <div className="meth-limit-heading">Step 2 — AI energy consumption</div>
              <p>GPU hours × average GPU power draw (adjusted for mix of training vs. inference)
              × PUE = AI data center energy in MWh. This is then expressed as a share of the
              company's total disclosed energy consumption as a sense-check against the 18%
              AI compute fraction assumption.</p>
            </div>
            <div className="meth-limit">
              <div className="meth-limit-heading">Step 3 — Water consumption</div>
              <p>AI energy (MWh) × WUE (1.8 L/kWh) = estimated water consumed for AI cooling,
              in kilolitres. Added to a proportional estimate of general data center cooling
              water to produce a total AI-attributable water figure.</p>
            </div>
            <div className="meth-limit">
              <div className="meth-limit-heading">Step 4 — Carbon emissions</div>
              <p>AI energy (MWh) × grid emission factor (0.71 tCO₂e/MWh) = Scope 2 GHG
              estimate for AI workloads, in tCO₂e. A portion of cloud-vendor energy use
              is estimated as Scope 3. Renewable energy percentages, where disclosed, are
              applied to reduce the Scope 2 figure.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
