export default function Methodology() {
  return (
    <div className="meth-page">
      <div className="meth-header">
        <h1 className="meth-title">Methodology</h1>
        <p className="meth-intro">
          How the 8-item AI disclosure framework was designed, what each item measures,
          and how companies are scored against their BRSR filings.
        </p>
      </div>

      <div className="meth-body">

        <section className="meth-section">
          <h2 className="meth-section-title">Research design</h2>
          <p>
            India's Business Responsibility and Sustainability Reporting (BRSR) framework,
            mandated by SEBI for the top 1,000 listed companies from FY23, requires detailed
            environmental disclosures — energy consumption, water withdrawal, GHG emissions,
            and reduction targets. However, the framework predates the current scale of AI
            adoption and does not explicitly require AI-specific breakdowns.
          </p>
          <p>
            This tracker asks a single question: do the 20 largest Indian IT and engineering
            services companies disclose the environmental impact of their AI operations inside
            their BRSR filings? The answer, as of FY24, is uniformly no. The 8-item checklist
            below defines what adequate disclosure would look like, so the gap can be measured
            precisely rather than described generally.
          </p>
          <p>
            Only the BRSR regulatory filing is used as the evidence source. Press releases,
            sustainability microsites, investor presentations, and annual report narratives are
            excluded, unless explicitly incorporated by reference into the BRSR. This is a
            deliberate and strict interpretation: the BRSR is a regulated document with legal
            standing; PR materials are not.
          </p>
        </section>

        <section className="meth-section">
          <h2 className="meth-section-title">The 8-item disclosure framework</h2>
          <p>
            Each item represents a disclosure that is: (a) already reportable within the
            existing BRSR structure, (b) directly linked to a quantifiable environmental
            impact, and (c) necessary for any third-party estimate of AI footprint to be
            reliable. The absence of any one makes the overall picture materially incomplete.
          </p>
          <table className="meth-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Disclosure item</th>
                <th>Why it matters</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>AI-specific energy consumption, separate from total IT energy</td>
                <td>GPU and AI accelerator workloads consume 5–10× more energy per compute-hour than general-purpose servers. Without a breakdown the AI footprint is invisible inside company-wide totals.</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Water consumption tied to AI and data center cooling</td>
                <td>LLM training and inference require significant cooling water. India's water stress makes this disclosure especially material for domestic data centers.</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Scope 2 or Scope 3 GHG attributable to AI workloads</td>
                <td>AI compute shifted to cloud vendors generates Scope 3 emissions not captured in most company filings, creating a material under-count of total carbon impact.</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Renewable energy specifically allocated to AI or cloud infrastructure</td>
                <td>Company-wide renewable percentages are often misleading — the AI workload portion may run entirely on grid power if not explicitly allocated to renewable sources.</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Upstream Scope 3 from cloud and AI vendors (AWS, Azure, GCP)</td>
                <td>When companies use third-party cloud infrastructure for AI, the energy and emissions sit in the vendor's operations — invisible unless disclosed as Scope 3 by the client company.</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Workforce impact of AI adoption</td>
                <td>AI-driven automation has direct social sustainability implications. BRSR's S-P9 section requires reskilling disclosures, but few companies link this explicitly to AI deployment scale.</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Named governance body overseeing AI environmental impact</td>
                <td>Without an accountable body, AI sustainability commitments remain aspirational. A named governance structure indicates institutional responsibility, not just policy intent.</td>
              </tr>
              <tr>
                <td>8</td>
                <td>Quantified targets to reduce AI-specific energy, water, or carbon</td>
                <td>Many companies have company-wide net-zero targets that pre-date their AI scale-up. AI-specific targets are needed to show that growth in AI capacity is accounted for in emissions planning.</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="meth-section">
          <h2 className="meth-section-title">Scoring criteria</h2>
          <p>
            Each of the 8 items is assessed against the company's most recent BRSR filing
            and assigned one of three scores.
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
                <td>Not disclosed</td>
                <td>No mention in the BRSR filing, or disclosure exists only in non-regulatory materials (press release, annual report narrative, company website). Current score for all 20 companies on all 8 items.</td>
              </tr>
              <tr>
                <td className="meth-score-val">0.5</td>
                <td>Partially disclosed</td>
                <td>The item is qualitatively mentioned in the BRSR without specific quantification — for example, "We are working to reduce the environmental impact of our AI systems" with no number attached, or a governance body named without an explicit AI environmental mandate.</td>
              </tr>
              <tr>
                <td className="meth-score-val">1</td>
                <td>Disclosed</td>
                <td>A specific, quantified disclosure appears in the BRSR for this item — AI-specific energy in GJ or MWh, water withdrawal for data center cooling in KL, a named AI governance body with a defined environmental scope.</td>
              </tr>
            </tbody>
          </table>
          <p className="meth-note">
            <strong>Current status:</strong> Every company in this tracker scores 0/8.
            Mphasis's FY24 BRSR was directly machine-read and confirmed 0/8. All other
            companies were cross-checked via NSE disclosure summaries and SEBI filing
            databases. Manual verification against primary filings is recommended before
            using these scores for investment or regulatory purposes.
          </p>
        </section>

      </div>
    </div>
  )
}
