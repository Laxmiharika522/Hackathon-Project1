import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

/* ─── Inline SVG Hero Illustration ─── */
function CyberIllustration() {
  return (
    <svg viewBox="0 0 520 560" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[520px]">
      <defs>
        <radialGradient id="glowCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#00E676" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#00E676" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="glowBlue" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#00BCD4" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#00BCD4" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"  stopColor="#00E676"/>
          <stop offset="100%" stopColor="#00BCD4"/>
        </linearGradient>
        <linearGradient id="shieldBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"  stopColor="#0B1220"/>
          <stop offset="100%" stopColor="#0d1f30"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Background glow blobs */}
      <ellipse cx="260" cy="280" rx="200" ry="180" fill="url(#glowCenter)" />
      <ellipse cx="380" cy="160" rx="120" ry="100" fill="url(#glowBlue)" />

      {/* Grid dots pattern */}
      {[...Array(7)].map((_, row) =>
        [...Array(7)].map((_, col) => (
          <circle key={`${row}-${col}`}
            cx={80 + col * 60} cy={60 + row * 70}
            r="1.5"
            fill={`rgba(0,230,118,${0.08 + (row + col) % 3 * 0.06})`}
          />
        ))
      )}

      {/* Circular orbit rings */}
      <circle cx="260" cy="280" r="150" stroke="rgba(0,230,118,0.08)" strokeWidth="1" strokeDasharray="6 8"/>
      <circle cx="260" cy="280" r="115" stroke="rgba(0,188,212,0.10)" strokeWidth="1" strokeDasharray="4 10"/>
      <circle cx="260" cy="280" r="80"  stroke="rgba(0,230,118,0.12)" strokeWidth="1.5" strokeDasharray="3 6"/>

      {/* Orbit node: top */}
      <circle cx="260" cy="130" r="8" fill="#0B1220" stroke="#00E676" strokeWidth="1.5" filter="url(#glow)"/>
      <circle cx="260" cy="130" r="3.5" fill="#00E676"/>
      {/* Orbit node: right */}
      <circle cx="410" cy="280" r="8" fill="#0B1220" stroke="#00BCD4" strokeWidth="1.5" filter="url(#glow)"/>
      <circle cx="410" cy="280" r="3.5" fill="#00BCD4"/>
      {/* Orbit node: bottom-left */}
      <circle cx="147" cy="355" r="8" fill="#0B1220" stroke="#00E676" strokeWidth="1.5" filter="url(#glow)"/>
      <circle cx="147" cy="355" r="3.5" fill="#00E676"/>
      {/* Orbit node: bottom-right */}
      <circle cx="362" cy="393" r="6" fill="#0B1220" stroke="#00BCD4" strokeWidth="1.5"/>
      <circle cx="362" cy="393" r="2.5" fill="#00BCD4"/>

      {/* Connection lines from center to nodes */}
      <line x1="260" y1="200" x2="260" y2="138" stroke="rgba(0,230,118,0.25)" strokeWidth="1" strokeDasharray="3 4"/>
      <line x1="330" y1="250" x2="402" y2="280" stroke="rgba(0,188,212,0.25)" strokeWidth="1" strokeDasharray="3 4"/>
      <line x1="200" y1="330" x2="155" y2="347" stroke="rgba(0,230,118,0.2)"  strokeWidth="1" strokeDasharray="3 4"/>
      <line x1="310" y1="340" x2="356" y2="387" stroke="rgba(0,188,212,0.2)"  strokeWidth="1" strokeDasharray="3 4"/>

      {/* Small satellite nodes */}
      <circle cx="160" cy="175" r="5" fill="#0B1220" stroke="rgba(0,230,118,0.5)" strokeWidth="1.2"/>
      <circle cx="160" cy="175" r="2" fill="rgba(0,230,118,0.7)"/>
      <circle cx="370" cy="160" r="5" fill="#0B1220" stroke="rgba(0,188,212,0.5)" strokeWidth="1.2"/>
      <circle cx="370" cy="160" r="2" fill="rgba(0,188,212,0.7)"/>
      <circle cx="430" cy="370" r="5" fill="#0B1220" stroke="rgba(0,230,118,0.4)" strokeWidth="1.2"/>
      <circle cx="430" cy="370" r="2" fill="rgba(0,230,118,0.6)"/>
      <circle cx="100" cy="310" r="4" fill="#0B1220" stroke="rgba(0,188,212,0.4)" strokeWidth="1.2"/>
      <circle cx="100" cy="310" r="1.8" fill="rgba(0,188,212,0.6)"/>

      {/* Circuit lines */}
      <path d="M160 175 L 120 175 L 120 310 L 100 310" stroke="rgba(0,188,212,0.15)" strokeWidth="1" fill="none"/>
      <path d="M370 160 L 430 160 L 430 370"           stroke="rgba(0,230,118,0.15)" strokeWidth="1" fill="none"/>

      {/* ── Central Shield ── */}
      {/* Shadow/glow */}
      <ellipse cx="260" cy="295" rx="70" ry="12" fill="rgba(0,230,118,0.12)" filter="url(#softGlow)"/>

      {/* Shield body */}
      <path d="M260 170 L320 195 L320 265 Q320 315 260 345 Q200 315 200 265 L200 195 Z"
        fill="url(#shieldBody)" stroke="url(#shieldGrad)" strokeWidth="2" filter="url(#softGlow)"/>

      {/* Shield inner gradient fill */}
      <path d="M260 178 L314 201 L314 264 Q314 309 260 337 Q206 309 206 264 L206 201 Z"
        fill="rgba(0,230,118,0.04)" stroke="rgba(0,230,118,0.15)" strokeWidth="1"/>

      {/* Lock body */}
      <rect x="244" y="253" width="32" height="26" rx="5" fill="url(#shieldGrad)" opacity="0.9"/>
      {/* Lock shackle */}
      <path d="M251 253 L251 244 Q251 234 260 234 Q269 234 269 244 L269 253"
        stroke="url(#shieldGrad)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      {/* Keyhole */}
      <circle cx="260" cy="263" r="4.5" fill="#0B1220"/>
      <rect x="258" y="263" width="4" height="8" rx="1.5" fill="#0B1220"/>

      {/* Shield corner accents */}
      <circle cx="260" cy="170" r="4" fill="url(#shieldGrad)" filter="url(#glow)"/>
      <circle cx="320" cy="195" r="3" fill="rgba(0,230,118,0.6)"/>
      <circle cx="200" cy="195" r="3" fill="rgba(0,188,212,0.6)"/>

      {/* ── Threat Detection Cards ── */}
      {/* Card: top-left */}
      <rect x="52" y="190" width="115" height="56" rx="10"
        fill="rgba(11,18,32,0.9)" stroke="rgba(0,230,118,0.2)" strokeWidth="1"/>
      <circle cx="72" cy="210" r="7" fill="rgba(0,230,118,0.12)" stroke="rgba(0,230,118,0.4)" strokeWidth="1"/>
      <text x="72" y="214" textAnchor="middle" fontSize="8" fill="#00E676">✓</text>
      <text x="86" y="209" fontSize="8.5" fill="white" fontFamily="Inter,sans-serif" fontWeight="600">Phishing</text>
      <text x="86" y="222" fontSize="7.5" fill="#94A3B8" fontFamily="Inter,sans-serif">Blocked</text>
      <rect x="86" y="228" width="32" height="4" rx="2" fill="rgba(0,230,118,0.15)"/>
      <rect x="86" y="228" width="28" height="4" rx="2" fill="#00E676"/>

      {/* Card: top-right */}
      <rect x="353" y="190" width="120" height="56" rx="10"
        fill="rgba(11,18,32,0.9)" stroke="rgba(0,188,212,0.2)" strokeWidth="1"/>
      <circle cx="373" cy="210" r="7" fill="rgba(0,188,212,0.12)" stroke="rgba(0,188,212,0.4)" strokeWidth="1"/>
      <text x="373" y="214" textAnchor="middle" fontSize="8" fill="#00BCD4">🔍</text>
      <text x="387" y="209" fontSize="8.5" fill="white" fontFamily="Inter,sans-serif" fontWeight="600">AI Scan</text>
      <text x="387" y="222" fontSize="7.5" fill="#94A3B8" fontFamily="Inter,sans-serif">Active</text>
      <circle cx="444" cy="210" r="5" fill="rgba(0,230,118,0.2)"/>
      <circle cx="444" cy="210" r="2.5" fill="#00E676"/>

      {/* Card: bottom */}
      <rect x="165" y="380" width="190" height="58" rx="10"
        fill="rgba(11,18,32,0.9)" stroke="rgba(0,230,118,0.15)" strokeWidth="1"/>
      <text x="185" y="403" fontSize="8.5" fill="#94A3B8" fontFamily="Inter,sans-serif">Threats Detected Today</text>
      <text x="185" y="423" fontSize="22" fill="white" fontFamily="Inter,sans-serif" fontWeight="700">2,841</text>
      <text x="310" y="423" fontSize="8" fill="#00E676" fontFamily="Inter,sans-serif">↑ 99.7% blocked</text>

      {/* Small alert badge: right */}
      <rect x="420" y="290" width="82" height="38" rx="8"
        fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.25)" strokeWidth="1"/>
      <circle cx="434" cy="305" r="4.5" fill="rgba(239,68,68,0.2)"/>
      <circle cx="434" cy="305" r="2" fill="#EF4444"/>
      <text x="444" y="303" fontSize="7.5" fill="white" fontFamily="Inter,sans-serif" fontWeight="600">Threat</text>
      <text x="444" y="315" fontSize="7" fill="#94A3B8" fontFamily="Inter,sans-serif">Neutralized</text>

      {/* Small badge: left */}
      <rect x="18" y="290" width="82" height="38" rx="8"
        fill="rgba(0,230,118,0.06)" stroke="rgba(0,230,118,0.2)" strokeWidth="1"/>
      <circle cx="32" cy="305" r="4.5" fill="rgba(0,230,118,0.15)"/>
      <circle cx="32" cy="305" r="2" fill="#00E676"/>
      <text x="42" y="303" fontSize="7.5" fill="white" fontFamily="Inter,sans-serif" fontWeight="600">Shield</text>
      <text x="42" y="315" fontSize="7" fill="#94A3B8" fontFamily="Inter,sans-serif">Online</text>
    </svg>
  )
}

