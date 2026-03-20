// App.jsx — root component

import React, { useState, useEffect } from 'react'
import { ContactList, UpcomingList } from './components/ContactList'
import { ContactDetail } from './components/ContactDetail'
import { Button, GlobalStyles } from './components/UI'
import { loadContacts, saveContacts } from './lib/storage'

const STATUSES = ['new', 'scheduled', 'completed', 'followed up']

function AddModal({ onAdd, onClose }) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [company, setCompany] = useState('')

  const inputStyle = {
    width: '100%',
    background: '#fff',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-strong)',
    borderRadius: 'var(--radius-md)',
    padding: '8px 12px',
    fontSize: 14,
    outline: 'none',
    fontFamily: 'var(--font-sans)',
    marginBottom: 14,
  }

  return (
    <div style={{
      background: 'var(--surface)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-strong)',
      padding: '1.5rem',
      width: '100%',
      maxWidth: 440,
      boxShadow: 'var(--shadow-lg)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: 16, fontWeight: 500 }}>New contact</div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', fontSize: 16 }}>✕</button>
      </div>

      <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>Full name</label>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Alex Chen" autoFocus style={inputStyle} />

      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>Role</label>
          <input value={role} onChange={e => setRole(e.target.value)} placeholder="Senior SWE" style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>Company</label>
          <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Amazon" style={inputStyle} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
        <Button size="sm" onClick={onClose}>Cancel</Button>
        <Button variant="primary" size="sm" onClick={() => { if (name.trim()) onAdd({ name, role, company }) }} disabled={!name.trim()}>
          Add contact
        </Button>
      </div>
    </div>
  )
}

export default function App() {
  const [contacts, setContacts] = useState([])
  const [tab, setTab] = useState('contacts')
  const [showAdd, setShowAdd] = useState(false)
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    setContacts(loadContacts())
  }, [])

  function persist(updated) {
    setContacts(updated)
    saveContacts(updated)
  }

  function addContact(c) {
    persist([{ ...c, id: Date.now(), status: 'new', notes: '', chatDate: '', linkedinRaw: '', parsedProfile: null, brief: '', followUpText: '' }, ...contacts])
    setShowAdd(false)
  }

  function updateContact(c) {
    persist(contacts.map(x => x.id === c.id ? c : x))
    setDetail(c)
  }

  function deleteContact(id) {
    persist(contacts.filter(x => x.id !== id))
    setDetail(null)
  }

  // Calendar scheduling handler
  // In production: call Google Calendar API from your backend
  async function handleSchedule({ contact, chatTime, followUpDate, checkInDate }) {
    const [h, m] = chatTime.split(':').map(Number)
    const endH = String(h + 1).padStart(2, '0')
    const endTime = `${endH}:${String(m).padStart(2, '0')}`

    // TODO: Replace with your backend endpoint that calls Google Calendar API
    // Example backend call:
    // await fetch('/api/schedule', {
    //   method: 'POST',
    //   body: JSON.stringify({ contact, chatTime, endTime, followUpDate, checkInDate })
    // })

    // For now, opens Google Calendar in a new tab with pre-filled event
    const title = encodeURIComponent(`Coffee Chat · ${contact.name}`)
    const details = encodeURIComponent(`${contact.role || ''}${contact.company ? ' at ' + contact.company : ''}`)
    const dateStr = contact.chatDate.replace(/-/g, '')
    const startFull = `${dateStr}T${chatTime.replace(':', '')}00`
    const endFull = `${dateStr}T${endTime.replace(':', '')}00`
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startFull}/${endFull}&details=${details}`, '_blank')

    // Then remind user to also add follow-up and check-in events
    console.log('Follow-up date:', followUpDate)
    console.log('30-day check-in:', checkInDate)
  }

  const stats = {
    total: contacts.length,
    scheduled: contacts.filter(x => x.status === 'scheduled').length,
    completed: contacts.filter(x => x.status === 'completed').length,
    followedUp: contacts.filter(x => x.status === 'followed up').length,
  }

  const upcoming = contacts.filter(x => x.chatDate)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <GlobalStyles />

      {/* Top nav */}
      <div style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>☕</span>
          <span style={{ fontWeight: 500, fontSize: 15, letterSpacing: '-0.01em' }}>Networking OS</span>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowAdd(true)}>+ Add contact</Button>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: '2rem' }}>
          {[['Contacts', stats.total], ['Scheduled', stats.scheduled], ['Completed', stats.completed], ['Followed up', stats.followedUp]].map(([l, v]) => (
            <div key={l} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1rem',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 24, fontWeight: 500, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4, letterSpacing: '0.02em' }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem' }}>
          {['contacts', 'upcoming'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                fontSize: 13,
                fontWeight: 500,
                padding: '9px 16px',
                background: 'transparent',
                border: 'none',
                borderBottom: tab === t ? '2px solid var(--text-primary)' : '2px solid transparent',
                color: tab === t ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                marginBottom: -1,
                transition: 'color 0.15s',
              }}
            >
              {t === 'contacts' ? 'Contacts' : `Upcoming${upcoming.length > 0 ? ` (${upcoming.length})` : ''}`}
            </button>
          ))}
        </div>

        {tab === 'contacts' && <ContactList contacts={contacts} onSelect={setDetail} />}
        {tab === 'upcoming' && <UpcomingList contacts={contacts} onSelect={setDetail} />}
      </div>

      {/* Modals */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '6rem 1rem 1rem', zIndex: 100, backdropFilter: 'blur(2px)' }}
          onClick={e => { if (e.target === e.currentTarget) setShowAdd(false) }}>
          <AddModal onAdd={addContact} onClose={() => setShowAdd(false)} />
        </div>
      )}

      {detail && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '3rem 1rem 1rem', zIndex: 100, backdropFilter: 'blur(2px)', overflowY: 'auto' }}
          onClick={e => { if (e.target === e.currentTarget) setDetail(null) }}>
          <ContactDetail
            contact={detail}
            onUpdate={updateContact}
            onDelete={deleteContact}
            onClose={() => setDetail(null)}
            onSchedule={handleSchedule}
          />
        </div>
      )}
    </div>
  )
}
