import { useState, useRef, useEffect } from 'react'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Syne:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --surface: #111118;
    --surface2: #16161f;
    --border: rgba(255,255,255,0.07);
    --border-active: rgba(99,179,237,0.4);
    --text: #e8e8f0;
    --text-muted: #5a5a72;
    --text-dim: #8888aa;
    --accent: #63b3ed;
    --accent-glow: rgba(99,179,237,0.15);
    --accent2: #b794f4;
    --user-bg: rgba(99,179,237,0.08);
    --user-border: rgba(99,179,237,0.2);
    --ai-bg: rgba(183,148,244,0.06);
    --ai-border: rgba(183,148,244,0.2);
    --danger: #fc8181;
    --success: #68d391;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Mono', monospace;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* NOISE OVERLAY */
  .app::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  /* LANDING */
  .landing {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    position: relative;
    z-index: 1;
  }

  .landing-glow {
    position: fixed;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(99,179,237,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .landing-inner {
    width: 100%;
    max-width: 560px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--accent-glow);
    border: 1px solid var(--user-border);
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 11px;
    color: var(--accent);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 28px;
  }

  .badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 12px;
    letter-spacing: -0.02em;
  }

  h1 span {
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    color: var(--text-dim);
    font-size: 13px;
    line-height: 1.6;
    margin-bottom: 40px;
    font-style: italic;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-label {
    display: block;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 8px;
  }

  .form-input, .form-textarea {
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px 16px;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: var(--text);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    resize: none;
  }

  .form-input:focus, .form-textarea:focus {
    border-color: var(--border-active);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }

  .form-input::placeholder, .form-textarea::placeholder {
    color: var(--text-muted);
  }

  .form-textarea {
    min-height: 180px;
    line-height: 1.6;
  }

  .btn-primary {
    width: 100%;
    margin-top: 8px;
    padding: 14px 24px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border: none;
    border-radius: 8px;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #0a0a0f;
    cursor: pointer;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: opacity 0.2s, transform 0.1s;
  }

  .btn-primary:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .btn-primary:active:not(:disabled) {
    transform: translateY(0);
  }

  .btn-primary:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  /* INTERVIEW VIEW */
  .interview {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: relative;
    z-index: 1;
  }

  .interview-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-bottom: 1px solid var(--border);
    background: rgba(10,10,15,0.8);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .header-title {
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .status-pill {
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(104,211,145,0.1);
    border: 1px solid rgba(104,211,145,0.2);
    border-radius: 100px;
    padding: 3px 10px;
    font-size: 10px;
    color: var(--success);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .status-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--success);
    animation: pulse 2s infinite;
  }

  .btn-end {
    background: transparent;
    border: 1px solid rgba(252,129,129,0.2);
    border-radius: 6px;
    padding: 6px 12px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--danger);
    cursor: pointer;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: background 0.2s;
  }

  .btn-end:hover {
    background: rgba(252,129,129,0.08);
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 32px 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 760px;
    width: 100%;
    margin: 0 auto;
    scroll-behavior: smooth;
  }

  .messages::-webkit-scrollbar { width: 4px; }
  .messages::-webkit-scrollbar-track { background: transparent; }
  .messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

  .message {
    display: flex;
    flex-direction: column;
    gap: 6px;
    animation: fadeUp 0.3s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .message-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .message-meta.ai { color: var(--accent2); }
  .message-meta.user { color: var(--accent); }

  .message-icon {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  }

  .message-icon.ai {
    background: rgba(183,148,244,0.15);
    border: 1px solid rgba(183,148,244,0.2);
  }

  .message-icon.user {
    background: var(--accent-glow);
    border: 1px solid var(--user-border);
  }

  .message-bubble {
    padding: 16px 18px;
    border-radius: 10px;
    font-size: 13px;
    line-height: 1.75;
    white-space: pre-wrap;
  }

  .message-bubble.ai {
    background: var(--ai-bg);
    border: 1px solid var(--ai-border);
    border-top-left-radius: 2px;
  }

  .message-bubble.user {
    background: var(--user-bg);
    border: 1px solid var(--user-border);
    border-top-left-radius: 2px;
    color: var(--text-dim);
  }

  .typing-indicator {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 16px 18px;
    background: var(--ai-bg);
    border: 1px solid var(--ai-border);
    border-radius: 10px;
    border-top-left-radius: 2px;
    width: fit-content;
  }

  .typing-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--accent2);
    animation: typingBounce 1.2s infinite;
  }

  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-5px); opacity: 1; }
  }

  .input-area {
    padding: 16px 24px 24px;
    border-top: 1px solid var(--border);
    background: rgba(10,10,15,0.8);
    backdrop-filter: blur(12px);
    max-width: 760px;
    width: 100%;
    margin: 0 auto;
  }

  .input-wrapper {
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }

  .answer-input {
    flex: 1;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 16px;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: var(--text);
    outline: none;
    resize: none;
    min-height: 48px;
    max-height: 160px;
    line-height: 1.6;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .answer-input:focus {
    border-color: var(--border-active);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }

  .answer-input::placeholder { color: var(--text-muted); }
  .answer-input:disabled { opacity: 0.4; }

  .btn-send {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border: none;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s, transform 0.1s;
  }

  .btn-send:hover:not(:disabled) { opacity: 0.85; transform: scale(1.05); }
  .btn-send:active:not(:disabled) { transform: scale(0.97); }
  .btn-send:disabled { opacity: 0.3; cursor: not-allowed; }

  .btn-send svg { width: 18px; height: 18px; }

  .input-hint {
    font-size: 10px;
    color: var(--text-muted);
    margin-top: 8px;
    letter-spacing: 0.05em;
  }
`

export default function App() {
  const [apiKey, setApiKey] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const systemPrompt = `You are a senior technical interviewer conducting a real technical interview.
The candidate has applied for this role:

${jobDescription}

Interviewing rules:
- Ask one focused question at a time
- If the answer is wrong or incomplete, do NOT immediately correct them. Probe with a follow-up first.
- If a question is complex, break it into parts and ask one part at a time
- If the candidate says they don't know, give a small hint and let them try again before explaining
- After 5-6 exchanges, end the interview naturally and give honest, specific feedback on their performance
- Keep your responses concise — like a real interviewer, not a lecture
- Do not use markdown formatting, just plain text`
- 'When relevant, reference real LeetCode problems by name and number (e.g. "Two Sum - problem 1") to ground your questions in real interview practice'

  const callAPI = async (msgs) => {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: msgs
      })
    })
    const data = await response.json()
    return data.content[0].text
  }

  const startInterview = async () => {
    setStarted(true)
    setLoading(true)
    const seed = [{ role: 'user', content: 'Start the interview. Open with your first question.' }]
    const reply = await callAPI(seed)
    setMessages([...seed, { role: 'assistant', content: reply }])
    setLoading(false)
  }

  const sendMessage = async () => {
    if (!userInput.trim() || loading) return
    const newMessages = [...messages, { role: 'user', content: userInput }]
    setMessages(newMessages)
    setUserInput('')
    setLoading(true)
    const reply = await callAPI(newMessages)
    setMessages([...newMessages, { role: 'assistant', content: reply }])
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const visibleMessages = messages.filter(m => m.role !== 'user' || messages.indexOf(m) !== 0)

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {!started ? (
          <div className="landing">
            <div className="landing-glow" />
            <div className="landing-inner">
              <div className="badge">
                <div className="badge-dot" />
                AI-Powered
              </div>
              <h1>Technical<br /><span>Interview Sim</span></h1>
              <p className="subtitle">
                Paste a job description. Get grilled by an AI interviewer<br />
                that probes, follows up, and doesn't let you off easy.
              </p>

              <div className="form-group">
                <label className="form-label">Anthropic API Key</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="sk-ant-..."
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Job Description</label>
                <textarea
                  className="form-textarea"
                  placeholder="Paste the full job description here..."
                  value={jobDescription}
                  onChange={e => setJobDescription(e.target.value)}
                />
              </div>

              <button
                className="btn-primary"
                onClick={startInterview}
                disabled={!apiKey.trim() || !jobDescription.trim()}
              >
                Begin Interview
              </button>
            </div>
          </div>
        ) : (
          <div className="interview">
            <div className="interview-header">
              <div className="header-left">
                <span className="header-title">Interview Simulator</span>
                <div className="status-pill">
                  <div className="status-dot" />
                  Live
                </div>
              </div>
              <button className="btn-end" onClick={() => { setStarted(false); setMessages([]) }}>
                End Session
              </button>
            </div>

            <div className="messages">
              {visibleMessages.map((m, i) => (
                <div key={i} className="message">
                  <div className={`message-meta ${m.role === 'assistant' ? 'ai' : 'user'}`}>
                    <div className={`message-icon ${m.role === 'assistant' ? 'ai' : 'user'}`}>
                      {m.role === 'assistant' ? '◈' : '▸'}
                    </div>
                    {m.role === 'assistant' ? 'Interviewer' : 'You'}
                  </div>
                  <div className={`message-bubble ${m.role === 'assistant' ? 'ai' : 'user'}`}>
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="message">
                  <div className="message-meta ai">
                    <div className="message-icon ai">◈</div>
                    Interviewer
                  </div>
                  <div className="typing-indicator">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="input-area">
              <div className="input-wrapper">
                <textarea
                  ref={textareaRef}
                  className="answer-input"
                  placeholder="Type your answer..."
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  rows={1}
                />
                <button className="btn-send" onClick={sendMessage} disabled={loading || !userInput.trim()}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#0a0a0f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
              <p className="input-hint">Enter to send · Shift+Enter for new line</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}