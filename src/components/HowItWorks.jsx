import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Mail, Trophy, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: CreditCard,
    title: 'Sign Up & Pay ₹999',
    description: 'Enter your basic details, select your primary examination stream, and complete checkout through Cashfree PG (UPI, Cards, NetBanking supported).',
    highlight: 'Instant & 100% Secure',
  },
  {
    step: '02',
    icon: Mail,
    title: 'Credentials Emailed in Seconds',
    description: 'Our system auto-creates your dedicated candidate account and immediately emails your temporary login credentials and direct portal link.',
    highlight: 'Instant Inbox Delivery',
  },
  {
    step: '03',
    icon: Trophy,
    title: 'Simulate, Practice & Ace',
    description: 'Log into the student portal, enter fullscreen mock test sessions, evaluate weak concepts with AI analysis, and achieve top ranks.',
    highlight: 'Full 1-Year Access',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative ambient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            How You Get Started in Under 2 Minutes
          </h2>
          <p className="text-sm text-slate-400">
            No waiting for manual activation. Our automated provisioning system activates your account the moment payment is confirmed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-8 flex flex-col justify-between hover:border-indigo-500 transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-3xl font-black text-slate-600 group-hover:text-indigo-400 transition">
                      {s.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{s.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA banner below steps */}
        <div className="mt-14 text-center">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 transition transform active:scale-95"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Join 12,000+ Students • Register & Pay @ ₹999</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
