import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════
   DEMO DATA
═══════════════════════════════════════════ */
const DEMO_RESULT = {
  risk_score: 92,
  scam_type: 'KYC Phishing',
  confidence: 97,
  severity: 'Critical',
  red_flags: [
    'Urgency to click a link immediately',
    'Impersonates a trusted bank (SBI)',
    'Suspicious domain not matching official site',
    'Requests sensitive account details',
  ],
  indicators: ['Phishing', 'Spoofed Domain', 'Urgent Language', 'Financial Fraud', 'Credential Theft'],
  recommended_action: 'Do NOT click any link. Your bank never asks for KYC via SMS. Call SBI directly on 1800-11-2211 to verify.',
  ai_explanation: 'This message exhibits multiple hallmarks of a KYC phishing attack. The sender impersonates a legitimate banking institution (SBI) and creates artificial urgency by claiming account suspension. The embedded URL uses a lookalike domain to steal credentials. Social engineering tactics include fear of account loss to bypass critical thinking.',
}

const RECENT_ACTIVITY = [
  { type: 'danger',  label: 'Amazon Delivery Scam',    time: '2m ago',  score: 94 },
  { type: 'danger',  label: 'Fake Bank SMS',            time: '18m ago', score: 88 },
  { type: 'warning', label: 'WhatsApp Lottery Scam',   time: '1h ago',  score: 71 },
  { type: 'success', label: 'Suspicious Login Email',   time: '3h ago',  score: 12 },
]

const THREAT_FEED = [
  { icon: '🚨', title: 'New Phishing Campaign Detected',  tag: 'CRITICAL', time: 'Just now' },
  { icon: '⚠️', title: 'High-Risk Banking Scam Surge',   tag: 'HIGH',     time: '5m ago'  },
  { icon: '🔴', title: 'Malicious Domain Identified',     tag: 'HIGH',     time: '22m ago' },
  { icon: '⚡', title: 'AI Model Updated — v3.2',         tag: 'INFO',     time: '1h ago'  },
]

const STAT_CARDS = [
  { label: 'Threats Blocked',  value: '2,841', delta: '+12%', color: '#EF4444', icon: '🛡' },
  { label: 'Detected Scams',   value: '1,203', delta: '+8%',  color: '#F59E0B', icon: '🔍' },
  { label: 'Safe Messages',    value: '14.2K', delta: '+23%', color: '#22C55E', icon: '✅' },
  { label: 'URLs Analyzed',    value: '8,941', delta: '+5%',  color: '#06B6D4', icon: '🔗' },
]

/* ═══════════════════════════════════════════
   SCORE RING COMPONENT
═══════════════════════════════════════════ */
function ScoreRing({ score = 94 }) {
  const r = 44, circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color = score >= 80 ? '#22C55E' : score >= 50 ? '#F59E0B' : '#EF4444'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
        <circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 55 55)"
          style={{ transition: 'stroke-dashoffset 1s ease', filter: `drop-shadow(0 0 6px ${color}60)` }}/>
        <text x="55" y="52" textAnchor="middle" fill="white" fontSize="22" fontWeight="800" fontFamily="Inter">{score}</text>
        <text x="55" y="67" textAnchor="middle" fill={color} fontSize="10" fontWeight="600" fontFamily="Inter">SCORE</text>
      </svg>
    </div>
  )
}

/* ═══════════════════════════════════════════
   RISK SCORE BAR
═══════════════════════════════════════════ */
function RiskBar({ score }) {
  const color = score >= 75 ? '#EF4444' : score >= 40 ? '#F59E0B' : '#22C55E'
  const label = score >= 75 ? 'Critical' : score >= 40 ? 'Suspicious' : 'Safe'
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Risk Level</span>
        <span style={{ fontSize: '13px', fontWeight: 700, color }}>{label} — {score}%</span>
      </div>
      <div style={{ height: '8px', borderRadius: '99px', background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ height: '100%', borderRadius: '99px', background: color, boxShadow: `0 0 10px ${color}60` }}
        />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   DRAG & DROP UPLOAD AREA
═══════════════════════════════════════════ */
function UploadArea() {
  const [drag, setDrag] = useState(false)
  return (
    <div
      onDragOver={e => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false) }}
      style={{
        border: `2px dashed ${drag ? '#00D084' : 'rgba(255,255,255,0.12)'}`,
        borderRadius: '14px',
        padding: '28px 20px',
        textAlign: 'center',
        background: drag ? 'rgba(0,208,132,0.04)' : 'rgba(255,255,255,0.02)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
      id="image-uploader-placeholder"
    >
      <div style={{ fontSize: '32px', marginBottom: '10px' }}>📂</div>
      <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
        Drag & Drop Files Here
      </p>
      <p style={{ fontSize: '12px', color: 'var(--text-faint)', marginBottom: '14px' }}>
        Screenshots, Email exports, Chat PDFs
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
        {['PNG', 'JPG', 'PDF', 'TXT'].map(fmt => (
          <span key={fmt} className="badge badge-neutral" style={{ fontSize: '11px' }}>{fmt}</span>
        ))}
      </div>
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '14px', cursor: 'pointer' }}>
        <input type="file" accept=".png,.jpg,.jpeg,.pdf,.txt" style={{ display: 'none' }}/>
        <span style={{
          padding: '7px 18px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
          background: 'rgba(0,208,132,0.10)', color: '#00D084',
          border: '1px solid rgba(0,208,132,0.25)',
        }}>
          Browse Files
        </span>
      </label>
    </div>
  )
}

