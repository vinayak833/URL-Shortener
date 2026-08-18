// pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="card-brutalist !p-12 max-w-lg">
        <div className="label-brutalist mb-2">[ERROR 404]</div>
        <h1 className="text-4xl font-bold font-display text-[#1D1818] tracking-tight mb-4">Page Not Found</h1>
        <p className="opacity-70 font-mono text-sm mb-8">
          The shortened link or route you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/"
          className="btn-accent inline-flex items-center space-x-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO HOME</span>
        </Link>
      </div>
    </div>
  );
}
