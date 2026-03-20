// components/ContactList.jsx

import React from 'react'
import { Avatar, StatusBadge } from './UI'
import { formatDate } from '../lib/utils'

export function ContactList({ contacts, onSelect }) {
  if (contacts.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
        <div style={{ fontSize: 28, marginBottom: 12, opacity: 0.35 }}>☕</div>
        <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>No contacts yet</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Add someone you want to connect with —<br />
          a recruiter, mentor, or professional you admire.
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {contacts.map(c => (
        <div
          key={c.id}
          onClick={() => onSelect(c)}
          className="fade-in"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '0.9rem 1.1rem',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--border-strong)'
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <Avatar name={c.name} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 500, fontSize: 14, lineHeight: 1.3 }}>{c.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {[c.role, c.company].filter(Boolean).join(' · ') || 'No role set'}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
            <StatusBadge status={c.status} />
            {c.chatDate && (
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{formatDate(c.chatDate)}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export function UpcomingList({ contacts, onSelect }) {
  const upcoming = contacts
    .filter(x => x.chatDate)
    .sort((a, b) => new Date(a.chatDate) - new Date(b.chatDate))

  if (upcoming.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
        <div style={{ fontSize: 28, marginBottom: 12, opacity: 0.35 }}>📅</div>
        <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>Nothing scheduled</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          Set a chat date on any contact to see them here.
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {upcoming.map(c => {
        const dt = new Date(c.chatDate + 'T12:00:00')
        const isPast = dt < new Date()
        return (
          <div
            key={c.id}
            onClick={() => onSelect(c)}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.9rem 1.1rem',
              display: 'flex',
              gap: 14,
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.15s',
              opacity: isPast ? 0.65 : 1,
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-strong)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{ width: 40, textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 20, fontWeight: 500, lineHeight: 1, color: isPast ? 'var(--text-tertiary)' : 'var(--text-primary)' }}>
                {dt.getDate()}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {dt.toLocaleString('en-US', { month: 'short' })}
              </div>
            </div>
            <div style={{ width: 1, height: 34, background: 'var(--border)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                {[c.role, c.company].filter(Boolean).join(' · ')}
              </div>
            </div>
            <StatusBadge status={c.status} />
          </div>
        )
      })}
    </div>
  )
}
