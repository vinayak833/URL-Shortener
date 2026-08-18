// pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const res = await login(email, password);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md card-brutalist space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold font-display tracking-tight text-[#1D1818]">Login</h1>
          <p className="opacity-70 text-sm font-sans">Sign in to manage your short links and analytics</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="label-brutalist mb-2">
              Email Address *
            </div>
            <input
              type="email"
              required
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-brutalist"
            />
          </div>

          <div>
            <div className="label-brutalist mb-2">
              Password *
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
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
            className="btn-brutalist w-full mt-4 text-center block"
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        <div className="text-center text-xs pt-4 border-t border-[#1D1818]/10 font-mono">
          DON'T HAVE AN ACCOUNT?{' '}
          <Link to="/register" className="font-bold text-[#E63946] hover:underline uppercase">
            SIGN UP FOR FREE
          </Link>
        </div>
      </div>
    </div>
  );
}
