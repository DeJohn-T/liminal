// components/UI.jsx — shared reusable components

import React from 'react'
import { initials, statusColor } from '../lib/utils'

// --- Avatar ---
export function Avatar({ name, size = 38 }) {
  const fontSize = size < 40 ? 13 : 16
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'var(--blue-bg)',
      color: 'var(--blue-text)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 500,
      fontSize,
      flexShrink: 0,
      letterSpacing: '0.02em',
    }}>
      {initials(name)}
    </div>
  )
}

// --- Status Badge ---
export function StatusBadge({ status }) {
  const { bg, color } = statusColor(status)
  return (
    <span style={{
      background: bg,
      color,
      fontSize: 11,
      fontWeight: 500,
      padding: '3px 9px',
      borderRadius: 'var(--radius-full)',
      letterSpacing: '0.01em',
      whiteSpace: 'nowrap',
    }}>
      {status}
    </span>
  )
}

// --- Button ---
export function Button({ children, onClick, disabled, variant = 'default', size = 'md', style = {} }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.15s',
    border: '1px solid transparent',
    borderRadius: 'var(--radius-md)',
    whiteSpace: 'nowrap',
  }
  const sizes = {
    sm: { fontSize: 12, padding: '5px 12px' },
    md: { fontSize: 13, padding: '7px 16px' },
    lg: { fontSize: 14, padding: '9px 20px' },
  }
  const variants = {
    default: {
      background: 'var(--surface)',
      color: 'var(--text-primary)',
      borderColor: 'var(--border-strong)',
    },
    primary: {
      background: 'var(--accent)',
      color: 'var(--accent-fg)',
      borderColor: 'transparent',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      borderColor: 'transparent',
    },
    danger: {
      background: 'transparent',
      color: 'var(--red-text)',
      borderColor: 'var(--red-border)',
    },
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
    >
      {children}
    </button>
  )
}

// --- Input ---
export function Input({ label, value, onChange, placeholder, type = 'text', style = {} }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>{label}</label>}
      <input
        type={type}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          background: 'var(--surface)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-md)',
          padding: '8px 12px',
          fontSize: 14,
          outline: 'none',
          transition: 'border-color 0.15s',
          ...style,
        }}
      />
    </div>
  )
}

// --- Textarea ---
export function Textarea({ label, value, onChange, placeholder, minHeight = 80 }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>{label}</label>}
      <textarea
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          minHeight,
          background: 'var(--surface)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-md)',
          padding: '8px 12px',
          fontSize: 14,
          resize: 'vertical',
          outline: 'none',
          fontFamily: 'var(--font-sans)',
          lineHeight: 1.6,
        }}
      />
    </div>
  )
}

// --- Notice ---
export function Notice({ children, variant = 'muted' }) {
  const styles = {
    muted: { background: 'var(--gray-bg)', color: 'var(--text-secondary)', border: '1px solid var(--border)' },
    blue: { background: 'var(--blue-bg)', color: 'var(--blue-text)', border: '1px solid var(--blue-border)' },
    green: { background: 'var(--green-bg)', color: 'var(--green-text)', border: '1px solid var(--green-border)' },
  }
  return (
    <div style={{ borderRadius: 'var(--radius-md)', padding: '10px 14px', fontSize: 13, lineHeight: 1.6, marginBottom: 14, ...styles[variant] }}>
      {children}
    </div>
  )
}

// --- Spinner ---
export function Spinner() {
  return (
    <span style={{
      display: 'inline-block',
      width: 13,
      height: 13,
      border: '2px solid var(--border-strong)',
      borderTopColor: 'var(--text-primary)',
      borderRadius: '50%',
      animation: 'spin 0.65s linear infinite',
      verticalAlign: 'middle',
      marginRight: 6,
    }} />
  )
}

// --- Tabs ---
export function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '1.25rem' }}>
      {tabs.map(t => (
        <button
          key={t}
          onClick={() => onChange(t)}
          style={{
            fontSize: 12,
            fontWeight: 500,
            padding: '8px 14px',
            background: 'transparent',
            border: 'none',
            borderBottom: active === t ? '2px solid var(--text-primary)' : '2px solid transparent',
            color: active === t ? 'var(--text-primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            marginBottom: -1,
            transition: 'color 0.15s',
          }}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

// --- Pill chip ---
export function Chip({ children }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      background: 'var(--surface-alt)',
      color: 'var(--text-secondary)',
      fontSize: 12,
      padding: '4px 10px',
      borderRadius: 'var(--radius-full)',
      margin: '2px 3px',
    }}>
      {children}
    </span>
  )
}

// --- Section label ---
export function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
      {children}
    </div>
  )
}

// --- AI output box ---
export function AIOutput({ children }) {
  return (
    <div style={{
      background: 'var(--surface-alt)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '1rem 1.1rem',
      fontSize: 13,
      lineHeight: 1.75,
      color: 'var(--text-primary)',
      whiteSpace: 'pre-wrap',
      marginTop: 14,
    }}>
      {children}
    </div>
  )
}

// --- Keyframe injection ---
export function GlobalStyles() {
  return (
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      .fade-in { animation: fadeIn 0.2s ease forwards; }
      input:focus, textarea:focus, select:focus {
        border-color: var(--text-tertiary) !important;
        box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
      }
      button:active:not(:disabled) { transform: scale(0.98); }
    `}</style>
  )
}
