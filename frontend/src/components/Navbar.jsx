// components/Navbar.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Link2, LayoutDashboard, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#F8F7F4] border-b-2 border-[#1D1818] px-6 sm:px-8 py-5 flex items-center justify-between">
      <Link to="/" className="font-extrabold text-2xl font-display tracking-tighter text-[#1D1818]">
        SNIP/LINK
      </Link>

      <nav className="flex items-center space-x-6 font-semibold text-sm">
        <Link
          to="/"
          className={`transition ${
            isActive('/') ? 'text-[#E63946] font-bold' : 'text-[#1D1818] hover:text-[#E63946]'
          }`}
        >
          Shorten
        </Link>

        {user ? (
          <>
            <Link
              to="/dashboard"
              className={`flex items-center space-x-1.5 transition ${
                isActive('/dashboard') ? 'text-[#E63946] font-bold' : 'text-[#1D1818] hover:text-[#E63946]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <span className="text-xs font-mono opacity-60 hidden md:block uppercase">
              [{user.name}]
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-[#E63946] hover:opacity-80 font-bold transition cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <div className="flex items-center space-x-6">
            <Link
              to="/login"
              className={`transition ${
                isActive('/login') ? 'text-[#E63946] font-bold' : 'text-[#1D1818] hover:text-[#E63946]'
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-[#E63946] text-white px-4 py-2 font-bold hover:bg-[#1D1818] transition shadow-[3px_3px_0px_#1D1818] border border-[#1D1818]"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
