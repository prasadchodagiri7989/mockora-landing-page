import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  HelpCircle, 
  ExternalLink, 
  Mail, 
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  User,
} from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const BACKEND_URL = (import.meta.env.VITE_API_URL || `${(import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000').replace(/\/$/, '')}/api`).replace(/\/$/, '');

const QUICK_FAQS = [
  {
    q: 'What is included in the ₹999 All-Exam Pass?',
    a: 'Your ₹999 pass unlocks unlimited access to all examination streams (JEE, NEET, UPSC, GATE, Banking, SSC, CAT, etc.) for a full year. It includes fullscreen timed simulators, sectional drills, and instant AI concept diagnostics.',
  },
  {
    q: 'How do I get my login credentials after payment?',
    a: 'Immediately after your Cashfree payment is verified, your account is provisioned automatically. Your registered email and temporary password are sent directly to your inbox via email, and also displayed on the payment confirmation screen!',
  },
  {
    q: 'Can I take mock tests on my mobile or tablet?',
    a: 'Yes! Our examination platform is fully responsive and works on Chrome, Safari, and Edge across desktops, laptops, tablets, and mobile devices.',
  },
  {
    q: 'Is there negative marking in the simulators?',
    a: 'Yes! Each test adheres strictly to authentic exam grading rules (e.g. +4 for correct, -1 for wrong answers in NEET/JEE), complete with per-question and overall countdown timers.',
  },
  {
    q: 'How does the AI Weakness Review work?',
    a: 'Upon test submission, our Gemini AI engine evaluates your speed, accuracy, and accuracy-per-concept. It generates personalized recommendations and identifies specific chapters where you need improvement.',
  },
];

