// pages/Stats.jsx - click analytics
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BarChart3, ExternalLink, Calendar, Globe, Clock, ArrowLeft, Copy, Check } from 'lucide-react';
import { urlService } from '../services/urlService.js';
import { StatsChart } from '../components/StatsChart.jsx';
import { Spinner } from '../components/Spinner.jsx';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard.js';

export function Stats() {
  const { code } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedText, copy] = useCopyToClipboard();

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await urlService.getStats(code);
        if (res.success) {
          setData(res.data);
        } else {
          setError(res.message);
        }
      } catch (err) {
        setError('Could not fetch analytics for this short link.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !data?.url) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="card-brutalist !p-12">
          <h2 className="text-3xl font-bold font-display text-[#1D1818] mb-2">[ANALYTICS UNAVAILABLE]</h2>
          <p className="opacity-70 text-sm mb-6">{error || 'Link not found'}</p>
          <Link to="/" className="btn-accent inline-flex items-center space-x-2 text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </Link>
        </div>
      </div>
    );
  }

  const { url, clicks } = data;
  const fullShortUrl = `${window.location.origin}/${url.shortCode}`;
  const isCopied = copiedText === fullShortUrl;

  return (
    <div className="max-w-[900px] mx-auto px-6 py-12 space-y-8">
      {/* Breadcrumb */}
      <Link to="/" className="inline-flex items-center space-x-1 text-xs font-mono font-bold hover:text-[#E63946] uppercase transition">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>RETURN TO SHORTENER</span>
      </Link>

      {/* Hero Stats Card */}
      <div className="card-brutalist space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#1D1818] pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#1D1818] tracking-tight">
                /{url.shortCode}
              </h1>
              {url.title && (
                <span className="text-xs px-2 py-0.5 border border-[#1D1818] bg-[#F8F7F4] font-bold uppercase tracking-wider text-[#1D1818]">
                  {url.title}
                </span>
              )}
            </div>
            <p className="text-xs font-mono opacity-60 truncate max-w-2xl text-[#1D1818]">
              {url.originalUrl}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => copy(fullShortUrl)}
              className="btn-brutalist !py-2 !px-4 text-xs flex items-center space-x-1"
            >
              {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'COPIED' : 'COPY SHORT LINK'}</span>
            </button>
            <a
              href={fullShortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#1D1818] p-2 hover:bg-[#1D1818] hover:text-white transition text-[#1D1818]"
              title="Test Redirect"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="border border-[#1D1818] p-5 bg-[#F8F7F4] shadow-[4px_4px_0px_#1D1818]">
            <div className="label-brutalist mb-2">
              TOTAL CLICKS
            </div>
            <div className="text-4xl font-extrabold font-display text-[#1D1818]">{url.clicks}</div>
          </div>

          <div className="border border-[#1D1818] p-5 bg-[#F8F7F4] shadow-[4px_4px_0px_#1D1818]">
            <div className="label-brutalist mb-2">
              CREATION DATE
            </div>
            <div className="text-sm font-bold font-mono text-[#1D1818] mt-3 uppercase">
              {new Date(url.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
            </div>
          </div>

          <div className="border border-[#1D1818] p-5 bg-[#F8F7F4] shadow-[4px_4px_0px_#1D1818]">
            <div className="label-brutalist mb-2">
              LAST ACTIVITY
            </div>
            <div className="text-xs font-bold font-mono text-[#1D1818] mt-3 uppercase">
              {url.lastClickedAt ? new Date(url.lastClickedAt).toLocaleString() : 'NEVER'}
            </div>
          </div>
        </div>
      </div>

      {/* Area Chart Section */}
      <div className="card-brutalist space-y-6">
        <h3 className="text-2xl font-bold font-display text-[#1D1818]">
          Engagement Timeline
        </h3>
        <StatsChart clicks={clicks} />
      </div>
    </div>
  );
}
