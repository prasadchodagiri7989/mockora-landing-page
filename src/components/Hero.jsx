import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Award, 
  ShieldCheck, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Zap, 
  Star 
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Ambient gradient mesh background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-indigo-200/50 via-purple-200/30 to-emerald-200/40 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-bold text-amber-900">
              Limited Offer: 1-Year All-Access Pass • Flat ₹999 Only
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
            One Platform. <br />
            <span className="gradient-text">Every Exam. Every Edge.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Conquer GATE Computer Science, NEET Medical, IIT-JEE, IELTS, DMAT, and government examinations with full-length timed simulators, instant AI score diagnostics, untimed topic drills, and verified technical job openings.
          </p>

          {/* Call to Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/40 transition transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Register & Pay ₹999 (Instant Access)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#categories"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 shadow-xs transition flex items-center justify-center gap-2"
            >
              <span>Explore 8+ Examination Streams</span>
            </a>
          </div>

          {/* Trust proof bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Instant Auto-Provisioning</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Credentials Emailed in 30 Seconds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Cashfree Secure Checkout</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Visual: Dashboard & Exam Simulator Mockup */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          {/* Outer glow frame */}
          <div className="relative rounded-3xl p-3 bg-gradient-to-b from-indigo-500/20 via-slate-200/50 to-transparent border border-indigo-200/60 shadow-2xl shadow-indigo-500/10">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
              {/* Browser bar */}
              <div className="h-10 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[11px] text-slate-500 font-mono hidden sm:inline">
                    https://universalmock.com/test-taking/gate-cs-grand-simulator
                  </span>
                </div>
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Exam Simulator Session
                </div>
              </div>

              {/* Mockup content: Split test interface */}
              <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                {/* Left 2 Cols: Question Panel */}
                <div className="lg:col-span-2 space-y-5 bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-950 text-indigo-400 font-bold">
                      GATE Computer Science • Data Structures
                    </span>
                    <span className="text-slate-400 font-mono">
                      +4 Marks / -1 Mark
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                    Q12. What is the tight worst-case time complexity of finding the k-th smallest element in an unsorted array of n elements using the QuickSelect algorithm?
                  </h3>

                  <div className="space-y-2.5 pt-2">
                    <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-800/40 text-slate-300 text-xs font-medium">
                      A. O(n log n)
                    </div>
                    <div className="p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-950/40 text-emerald-200 text-xs font-bold flex items-center justify-between">
                      <span>B. O(n²) worst case, O(n) average case</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-800/40 text-slate-300 text-xs font-medium">
                      C. O(log n)
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-800/40 text-slate-300 text-xs font-medium">
                      D. O(n log k)
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-indigo-950/60 border border-indigo-800/60 text-xs text-indigo-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span><strong>AI Diagnostic:</strong> Correct! QuickSelect has linear expected time O(n), but degrades to O(n²) with bad pivots.</span>
                  </div>
                </div>

                {/* Right 1 Col: Score and Analytics Badge */}
                <div className="space-y-4 flex flex-col justify-between">
                  <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Exam Timer</span>
                      <span className="text-sm font-mono font-bold text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800">
                        01:42:18
                      </span>
                    </div>

                    <div className="border-t border-slate-800 pt-4 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Questions Answered:</span>
                        <span className="text-white font-bold">54 / 65</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Projected Percentile:</span>
                        <span className="text-emerald-400 font-extrabold">99.2%ile</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">AIR Rank Projection:</span>
                        <span className="text-indigo-400 font-bold">Top 85</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-2xl p-5 shadow-lg space-y-2 text-xs">
                    <div className="font-extrabold text-sm flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-300" />
                      ₹999 Master Pass
                    </div>
                    <p className="text-indigo-100/90 text-[11px] leading-relaxed">
                      Includes 100+ full mocks, 10,000+ practice questions, instant step-by-step solution breakdowns, and verified exam jobs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Metric Badges */}
          <div className="absolute -bottom-6 -left-4 sm:left-6 glass-panel border border-slate-200/80 rounded-2xl p-4 shadow-xl flex items-center gap-3 animate-float hidden sm:flex">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">+28.4 Marks</span>
              <span className="text-[11px] text-slate-500">Average Candidate Gain</span>
            </div>
          </div>

          <div className="absolute -top-6 -right-4 sm:right-6 glass-panel border border-slate-200/80 rounded-2xl p-4 shadow-xl flex items-center gap-3 animate-float hidden sm:flex">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
              <Star className="w-5 h-5 fill-white" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">4.92 / 5 Stars</span>
              <span className="text-[11px] text-slate-500">Over 1,200 Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
