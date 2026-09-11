import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                U
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                Universal Mock Test
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              India's premier all-exam test simulator and preparation ecosystem. Designed to give every engineering, medical, civil services, and language candidate a winning edge.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Cashfree Verified Merchant • 256-Bit SSL Secured</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Navigation
            </h4>
            <div className="space-y-2">
              <a href="#features" className="block hover:text-white transition">Platform Features</a>
              <a href="#categories" className="block hover:text-white transition">Exam Streams</a>
              <a href="#how-it-works" className="block hover:text-white transition">Enrollment Process</a>
              <Link to="/register" className="block text-emerald-400 font-bold hover:text-emerald-300 transition">Register & Pay @ ₹999 &rarr;</Link>
              <a href="#faq" className="block hover:text-white transition">Frequently Asked Questions</a>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Support & Help
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>support@universalmock.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91 1800-MOCK-PASS (Mon-Sat)</span>
              </div>
              <a 
                href="http://localhost:5173/login" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-2 px-3 py-1.5 rounded-lg bg-slate-900 text-indigo-400 hover:text-white text-[11px] font-bold transition"
              >
                Candidate Portal Login &rarr;
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-600">
          <div>
            © {new Date().getFullYear()} Universal Mock Test Technologies Inc. All rights reserved.
          </div>
          <div>
            Payment processed in INR via Cashfree Payment Gateway.
          </div>
        </div>
      </div>
    </footer>
  );
}
