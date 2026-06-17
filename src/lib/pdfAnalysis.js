import { getClaudeClient, CLAUDE_MODEL } from './anthropicClient'
import { CHECKLIST_ITEMS } from '../data/checklist'

export const MAX_PDF_BYTES = 32 * 1024 * 1024 // Anthropic Messages API document limit

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      const base64 = typeof result === 'string' ? result.split(',')[1] : ''
      resolve(base64)
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

const FINDINGS_TOOL = {
  name: 'report_disclosure_findings',
  description:
    'Report which AI environmental/workforce disclosure items are present in the uploaded BRSR report.',
  input_schema: {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        description: 'One entry per checklist item, in the same order given.',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', enum: CHECKLIST_ITEMS.map((i) => i.id) },
            status: { type: 'string', enum: ['disclosed', 'partial', 'not_disclosed'] },
            evidence: {
              type: 'string',
              description: 'Short supporting quote or section/page reference, or "" if not_disclosed.',
            },
          },
          required: ['id', 'status', 'evidence'],
        },
      },
      summary: {
        type: 'string',
        description: '2-4 sentence summary of the document\'s overall AI environmental disclosure posture.',
      },
    },
    required: ['items', 'summary'],
  },
}

export async function analyzeBrsrPdf(file) {
  const client = getClaudeClient()
  if (!client) {
    throw new Error('VITE_ANTHROPIC_API_KEY is not set — PDF analysis requires the Anthropic API.')
  }
  if (file.size > MAX_PDF_BYTES) {
    throw new Error('PDF is larger than the 32MB limit supported by the Anthropic API.')
  }

  const base64 = await fileToBase64(file)
  const checklistDescription = CHECKLIST_ITEMS.map((i, idx) => `${idx + 1}. [${i.id}] ${i.label}`).join('\n')

  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 2048,
    system:
      'You are an ESG disclosure analyst reviewing an Indian BRSR (Business Responsibility and Sustainability Report) PDF for gaps in AI-specific environmental and workforce disclosure. ' +
      'Assess each checklist item strictly against what is literally written in the document — do not assume disclosure that is not present.',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'document',
            source: { type: 'base64', media_type: 'application/pdf', data: base64 },
          },
          {
            type: 'text',
            text: `Evaluate this BRSR report against the following 8 AI disclosure checklist items, then call report_disclosure_findings with your findings:\n\n${checklistDescription}`,
          },
        ],
      },
    ],
    tools: [FINDINGS_TOOL],
    tool_choice: { type: 'tool', name: 'report_disclosure_findings' },
  })

  const toolUse = response.content.find((block) => block.type === 'tool_use')
  if (!toolUse) {
    throw new Error('Claude did not return structured findings for this PDF.')
  }
  return toolUse.input
}
