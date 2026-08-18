// components/UrlForm.jsx - input + submit
import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export function UrlForm({ onSubmit, loading }) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [title, setTitle] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!originalUrl.trim()) {
      setError('Please enter a URL');
      return;
    }
    const res = await onSubmit(originalUrl, customCode, title);
    if (res?.success) {
      setOriginalUrl('');
      setCustomCode('');
      setTitle('');
      setShowCustom(false);
    } else if (res?.message) {
      setError(res.message);
    }
  };

  return (
    <div className="card-brutalist">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="label-brutalist mb-2">
            Destination URL *
          </div>
          <input
            type="url"
            required
            placeholder="https://example.com/very/long/destination/url..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="input-brutalist"
          />
        </div>

        {showCustom ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#1D1818]/10">
            <div>
              <div className="label-brutalist mb-2">
                Custom Back-Half (Optional)
              </div>
              <input
                type="text"
                maxLength={20}
                placeholder="my-custom-brand"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                className="input-brutalist font-mono"
              />
            </div>

            <div>
              <div className="label-brutalist mb-2">
                Link Title (Optional)
              </div>
              <input
                type="text"
                maxLength={50}
                placeholder="My Campaign Launch"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-brutalist"
              />
            </div>
          </div>
        ) : (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowCustom(true)}
              className="text-xs font-mono font-bold hover:text-[#E63946] transition cursor-pointer underline decoration-1 underline-offset-2"
            >
              + ADD CUSTOM CODE & TITLE
            </button>
          </div>
        )}

        {error && (
          <div className="flex items-center space-x-2 text-white bg-[#E63946] border border-[#1D1818] p-3 mt-4 text-sm font-bold shadow-[3px_3px_0px_#1D1818]">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-brutalist w-full mt-6 text-center block"
        >
          {loading ? 'SHORTENING...' : 'SHORTEN LINK'}
        </button>
      </form>
    </div>
  );
}
