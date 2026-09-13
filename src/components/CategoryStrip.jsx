import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Stethoscope, 
  Atom, 
  Languages, 
  Briefcase, 
  BookOpen, 
  GraduationCap, 
  Activity,
  ArrowUpRight,
  Globe
} from 'lucide-react';

const CATEGORIES = [
  {
    name: 'Computer Science & GATE',
    icon: Code2,
    color: '#4F46E5',
    tag: 'Trending Stream',
    tests: '45+ Tests',
    questions: '4,500+ Questions',
    desc: 'Algorithms, Data Structures, Operating Systems, Computer Networks, and DBMS.',
  },
  {
    name: 'Medical NEET',
    icon: Stethoscope,
    color: '#059669',
    tag: 'High Yield',
    tests: '60+ Tests',
    questions: '6,200+ Questions',
    desc: 'NCERT Biology, Organic Chemistry, and NEET Clinical Problem Solving.',
  },
  {
    name: 'IIT-JEE Main & Advanced',
    icon: Atom,
    color: '#D97706',
    tag: 'Top Ranked',
    tests: '50+ Tests',
    questions: '5,000+ Questions',
    desc: 'Rotational Dynamics, Integral Calculus, Electrostatics, and Physical Chemistry.',
  },
  {
    name: 'IELTS English Mastery',
    icon: Languages,
    color: '#2563EB',
    tag: 'Global Study',
    tests: '30+ Tests',
    questions: '2,800+ Questions',
    desc: 'Timed Reading Comprehension, Listening Passages, and Academic Vocabulary.',
  },
  {
    name: 'DMAT for Germany',
    icon: Globe,
    color: '#0284C7',
    tag: 'Study in Germany',
    tests: '25+ Tests',
    questions: '2,200+ Questions',
    desc: 'Mathematical Equations, Figure Sequences, Text Reasoning, and Cognitive Aptitude for German University Admissions.',
  },
  {
    name: 'NIT & Engineering Entrance',
    icon: GraduationCap,
    color: '#7C3AED',
    tag: 'State & National',
    tests: '35+ Tests',
    questions: '3,400+ Questions',
    desc: 'Speed-based Quantitative Aptitude, Logical Reasoning, and Core Physics.',
  },
];

export default function CategoryStrip({ onSelectCategory }) {
  return (
    <section id="categories" className="py-20 bg-slate-100/60 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Comprehensive Curricula
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            One All-Access Pass Covers Every Major Stream
          </h2>
          <p className="text-sm text-slate-600">
            You don't need separate subscriptions for different exams. Your ₹999 pass unlocks full test series across all streams with zero hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-xl hover:border-indigo-400 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                      style={{ backgroundColor: cat.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {cat.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>

                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
                    <span className="text-indigo-600 font-bold">{cat.tests}</span>
                    <span>•</span>
                    <span>{cat.questions}</span>
                  </div>
                </div>

                <Link
                  to={`/register?category=${encodeURIComponent(cat.name)}`}
                  className="mt-5 pt-3 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition"
                >
                  <span>Select Stream & Register @ ₹999</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
