import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import api from '../api/client';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Mail, 
  ExternalLink, 
  ArrowRight, 
  ShieldCheck, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderId) {
      setError('No order ID provided in URL.');
      setLoading(false);
      return;
    }

    let pollCount = 0;
    const maxPolls = 10;

    const checkStatus = async () => {
      try {
        const res = await api.get(`/payments/status/${orderId}?simulate=true`);
        if (res.data.success) {
          setOrder(res.data.order);

          if (res.data.order.status === 'paid') {
            setLoading(false);
            // Trigger celebration confetti
            confetti({
              particleCount: 120,
              spread: 70,
              origin: { y: 0.6 },
            });
            return;
          } else if (res.data.order.status === 'failed' || res.data.order.status === 'expired') {
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error('Status poll error:', err);
      }

      pollCount++;
      if (pollCount < maxPolls) {
        setTimeout(checkStatus, 2000);
      } else {
        setLoading(false);
      }
    };

    checkStatus();
  }, [orderId]);

  const userBaseUrl = import.meta.env.VITE_USER_URL || 'http://localhost:5173';
  const studentLoginUrl = `${userBaseUrl.replace(/\/$/, '')}/login`;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-indigo-600/30">
              U
            </div>
            <span className="font-black text-xl tracking-tight text-slate-900">
              Universal Mock Test
            </span>
          </Link>
        </div>

        {/* Card Body */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
          {loading ? (
            <div className="py-12 space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">
                Verifying Payment with Cashfree...
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Please do not refresh or close this window while we synchronize your transaction.
              </p>
            </div>
          ) : error ? (
            <div className="py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <XCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Transaction Inquiry Error
              </h3>
              <p className="text-xs text-slate-500">
                {error}
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                <span>Return to Homepage</span>
              </Link>
            </div>
          ) : order && order.status === 'paid' ? (
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Payment Successful
                </span>
                <h2 className="text-2xl font-black text-slate-950 mt-2">
                  Welcome to Universal Mock Test!
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Your 1-Year All-Access Pass is now active.
                </p>
              </div>

              {/* Order Info Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order Reference:</span>
                  <span className="font-mono font-bold text-slate-900">{order.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Candidate Name:</span>
                  <span className="font-bold text-slate-900">{order.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Registered Email:</span>
                  <span className="font-bold text-slate-900">{order.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Stream:</span>
                  <span className="font-bold text-indigo-600">{order.category}</span>
                </div>
                {order.occupation && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Occupation:</span>
                    <span className="font-bold text-slate-900">{order.occupation}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-black text-sm text-emerald-600">₹{order.amount}</span>
                </div>
              </div>

              {/* Email Credentials Notice */}
              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-left flex items-start gap-3">
                <Mail className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-xs text-indigo-950 leading-relaxed">
                  <p className="font-bold">Login Credentials Dispatched to Your Email</p>
                  <p className="text-indigo-800/80 mt-0.5">
                    We have sent your temporary password and setup instructions to <strong>{order.email}</strong>. Check your inbox (or spam/promotions folder).
                  </p>
                </div>
              </div>

              {/* CTA Button to User Portal */}
              <div className="space-y-2 pt-2">
                <a
                  href={studentLoginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition flex items-center justify-center gap-2"
                >
                  <span>Launch Student Portal & Log In</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  to="/"
                  className="block text-xs font-semibold text-slate-400 hover:text-slate-600 transition pt-2"
                >
                  &larr; Back to Universal Mock Test Landing Page
                </Link>
              </div>
            </div>
          ) : (
            /* Failed or Expired */
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <XCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  Payment {order?.status === 'expired' ? 'Expired' : 'Incomplete / Failed'}
                </span>
                <h2 className="text-2xl font-black text-slate-950 mt-2">
                  Transaction Not Completed
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  The payment was either cancelled or could not be verified by Cashfree. No amount was permanently deducted.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Registration & Payment</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-400 mt-8">
        Need assistance with your enrollment? Contact <strong>support@universalmock.com</strong>
      </div>
    </div>
  );
}