/* ═══════════════════════════════════════════
   RESULTS PANEL
═══════════════════════════════════════════ */
function ResultsPanel({ result, onReset }) {
  const score = result.risk_score
  const isCritical = score >= 75
  const isSuspicious = score >= 40 && score < 75
  const accentColor = isCritical ? '#EF4444' : isSuspicious ? '#F59E0B' : '#22C55E'

  return (
    <motion.div key="results" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Threat Overview */}
      <div className="card" style={{ padding: '24px', border: `1px solid ${accentColor}30` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
            background: `${accentColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
          }}>
            {isCritical ? '🚨' : isSuspicious ? '⚠️' : '✅'}
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>Security Report</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>AI Threat Analysis Complete</p>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span className={`badge ${isCritical ? 'badge-danger' : isSuspicious ? 'badge-warning' : 'badge-success'}`}
              style={{ fontSize: '13px', padding: '6px 14px' }}>
              {result.severity}
            </span>
          </div>
        </div>

        {/* Grid: scores */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'Risk Score',      value: `${score}%`,           color: accentColor },
            { label: 'Confidence',      value: `${result.confidence}%`, color: '#06B6D4' },
            { label: 'Threat Type',     value: result.scam_type,      color: '#F59E0B' },
          ].map(m => (
            <div key={m.label} style={{
              padding: '14px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
            }}>
              <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{m.label}</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: m.color }}>{m.value}</div>
            </div>
          ))}
        </div>

        <RiskBar score={score} />
      </div>

      {/* AI Explanation */}
      <div className="card" style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>🤖</span> AI Explanation
        </h4>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {result.ai_explanation}
        </p>
      </div>

      {/* Threat Indicators */}
      <div className="card" style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>🏷️</span> Threat Indicators
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {result.indicators.map(ind => (
            <span key={ind} className="badge badge-danger">{ind}</span>
          ))}
        </div>
      </div>

      {/* Red Flags */}
      <div className="card" style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>🚩</span> Detected Red Flags
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {result.red_flags.map((flag, i) => (
            <div key={i} style={{
              display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px 12px',
              borderRadius: '8px', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)',
            }}>
              <span style={{ color: '#EF4444', marginTop: '1px', flexShrink: 0 }}>⚠</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{flag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="card" style={{ padding: '20px', background: 'rgba(0,208,132,0.04)', border: '1px solid rgba(0,208,132,0.15)' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#00D084', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>✅</span> Recommended Actions
        </h4>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '14px' }}>
          {result.recommended_action}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {['Do Not Click Links', 'Block Sender', 'Report Message', 'Delete Conversation'].map(a => (
            <div key={a} style={{
              display: 'flex', gap: '8px', alignItems: 'center', padding: '8px 10px',
              borderRadius: '8px', background: 'rgba(0,208,132,0.08)', border: '1px solid rgba(0,208,132,0.12)',
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#00D084" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>{a}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scan Again */}
      <button id="scan-again-btn" onClick={onReset} className="btn-secondary"
        style={{ width: '100%', height: '48px', borderRadius: '12px', fontSize: '14px' }}>
        ← Analyze Another Threat
      </button>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function AnalyzerPage() {
  const [activeTab,  setActiveTab]  = useState('message')
  const [textInput,  setTextInput]  = useState('')
  const [urlInput,   setUrlInput]   = useState('')
  const [result,     setResult]     = useState(null)
  const [loading,    setLoading]    = useState(false)
  const [error,      setError]      = useState('')
  const [imageResult, setImageResult] = useState(null)

  const displayResult = result || imageResult

  const handleScan = async () => {
    setError('')
    if (activeTab === 'message' && !textInput.trim()) { setError('Please enter a message to analyze.'); return }
    if (activeTab === 'url'     && !urlInput.trim())  { setError('Please enter a URL to scan.'); return }
    setResult(null)
    setLoading(true)
    setTimeout(() => { setResult(DEMO_RESULT); setLoading(false) }, 1800)
  }

  const reset = () => { setResult(null); setImageResult(null); setTextInput(''); setUrlInput(''); setError('') }

  const isHttp = urlInput.startsWith('http://') && !urlInput.startsWith('https://')

  const TABS = [
    { id: 'message', icon: '💬', label: 'Message Analysis' },
    { id: 'url',     icon: '🔗', label: 'URL Scanner' },
    { id: 'image',   icon: '🖼️', label: 'Image Analysis' },
  ]

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: 'calc(100vh - 72px)', padding: '28px 24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* ══ Hero Header ══ */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: '8px' }}>
                Detect Scams{' '}
                <span style={{ background: 'linear-gradient(90deg, #00D084, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Before They Reach You
                </span>
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '580px', lineHeight: 1.6 }}>
                Analyze suspicious messages, emails, URLs, and screenshots with AI-powered threat intelligence.
              </p>
            </div>
            {/* Trust Badges */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['✓ Real-time Analysis', '✓ AI-Powered Detection', '✓ Enterprise Security'].map(b => (
                <span key={b} style={{
                  padding: '6px 12px', borderRadius: '8px', fontSize: '11.5px', fontWeight: 500,
                  background: 'rgba(0,208,132,0.08)', color: '#00D084',
                  border: '1px solid rgba(0,208,132,0.2)', whiteSpace: 'nowrap',
                }}>{b}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ══ 70/30 Grid Layout ══ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>

          {/* ── LEFT: Primary Workspace ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <AnimatePresence mode="wait">
              {!displayResult ? (
                <motion.div key="input" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>

                  {/* Analyzer Card */}
                  <div className="card" style={{ padding: '24px' }}>
                    {/* Tab Bar */}
                    <div className="tab-bar" style={{ marginBottom: '20px' }}>
                      {TABS.map(tab => (
                        <button key={tab.id} id={`tab-${tab.id}`}
                          className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                          onClick={() => setActiveTab(tab.id)}>
                          <span>{tab.icon}</span>
                          <span className="mobile-hide">{tab.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Message Tab */}
                    {activeTab === 'message' && (
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Suspicious Content
                        </label>
                        <textarea
                          id="message-textarea"
                          value={textInput}
                          onChange={e => setTextInput(e.target.value)}
                          placeholder="Paste suspicious messages, emails, WhatsApp chats, SMS content, or social media messages..."
                          className="input-field input-glow"
                          style={{ padding: '16px', resize: 'none', minHeight: '220px', lineHeight: 1.7, fontSize: '14px', borderRadius: '12px' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-faint)' }}>
                            Supports: English, Hindi, and regional languages
                          </span>
                          <span style={{ fontSize: '11px', color: 'var(--text-faint)' }}>
                            {textInput.length} chars
                          </span>
                        </div>
                      </div>
                    )}

                    {/* URL Tab */}
                    {activeTab === 'url' && (
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          URL / Link to Scan
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)', fontSize: '16px', pointerEvents: 'none' }}>🔗</span>
                          <input
                            id="url-input"
                            type="url"
                            value={urlInput}
                            onChange={e => setUrlInput(e.target.value)}
                            placeholder="https://suspicious-link.com/verify-kyc"
                            className="input-field input-glow"
                            style={{ paddingLeft: '44px', paddingRight: '16px', height: '52px', borderColor: isHttp ? '#EF4444' : undefined, borderRadius: '12px' }}
                          />
                        </div>
                        {isHttp && (
                          <div style={{
                            marginTop: '10px', padding: '10px 14px', borderRadius: '8px',
                            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                            display: 'flex', gap: '8px', alignItems: 'center',
                          }}>
                            <span style={{ fontSize: '14px' }}>⚠️</span>
                            <span style={{ fontSize: '12px', color: '#FCA5A5' }}>
                              This URL uses HTTP (not HTTPS) — it is unencrypted and potentially unsafe.
                            </span>
                          </div>
                        )}
                        <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-faint)' }}>
                          We check against 50+ threat intelligence feeds and perform real-time domain analysis.
                        </p>
                      </div>
                    )}

                    {/* Image Tab */}
                    {activeTab === 'image' && <UploadArea />}

                    {/* Error */}
                    {error && (
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                        style={{
                          marginTop: '14px', padding: '10px 14px', borderRadius: '8px',
                          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                          display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: '#FCA5A5',
                        }}>
                        <span>⚠</span> {error}
                      </motion.div>
                    )}

                    {/* CTA */}
                    <button
                      id="scan-btn"
                      onClick={handleScan}
                      disabled={loading}
                      className="btn-primary"
                      style={{ width: '100%', height: '52px', marginTop: '18px', borderRadius: '12px', fontSize: '15px' }}
                    >
                      {loading ? (
                        <>
                          <span style={{ width: '18px', height: '18px', border: '2.5px solid rgba(0,0,0,0.3)', borderTop: '2.5px solid #020817', borderRadius: '50%' }} className="spin"/>
                          Analyzing Threat...
                        </>
                      ) : (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                          </svg>
                          Analyze Threat
                        </>
                      )}
                    </button>
                  </div>

                  {/* Loading skeleton */}
                  {loading && (
                    <div className="card" style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <div className="skeleton" style={{ width: '44px', height: '44px', borderRadius: '12px' }}/>
                        <div style={{ flex: 1 }}>
                          <div className="skeleton" style={{ height: '14px', width: '40%', marginBottom: '8px' }}/>
                          <div className="skeleton" style={{ height: '12px', width: '25%' }}/>
                        </div>
                      </div>
                      <div className="skeleton" style={{ height: '8px', marginBottom: '12px' }}/>
                      <div className="skeleton" style={{ height: '8px', width: '80%', marginBottom: '12px' }}/>
                      <div className="skeleton" style={{ height: '8px', width: '60%' }}/>
                    </div>
                  )}
                </motion.div>
              ) : (
                <ResultsPanel result={displayResult} onReset={reset} />
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div className="sidebar-hide" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Security Score Card */}
            <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                Security Score
              </div>
              <ScoreRing score={94} />
              <div style={{ marginTop: '12px' }}>
                <span className="badge badge-success" style={{ fontSize: '12px', padding: '5px 14px' }}>
                  ✓ Protected
                </span>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-faint)', marginTop: '10px', lineHeight: 1.5 }}>
                Your security posture is strong. Last scanned 2m ago.
              </p>
            </div>

            {/* Threat Statistics */}
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
                Threat Statistics
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {STAT_CARDS.map(s => (
                  <div key={s.label} style={{
                    padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border)',
                  }}>
                    <div style={{ fontSize: '18px', marginBottom: '6px' }}>{s.icon}</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: 'white', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-faint)', marginTop: '3px', lineHeight: 1.3 }}>{s.label}</div>
                    <div style={{ fontSize: '10px', color: '#22C55E', marginTop: '4px', fontWeight: 600 }}>{s.delta}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
                Recent Activity
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {RECENT_ACTIVITY.map((a, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                    borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)',
                    cursor: 'pointer', transition: 'background 0.15s',
                  }}>
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                      background: a.type === 'danger' ? '#EF4444' : a.type === 'warning' ? '#F59E0B' : '#22C55E',
                    }}/>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.label}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-faint)', marginTop: '2px' }}>{a.time}</div>
                    </div>
                    <div style={{
                      fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '5px',
                      color: a.type === 'danger' ? '#FCA5A5' : a.type === 'warning' ? '#FDE68A' : '#86EFAC',
                      background: a.type === 'danger' ? 'rgba(239,68,68,0.1)' : a.type === 'warning' ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)',
                    }}>{a.score}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Threat Feed */}
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#EF4444' }} className="pulse-dot"/>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Live Threat Feed
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {THREAT_FEED.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '15px', flexShrink: 0, marginTop: '1px' }}>{f.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.4 }}>{f.title}</div>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '4px', alignItems: 'center' }}>
                        <span style={{
                          fontSize: '10px', fontWeight: 700, padding: '1px 6px', borderRadius: '4px',
                          background: f.tag === 'CRITICAL' ? 'rgba(239,68,68,0.15)' : f.tag === 'HIGH' ? 'rgba(245,158,11,0.15)' : 'rgba(6,182,212,0.15)',
                          color: f.tag === 'CRITICAL' ? '#FCA5A5' : f.tag === 'HIGH' ? '#FDE68A' : '#67E8F9',
                        }}>{f.tag}</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-faint)' }}>{f.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
