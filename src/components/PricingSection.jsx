import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Tag, 
  Clock, 
  Lock, 
  Sparkles,
  Award,
  Users
} from 'lucide-react';

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/25 to-slate-100">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Simple Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            One Pass. Unlimited Possibilities.
          </h2>
          <p className="text-sm text-slate-600">
            No tiered packages or hidden paywalls. A single annual enrollment unlocks the full platform across every examination stream.
          </p>
        </div>

        {/* Masterpiece Pricing Card */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-indigo-800/40 relative overflow-hidden">
          {/* Top highlight badge */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-teal-500 text-slate-950 text-[11px] font-black uppercase tracking-wider px-6 py-1.5 rounded-bl-2xl shadow-md">
            Most Popular • 1-Year All-Inclusive
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Col: Price & CTA (6 cols) */}
            <div className="md:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-800/60 border border-indigo-600/40 text-[11px] font-extrabold text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Universal Examination Pass
              </div>

              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                    ₹999
                  </span>
                  <div>
                    <span className="text-slate-400 line-through text-lg font-bold block">
                      ₹2,999
                    </span>
                    <span className="text-xs font-extrabold text-emerald-400 uppercase">
                      66% Instant Savings
                    </span>
                  </div>
                </div>
                <span className="text-xs text-indigo-300 mt-2 block font-medium">
                  One-time payment • 365 Days Unrestricted Access • No Auto-Debits
                </span>
              </div>

              {/* Coupon Callout Banner */}
              <div className="p-3.5 rounded-2xl bg-indigo-900/60 border border-indigo-700/50 flex items-center gap-3">
                <Tag className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-xs">
                  <span className="text-indigo-200">Use coupon code </span>
                  <strong className="text-white font-mono bg-indigo-800 px-2 py-0.5 rounded-md border border-indigo-600">WELCOME200</strong>
                  <span className="text-indigo-200"> on the registration page for an extra ₹200 OFF! (Pay ₹799)</span>
                </div>
              </div>

              {/* Primary Register & Pay CTA */}
              <div>
                <Link
                  to="/register"
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition transform active:scale-98 flex items-center justify-center gap-2"
                >
                  <span>Proceed to Registration & Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-[11px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Takes 1 minute • 256-bit encrypted Cashfree Gateway
                </p>
              </div>
            </div>

            {/* Right Col: Feature List (6 cols) */}
            <div className="md:col-span-6 bg-slate-800/40 rounded-2xl p-6 border border-slate-700/60 space-y-3.5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-300 mb-2">
                What's Included in Your ₹999 Pass:
              </h4>

              {[
                '100+ Full-Length Mock Exams with TCS/NTA Simulators',
                '10,000+ Practice Questions with Instant AI Solutions',
                'All Streams Included (GATE CS, NEET, JEE, IELTS, DMAT)',
                'Actual Exam Fullscreen Mode with TCS/NTA Interface',
                'Untimed Concept Drills (Topic, Speed, Rigor, Numerical)',
                'Curated formula sheets, cheatsheets, and revision PDFs',
                'Direct Technical & PSU Jobs Board Access',
                'Instant Account Provisioning & Password Delivery',
              ].map((bullet, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
