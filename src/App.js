import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Encyclopedia from './components/dashboard/Encyclopedia';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

function Navigation() {
  const location = useLocation();
  const activeTab = location.pathname.includes('encyclopedia') ? 'encyclopedia' : 'dashboard';

  return (
    <nav className="bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(239,68,68,0.3)] border border-red-500/30">S</div>
          <span className="font-extrabold text-2xl tracking-tighter text-white">ScamShield<span className="text-red-500">AI</span></span>
        </div>
        <div className="flex gap-2 p-1 bg-white/[0.02] rounded-2xl border border-white/5">
          <Link 
            to="/dashboard"
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'dashboard' ? 'bg-white/10 text-white shadow-md' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/encyclopedia"
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'encyclopedia' ? 'bg-white/10 text-white shadow-md' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Encyclopedia
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col selection:bg-red-500/30">
        <Navigation />
        <main className="flex-1 w-full relative">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/encyclopedia" element={<Encyclopedia />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
