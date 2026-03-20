// lib/storage.js
// Local storage wrapper for persisting contacts.
// Swap this out for a real DB (Supabase, Firebase, etc.) when you're ready to scale.

const KEY = 'networking_os_contacts_v1'

export function loadContacts() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveContacts(contacts) {
  try {
    localStorage.setItem(KEY, JSON.stringify(contacts))
  } catch (e) {
    console.error('Failed to save contacts:', e)
  }
}
