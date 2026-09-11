import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'What happens immediately after I complete the ₹999 payment?',
    a: 'The moment your payment is confirmed by Cashfree, our automated system provisions your candidate account in MongoDB and dispatches an onboarding email containing your registered email, a secure temporary password, and a direct 1-click link to the student login portal.',
  },
  {
    q: 'Can I access mock tests and practice sets from multiple categories?',
    a: 'Yes! Your ₹999 pass is universal. While you pick a primary stream during signup for tailored dashboard recommendations, you have unrestricted access to all examination streams (GATE CS, NEET, IIT-JEE, IELTS, D-MAT, etc.) throughout your 365-day pass.',
  },
  {
    q: 'How are my login credentials delivered?',
    a: 'Credentials are automatically sent to the email address provided in the signup form. You will be prompted to set your personal password upon your initial login for maximum security.',
  },
  {
    q: 'Are there any recurring auto-debit charges?',
    a: 'No. This is a strict single-time payment of ₹999 (or discounted with a valid coupon). We do not store card recurring mandates or surprise charge your account after 1 year.',
  },
  {
    q: 'What payment methods are supported on Cashfree?',
    a: 'Cashfree supports all standard Indian and international payment methods including UPI (Google Pay, PhonePe, Paytm, BHIM), all Debit and Credit Cards (Visa, MasterCard, RuPay), Net Banking across 50+ banks, and popular wallets.',
  },
  {
    q: 'Can I take mock tests on my mobile phone or tablet?',
    a: 'Yes. The entire platform, including the fullscreen simulator, question palette, untimed practice drills, and jobs board, is fully responsive across desktop laptops, tablets, and smartphones.',
  },
];

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600">
            Everything you need to know about the pass, payment security, and account access.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden transition-all bg-slate-50/50"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-indigo-600 transition"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-indigo-600' : ''
                  }`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
