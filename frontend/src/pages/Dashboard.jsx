// pages/Dashboard.jsx - user's links list
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Link2, ExternalLink, Sparkles } from 'lucide-react';
import { useUrls } from '../hooks/useUrls.js';
import { useAuth } from '../hooks/useAuth.js';
import { UrlCard } from '../components/UrlCard.jsx';
import { UrlForm } from '../components/UrlForm.jsx';
import { Spinner } from '../components/Spinner.jsx';

export function Dashboard() {
  const { urls, loading, removeUrl, addUrl } = useUrls();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [shortening, setShortening] = useState(false);

  // Filter links belonging to the logged-in user
  const userUrls = React.useMemo(() => {
    if (!user) return [];
    return urls.filter(u => u.userId === user.id || !u.userId);
  }, [urls, user]);

  const filteredUrls = React.useMemo(() => {
    if (!searchTerm.trim()) return userUrls;
    const term = searchTerm.toLowerCase();
    return userUrls.filter(
      u => u.shortCode.toLowerCase().includes(term) ||
           u.originalUrl.toLowerCase().includes(term) ||
           (u.title && u.title.toLowerCase().includes(term))
    );
  }, [userUrls, searchTerm]);

  const handleShorten = async (orig, code, title) => {
    setShortening(true);
    try {
      const res = await addUrl(orig, code, title);
      if (res?.success) setShowForm(false);
      return res;
    } finally {
      setShortening(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto px-6 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#1D1818] pb-6">
        <div>
          <h1 className="text-4xl font-extrabold font-display tracking-tight text-[#1D1818]">Your Dashboard</h1>
          <p className="opacity-70 text-sm mt-1 font-sans">
            Manage your shortened links, monitor visits, and create custom URLs.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-brutalist flex-shrink-0"
        >
          {showForm ? 'CLOSE FORM' : '+ NEW SHORT LINK'}
        </button>
      </div>

      {showForm && (
        <div className="animate-fade-in">
          <UrlForm onSubmit={handleShorten} loading={shortening} />
        </div>
      )}

      {/* Search Bar & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#1D1818]/50" />
          <input
            type="text"
            placeholder="Search your links by title or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-brutalist !pl-10"
          />
        </div>
        <div className="text-xs font-mono font-bold uppercase">
          SHOWING <span className="text-[#E63946]">{filteredUrls.length}</span> OF {userUrls.length} LINKS
        </div>
      </div>

      {/* Links List */}
      {filteredUrls.length === 0 ? (
        <div className="card-brutalist text-center py-16 !shadow-none">
          <h3 className="text-xl font-bold font-display mb-2">[NO LINKS FOUND]</h3>
          <p className="opacity-70 text-sm max-w-sm mx-auto mb-6">
            {searchTerm ? 'No links match your search filter.' : "You haven't shortened any links yet."}
          </p>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="btn-accent"
            >
              CREATE FIRST LINK
            </button>
          )}
        </div>
      ) : (
        <div className="card-brutalist !p-6 !shadow-none">
          {filteredUrls.map((item, index) => (
            <UrlCard key={item.shortCode || item._id || item.id || index} item={item} onDelete={removeUrl} canDelete={true} />
          ))}
        </div>
      )}
    </div>
  );
}