const INSTAGRAM_URL = 'https://www.instagram.com/neuvexa.in';

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Local storage email & name
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('mockora_chat_email') || '');
  const [userName, setUserName] = useState(() => localStorage.getItem('mockora_chat_name') || '');
  const [tempEmail, setTempEmail] = useState('');
  const [tempName, setTempName] = useState('');
  const [showEmailPrompt, setShowEmailPrompt] = useState(!localStorage.getItem('mockora_chat_email'));

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! 👋 Welcome to MockOra by NeuVexa. Have any questions regarding registration, test streams, or exam simulators? Enter your email so our support team can reply directly to you!",
      time: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Fetch chat history and admin replies for user email
  const fetchHistory = useCallback(async (email) => {
    const targetEmail = (email || userEmail).trim().toLowerCase();
    if (!targetEmail) return;

    try {
      setLoadingHistory(true);
      const res = await fetch(`${BACKEND_URL}/chat/history?email=${encodeURIComponent(targetEmail)}`);
      const data = await res.json();

      if (data.success && Array.isArray(data.messages)) {
        if (data.messages.length === 0) {
          // No previous messages, leave default welcome
          setMessages([
            {
              id: 'welcome',
              sender: 'bot',
              text: `Welcome back! 👋 No previous chat messages found for ${targetEmail}. Type your query below or pick a quick FAQ to get started.`,
              time: 'Just now',
            },
          ]);
        } else {
          const formatted = [];
          data.messages.forEach((m) => {
            // Visitor's message
            formatted.push({
              id: m._id,
              sender: 'user',
              text: m.message,
              time: m.createdAt
                ? new Date(m.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                : 'Earlier',
            });

            // Admin response if present
            if (m.adminReply) {
              formatted.push({
                id: `${m._id}-reply`,
                sender: 'admin',
                text: m.adminReply,
                time: m.repliedAt
                  ? new Date(m.repliedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                  : 'Replied',
              });
            }
          });
          setMessages(formatted);
        }
      }
    } catch (e) {
      console.warn('Failed to load chat history:', e);
    } finally {
      setLoadingHistory(false);
    }
  }, [userEmail]);

  // When widget is opened, fetch history if email exists
  useEffect(() => {
    if (isOpen && userEmail) {
      fetchHistory(userEmail);
    }
  }, [isOpen, userEmail, fetchHistory]);

  // Auto-poll history every 10 seconds when widget is open to fetch new admin replies
  useEffect(() => {
    if (!isOpen || !userEmail) return;
    const interval = setInterval(() => {
      fetchHistory(userEmail);
    }, 10000);
    return () => clearInterval(interval);
  }, [isOpen, userEmail, fetchHistory]);

  const handleSaveEmail = (e) => {
    e.preventDefault();
    const cleanEmail = tempEmail.trim().toLowerCase();
    if (!cleanEmail || !/\S+@\S+\.\S+/.test(cleanEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    const cleanName = tempName.trim() || cleanEmail.split('@')[0];
    localStorage.setItem('mockora_chat_email', cleanEmail);
    localStorage.setItem('mockora_chat_name', cleanName);
    setUserEmail(cleanEmail);
    setUserName(cleanName);
    setShowEmailPrompt(false);
    fetchHistory(cleanEmail);
  };

  const saveMessageToBackend = async (text, emailToSend) => {
    try {
      const activeEmail = (emailToSend || userEmail || '').trim().toLowerCase();
      const activeName = (userName || activeEmail.split('@')[0] || 'Landing Page Visitor').trim();

      await fetch(`${BACKEND_URL}/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          senderName: activeName,
          senderEmail: activeEmail,
          page: window.location.pathname,
        }),
      });
    } catch (e) {
      // Silent fail — don't disrupt UX if backend is unavailable
    }
  };

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    // If user has not yet entered email, prompt for email
    if (!userEmail) {
      setShowEmailPrompt(true);
    }

    setHasInteracted(true);
    const userMsg = {
      id: 'local-' + Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Save to backend asynchronously
    saveMessageToBackend(query, userEmail);

    // Simulate smart support response
    setTimeout(() => {
      let botResponse = '';
      const lower = query.toLowerCase();

      if (lower.includes('price') || lower.includes('cost') || lower.includes('fee') || lower.includes('₹') || lower.includes('999')) {
        botResponse = 'The MockOra All-Exam Pass is priced at ₹999 (one-time fee). It provides 1 year of unlimited mock tests and practice question banks across all supported streams without hidden fees.';
      } else if (lower.includes('login') || lower.includes('credential') || lower.includes('password') || lower.includes('access')) {
        botResponse = 'Your credentials (email and temporary password) are generated immediately upon successful payment and dispatched to your email via Nodemailer. You can log into the student portal at anytime!';
      } else if (lower.includes('stream') || lower.includes('category') || lower.includes('jee') || lower.includes('neet') || lower.includes('upsc')) {
        botResponse = 'We support all major exam categories including Engineering (JEE Main/Adv), Medical (NEET), Civil Services (UPSC), Banking & SSC, and Management (CAT/XAT). You can switch between categories seamlessly.';
      } else if (lower.includes('refund') || lower.includes('cancel')) {
        botResponse = 'If you experience any technical disruption during enrollment or access activation, reach out to support@mockora.com and our billing team will resolve it within 24 hours.';
      } else if (lower.includes('dmat') || lower.includes('germany') || lower.includes('master')) {
        botResponse = 'We have a dedicated dMAT preparation module! It includes Core Module practice (Figure Sequences, Mathematical Equations, Latin Squares) and General Academic Reasoning — all original questions designed for German Master\'s admission.';
      } else {
        botResponse = userEmail
          ? `Thanks for your inquiry! Our team has received your message. You will see our direct response here in this chat window, and a copy will be emailed to ${userEmail}. For urgent questions, DM us on Instagram @neuvexa.in.`
          : `Thanks for your inquiry! Please enter your email above so our support team can reply directly to you. For urgent queries, DM us on Instagram @neuvexa.in.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 select-none">
      {/* 1. Chat Drawer Window */}
      {isOpen && (
        <div className="mb-3 w-[92vw] sm:w-[390px] h-[560px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 p-4 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center font-black text-white text-base">
                  M
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-indigo-700" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm tracking-tight leading-tight">
                  MockOra Student Support
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-indigo-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Instant &amp; Admin Support</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {userEmail && (
                <button
                  onClick={() => fetchHistory(userEmail)}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-white transition"
                  title="Refresh chat history"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingHistory ? 'animate-spin' : ''}`} />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-white transition"
                title="Minimize Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Email Info Bar / Email Prompt Banner */}
          {userEmail && !showEmailPrompt ? (
            <div className="px-3.5 py-1.5 bg-indigo-50/80 dark:bg-slate-800/80 border-b border-indigo-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="truncate">
                  Chatting as: <strong className="text-indigo-600 dark:text-indigo-400">{userEmail}</strong>
                </span>
              </div>
              <button
                onClick={() => {
                  setTempEmail(userEmail);
                  setTempName(userName);
                  setShowEmailPrompt(true);
                }}
                className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0 ml-2"
              >
                Change
              </button>
            </div>
          ) : (
            <div className="p-3 bg-amber-50 dark:bg-slate-800/90 border-b border-amber-200 dark:border-slate-700 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-[11px] text-amber-900 dark:text-amber-200 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Enter email to save history &amp; receive replies:</span>
                </span>
                {userEmail && (
                  <button onClick={() => setShowEmailPrompt(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <form onSubmit={handleSaveEmail} className="space-y-1.5">
                <div className="flex gap-1.5">
                  <input
                    type="email"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shrink-0"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-slate-950/40 text-xs">
            {messages.map((msg, idx) => {
              // 1. User message (Right-aligned)
              if (msg.sender === 'user') {
                return (
                  <div key={msg.id || idx} className="flex flex-col items-end">
                    <div className="max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed bg-indigo-600 text-white rounded-br-xs shadow-xs font-medium">
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 px-1">You • {msg.time}</span>
                  </div>
                );
              }

              // 2. Admin direct reply (Left-aligned, prominent highlight)
              if (msg.sender === 'admin') {
                return (
                  <div key={msg.id || idx} className="flex flex-col items-start w-full">
                    <div className="max-w-[90%] rounded-2xl rounded-bl-xs p-3.5 bg-gradient-to-tr from-emerald-50 via-teal-50 to-indigo-50 dark:from-emerald-950/60 dark:via-slate-900 dark:to-indigo-950/60 border-2 border-emerald-400/80 dark:border-emerald-600 shadow-md shadow-emerald-500/10 text-slate-900 dark:text-slate-100">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-extrabold tracking-wider uppercase flex items-center gap-1 shadow-xs">
                          <ShieldCheck className="w-3 h-3" />
                          <span>MockOra Support Team</span>
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed whitespace-pre-wrap font-semibold text-slate-800 dark:text-slate-100">
                        {msg.text}
                      </p>
                    </div>
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold mt-1 px-1 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>Direct Admin Reply • {msg.time}</span>
                    </span>
                  </div>
                );
              }

              // 3. Automated bot message (Left-aligned)
              return (
                <div key={msg.id || idx} className="flex flex-col items-start">
                  <div className="max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-bl-xs shadow-2xs">
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">Support Assistant • {msg.time}</span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1 p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            {/* Quick FAQs section */}
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Frequently Asked Questions:
              </span>
              <div className="flex flex-col gap-1.5">
                {QUICK_FAQS.map((faq, fIdx) => (
                  <button
                    key={fIdx}
                    onClick={() => handleSendMessage(faq.q)}
                    className="text-left px-3 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 font-medium transition flex items-center justify-between group"
                  >
                    <span>{faq.q}</span>
                    <span className="text-indigo-500 opacity-0 group-hover:opacity-100 transition text-[10px]">
                      Ask &rarr;
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Instagram Contact */}
            <div className="pt-1 space-y-2">
              <p className="text-[10px] text-slate-400 text-center">
                Didn't get a response? Reach us directly on Instagram:
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>@neuvexa.in on Instagram</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            </div>

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={userEmail ? "Ask a question about MockOra..." : "Enter message (email requested above)..."}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white transition shadow-xs"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Floating Action Button */}
      <div className="flex items-center gap-2.5 justify-end">
        {!isOpen && !hasInteracted && (
          <div 
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-bold shadow-lg cursor-pointer hover:border-indigo-400 transition animate-bounce"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Have queries? Chat with us!</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white flex items-center justify-center shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition group relative"
          title={isOpen ? 'Close Chat' : 'Chat for queries'}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 group-hover:scale-110 transition" />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
