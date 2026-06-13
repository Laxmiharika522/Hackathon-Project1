import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

/* ─── Strength helpers ─── */
const calcStrength = (val) => {
  let s = 0
  if (val.length >= 8)            s++
  if (val.length >= 12)           s++
  if (/[A-Z]/.test(val))          s++
  if (/[0-9]/.test(val))          s++
  if (/[^A-Za-z0-9]/.test(val))   s++
  return s
}
const STRENGTH_META = [
  { label: '',          color: 'transparent' },
  { label: 'Weak',     color: '#EF4444' },
  { label: 'Fair',     color: '#F59E0B' },
  { label: 'Good',     color: '#3B82F6' },
  { label: 'Strong',   color: '#00E676' },
  { label: 'Fortress', color: '#00E676' },
]

/* ─── Google / GitHub icons ─── */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)
const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

export default function SignupPage() {
  const { signUp } = useAuth()
  const navigate   = useNavigate()

  const [fullName,    setFullName]    = useState('')
  const [email,       setEmail]       = useState('')
  const [password,    setPassword]    = useState('')
  const [showPass,    setShowPass]    = useState(false)
  const [agree,       setAgree]       = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState('')
  const [strength,    setStrength]    = useState(0)

  const handlePasswordChange = (val) => {
    setPassword(val)
    setStrength(calcStrength(val))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 8)  { setError('Password must be at least 8 characters.'); return }
    if (!agree)               { setError('Please accept the Terms of Service to continue.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const { error } = signUp(email, password)
    if (error) setError(error)
    else navigate('/')
    setLoading(false)
  }

  const sm = STRENGTH_META[strength]

  return (
    <div className="auth-bg min-h-screen flex items-stretch">

      {/* ══════════════════════════════════════════
          LEFT  —  Brand / Visual
      ══════════════════════════════════════════ */}
      <div className="hidden lg:flex flex-col justify-between flex-1 relative overflow-hidden px-16 py-14"
        style={{ background: 'linear-gradient(160deg, #0d1a2e 0%, #0B1220 60%, #091018 100%)' }}>

        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,188,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,188,212,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}/>

        {/* Glow orbs */}
        <div className="absolute pointer-events-none"
          style={{ top: '-80px', right: '-80px', width: '360px', height: '360px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,188,212,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }}/>
        <div className="absolute pointer-events-none"
          style={{ bottom: '60px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,230,118,0.10) 0%, transparent 70%)', filter: 'blur(40px)' }}/>

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #00E676, #00BCD4)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"
                fill="none" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '17px', color: 'white' }}>
            Cyber<span style={{ color: '#00E676' }}>Guard</span>
            <span style={{ color: '#00BCD4', fontWeight: 600 }}> AI</span>
          </span>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          {/* Feature pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
            {[
              { icon: '🛡', title: 'AI-Powered Threat Detection', desc: 'Real-time analysis of messages, links, and files using advanced machine learning models.' },
              { icon: '🔍', title: 'Phishing & Fraud Protection', desc: 'Identify malicious URLs, fake messages, and social engineering attempts instantly.' },
              { icon: '📊', title: 'Smart Security Dashboard', desc: 'Visualize threats, track incidents, and monitor your digital safety score live.' },
            ].map(f => (
              <div key={f.title} style={{
                display: 'flex', gap: '16px', alignItems: 'flex-start',
                padding: '20px', borderRadius: '14px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '10px', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
                  fontSize: '20px',
                }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'Poppins', fontWeight: 600, color: 'white', fontSize: '14px', marginBottom: '4px' }}>
                    {f.title}
                  </div>
                  <div style={{ color: '#64748B', fontSize: '13px', lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Headline */}
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '26px', color: 'white', lineHeight: 1.35 }}>
            Join 50,000+ users<br/>
            <span style={{ background: 'linear-gradient(90deg, #00E676, #00BCD4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              staying safe online
            </span>
          </h2>
        </div>

        {/* Bottom trust badges */}
        <div className="relative z-10 flex items-center gap-6 flex-wrap">
          {['SOC 2 Compliant', 'ISO 27001', 'GDPR Ready', 'Zero Data Retention'].map(badge => (
            <div key={badge} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '12px', color: '#64748B',
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#00E676" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {badge}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT  —  Signup Form
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
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '26px', color: 'white', marginBottom: '6px' }}>
              Create your account
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '14px' }}>
              Start protecting yourself with AI-powered security
            </p>
          </div>

          {/* Social — faster registration */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
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

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }}/>
            <span style={{ color: '#4B5563', fontSize: '12px', fontWeight: 500, whiteSpace: 'nowrap' }}>
              Or register with email
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }}/>
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
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
              <span>⚠</span> {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

            {/* Full Name */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#CBD5E1', marginBottom: '8px' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input
                  id="signup-name"
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  required
                  className="input-glow-cyan"
                  style={{
                    width: '100%', height: '52px', paddingLeft: '44px', paddingRight: '16px',
                    borderRadius: '10px', background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '14px',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#CBD5E1', marginBottom: '8px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="input-glow-cyan"
                  style={{
                    width: '100%', height: '52px', paddingLeft: '44px', paddingRight: '16px',
                    borderRadius: '10px', background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '14px',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#CBD5E1', marginBottom: '8px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                </span>
                <input
                  id="signup-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => handlePasswordChange(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  className="input-glow-cyan"
                  style={{
                    width: '100%', height: '52px', paddingLeft: '44px', paddingRight: '48px',
                    borderRadius: '10px', background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '14px',
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
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* Strength meter */}
              {password.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '5px' }}>
                    {[1,2,3,4,5].map(i => (
                      <div key={i} style={{
                        flex: 1, height: '3px', borderRadius: '4px',
                        background: i <= strength ? sm.color : 'rgba(255,255,255,0.1)',
                        transition: 'background 0.3s',
                      }}/>
                    ))}
                  </div>
                  <p style={{ fontSize: '11px', color: sm.color, fontWeight: 500 }}>
                    {sm.label} {strength === 5 ? '— Excellent password!' : ''}
                  </p>
                </div>
              )}
            </div>

            {/* Terms */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div
                id="agree-toggle"
                onClick={() => setAgree(a => !a)}
                style={{
                  width: '18px', height: '18px', borderRadius: '5px', cursor: 'pointer', flexShrink: 0, marginTop: '1px',
                  border: `2px solid ${agree ? '#00BCD4' : 'rgba(255,255,255,0.2)'}`,
                  background: agree ? 'rgba(0,188,212,0.12)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
              >
                {agree && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5 }}>
                I agree to the{' '}
                <a href="#" style={{ color: '#00BCD4', textDecoration: 'none' }}>Terms of Service</a>
                {' '}and{' '}
                <a href="#" style={{ color: '#00BCD4', textDecoration: 'none' }}>Privacy Policy</a>
              </p>
            </div>

            {/* CTA */}
            <button
              id="signup-submit-btn"
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
                    borderTop: '2px solid #0B1220', borderRadius: '50%', display: 'inline-block',
                    animation: 'spin 0.7s linear infinite',
                  }}/>
                  Creating Account...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
                  </svg>
                  Create Account
                </>
              )}
            </button>

            {/* Footer */}
            <p style={{ textAlign: 'center', color: '#64748B', fontSize: '13px' }}>
              Already have an account?{' '}
              <Link to="/login" id="goto-login"
                style={{ color: '#00E676', fontWeight: 600, textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#00BCD4'}
                onMouseLeave={e => e.target.style.color = '#00E676'}>
                Sign In →
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
