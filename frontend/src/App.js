import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/dashboard/Navbar';
import AnalyzerPage from './pages/AnalyzerPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './components/dashboard/Dashboard';
import Encyclopedia from './components/dashboard/Encyclopedia';
import './App.css';

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppLayout() {
  const [lang, setLang] = React.useState('en');
  const toggleLang = () => setLang(prev => (prev === 'en' ? 'hi' : 'en'));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar lang={lang} onLangToggle={toggleLang} />
      <Routes>
        <Route path="/analyzer" element={<AnalyzerPage />} />
        <Route path="/dashboard" element={<Dashboard lang={lang} />} />
        <Route path="/encyclopedia" element={<Encyclopedia lang={lang} />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
