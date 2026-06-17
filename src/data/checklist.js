export const CHECKLIST_ITEMS = [
  {
    id: 'ai_energy_breakdown',
    label: 'Quantifies energy consumption specifically attributable to AI/ML compute, GPUs, or AI data centers (separate from total IT energy)',
  },
  {
    id: 'ai_water_usage',
    label: 'Discloses water consumption or withdrawal tied to AI/data center cooling',
  },
  {
    id: 'ai_emissions_breakdown',
    label: 'Breaks out Scope 2 or Scope 3 GHG emissions attributable to AI workloads or cloud/hyperscaler partners running AI',
  },
  {
    id: 'ai_renewable_allocation',
    label: 'States renewable energy procurement specifically allocated to AI/cloud infrastructure (vs. a company-wide blended average)',
  },
  {
    id: 'scope3_cloud_vendor',
    label: 'Discloses upstream Scope 3 emissions from third-party cloud/AI vendors (AWS, Azure, GCP) used for AI workloads',
  },
  {
    id: 'workforce_impact',
    label: 'Reports on workforce impact of AI adoption — reskilling investment, role displacement, attrition linked to automation',
  },
  {
    id: 'governance_body',
    label: 'Names a governance body or policy specifically overseeing the environmental impact of AI / responsible AI deployment',
  },
  {
    id: 'reduction_targets',
    label: 'Sets quantified targets or timelines to reduce AI-specific energy, water, or carbon footprint',
  },
]

export const DISCLOSURE_STATUSES = ['not_disclosed', 'partial', 'disclosed']

export const STATUS_LABEL = {
  not_disclosed: 'Not Disclosed',
  partial: 'Partially Disclosed',
  disclosed: 'Disclosed',
}

export function createEmptyChecklistState() {
  return CHECKLIST_ITEMS.reduce((acc, item) => {
    acc[item.id] = { status: 'not_disclosed', note: '' }
    return acc
  }, {})
}
