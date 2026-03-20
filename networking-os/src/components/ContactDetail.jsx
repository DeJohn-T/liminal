// components/ContactDetail.jsx

import React, { useState } from 'react'
import { Avatar, StatusBadge, Button, Input, Textarea, Tabs, Notice, Spinner, AIOutput, SectionLabel, Chip } from './UI'
import { parseLinkedIn, generateBrief, generateFollowUp } from '../lib/ai'
import { addDays } from '../lib/utils'

const STATUSES = ['new', 'scheduled', 'completed', 'followed up']

export function ContactDetail({ contact, onUpdate, onDelete, onClose, onSchedule }) {
  const [c, setC] = useState(contact)
  const [tab, setTab] = useState('Overview')
  const [liRaw, setLiRaw] = useState(contact.linkedinRaw || '')
  const [parsing, setParsing] = useState(false)
  const [parsed, setParsed] = useState(contact.parsedProfile || null)
  const [briefLoading, setBriefLoading] = useState(false)
  const [brief, setBrief] = useState(contact.brief || '')
  const [fuLoading, setFuLoading] = useState(false)
  const [fuText, setFuText] = useState(contact.followUpText || '')
  const [chatTime, setChatTime] = useState('10:00')
  const [calMsg, setCalMsg] = useState('')
  const [calLoading, setCalLoading] = useState(false)

  const upd = (k, v) => setC(p => ({ ...p, [k]: v }))

  function saveAll(overrides = {}) {
    const updated = { ...c, linkedinRaw: liRaw, parsedProfile: parsed, brief, followUpText: fuText, ...overrides }
    onUpdate(updated)
  }

  // --- LinkedIn parsing ---
  async function handleParseLinkedIn() {
    if (!liRaw.trim()) return
    setParsing(true)
    try {
      const raw = await parseLinkedIn(liRaw)
      const p = JSON.parse(raw.replace(/```json|```/g, '').trim())
      setParsed(p)
      const updated = { ...c, linkedinRaw: liRaw, parsedProfile: p }
      setC(updated)
      onUpdate(updated)
    } catch {
      setParsed({ error: true })
    }
    setParsing(false)
  }

  // --- Prep brief ---
  async function handleGenerateBrief() {
    setBriefLoading(true)
    try {
      const text = await generateBrief(c, parsed)
      setBrief(text)
      const updated = { ...c, linkedinRaw: liRaw, parsedProfile: parsed, brief: text, followUpText: fuText }
      setC(updated)
      onUpdate(updated)
    } catch {
      setBrief('Something went wrong. Try again.')
    }
    setBriefLoading(false)
  }

  // --- Follow-up ---
  async function handleGenerateFollowUp() {
    setFuLoading(true)
    try {
      const text = await generateFollowUp(c)
      setFuText(text)
      const updated = { ...c, linkedinRaw: liRaw, parsedProfile: parsed, brief, followUpText: text }
      setC(updated)
      onUpdate(updated)
    } catch {
      setFuText('Something went wrong. Try again.')
    }
    setFuLoading(false)
  }

  // --- Calendar scheduling ---
  // NOTE: In this standalone version, calendar scheduling calls your backend
  // or Google Calendar API directly. The onSchedule prop handles this.
  async function handleSchedule() {
    if (!c.chatDate) return
    setCalLoading(true)
    try {
      await onSchedule({
        contact: c,
        chatTime,
        followUpDate: addDays(c.chatDate, 1),
        checkInDate: addDays(c.chatDate, 30),
      })
      setCalMsg('3 calendar events created: chat, next-day follow-up reminder, 30-day check-in.')
      const updated = { ...c, status: 'scheduled' }
      setC(updated)
      onUpdate(updated)
    } catch {
      setCalMsg('Could not schedule. Check your calendar connection and try again.')
    }
    setCalLoading(false)
  }

  return (
    <div style={{
      background: 'var(--surface)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-strong)',
      padding: '1.5rem',
      width: '100%',
      maxWidth: 560,
      maxHeight: '85vh',
      overflowY: 'auto',
      boxShadow: 'var(--shadow-lg)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '1.25rem' }}>
        <Avatar name={c.name} size={48} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 500 }}>{c.name}</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3 }}>
            {[c.role, c.company].filter(Boolean).join(' · ') || 'No role set'}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', fontSize: 16, lineHeight: 1 }}>✕</button>
          <select
            value={c.status}
            onChange={e => upd('status', e.target.value)}
            style={{
              fontSize: 12, padding: '4px 8px', borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-strong)', background: 'var(--surface)',
              color: 'var(--text-primary)', cursor: 'pointer',
            }}
          >
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <Tabs
        tabs={['Overview', 'LinkedIn', 'Prep Brief', 'Follow-up']}
        active={tab}
        onChange={setTab}
      />

      {/* OVERVIEW */}
      {tab === 'Overview' && (
        <div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
            <div style={{ flex: 1, minWidth: 130 }}>
              <Input label="Chat date" type="date" value={c.chatDate} onChange={v => upd('chatDate', v)} />
            </div>
            <div style={{ flex: 1, minWidth: 130 }}>
              <Input label="Time" type="time" value={chatTime} onChange={setChatTime} />
            </div>
          </div>
          <Button
            variant="primary"
            style={{ width: '100%', justifyContent: 'center', marginBottom: 4 }}
            onClick={handleSchedule}
            disabled={!c.chatDate || calLoading}
          >
            {calLoading ? <><Spinner />Scheduling...</> : '📅 Schedule chat + set reminders'}
          </Button>
          {c.chatDate && !calMsg && (
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textAlign: 'center', marginBottom: 14, marginTop: 4 }}>
              Creates coffee chat · next-day follow-up reminder · 30-day check-in
            </div>
          )}
          {calMsg && <Notice variant="green" style={{ marginTop: 8 }}>{calMsg}</Notice>}
          <div style={{ borderTop: '1px solid var(--border)', margin: '1rem 0' }} />
          <Textarea
            label="Notes from chat"
            value={c.notes}
            onChange={v => upd('notes', v)}
            placeholder="Key takeaways, what they mentioned, action items..."
            minHeight={90}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <Button variant="danger" size="sm" onClick={() => onDelete(c.id)}>Delete contact</Button>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button size="sm" onClick={onClose}>Close</Button>
              <Button variant="primary" size="sm" onClick={() => saveAll()}>Save</Button>
            </div>
          </div>
        </div>
      )}

      {/* LINKEDIN */}
      {tab === 'LinkedIn' && (
        <div>
          <Notice variant="blue">
            Go to their LinkedIn → select all text on the page (Ctrl+A / Cmd+A) → copy and paste it below. The AI will extract what matters automatically.
          </Notice>
          <Textarea
            label="Paste LinkedIn profile text"
            value={liRaw}
            onChange={setLiRaw}
            placeholder="Paste their full LinkedIn page text here — messy is fine..."
            minHeight={110}
          />
          <Button variant="primary" size="sm" onClick={handleParseLinkedIn} disabled={parsing || !liRaw.trim()}>
            {parsing ? <><Spinner />Parsing...</> : 'Parse profile ↗'}
          </Button>

          {parsed && !parsed.error && (
            <div style={{ marginTop: 20 }}>
              <div style={{ borderTop: '1px solid var(--border)', margin: '14px 0' }} />
              <div style={{ fontWeight: 500, marginBottom: 14 }}>{c.name}'s profile</div>
              {parsed.summary && (
                <div style={{ fontSize: 13, lineHeight: 1.75, color: 'var(--text-primary)', marginBottom: 14 }}>
                  {parsed.summary}
                </div>
              )}
              {parsed.companies?.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <SectionLabel>Experience</SectionLabel>
                  <div>{parsed.companies.map((x, i) => <Chip key={i}>🏢 {x}</Chip>)}</div>
                </div>
              )}
              {parsed.education?.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <SectionLabel>Education</SectionLabel>
                  <div>{parsed.education.map((x, i) => <Chip key={i}>🎓 {x}</Chip>)}</div>
                </div>
              )}
              {parsed.skills?.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <SectionLabel>Skills</SectionLabel>
                  <div>{parsed.skills.map((x, i) => <Chip key={i}>{x}</Chip>)}</div>
                </div>
              )}
              {parsed.interests?.length > 0 && (
                <div style={{ marginBottom: 4 }}>
                  <SectionLabel>Inferred interests</SectionLabel>
                  <div>{parsed.interests.map((x, i) => <Chip key={i}>✦ {x}</Chip>)}</div>
                </div>
              )}
            </div>
          )}
          {parsed?.error && (
            <Notice variant="muted" style={{ marginTop: 10 }}>
              Couldn't parse that. Try pasting just the About, Experience, and Education sections.
            </Notice>
          )}
        </div>
      )}

      {/* PREP BRIEF */}
      {tab === 'Prep Brief' && (
        <div>
          <Notice variant="muted">
            {parsed && !parsed.error
              ? 'Using their parsed LinkedIn profile for a tailored brief.'
              : 'Parse their LinkedIn first for best results, or generate from name and role only.'}
          </Notice>
          <Button variant="primary" size="sm" onClick={handleGenerateBrief} disabled={briefLoading}>
            {briefLoading ? <><Spinner />Generating...</> : brief ? 'Regenerate brief ↗' : 'Generate prep brief ↗'}
          </Button>
          {brief && <AIOutput>{brief}</AIOutput>}
        </div>
      )}

      {/* FOLLOW-UP */}
      {tab === 'Follow-up' && (
        <div>
          <Notice variant="muted">
            Add notes from your chat in Overview, then generate a message that sounds like you.
          </Notice>
          <Button variant="primary" size="sm" onClick={handleGenerateFollowUp} disabled={fuLoading}>
            {fuLoading ? <><Spinner />Writing...</> : fuText ? 'Regenerate ↗' : 'Write follow-up message ↗'}
          </Button>
          {fuText && (
            <>
              <textarea
                value={fuText}
                onChange={e => setFuText(e.target.value)}
                style={{
                  width: '100%', minHeight: 110, marginTop: 14,
                  background: 'var(--surface)', color: 'var(--text-primary)',
                  border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)',
                  padding: '8px 12px', fontSize: 13, resize: 'vertical',
                  fontFamily: 'var(--font-sans)', lineHeight: 1.6, outline: 'none',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                <Button variant="primary" size="sm" onClick={() => saveAll({ followUpText: fuText })}>Save</Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
