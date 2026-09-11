import React from 'react';
import { Star, CheckCircle, Quote, TrendingUp } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sneha Patel',
    role: 'GATE Computer Science',
    score: 'AIR 142 • 99.4 Percentile',
    avatar: 'SP',
    avatarBg: 'bg-indigo-600',
    comment: 'The browser fullscreen test simulator replicates the actual TCS iON exam center interface down to the minute. The instant AI diagnostic caught my weak spots in Operating System page replacement algorithms.',
    rating: 5,
  },
  {
    name: 'Dr. Rahul Verma',
    role: 'NEET Medical Examination',
    score: 'Score: 685 / 720',
    avatar: 'RV',
    avatarBg: 'bg-emerald-600',
    comment: 'The untimed practice drills with instant step-by-step concept explanations replaced 3 different bulky reference books. Paying ₹999 for the entire year was the best academic decision I made.',
    rating: 5,
  },
  {
    name: 'Ananya Sengupta',
    role: 'IIT-JEE Advanced',
    score: 'AIR 310 • IIT Bombay CS',
    avatar: 'AS',
    avatarBg: 'bg-amber-600',
    comment: 'The numerical question format and multi-answer questions match the exact unpredictability of JEE Advanced. The performance trajectory analytics kept me honest with my daily speed.',
    rating: 5,
  },
  {
    name: 'Rohan Iyer',
    role: 'IELTS Academic',
    score: 'Overall Band 8.5',
    avatar: 'RI',
    avatarBg: 'bg-blue-600',
    comment: 'Passage snippet comprehension drills and the technical jobs board gave me both exam confidence and immediate internship interviews. Highly recommended for every serious candidate.',
    rating: 5,
  },
];

export default function SocialProof() {
  return (
    <section id="reviews" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Student Outcomes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Trusted by Ambitious Candidates Nationwide
          </h2>
          <p className="text-sm text-slate-600">
            Real feedback from students who converted preparation into top rank selections across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200/60">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    Verified Enrolled Student
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${t.avatarBg} text-white font-extrabold text-xs flex items-center justify-center`}>
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                    <span className="text-[11px] text-slate-500 block">{t.role}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-extrabold text-indigo-600 block">{t.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
