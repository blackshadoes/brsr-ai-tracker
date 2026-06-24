// Manual AI disclosure scores for the leaderboard.
// Update each company's score by hand (0–8) after reviewing its latest BRSR
// report against the 8-item checklist in checklist.js. All scores start at 0
// because, as of this writing, no tracked company itemizes AI-specific
// energy, water or carbon figures in its BRSR filing.
import { COMPANY_NAMES } from './companies'

export const MAX_DISCLOSURE_SCORE = 8

export const DISCLOSURE_SCORES = {
  TCS: 0,
  Infosys: 0,
  Wipro: 0,
  'HCL Technologies': 0,
  'Tech Mahindra': 0,
  LTIMindtree: 0,
  Mphasis: 0,
  'Persistent Systems': 0,
  Coforge: 0,
  'KPIT Technologies': 0,
  Hexaware: 0,
  Zensar: 0,
  Mastek: 0,
  Birlasoft: 0,
  'Sonata Software': 0,
  Firstsource: 0,
  'Happiest Minds': 0,
  'Tata Elxsi': 0,
  Cyient: 0,
  Sasken: 0,
}

export function getLeaderboard() {
  return COMPANY_NAMES.map((name) => ({
    name,
    score: DISCLOSURE_SCORES[name] ?? 0,
    maxScore: MAX_DISCLOSURE_SCORE,
  })).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
}
