import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Tag, 
  AlertCircle, 
  Clock, 
  Lock, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

const FALLBACK_CATEGORIES = [
  'Computer Science & GATE',
  'Medical NEET',
  'IIT-JEE Main & Advanced',
  'IELTS English Mastery',
  'D-MAT Dental Aptitude',
  'NIT & Engineering Entrance',
  'Management CAT & GMAT',
  'UPSC Civil Services CSAT'
];

export default function PricingAndSignup({ preselectedCategory }) {
  // Form Inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [category, setCategory] = useState(preselectedCategory || '');
  const [couponCode, setCouponCode] = useState('');

  // Categories list from backend
  const [categories, setCategories] = useState([]);

  // Coupon State
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [couponApplied, setCouponApplied] = useState(null); // { code, discountAmount, finalAmount }
  const [couponError, setCouponError] = useState('');

  // Order Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Fetch categories from backend API
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await api.get('/categories');
        if (res.data.success && res.data.categories?.length > 0) {
          setCategories(res.data.categories.map(c => c.name));
          if (!category) setCategory(res.data.categories[0].name);
        } else {
          setCategories(FALLBACK_CATEGORIES);
          if (!category) setCategory(FALLBACK_CATEGORIES[0]);
        }
      } catch (err) {
        setCategories(FALLBACK_CATEGORIES);
        if (!category) setCategory(FALLBACK_CATEGORIES[0]);
      }
    };
    fetchCats();
  }, []);

  // Update category if user clicks a category card above
  useEffect(() => {
    if (preselectedCategory) {
      setCategory(preselectedCategory);
    }
  }, [preselectedCategory]);

  const basePrice = 999;
  const currentPrice = couponApplied ? couponApplied.finalAmount : basePrice;
  const savings = basePrice - currentPrice;

  // Handle Coupon Validation
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
        setCouponError(res.data.message || 'Invalid or expired coupon');
      }
    } catch (err) {
      setCouponApplied(null);
      setCouponError(err.response?.data?.message || 'Invalid or expired coupon');
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(null);
    setCouponCode('');
    setCouponError('');
  };

  // Handle Order Creation & Cashfree Checkout
  const handlePay = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validation
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
      setFormError('Please select an examination category.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await api.post('/payments/create-order', {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        mobile: cleanPhone,
        category,
        couponCode: couponApplied ? couponApplied.code : '',
      });

      if (res.data.success && res.data.paymentSessionId) {
        const orderId = res.data.orderId;
        const paymentSessionId = res.data.paymentSessionId;

        // Trigger Cashfree Drop-in Checkout Modal
        if (window.Cashfree) {
          const cashfree = window.Cashfree({
            mode: 'sandbox', // sandbox or production
          });

          cashfree.checkout({
            paymentSessionId,
            redirectTarget: '_modal', // in-page drop-in modal checkout
          }).then((result) => {
            if (result.error) {
              console.warn('Cashfree modal closed or error:', result.error);
              window.location.href = `/payment/status?order_id=${orderId}`;
            }
            if (result.redirect) {
              console.log('Redirecting to order return URL...');
            }
            if (result.paymentDetails) {
              console.log('Payment completed:', result.paymentDetails);
              window.location.href = `/payment/status?order_id=${orderId}`;
            }
          }).catch((modalErr) => {
            console.error('Checkout error:', modalErr);
            window.location.href = `/payment/status?order_id=${orderId}`;
          });
        } else {
          // If Cashfree script is blocked or in local simulated test
          window.location.href = `/payment/status?order_id=${orderId}`;
        }
      } else {
        setFormError('Failed to initialize payment session. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Order creation error:', err);
      setFormError(err.response?.data?.message || 'Payment initiation failed. Please check details.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-slate-100">
      {/* Glow mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Transparent Pricing • Instant Onboarding
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Claim Your 1-Year All-Access Pass
          </h2>
          <p className="text-sm text-slate-600">
            One single payment. Unlimited mock tests, untimed drills, study materials, and job portal access for 365 days.
          </p>
        </div>

        {/* Pricing Card & Signup Form Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: What You Get / Value Proposition (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-8 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-800/80 border border-indigo-600/50 text-[11px] font-extrabold text-indigo-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                All-Inclusive Candidate Pass
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white">
                    ₹{currentPrice}
                  </span>
                  <span className="text-slate-400 line-through text-lg font-bold">
                    ₹2,999
                  </span>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    {savings > 0 ? `Save ₹${2000 + savings}` : '66% OFF'}
                  </span>
                </div>
                <span className="text-xs text-indigo-300 mt-1 block">
                  365 Days Access • No Recurring Auto-Debits
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  '100+ Full-Length Mock Exams across all streams',
                  '10,000+ Practice Questions with Instant AI Solutions',
                  'Actual TCS iON & NTA Interface Simulation (Fullscreen)',
                  'Complete negative marking & AIR rank projection',
                  'Curated formula sheets & revision PDFs',
                  'Direct Technical & PSU Jobs Board Access',
                  'Instant Account Provisioning & Password Delivery',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-indigo-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-indigo-800/60 flex items-center justify-between text-[11px] text-indigo-300">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Cashfree 256-Bit SSL
              </span>
              <span>100% Secure Checkout</span>
            </div>
          </div>

          {/* Right: Signup & Payment Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl flex flex-col justify-between">
            <form onSubmit={handlePay} className="space-y-5">
              <div>
                <h3 className="text-xl font-black text-slate-950 tracking-tight">
                  Enrollment & Checkout
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your login credentials will be emailed to this address upon successful payment.
                </p>
              </div>

              {formError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
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
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com (Login credentials will be sent here)"
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Mobile Number & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Stream <span className="text-rose-500">*</span>
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
                </div>
              </div>

              {/* Coupon Code Row */}
              <div className="pt-1">
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-indigo-600" />
                  Have a Discount Coupon?
                </label>

                {couponApplied ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
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
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold transition"
                    >
                      {validatingCoupon ? 'Validating...' : 'Apply'}
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="text-[11px] text-rose-600 mt-1 font-medium">
                    {couponError}
                  </p>
                )}

                <p className="text-[10px] text-slate-400 mt-1">
                  Tip: Use code <strong>WELCOME200</strong> for ₹200 instant off.
                </p>
              </div>

              {/* Price Summary Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>1-Year Universal Candidate Pass:</span>
                  <span>₹{basePrice}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Promotional Discount:</span>
                    <span>-₹{couponApplied.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-2 border-t border-slate-200">
                  <span>Total Amount Payable:</span>
                  <span className="text-indigo-600 font-black text-base">₹{currentPrice}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition transform active:scale-98 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Connecting Cashfree Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹{currentPrice} & Unlock Instant Access</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center">
                <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Processed securely by Cashfree PG • Instant email confirmation
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
