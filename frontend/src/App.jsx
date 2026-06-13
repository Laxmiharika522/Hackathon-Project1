import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AnalyzerPage from './pages/AnalyzerPage'
import { DashboardPage, EncyclopediaPage } from './pages/PlaceholderPages'

function AppLayout() {
  const [lang, setLang] = useState('en')
  const toggleLang = () => setLang(prev => (prev === 'en' ? 'hi' : 'en'))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar lang={lang} onLangToggle={toggleLang} />
      <Routes>
        <Route path="/" element={<AnalyzerPage />} />
        <Route path="/dashboard" element={<DashboardPage lang={lang} />} />
        <Route path="/encyclopedia" element={<EncyclopediaPage lang={lang} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected — requires login */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