/* ─── Google SVG Icon ─── */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

/* ─── GitHub SVG Icon ─── */
const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const { error } = signIn(email, password)
    if (error) setError(error)
    else navigate('/')
    setLoading(false)
  }

  return (
    <div className="auth-bg min-h-screen flex items-stretch">

      {/* ══════════════════════════════════════════
          LEFT  —  Hero / Illustration
      ══════════════════════════════════════════ */}
      <div className="hidden lg:flex flex-col justify-between flex-1 relative overflow-hidden px-16 py-14"
        style={{ background: 'linear-gradient(160deg, #0d1a2e 0%, #0B1220 60%, #091018 100%)' }}>

        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,230,118,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,118,0.035) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}/>

        {/* Brand top-left */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #00E676, #00BCD4)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"
                fill="#0B1220" stroke="#0B1220" strokeWidth="0.5"/>
              <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"
                fill="none" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '17px', color: 'white', letterSpacing: '0.01em' }}>
            Cyber<span style={{ color: '#00E676' }}>Guard</span>
            <span style={{ color: '#00BCD4', fontWeight: 600 }}> AI</span>
          </span>
        </div>

        {/* Center: Illustration + Headline */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-full max-w-[440px] mx-auto">
            <CyberIllustration />
          </div>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '28px', color: 'white', lineHeight: 1.3, marginTop: '24px' }}>
            Protect Yourself From<br/>
            <span style={{ background: 'linear-gradient(90deg, #00E676, #00BCD4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Digital Scams
            </span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: 1.6, marginTop: '12px', maxWidth: '360px' }}>
            AI-powered detection for phishing, fraud, malicious links, fake messages, and online threats.
          </p>
        </div>

        {/* Bottom stats row */}
        <div className="relative z-10 flex items-center gap-8">
          {[
            { val: '2M+', label: 'Threats Blocked' },
            { val: '99.7%', label: 'Detection Rate' },
            { val: '< 1s', label: 'Response Time' },
          ].map(s => (
            <div key={s.val}>
              <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px', color: '#00E676' }}>{s.val}</div>
              <div style={{ color: '#94A3B8', fontSize: '12px', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
          <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.08)', margin: '0 4px' }}/>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: '#00E676', boxShadow: '0 0 6px #00E676' }}/>
            <span style={{ color: '#94A3B8', fontSize: '12px' }}>All systems operational</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT  —  Login Form
      ══════════════════════════════════════════ */}
      <div className="flex items-center justify-center w-full lg:w-[480px] xl:w-[520px] flex-shrink-0 px-6 py-12"
        style={{ background: '#0d1525', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full"
          style={{ maxWidth: '420px' }}
        >
          {/* Mobile brand */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #00E676, #00BCD4)' }}>
              <span style={{ fontSize: '14px' }}>🔒</span>
            </div>
            <span style={{ fontFamily: 'Poppins', fontWeight: 700, color: 'white' }}>
              Cyber<span style={{ color: '#00E676' }}>Guard</span> <span style={{ color: '#00BCD4' }}>AI</span>
            </span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '26px', color: 'white', marginBottom: '6px' }}>
              Welcome back
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '14px' }}>
              Sign in to your CyberGuard AI account
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: '10px',
                padding: '12px 16px',
                marginBottom: '20px',
                fontSize: '13px',
                color: '#FCA5A5',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
              <span>⚠</span> {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#CBD5E1', marginBottom: '8px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                  color: '#64748B', fontSize: '16px', pointerEvents: 'none',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="input-glow"
                  style={{
                    width: '100%',
                    height: '52px',
                    paddingLeft: '44px',
                    paddingRight: '16px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '14px',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#CBD5E1' }}>Password</label>
                <a href="#" style={{ fontSize: '12px', color: '#00E676', textDecoration: 'none', fontWeight: 500 }}
                  onMouseEnter={e => e.target.style.color = '#00BCD4'}
                  onMouseLeave={e => e.target.style.color = '#00E676'}>
                  Forgot password?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                  color: '#64748B', pointerEvents: 'none',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                </span>
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="input-glow"
                  style={{
                    width: '100%',
                    height: '52px',
                    paddingLeft: '44px',
                    paddingRight: '48px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '14px',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  style={{
                    position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: '4px',
                    display: 'flex', alignItems: 'center',
                  }}>
                  {showPass ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                id="remember-toggle"
                onClick={() => setRemember(r => !r)}
                style={{
                  width: '18px', height: '18px', borderRadius: '5px', cursor: 'pointer',
                  border: `2px solid ${remember ? '#00E676' : 'rgba(255,255,255,0.2)'}`,
                  background: remember ? 'rgba(0,230,118,0.15)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'all 0.2s',
                }}
              >
                {remember && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#00E676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <label style={{ fontSize: '13px', color: '#94A3B8', cursor: 'pointer', userSelect: 'none' }}
                onClick={() => setRemember(r => !r)}>
                Remember me for 30 days
              </label>
            </div>

            {/* CTA */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: '100%', height: '52px', borderRadius: '10px',
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '15px', letterSpacing: '0.02em',
                opacity: loading ? 0.7 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                position: 'relative', zIndex: 1,
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: '18px', height: '18px', border: '2px solid rgba(0,0,0,0.3)',
                    borderTop: '2px solid #0B1220', borderRadius: '50%',
                    display: 'inline-block', animation: 'spin 0.7s linear infinite',
                  }}/>
                  Authenticating...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  Sign In Securely
                </>
              )}
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }}/>
              <span style={{ color: '#4B5563', fontSize: '12px', fontWeight: 500, whiteSpace: 'nowrap' }}>
                Or continue with
              </span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }}/>
            </div>

            {/* Social */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button type="button" className="btn-social"
                style={{
                  height: '48px', borderRadius: '10px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  fontSize: '13px', fontWeight: 500,
                }}>
                <GoogleIcon/> Google
              </button>
              <button type="button" className="btn-social"
                style={{
                  height: '48px', borderRadius: '10px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  fontSize: '13px', fontWeight: 500, color: 'white',
                }}>
                <GitHubIcon/> GitHub
              </button>
            </div>

            {/* Footer */}
            <p style={{ textAlign: 'center', color: '#64748B', fontSize: '13px' }}>
              Don't have an account?{' '}
              <Link to="/signup" id="goto-signup"
                style={{ color: '#00E676', fontWeight: 600, textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#00BCD4'}
                onMouseLeave={e => e.target.style.color = '#00E676'}>
                Create Account →
              </Link>
            </p>
          </form>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: #4B5563; }
      `}</style>
    </div>
  )
}
