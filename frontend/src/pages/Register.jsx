// pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    const res = await register(name, email, password);
    if (res.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md card-brutalist space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold font-display tracking-tight text-[#1D1818]">Sign Up</h1>
          <p className="opacity-70 text-sm font-sans">Start shortening branded URLs and tracking clicks</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="label-brutalist mb-2">
              Full Name *
            </div>
            <input
              type="text"
              required
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-brutalist"
            />
          </div>

          <div>
            <div className="label-brutalist mb-2">
              Email Address *
            </div>
            <input
              type="email"
              required
              placeholder="jane@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-brutalist"
            />
          </div>

          <div>
            <div className="label-brutalist mb-2">
              Password (Min 6 chars) *
            </div>
            <input
              type="password"
              required
              placeholder="Min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-brutalist"
            />
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-white bg-[#E63946] border border-[#1D1818] p-3 text-sm font-bold shadow-[3px_3px_0px_#1D1818]">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-accent w-full mt-4 text-center block"
          >
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="text-center text-xs pt-4 border-t border-[#1D1818]/10 font-mono">
          ALREADY HAVE AN ACCOUNT?{' '}
          <Link to="/login" className="font-bold text-[#E63946] hover:underline uppercase">
            SIGN IN
          </Link>
        </div>
      </div>
    </div>
  );
}
