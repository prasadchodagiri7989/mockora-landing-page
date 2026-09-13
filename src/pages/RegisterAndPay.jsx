import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/client';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Tag, 
  AlertCircle, 
  Lock, 
  Sparkles, 
  ArrowLeft,
  Briefcase,
  User,
  Mail,
  Phone,
  GraduationCap
} from 'lucide-react';

const FALLBACK_CATEGORIES = [
  'dMAT General Academic',
  'DMAT for Germany',
  'Computer Science & GATE',
  'Medical NEET',
  'IIT-JEE Main & Advanced',
  'IELTS English Mastery',
  'NIT & Engineering Entrance',
  'Management CAT & GMAT',
  'UPSC Civil Services CSAT'
];

const OCCUPATION_OPTIONS = [
  'College Student (Undergraduate)',
  'School Student (Class 11 / 12)',
  'Full-Time Exam Aspirant / Dropper',
  'Working Professional',
  'Graduate / Master’s Student',
  'Other / Self-Taught'
];

export default function RegisterAndPay() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryCategory = searchParams.get('category') || '';

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [occupation, setOccupation] = useState(OCCUPATION_OPTIONS[0]);
  const [category, setCategory] = useState(queryCategory || '');
  const [couponCode, setCouponCode] = useState('');

  // Categories list
  const [categories, setCategories] = useState([]);

  // Coupon State
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [couponApplied, setCouponApplied] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Load categories from backend
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await api.get('/categories');
        if (res.data.success && res.data.categories?.length > 0) {
          const catNames = res.data.categories.map(c => c.name);
          setCategories(catNames);
          if (!category) {
            setCategory(queryCategory || catNames[0]);
          }
        } else {
          setCategories(FALLBACK_CATEGORIES);
          if (!category) setCategory(queryCategory || FALLBACK_CATEGORIES[0]);
        }
      } catch (err) {
        setCategories(FALLBACK_CATEGORIES);
        if (!category) setCategory(queryCategory || FALLBACK_CATEGORIES[0]);
      }
    };
    fetchCats();
  }, []);

  const basePrice = 999;
  const currentPrice = couponApplied ? couponApplied.finalAmount : basePrice;
  const savings = basePrice - currentPrice;

  // Coupon Validation
  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setValidatingCoupon(true);
    setCouponError('');

    try {
      const res = await api.post('/payments/validate-coupon', {
        code: couponCode.trim(),
      });

      if (res.data.success && res.data.valid) {
        setCouponApplied({
          code: res.data.code,
          discountAmount: res.data.discountAmount,
          finalAmount: res.data.finalAmount,
        });
        setCouponError('');
      } else {
        setCouponApplied(null);
        setCouponError(res.data.message || 'Invalid or expired coupon code');
      }
    } catch (err) {
      setCouponApplied(null);
      setCouponError(err.response?.data?.message || 'Invalid or expired coupon code');
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(null);
    setCouponCode('');
    setCouponError('');
  };

  // Submit Order & Trigger Cashfree Gateway
  const handlePay = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }
    const cleanPhone = mobile.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setFormError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!category) {
      setFormError('Please choose your target examination stream.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await api.post('/payments/create-order', {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        mobile: cleanPhone,
        occupation: occupation.trim(),
        category: category.trim(),
        couponCode: couponApplied ? couponApplied.code : '',
      });

      if (res.data.success && res.data.paymentSessionId) {
        const orderId = res.data.orderId;
        const paymentSessionId = res.data.paymentSessionId;

        // In simulated sandbox or if Cashfree modal is available
        if (res.data.simulated || !window.Cashfree) {
          // Direct simulated transition to status check
          window.location.href = `/payment/status?order_id=${orderId}`;
          return;
        }

        const paymentMode = (res.data.environment || import.meta.env.VITE_CASHFREE_ENV || 'sandbox').toLowerCase() === 'production' ? 'production' : 'sandbox';
        const cashfree = window.Cashfree({
          mode: paymentMode,
        });

        cashfree.checkout({
          paymentSessionId,
          redirectTarget: '_modal',
        }).then((result) => {
          if (result.error) {
            console.warn('Cashfree modal closed:', result.error);
            window.location.href = `/payment/status?order_id=${orderId}`;
          }
          if (result.paymentDetails || result.redirect) {
            window.location.href = `/payment/status?order_id=${orderId}`;
          }
        }).catch((err) => {
          console.error('Modal error:', err);
          window.location.href = `/payment/status?order_id=${orderId}`;
        });
      } else {
        setFormError('Failed to initialize gateway order. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setFormError(err.response?.data?.message || 'Payment initiation failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 py-4 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-1 group-hover:text-indigo-600 transition" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
                U
              </div>
              <span className="font-extrabold text-slate-900 tracking-tight text-sm sm:text-base">
                Universal Mock Test
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Secured Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Plan Benefits & Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-7 shadow-xl border border-indigo-800/40 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-800/60 border border-indigo-600/40 text-[11px] font-extrabold text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                1-Year Candidate Pass
              </div>

              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">
                  Universal Examination Pass
                </h2>
                <p className="text-xs text-indigo-200/80 mt-1 leading-relaxed">
                  Full 365-day unrestricted access across all mock exams, untimed practice sets, study materials, and technical job pipelines.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-900/60 border border-indigo-700/50 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-300 block">Total Payable:</span>
                  <span className="text-3xl font-black text-white">₹{currentPrice}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through block">₹2,999</span>
                  <span className="text-xs font-bold text-emerald-400">
                    {savings > 0 ? `Save ₹${2000 + savings}` : '66% Discount'}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  '100+ Full-Length Mock Exams with TCS/NTA Simulators',
                  '10,000+ Practice Questions with Instant AI Step-by-Step Solutions',
                  'Instant percentile ranking & Projected AIR rank',
                  'All Streams Included (GATE CS, NEET, JEE, IELTS, DMAT)',
                  'Curated formula sheets, cheatsheets, and revision PDFs',
                  'Direct Technical & PSU Jobs Board Access',
                  'Instant Account Provisioning & Password Delivery',
                ].map((bullet, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-indigo-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Candidate Testimonial quote snippet */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 shadow-xs space-y-2">
              <div className="flex items-center gap-1 text-amber-400">
                {'★★★★★'}
              </div>
              <p className="italic">
                "The fullscreen examination simulator and AIR percentile analytics gave me the exact rigor needed to score AIR 142 in GATE CS."
              </p>
              <div className="font-bold text-slate-900 text-[11px]">
                — Sneha Patel, GATE CS Ranker
              </div>
            </div>
          </div>

          {/* Right Column: Registration & Payment Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-9 border border-slate-200 shadow-xl space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                Step 1 of 1 • Complete Enrollment
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-2">
                Candidate Registration & Payment
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Fill in your candidate details below to initialize your secure Cashfree payment.
              </p>
            </div>

            {formError && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handlePay} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-600" />
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-600" />
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com (Your account password will be sent here)"
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Ensure this email is accessible. We email temporary login credentials immediately upon payment.
                </p>
              </div>

              {/* Mobile Number & Occupation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-indigo-600" />
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-slate-50 focus-within:ring-2 focus-within:ring-indigo-500">
                    <span className="px-3 py-2.5 text-xs font-bold bg-slate-100 text-slate-600 border-r border-slate-200">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="9876543210"
                      className="w-full px-3 py-2.5 text-xs bg-transparent text-slate-900 font-medium focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                    Occupation <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    {OCCUPATION_OPTIONS.map((occ, i) => (
                      <option key={i} value={occ}>{occ}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Target Examination Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                  Primary Examination Stream <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  {categories.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Sets your default dashboard stream. You still have unlimited access to all other streams.
                </p>
              </div>

              {/* Coupon Code Row */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-indigo-600" />
                  Apply Discount Coupon
                </label>

                {couponApplied ? (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs animate-fadeIn">
                    <div className="flex items-center gap-2 text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>
                        Coupon <strong>{couponApplied.code}</strong> applied! You saved <strong>₹{couponApplied.discountAmount}</strong>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-xs text-rose-600 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="e.g. WELCOME200 or SUPER50"
                      className="flex-1 px-4 py-2 text-xs uppercase font-mono rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      disabled={validatingCoupon || !couponCode.trim()}
                      onClick={handleApplyCoupon}
                      className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold transition"
                    >
                      {validatingCoupon ? 'Checking...' : 'Apply'}
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="text-[11px] text-rose-600 mt-1.5 font-medium">
                    {couponError}
                  </p>
                )}

                <p className="text-[10px] text-slate-400 mt-1">
                  Tip: Use coupon code <strong>WELCOME200</strong> to get ₹200 instant off.
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>1-Year All-Exam Simulator Pass:</span>
                  <span>₹{basePrice}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount ({couponApplied.code}):</span>
                    <span>-₹{couponApplied.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-2 border-t border-slate-200">
                  <span>Final Amount Payable:</span>
                  <span className="text-indigo-600 font-black text-lg">₹{currentPrice}</span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition transform active:scale-98 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Connecting Cashfree Payment Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹{currentPrice} & Complete Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center">
                <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Processed securely by Cashfree PG (UPI, Cards, NetBanking supported)
                </span>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="py-6 border-t border-slate-200 text-center text-xs text-slate-400 bg-white">
        © {new Date().getFullYear()} Universal Mock Test Technologies Inc. • Need help? support@universalmock.com
      </footer>
    </div>
  );
}
