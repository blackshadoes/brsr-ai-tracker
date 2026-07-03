export default function Methodology({ onBack }) {
  return (
    <div className="meth-page">
      <div className="meth-header">
        <h1 className="meth-title">Methodology</h1>
        <p className="meth-intro">
          This page explains how the 8-item disclosure checklist was constructed, how
          environmental estimates are calculated, what each score means, and where the
          approach has meaningful uncertainty.
        </p>
      </div>

      <div className="meth-body">

        {/* ── 1. Why these 8 items ─────────────────────── */}
        <section className="meth-section">
          <h2 className="meth-section-title">Why these 8 disclosure items?</h2>
          <p>
            India's Business Responsibility and Sustainability Reporting (BRSR) framework,
            mandated by SEBI for the top 1,000 listed companies from FY23, requires detailed
            environmental disclosures — energy consumption, water withdrawal, GHG emissions,
            and reduction targets. However, the framework predates the current scale of AI
            adoption and does not explicitly require AI-specific breakdowns.
          </p>
          <p>
            The 8 items below represent the disclosures that would be needed to understand
            a company's AI environmental footprint with any precision. They were selected
            because: (a) each is already reportable within the existing BRSR structure,
            (b) each has a direct, quantifiable environmental impact, and (c) the absence
            of any one of them makes third-party estimation of AI impact unreliable.
          </p>
          <table className="meth-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Disclosure Item</th>
                <th>Why it matters</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>AI-specific energy consumption (separate from total IT energy)</td>
                <td>GPU and AI accelerator workloads can consume 5–10× more energy per compute-hour than general-purpose servers. Without a breakdown, the AI footprint is invisible inside company-wide totals.</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Water consumption tied to AI/data center cooling</td>
                <td>Large language model training and inference require significant cooling water. India's water stress makes this disclosure especially material for domestic data centers.</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Scope 2/3 GHG attributable to AI workloads</td>
                <td>AI compute shifted to cloud vendors (AWS, Azure, GCP) generates Scope 3 emissions not captured in most company filings, creating a material under-count of total carbon impact.</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Renewable energy specifically allocated to AI/cloud infrastructure</td>
                <td>Company-wide renewable energy percentages are often misleading — the AI workload portion may run entirely on grid power if not explicitly allocated to renewable sources.</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Upstream Scope 3 from cloud/AI vendors (AWS, Azure, GCP)</td>
                <td>When companies use third-party cloud infrastructure for AI training or inference, the energy and emissions sit in the cloud vendor's operations — not the company's own footprint — unless explicitly disclosed as Scope 3.</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Workforce impact of AI adoption</td>
                <td>AI-driven automation has direct social sustainability implications. BRSR's S-P9 section requires reskilling disclosures, but few companies link this explicitly to AI deployment scale.</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Named governance body for AI environmental impact</td>
                <td>Without an accountable body, AI sustainability commitments remain aspirational. A named governance structure indicates institutional responsibility, not just policy intent.</td>
              </tr>
              <tr>
                <td>8</td>
                <td>Quantified AI-specific reduction targets</td>
                <td>Many companies have company-wide net-zero targets that pre-date their AI scale-up. AI-specific targets are needed to demonstrate that growth in AI capacity is accounted for in emissions planning.</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ── 2. Estimation benchmarks ─────────────────── */}
        <section className="meth-section">
          <h2 className="meth-section-title">Estimation benchmarks</h2>
          <p>
            Because none of the 20 companies disclose AI-specific environmental data in their
            BRSR filings, the figures shown in each company's dashboard are modeled estimates.
            They are explicitly labelled as such and should not be used as audited figures.
            The benchmarks below are the key assumptions.
          </p>

          <div className="meth-benchmark-grid">
            <div className="meth-benchmark">
              <div className="meth-benchmark-value">1.8 L / kWh</div>
              <div className="meth-benchmark-label">Water Usage Effectiveness (WUE)</div>
              <p className="meth-benchmark-desc">
                Litres of water consumed per kilowatt-hour of IT load. This midpoint estimate
                is derived from published WUE ranges for hyperscale data centers: Google
                reports ~1.1 L/kWh (2023 Environmental Report), Microsoft reports 1.8 L/kWh
                on average (2023 Sustainability Report), and older Indian data centers have
                been measured at 2.0–3.0 L/kWh. The 1.8 L/kWh figure is used as a
                conservative central estimate for Indian IT company data centers without
                published WUE data.
              </p>
              <div className="meth-benchmark-source">
                Sources: Google Environmental Report 2023; Microsoft Global Sustainability
                Report 2023; IEA Data Centres &amp; Data Transmission Networks 2023
              </div>
            </div>

            <div className="meth-benchmark">
              <div className="meth-benchmark-value">0.71 tCO₂e / MWh</div>
              <div className="meth-benchmark-label">India Grid Emission Factor</div>
              <p className="meth-benchmark-desc">
                The CO₂ equivalent emission intensity of electricity drawn from India's
                national grid, used to convert electricity consumption to Scope 2 GHG
                emissions. This figure is sourced from the Central Electricity Authority
                (CEA) CO₂ Baseline Database for the Indian Power Sector (Version 18,
                2023). The actual factor varies by state grid; 0.71 is the national
                composite and may overstate emissions for companies operating predominantly
                in renewable-heavy southern states.
              </p>
              <div className="meth-benchmark-source">
                Source: Central Electricity Authority, CO₂ Baseline Database for the
                Indian Power Sector, Version 18 (2023)
              </div>
            </div>

            <div className="meth-benchmark">
              <div className="meth-benchmark-value">18%</div>
              <div className="meth-benchmark-label">AI Compute Fraction</div>
              <p className="meth-benchmark-desc">
                The estimated share of total IT energy consumption attributable to AI and
                ML workloads. This is derived from analyst estimates of AI-related cloud
                spend as a share of total IT spend (IDC: 15–22% for IT services companies
                in 2023–24), adjusted for the higher energy intensity of GPU workloads
                relative to CPU-based workloads. A 18% central estimate is used, with
                acknowledged uncertainty of ±8 percentage points for any individual company
                depending on their actual AI workload mix.
              </p>
              <div className="meth-benchmark-source">
                Sources: IDC Worldwide AI and Generative AI Spending Guide 2024;
                Goldman Sachs AI Data Center Power Demand report (April 2024);
                Gartner Hype Cycle for Artificial Intelligence 2024
              </div>
            </div>

            <div className="meth-benchmark">
              <div className="meth-benchmark-value">1.40 – 1.55</div>
              <div className="meth-benchmark-label">Power Usage Effectiveness (PUE)</div>
              <p className="meth-benchmark-desc">
                The ratio of total data center energy to IT equipment energy. A PUE of 1.0
                would mean all energy goes to compute; real data centers also consume energy
                for cooling, power conversion, and lighting. Indian IT company data centers
                typically report PUE in the 1.4–1.6 range. Where a company has published
                its PUE, that figure is used. Where not published, 1.48 is used as a
                sector average.
              </p>
              <div className="meth-benchmark-source">
                Sources: Company BRSR/sustainability reports (where available);
                Green Grid PUE Benchmark Report 2023; NASSCOM Data Centre Report 2023
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Scoring ───────────────────────────────── */}
        <section className="meth-section">
          <h2 className="meth-section-title">What the scores mean</h2>
          <p>
            Each of the 8 checklist items is manually assessed against the company's
            most recent BRSR filing (FY24 for most companies). Only the BRSR regulatory
            filing is used as the source — press releases, sustainability microsites,
            investor presentations, and annual reports are excluded unless they are
            explicitly incorporated by reference into the BRSR.
          </p>
          <table className="meth-table meth-score-table">
            <thead>
              <tr>
                <th>Score</th>
                <th>Label</th>
                <th>Criteria</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="meth-score-val">0</td>
                <td>Not Disclosed</td>
                <td>No mention of this item in the BRSR filing, or the disclosure is present only in non-regulatory materials (PR, annual report narrative, website). This is the current score for all 20 companies on all 8 items as of FY24 filings.</td>
              </tr>
              <tr>
                <td className="meth-score-val">0.5</td>
                <td>Partially Disclosed</td>
                <td>The item is mentioned or qualitatively addressed in the BRSR, but without specific quantification. For example: "We are working to reduce the environmental impact of our AI systems" without a number, or a governance body is named without environmental AI scope defined.</td>
              </tr>
              <tr>
                <td className="meth-score-val">1</td>
                <td>Disclosed</td>
                <td>A specific, quantified disclosure appears in the BRSR filing for this item. For example: AI-specific energy consumption stated in GJ or MWh; water withdrawal for data center cooling stated in KL; a named AI governance body with an explicit environmental mandate.</td>
              </tr>
            </tbody>
          </table>
          <p className="meth-note">
            <strong>Current status:</strong> Every company in this tracker currently scores
            0/8. This was verified by direct retrieval of BRSR filings where accessible
            (Mphasis's filing was directly verified; others were cross-checked via NSE
            disclosures and SEBI filing databases). The 0/8 result is consistent with the
            broader finding that no Indian IT company has yet integrated AI-specific
            environmental disclosures into its regulatory reporting as of FY24.
          </p>
        </section>

        {/* ── 4. Limitations ───────────────────────────── */}
        <section className="meth-section">
          <h2 className="meth-section-title">Limitations and uncertainty</h2>

          <div className="meth-limit-list">
            <div className="meth-limit">
              <div className="meth-limit-heading">Modeled estimates, not audited figures</div>
              <p>All energy, water, and carbon figures shown per company are derived from
              the benchmarks above applied to disclosed company size metrics (employees,
              revenue, cloud regions). They have not been verified by the companies
              themselves. The AI compute fraction (18%) and GPU hours estimates carry
              the largest uncertainty — actual figures could plausibly range from 8% to
              30% for any individual company.</p>
            </div>
            <div className="meth-limit">
              <div className="meth-limit-heading">BRSR filing access constraints</div>
              <p>BRSR filings are published on NSE/BSE but are frequently behind
              authentication walls, rate-limited, or return 403 errors for automated
              retrieval. Only Mphasis's FY24 BRSR was directly machine-read for this
              tracker. All other scores are based on cross-referencing NSE disclosure
              summaries, company sustainability report metadata, and secondary research.
              Manual verification against primary filings is strongly recommended before
              using scores for investment or regulatory purposes.</p>
            </div>
            <div className="meth-limit">
              <div className="meth-limit-heading">PR versus regulatory disclosure</div>
              <p>Several companies (TCS, Infosys, Wipro, HCLTech, Tata Elxsi, Mphasis)
              have made public AI governance or training disclosures that would score
              partially or fully on items 6 and 7 if counted. These are excluded here
              because they appear in press releases or marketing materials, not in BRSR
              filings. This is a deliberate and strict interpretation — the BRSR is a
              regulated document with legal standing; PR is not. If these companies
              incorporate such disclosures into future BRSR filings, their scores will
              be updated.</p>
            </div>
            <div className="meth-limit">
              <div className="meth-limit-heading">Grid emission factor variation</div>
              <p>The 0.71 tCO₂e/MWh national grid factor is a national average. Companies
              with operations concentrated in Tamil Nadu, Karnataka, or Rajasthan — states
              with higher renewable penetration — will have actual Scope 2 emissions
              meaningfully lower than the modeled figures. Companies concentrated in
              coal-heavy states will have higher actual emissions. The tracker does not
              attempt to state-level attribution.</p>
            </div>
            <div className="meth-limit">
              <div className="meth-limit-heading">FY24 baseline only</div>
              <p>All data is based on FY24 BRSR filings (April 2023 – March 2024). AI
              adoption and disclosure practices are evolving rapidly. Scores and estimates
              should be considered a point-in-time snapshot, not a long-term ranking.
              FY25 filings (expected Q3 2025) may show material changes for some companies.</p>
            </div>
          </div>
        </section>

        {/* ── 5. About this tool ───────────────────────── */}
        <section className="meth-section">
          <h2 className="meth-section-title">About this tracker</h2>
          <p>
            BRSR AI Tracker was built by Chhaya Rani, an independent ESG researcher,
            to surface the gap between the scale of AI adoption by Indian IT companies
            and the environmental disclosures made in their regulatory filings. It is
            a research and advocacy tool, not a financial data product. The estimates
            and scores here are provided for informational purposes and should not be
            relied upon for investment decisions without independent verification.
          </p>
          <p>
            Corrections, updated filing references, or company data are welcome.
            The source code is open and the methodology is fully documented here.
          </p>
        </section>

      </div>
    </div>
  )
}
