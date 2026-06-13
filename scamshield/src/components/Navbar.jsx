import { Link, useNavigate, useLocation } from 'react-router-dom'

import { useState } from 'react'

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"
      fill="none" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
)
const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
)
const GlobeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
)

export default function Navbar({ lang, onLangToggle }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [notifOpen, setNotifOpen] = useState(false)

  const navLinks = [
    { path: '/dashboard',    label: 'Dashboard' },
    { path: '/',             label: 'Analyzer' },
    { path: '/encyclopedia', label: 'Encyclopedia' },
  ]

  return (
    <nav className="nav-root">
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '0', height: '100%' }}>

        {/* ── Logo ── */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginRight: '40px', flexShrink: 0 }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #00D084, #06B6D4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ShieldIcon />
          </div>
          <div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '15px', color: 'white', lineHeight: 1 }}>
              Cyber<span style={{ color: '#00D084' }}>Guard</span> <span style={{ color: '#06B6D4' }}>AI</span>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-faint)', lineHeight: 1, marginTop: '2px', letterSpacing: '0.05em' }}>
              THREAT INTELLIGENCE
            </div>
          </div>
        </Link>

        {/* ── Center Nav Links ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1 }}>
          {navLinks.map(link => {
            const active = location.pathname === link.path
            return (
              <Link key={link.path} to={link.path} style={{
                padding: '8px 16px', borderRadius: '9px', fontSize: '13.5px', fontWeight: active ? 600 : 500,
                textDecoration: 'none', transition: 'all 0.15s ease',
                color: active ? '#00D084' : 'var(--text-muted)',
                background: active ? 'rgba(0,208,132,0.08)' : 'transparent',
                borderBottom: active ? '2px solid #00D084' : '2px solid transparent',
              }}>
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* ── Right Controls ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

          {/* Language */}
          <button id="lang-toggle-btn" onClick={onLangToggle} className="btn-ghost"
            style={{ padding: '8px 12px', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
            <GlobeIcon/>
            <span className="mobile-hide">{lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}</span>
          </button>

          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button className="btn-ghost" style={{ padding: '9px', position: 'relative' }}
              onClick={() => setNotifOpen(o => !o)}>
              <BellIcon/>
              <span style={{
                position: 'absolute', top: '7px', right: '7px', width: '7px', height: '7px',
                borderRadius: '50%', background: '#EF4444',
                border: '1.5px solid #020817',
              }}/>
            </button>
            {notifOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: '300px',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: '14px', padding: '16px', zIndex: 200,
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'white', marginBottom: '12px' }}>Notifications</div>
                {[
                  { icon: '🚨', msg: 'New phishing campaign detected', time: '2m ago', type: 'danger' },
                  { icon: '⚠️', msg: 'High-risk URL flagged', time: '15m ago', type: 'warning' },
                  { icon: '✅', msg: 'Threat scan complete', time: '1h ago', type: 'success' },
                ].map((n, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px', borderRadius: '8px', marginBottom: '4px', background: 'rgba(255,255,255,0.03)' }}>
                    <span style={{ fontSize: '16px', marginTop: '1px' }}>{n.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '2px' }}>{n.msg}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-faint)' }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Settings */}
          <button className="btn-ghost" style={{ padding: '9px' }}>
            <SettingsIcon/>
          </button>

          {/* Divider */}
          <div style={{ width: '1px', height: '28px', background: 'var(--border)', margin: '0 4px' }}/>

          {/* User Sign In / Out */}
          {localStorage.getItem('isAuthenticated') === 'true' ? (
            <button onClick={() => { localStorage.removeItem('isAuthenticated'); navigate('/login'); }} style={{
              fontSize: '13px', padding: '7px 16px', borderRadius: '9px', fontWeight: 600,
              background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer'
            }}>
              Sign Out
            </button>
          ) : (
            <Link to="/login" style={{
              fontSize: '13px', padding: '7px 16px', borderRadius: '9px', fontWeight: 600,
              background: 'linear-gradient(135deg, #00D084, #06B6D4)', color: '#020817', textDecoration: 'none',
            }}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
