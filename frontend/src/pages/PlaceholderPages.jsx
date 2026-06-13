// Placeholder pages for Dhatri and other team members
// These routes exist so the navbar links work without errors

export function DashboardPage({ lang }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      <div className="text-center glass rounded-2xl p-12">
        <div className="text-5xl mb-4">📊</div>
        <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
          {lang === 'en' ? 'Live Scam Dashboard' : 'लाइव स्कैम डैशबोर्ड'}
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          {lang === 'en' ? "Dhatri's dashboard coming here 🔥" : 'Dhatri का डैशबोर्ड जल्द आएगा 🔥'}
        </p>
      </div>
    </div>
  )
}

export function EncyclopediaPage({ lang }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      <div className="text-center glass rounded-2xl p-12">
        <div className="text-5xl mb-4">📚</div>
        <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
          {lang === 'en' ? 'Scam Encyclopedia' : 'स्कैम विश्वकोश'}
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          {lang === 'en' ? "Dhatri's encyclopedia coming here 🔥" : 'Dhatri का विश्वकोश जल्द आएगा 🔥'}
        </p>
      </div>
    </div>
  )
}
