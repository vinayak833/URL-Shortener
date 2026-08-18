// App.jsx - routes setup
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { UrlProvider } from './context/UrlContext.jsx';
import { Navbar } from './components/Navbar.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';

import { Home } from './pages/Home.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Stats } from './pages/Stats.jsx';
import { NotFound } from './pages/NotFound.jsx';

export default function App() {
  return (
    <AuthProvider>
      <UrlProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[#F8F7F4] text-[#1D1818] flex flex-col font-sans selection:bg-[#E63946] selection:text-white">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/stats/:code" element={<Stats />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <footer className="p-8 text-center border-t border-[#1D1818] opacity-50 text-[0.7rem] font-mono tracking-widest uppercase">
              SNIP/LINK • FAST URL SHORTENER & ANALYTICS
            </footer>
          </div>
        </BrowserRouter>
      </UrlProvider>
    </AuthProvider>
  );
}
