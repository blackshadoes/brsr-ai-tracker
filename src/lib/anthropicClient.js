import Anthropic from '@anthropic-ai/sdk'

export const CLAUDE_MODEL = 'claude-sonnet-4-6'

const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

export const hasApiKey = Boolean(apiKey)

// This calls the Anthropic API directly from the browser, which means the API
// key ships inside the client bundle and is visible to anyone who inspects
// network requests. That's an explicit, accepted tradeoff for this internal
// consultant tool (set via VITE_ANTHROPIC_API_KEY) — do not reuse this pattern
// for a publicly distributed app without proxying calls through a backend.
let client = null
export function getClaudeClient() {
  if (!hasApiKey) return null
  if (!client) {
    client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
  }
  return client
}
