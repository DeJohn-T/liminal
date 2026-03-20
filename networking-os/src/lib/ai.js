// lib/ai.js
// Calls the Anthropic API via proxy or direct depending on your setup.
// In production, route this through a backend to keep your API key secret.

const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages'

/**
 * Call Claude with a system prompt and user message.
 * @param {string} system - System prompt
 * @param {string} user - User message
 * @param {number} maxTokens - Max tokens (default 1000)
 * @returns {Promise<string>} - Claude's text response
 */
export async function callClaude(system, user, maxTokens = 1000) {
  const response = await fetch(ANTHROPIC_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // NOTE: In production, move your API key to a backend/serverless function.
      // Never expose it in client-side code.
      // 'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
      // 'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  const data = await response.json()
  if (data.content && data.content[0]) return data.content[0].text
  throw new Error('No response from Claude')
}

// --- Prompts ---

export async function parseLinkedIn(rawText) {
  return callClaude(
    `You are a LinkedIn profile parser. Extract structured info from raw LinkedIn text and return ONLY valid JSON with these keys:
- summary: 2-3 sentence professional summary (string)
- companies: array of strings, most recent first, format "Role at Company"
- education: array of strings, format "Degree, School, Year"
- skills: array of up to 8 skill strings
- interests: array of up to 5 inferred professional/personal interests based on their background

Return ONLY the JSON object. No markdown, no backticks, no explanation.`,
    rawText
  )
}

export async function generateBrief(contact, parsedProfile) {
  const ctx = parsedProfile && !parsedProfile.error
    ? `Summary: ${parsedProfile.summary || ''}
Companies: ${(parsedProfile.companies || []).join(', ')}
Education: ${(parsedProfile.education || []).join(', ')}
Skills: ${(parsedProfile.skills || []).join(', ')}
Interests: ${(parsedProfile.interests || []).join(', ')}`
    : `Role: ${contact.role || 'unknown'}, Company: ${contact.company || 'unknown'}`

  return callClaude(
    `You are a professional networking coach. Write a concise, useful coffee chat prep brief using plain text with exactly these four section headers:

BACKGROUND
A 2-sentence summary of who this person is professionally.

QUESTIONS TO ASK
1.
2.
3.

WHAT TO HIGHLIGHT ABOUT YOURSELF
- (2-3 specific things that would resonate with this person)

CONVERSATION STARTERS
(1-2 specific angles based on their background or interests)

Be specific and tailored. No markdown symbols, no asterisks.`,
    `Name: ${contact.name}
Role: ${contact.role || ''}
Company: ${contact.company || ''}
${ctx}`
  )
}

export async function generateFollowUp(contact) {
  return callClaude(
    `You are a professional networking coach. Write a warm, genuine 3-4 sentence follow-up message after a coffee chat. It should feel like a real human wrote it — specific, not templated. Reference something concrete if notes are provided. Do not include a subject line or formal greeting like "Dear".`,
    `Coffee chat with: ${contact.name}, ${contact.role || ''}${contact.company ? ' at ' + contact.company : ''}
My notes from the chat: ${contact.notes || 'Good conversation, went well.'}`
  )
}
