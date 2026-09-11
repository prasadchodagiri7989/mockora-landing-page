import React from 'react';
import { 
  Laptop, 
  Target, 
  BookOpen, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  Maximize2, 
  BrainCircuit, 
  FileText, 
  ShieldCheck 
} from 'lucide-react';

const FEATURES = [
  {
    icon: Laptop,
    badge: 'Real Exam Simulation',
    title: 'Full-Length Timed Mock Tests',
    description: 'Actual test condition replication with browser fullscreen mode, negative marking (+4 / -1), variable question timers, and instant AI score breakdowns.',
    bullets: [
      'Official examination patterns & negative marking',
      'Browser fullscreen lock for zero distractions',
      'Instant percentile ranking & AIR projections',
    ],
    color: 'from-indigo-600 to-indigo-700',
    bgLight: 'bg-indigo-50/70',
  },
  {
    icon: Target,
    badge: 'Stress-Free Practice',
    title: 'Untimed Concept Practice Arena',
    description: 'Solve questions topic-by-topic without clock pressure. Receive immediate step-by-step mathematical reasoning and core concept explanations after every choice.',
    bullets: [
      'Four drill modes: Topic, Speed MCQ, Exam Rigor, Numerical',
      'Immediate answer verification & solution explanations',
      'Personal accuracy and retention streak tracking',
    ],
    color: 'from-emerald-600 to-emerald-700',
    bgLight: 'bg-emerald-50/70',
  },
  {
    icon: BookOpen,
    badge: 'High Yield Library',
    title: 'Curated Study Materials & Cheatsheets',
    description: 'Comprehensive formula sheets, short revision notes, video lectures, and official syllabus summaries curated by previous top rankers.',
    bullets: [
      'Downloadable PDF summaries & key formula sheets',
      'Categorized by subject, chapter, and topic difficulty',
      'Bookmark and build your personal study repository',
    ],
    color: 'from-amber-600 to-amber-700',
    bgLight: 'bg-amber-50/70',
  },
  {
    icon: Briefcase,
    badge: 'Career Placement',
    title: 'Direct Tech & PSU Jobs Board',
    description: 'Access exclusive junior engineering, PSU recruitment, medical residency, and internship opportunities tailored to your qualifying examination score.',
    bullets: [
      'Verified job postings with transparent CTC packages',
      'Direct 1-click external and portal applications',
      'Personal job bookmarking and application tracking',
    ],
    color: 'from-blue-600 to-blue-700',
    bgLight: 'bg-blue-50/70',
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          The 4 Pillars of Success
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Everything You Need to Ace Your Examination
        </h2>
        <p className="text-sm text-slate-600">
          Built from the ground up to replace fragmented test series, expensive coaching institutes, and unverified question PDFs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {FEATURES.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.color} text-white flex items-center justify-center shadow-lg shadow-indigo-600/10`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${feat.bgLight} text-slate-700`}>
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {feat.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-100">
                  {feat.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
