export default function About() {
  return (
    <div className="meth-page">
      <div className="meth-header">
        <h1 className="meth-title">About</h1>
        <p className="meth-intro">
          What this tracker is, who built it, and what it should not be used for.
        </p>
      </div>

      <div className="meth-body">

        <section className="meth-section">
          <h2 className="meth-section-title">What this tracker is</h2>
          <p>
            BRSR AI Tracker is an independent research tool built to surface a specific and
            measurable gap: Indian IT companies are deploying AI at scale while their mandatory
            sustainability filings contain no AI-specific environmental disclosures whatsoever.
          </p>
          <p>
            The tracker does three things. It estimates the AI environmental footprint (energy,
            water, carbon) of 20 Indian IT and engineering services companies using publicly
            available benchmarks and company-disclosed scale metrics. It scores each company
            against an 8-item disclosure checklist derived from the BRSR framework. And it
            documents the methodology fully so the assumptions can be challenged, updated, and
            improved as better data becomes available.
          </p>
          <p>
            The goal is not to rank companies or assign blame. It is to make the gap between
            AI adoption and sustainability disclosure visible enough that it becomes harder to
            ignore in the next reporting cycle.
          </p>
        </section>

        <section className="meth-section">
          <h2 className="meth-section-title">Who built it</h2>
          <p>
            This tracker was designed and built by <strong>Chhaya Rani</strong>, an independent
            ESG researcher focused on technology sector sustainability disclosures in India.
          </p>
          <p>
            The research is conducted independently. It is not affiliated with any company,
            rating agency, investor, or regulatory body. No company has been consulted in the
            preparation of these estimates or scores.
          </p>
        </section>

        <section className="meth-section">
          <h2 className="meth-section-title">What this tracker is not</h2>
          <div className="meth-limit-list">
            <div className="meth-limit">
              <div className="meth-limit-heading">Not a financial data product</div>
              <p>The estimates and scores here are not suitable as inputs for investment
              decisions, ESG ratings, or credit analysis without independent verification
              against primary filings. They are research estimates, not audited data.</p>
            </div>
            <div className="meth-limit">
              <div className="meth-limit-heading">Not a regulatory submission</div>
              <p>This tool has no formal standing with SEBI, MCA, or any Indian regulatory
              body. It is an advocacy and research instrument intended to inform public debate
              about disclosure standards, not to substitute for official regulatory processes.</p>
            </div>
            <div className="meth-limit">
              <div className="meth-limit-heading">Not a complete picture</div>
              <p>The tracker covers 20 companies and 8 disclosure items. Many more companies
              and disclosure dimensions exist. The 8 items were chosen for tractability and
              materiality, not because they are exhaustive. A company scoring 8/8 would still
              have environmental obligations beyond what this checklist captures.</p>
            </div>
            <div className="meth-limit">
              <div className="meth-limit-heading">Not static</div>
              <p>BRSR filings are updated annually. Company AI investments are growing rapidly.
              The estimates and scores here reflect FY24 filings and will become stale as new
              data is published. The tracker will be updated as FY25 filings become available.</p>
            </div>
          </div>
        </section>

        <section className="meth-section">
          <h2 className="meth-section-title">Corrections and contributions</h2>
          <p>
            If you have access to a primary BRSR filing that contradicts a score shown here,
            or if a company has made a disclosure that should update an estimate, that
            information is welcome. The methodology is fully documented in the Methodology
            and Benchmarks pages and is open to scrutiny.
          </p>
          <p>
            The source code for this tracker is publicly available. All data sources are cited
            in the Benchmarks section. No proprietary data is used.
          </p>
        </section>

      </div>
    </div>
  )
}
