// pages/Home.jsx - shorten URL form & hero landing
import React, { useState } from 'react';
import { Sparkles, Shield, Zap, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';
import { UrlForm } from '../components/UrlForm.jsx';
import { UrlCard } from '../components/UrlCard.jsx';
import { useUrls } from '../hooks/useUrls.js';
import { useAuth } from '../hooks/useAuth.js';
import { Link } from 'react-router-dom';

export function Home() {
  const { addUrl, urls } = useUrls();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [lastShortened, setLastShortened] = useState(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const handleShorten = async (originalUrl, customCode, title) => {
    if (!user) {
      setShowAuthPrompt(true);
      return { success: false };
    }
    setLoading(true);
    try {
      const res = await addUrl(originalUrl, customCode, title);
      if (res?.success) {
        setLastShortened(res.data);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[900px] mx-auto px-6 py-12 space-y-16">
      {/* Hero Section matching design variation */}
      <section className="text-center pt-8">
        <h1 className="text-5xl sm:text-7xl font-display font-extrabold text-[#1D1818] tracking-tighter leading-[0.9] mb-6">
          Make Every Link Count.
        </h1>
        <p className="max-w-[500px] mx-auto opacity-80 text-base sm:text-lg text-[#1D1818] font-sans leading-relaxed">
          Shorten long links, customize branded back-halves, and track real-time click analytics with blazing fast redirection.
        </p>
      </section>

      {/* Main Shortener Form */}
      <section>
        <UrlForm onSubmit={handleShorten} loading={loading} />

        {lastShortened && (
          <div className="mt-8 animate-fade-in space-y-3">
            <div className="flex items-center space-x-2 text-[#E63946] text-sm font-bold pl-1 uppercase font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>[NEW LINK GENERATED]</span>
            </div>
            <div className="card-brutalist !p-4">
              <UrlCard item={lastShortened} canDelete={false} />
            </div>
          </div>
        )}
      </section>

      {showAuthPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D1818]/70 backdrop-blur-xs animate-fade-in">
          <div className="card-brutalist max-w-md w-full relative bg-white shadow-[8px_8px_0px_#1D1818]">
            <button
              onClick={() => setShowAuthPrompt(false)}
              className="absolute top-4 right-4 font-mono font-bold text-sm hover:text-[#E63946] cursor-pointer"
            >
              [CLOSE]
            </button>
            <div className="label-brutalist mb-2">[AUTHENTICATION REQUIRED]</div>
            <h3 className="text-2xl font-display font-bold text-[#1D1818] mb-3">
              Login to Shorten Link
            </h3>
            <p className="text-sm opacity-80 font-sans mb-6 text-[#1D1818] leading-relaxed">
              Please sign in or create a free account to generate short links, claim custom branded aliases, and monitor real-time analytics.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/login" className="btn-brutalist text-center text-sm block">
                LOGIN
              </Link>
              <Link to="/register" className="btn-accent text-center text-sm block">
                SIGN UP FREE
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Features Grid */}
      <section className="pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card-brutalist !p-6">
            <h3 className="text-xl font-bold font-display mb-2">Instant Redirects</h3>
            <p className="text-sm opacity-80 leading-relaxed font-sans">
              Ultra-fast 302 redirects optimized for maximum velocity, ensuring users never wait.
            </p>
          </div>

          <div className="card-brutalist !p-6">
            <h3 className="text-xl font-bold font-display mb-2">Deep Analytics</h3>
            <p className="text-sm opacity-80 leading-relaxed font-sans">
              Monitor total visits, click timestamps, and user engagement metrics directly from your dashboard.
            </p>
          </div>

          <div className="card-brutalist !p-6">
            <h3 className="text-xl font-bold font-display mb-2">Custom Back-Halves</h3>
            <p className="text-sm opacity-80 leading-relaxed font-sans">
              Claim custom memorable short codes and titles to boost brand recognition and CTR.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Community Links Preview matching design variation */}
      <section className="pt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-display text-[#1D1818]">Recent Community Links</h2>
          {!user && (
            <Link to="/register" className="text-xs font-mono font-bold text-[#E63946] hover:underline uppercase flex items-center space-x-1">
              <span>Sign up to manage links</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
        <div className="card-brutalist !p-6 !shadow-none">
          {urls.length === 0 ? (
            <div className="text-center py-8 opacity-50 font-mono text-sm">
              [NO COMMUNITY LINKS YET]
            </div>
          ) : (
            urls.slice(0, 4).map((u, index) => (
              <UrlCard key={u.shortCode || u._id || u.id || index} item={u} canDelete={false} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
