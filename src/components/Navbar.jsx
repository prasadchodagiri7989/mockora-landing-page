import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, ExternalLink, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const studentLoginUrl = `${(import.meta.env.VITE_USER_URL || 'http://localhost:5173').replace(/\/$/, '')}/login`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-panel border-b border-slate-200/80 shadow-xs py-3.5' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-700 text-white flex items-center justify-center font-black text-lg shadow-md shadow-indigo-600/30 group-hover:scale-105 transition">
            M
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-950 block leading-tight">
              MockOra
            </span>
            <span className="text-[10px] font-bold text-emerald-600 tracking-wider uppercase block">
              All-Exam Pass • ₹999
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7 text-xs font-bold text-slate-600 hover:text-slate-900">
          <a href="#features" className="hover:text-indigo-600 transition">Features</a>
          <a href="#categories" className="hover:text-indigo-600 transition">Categories</a>
          <a href="#how-it-works" className="hover:text-indigo-600 transition">How It Works</a>
          <a href="#reviews" className="hover:text-indigo-600 transition">Reviews</a>
          <a href="#faq" className="hover:text-indigo-600 transition">FAQ</a>
          <a 
            href={studentLoginUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition"
          >
            <span>Student Login</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/register"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition transform active:scale-95 flex items-center gap-1.5"
          >
            <span>Register & Pay @ ₹999</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-200 px-5 py-4 space-y-3 mt-2 shadow-lg animate-fadeIn">
          <a 
            href="#features" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-bold text-slate-700 py-1.5"
          >
            Features
          </a>
          <a 
            href="#categories" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-bold text-slate-700 py-1.5"
          >
            Categories
          </a>
          <a 
            href="#how-it-works" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-bold text-slate-700 py-1.5"
          >
            How It Works
          </a>
          <Link 
            to="/register" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-bold text-indigo-600 py-1.5"
          >
            Register & Pay (₹999) &rarr;
          </Link>
          <a 
            href="#faq" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-bold text-slate-700 py-1.5"
          >
            FAQ
          </a>
          <a 
            href={studentLoginUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-xs font-bold text-slate-500 py-1.5"
          >
            Existing Student Login &rarr;
          </a>
        </div>
      )}
    </nav>
  );
}
