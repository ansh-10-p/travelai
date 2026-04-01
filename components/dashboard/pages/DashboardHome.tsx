"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
 import { AppProvider, useApp } from '../../travel/AppContext';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 20, className = "" }: { d: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);

const icons = {
  map:      "M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3V7z M9 4v13 M15 7v13",
  check:    "M20 6L9 17l-5-5",
  hotel:    "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  heart:    "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  arrow:    "M5 12h14 M12 5l7 7-7 7",
  plane:    "M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z",
  chart:    "M18 20V10 M12 20V4 M6 20v-6",
  globe:    "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  bookmark: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
  sparkle:  "M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z M5 15l.75 2.25L8 18l-2.25.75L5 21l-.75-2.25L2 18l2.25-.75L5 15z",
};

// ─── Types ────────────────────────────────────────────────────────────────────
type Plan = "smart" | "budget" | "premium";

// ─── Static Data ──────────────────────────────────────────────────────────────
const TRIPS = [
  { id: 1, city: "Paris",     country: "France", dates: "Apr 11 – Apr 18", daysLeft: 12,  emoji: "🗼", bg: "from-rose-900 to-orange-800", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", status: "upcoming" },
  { id: 2, city: "Kyoto",     country: "Japan",  dates: "Jun 3 – Jun 10",  daysLeft: 65,  emoji: "⛩️", bg: "from-pink-900 to-violet-800", image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80", status: "planning" },
  { id: 3, city: "Santorini", country: "Greece", dates: "Aug 20 – Aug 28", daysLeft: 143, emoji: "🏛️", bg: "from-sky-900 to-blue-800",   image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80", status: "wishlist" },
];

const NEXT_ACTIONS = [
  { id: 1, icon: "check", label: "Complete Itinerary", sub: "3 of 7 days planned",  progress: 43, color: "from-orange-400 to-pink-500",  cta: "Continue" },
  { id: 2, icon: "hotel", label: "Book Hotel",         sub: "2 options shortlisted", progress: 20, color: "from-amber-400 to-orange-500", cta: "View"     },
  { id: 3, icon: "users", label: "Invite Friends",     sub: "Share your Paris trip", progress: 0,  color: "from-rose-400 to-pink-600",    cta: "Invite"   },
];

const AI_SUGGESTIONS = [
  { dest: "Bali",      emoji: "🌴", reason: "You loved Southeast Asia last year", match: 94, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80" },
  { dest: "Amalfi",    emoji: "🍋", reason: "Similar to your Santorini wishlist", match: 87, img: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=400&q=80" },
  { dest: "Reykjavík", emoji: "🌌", reason: "Northern lights season incoming",    match: 79, img: "https://images.unsplash.com/photo-1474690870753-1b92efa1f2d8?w=400&q=80" },
];

const ACTIVITY = [
  { time: "2h ago",     text: "Added Montmartre to Day 3 itinerary",    icon: "map",     color: "bg-orange-400" },
  { time: "Yesterday",  text: "Sneha saved Musée d'Orsay to wishlist",  icon: "heart",   color: "bg-pink-400"   },
  { time: "2 days ago", text: "Booked CDG → BOM flight return",         icon: "plane",   color: "bg-amber-400"  },
  { time: "4 days ago", text: "Created Paris trip with 4 days planned", icon: "sparkle", color: "bg-rose-400"   },
];

const INSIGHTS = [
  { value: "18",  label: "countries explored", sub: "+3 this year"      },
  { value: "47",  label: "nights abroad",       sub: "across 12 trips"  },
  { value: "May", label: "most active month",   sub: "4 trips taken"    },
  { value: "9.2", label: "avg trip rating",     sub: "from your reviews"},
];

// ─── Budget Optimizer Data ────────────────────────────────────────────────────
const BUDGET_TOTAL = 80000;

const FLIGHT_OPTIONS = [
  { provider: "IndiGo",    logo: "6E", price: 14200, rating: 4.1, duration: "9h 15m", stops: "1 stop",   tag: "cheapest",   tagColor: "bg-emerald-500", logoBg: "#003580" },
  { provider: "Air India", logo: "AI", price: 17800, rating: 4.4, duration: "8h 30m", stops: "Non-stop", tag: "best value", tagColor: "bg-orange-500",  logoBg: "#e31837" },
  { provider: "Emirates",  logo: "EK", price: 22500, rating: 4.8, duration: "9h 45m", stops: "1 stop",   tag: "premium",    tagColor: "bg-rose-600",    logoBg: "#c8102e" },
];

const HOTEL_OPTIONS = [
  { provider: "Booking.com", name: "Ibis Paris Centre", price: 3200, rating: 4.0, tag: "cheapest",   tagColor: "bg-emerald-500", logo: "B", logoBg: "#003580" },
  { provider: "Airbnb",      name: "Montmartre Studio", price: 3900, rating: 4.7, tag: "best value", tagColor: "bg-orange-500",  logo: "A", logoBg: "#FF5A5F" },
  { provider: "Hotels.com",  name: "Hotel du Louvre",   price: 6800, rating: 4.9, tag: "premium",    tagColor: "bg-rose-600",    logo: "H", logoBg: "#e31837" },
];

const PLANS = {
  smart: {
    label: "Smart Plan", emoji: "⚡",
    total: 72500, savings: 7500,
    flight: FLIGHT_OPTIONS[1], hotel: HOTEL_OPTIONS[1],
    food: 12000, activities: 9800,
    why: "Best-rated hotel + direct flight = max comfort within budget",
    color: "from-orange-500 to-pink-500",
  },
  budget: {
    label: "Budget Plan", emoji: "💰",
    total: 58400, savings: 21600,
    flight: FLIGHT_OPTIONS[0], hotel: HOTEL_OPTIONS[0],
    food: 9000, activities: 6000,
    why: "Cheapest options across all categories — maximises savings",
    color: "from-emerald-500 to-teal-500",
  },
  premium: {
    label: "Premium Plan", emoji: "✨",
    total: 88900, savings: -8900,
    flight: FLIGHT_OPTIONS[2], hotel: HOTEL_OPTIONS[2],
    food: 18000, activities: 14000,
    why: "5-star experience with direct Emirates flight & luxury hotel",
    color: "from-violet-500 to-fuchsia-500",
  },
};

const AI_TIPS = [
  { icon: "📅", tip: "Shift dates to Apr 14–21",       savings: "Save ₹5,000", reason: "Lower demand midweek",                     actionable: true  },
  { icon: "🏠", tip: "IndiGo → Air India upgrade",     savings: "₹3,600 more", reason: "Direct flight saves 45 mins + bags incl.", actionable: false },
  { icon: "🍽️", tip: "Eat near Bastille, not Marais", savings: "Save ₹2,200", reason: "Same cuisine, 40% lower prices",            actionable: true  },
  { icon: "🎟️", tip: "Museum Pass over single entry", savings: "Save ₹1,800", reason: "Covers Louvre + Orsay + Versailles",        actionable: true  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const stagger = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
});

const Tag = ({ label, colorClass }: { label: string; colorClass: string }) => (
  <span className={`${colorClass} text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full`}>{label}</span>
);

const ProviderLogo = ({ letter, bg }: { letter: string; bg: string }) => (
  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{ background: bg }}>
    {letter}
  </div>
);

const Stars = ({ rating }: { rating: number }) => (
  <span className="text-amber-400 text-xs">
    {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
    <span className="text-gray-400 ml-1">{rating}</span>
  </span>
);

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1000, 1);
      setDisplay(Math.floor(p * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <>₹{display.toLocaleString("en-IN")}</>;
}

// ══════════════════════════════════════════════════════════════════
// SECTION 1 — Hero
// ══════════════════════════════════════════════════════════════════
function HeroSection({ dark }: { dark: boolean }) {
  return (
    <motion.div {...stagger(0)} className="relative overflow-hidden rounded-3xl mb-6">
      <div className="absolute inset-0">
        <img src={TRIPS[0].image} alt="Paris" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
      </div>
      <div className="absolute top-5 right-5 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium">
        <span>Paris</span><span className="w-px h-4 bg-white/30" /><span>14°C ☁️</span>
      </div>
      <div className="relative z-10 p-8 md:p-10">
        <span className="text-orange-300 text-sm font-semibold tracking-widest uppercase">Good morning</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-1 mb-1 tracking-tight">
          Welcome back, Sneha <span className="inline-block animate-pulse">✨</span>
        </h1>
        <p className="text-white/60 text-lg mb-6">Your Paris adventure is almost here.</p>
        <div className="flex items-center gap-6 mb-8">
          {["12", "04", "30"].map((val, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-white tabular-nums">{val}</div>
              <div className="text-xs text-white/40 uppercase tracking-wider">{["Days", "Hours", "Mins"][i]}</div>
            </div>
          ))}
          <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent ml-2" />
          <div className="text-right">
            <div className="text-white/80 text-sm">Apr 11 – Apr 18</div>
            <div className="text-white/40 text-xs">Paris, France 🗼</div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg shadow-orange-500/30 text-sm"
        >
          <Icon d={icons.plane} size={16} />Continue Planning<Icon d={icons.arrow} size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SECTION 2 — Next Actions
// ══════════════════════════════════════════════════════════════════
function NextActions({ dark }: { dark: boolean }) {
  const card = dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
  return (
    <motion.section {...stagger(1)} className="mb-6">
      <h2 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${dark ? "text-gray-500" : "text-gray-400"}`}>Next Steps for Paris</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {NEXT_ACTIONS.map((a, i) => (
          <motion.div key={a.id} whileHover={{ y: -3, scale: 1.01 }} className={`border ${card} rounded-2xl p-4 cursor-pointer transition-shadow hover:shadow-lg`}>
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center mb-3`}>
              <Icon d={icons[a.icon as keyof typeof icons]} size={16} className="text-white" />
            </div>
            <div className={`font-semibold text-sm mb-0.5 ${dark ? "text-white" : "text-gray-800"}`}>{a.label}</div>
            <div className={`text-xs mb-3 ${dark ? "text-gray-500" : "text-gray-400"}`}>{a.sub}</div>
            <div className={`h-1 rounded-full mb-3 ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
              <motion.div
                initial={{ width: 0 }} animate={{ width: `${a.progress}%` }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                className={`h-full rounded-full bg-gradient-to-r ${a.color}`}
              />
            </div>
            <div className={`text-xs font-semibold bg-gradient-to-r ${a.color} bg-clip-text text-transparent`}>{a.cta} →</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ══════════════════════════════════════════════════════════════════
// SECTION 3 — AI Budget Optimizer (collapsible, full-width)
// ══════════════════════════════════════════════════════════════════
function BudgetOptimizerSection({ dark }: { dark: boolean }) {
  const [phase, setPhase] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<Plan>("smart");
  const [dismissed, setDismissed] = useState<number[]>([]);
  const [expanded, setExpanded] = useState(false);

  const phases = [
    "Scanning Skyscanner, MakeMyTrip, Google Flights…",
    "Comparing 47 hotel options on Booking, Airbnb…",
    "Calculating optimal budget allocation…",
    "AI optimization complete ✓",
  ];

  useEffect(() => {
    const t = setInterval(() => setPhase(p => Math.min(p + 1, 3)), 1800);
    return () => clearInterval(t);
  }, []);

  const plan = PLANS[selectedPlan];
  const isOver = plan.total > BUDGET_TOTAL;
  const pct = Math.min((plan.total / BUDGET_TOTAL) * 100, 130);
  const card = dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
  const rowHover = dark ? "hover:bg-gray-800/60" : "hover:bg-orange-50/60";

  const pieData = [
    { name: "Flights",    value: plan.flight.price * 2, color: "#f97316" },
    { name: "Hotels",     value: plan.hotel.price * 7,  color: "#ec4899" },
    { name: "Food",       value: plan.food,              color: "#fb923c" },
    { name: "Activities", value: plan.activities,        color: "#f43f5e" },
  ];
  const barData = [
    { cat: "Flights",    spend: plan.flight.price * 2, budget: 20000 },
    { cat: "Hotels",     spend: plan.hotel.price * 7,  budget: 30000 },
    { cat: "Food",       spend: plan.food,              budget: 15000 },
    { cat: "Activities", spend: plan.activities,        budget: 12000 },
  ];

  return (
    <motion.section {...stagger(2)} className="mb-6">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className={`text-xs uppercase tracking-widest font-semibold ${dark ? "text-gray-500" : "text-gray-400"}`}>AI Budget Optimizer</h2>
          <span className="text-[10px] bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold px-2 py-0.5 rounded-full">✦ Live</span>
        </div>
        <button
          onClick={() => setExpanded(e => !e)}
          className={`text-xs font-semibold transition-colors ${dark ? "text-gray-500 hover:text-orange-400" : "text-gray-400 hover:text-orange-500"}`}
        >
          {expanded ? "Collapse ↑" : "See details ↓"}
        </button>
      </div>

      {/* ── AI Scanning Hero ── */}
      <div
        className="relative overflow-hidden rounded-3xl mb-4 p-6 md:p-8"
        style={{ background: "linear-gradient(135deg,#0f0f1a 0%,#1a0f2e 45%,#2d1008 100%)" }}
      >
        <div className="absolute top-0 left-1/4 w-72 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-40 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full ${phase < 3 ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
            <span className={`text-xs font-semibold tracking-widest uppercase ${phase < 3 ? "text-amber-400" : "text-emerald-400"}`}>
              {phase < 3 ? "AI Optimizer · Running" : "AI Optimizer · Complete"}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight">
            Optimizing your <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Paris trip</span>
          </h3>
          <p className="text-white/50 text-sm mb-4">
            Budget: <span className="text-white font-semibold">₹80,000</span> · 7 nights · Apr 11–18 · 2 travellers
          </p>
          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={phase}
                  initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.25 }}
                  className="text-white/60 text-xs"
                >
                  {phases[phase]}
                </motion.span>
              </AnimatePresence>
              <span className="text-orange-400 text-xs font-bold ml-3 flex-shrink-0">{[25, 55, 80, 100][phase]}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${[25, 55, 80, 100][phase]}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className={`h-full rounded-full ${phase === 3 ? "bg-gradient-to-r from-emerald-400 to-teal-400" : "bg-gradient-to-r from-orange-500 to-pink-500"}`}
              />
            </div>
          </div>
          {/* Platform pills */}
          <div className="flex flex-wrap gap-2">
            {["Skyscanner", "Booking", "Airbnb", "MakeMyTrip", "Google"].map((p, i) => (
              <motion.div
                key={p}
                animate={{ opacity: phase >= i * 0.6 ? 1 : 0.3 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1"
              >
                <span className="text-white/70 text-[10px] font-semibold">{p}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Plan Switcher ── */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {(Object.keys(PLANS) as Plan[]).map(key => (
          <button
            key={key}
            onClick={() => setSelectedPlan(key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              selectedPlan === key
                ? `bg-gradient-to-r ${PLANS[key].color} text-white shadow-lg`
                : dark ? "bg-gray-800 text-gray-400 hover:bg-gray-700" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {PLANS[key].emoji} {PLANS[key].label}
          </button>
        ))}
      </div>

      {/* ── Best Plan Card ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPlan}
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className={`border ${card} rounded-3xl overflow-hidden shadow-xl mb-4`}
        >
          <div className={`bg-gradient-to-r ${plan.color} px-6 py-5 flex items-center justify-between`}>
            <div>
              <div className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-0.5">
                {selectedPlan === "smart" ? "✦ AI Recommended" : selectedPlan === "budget" ? "💰 Most Savings" : "✨ Best Experience"}
              </div>
              <div className="text-white font-bold text-xl">{plan.emoji} {plan.label}</div>
            </div>
            <div className="text-right">
              <div className="text-white text-3xl font-black tracking-tight"><AnimatedNumber value={plan.total} /></div>
              {plan.savings > 0
                ? <div className="text-white/80 text-xs mt-0.5">Save <span className="font-bold">₹{plan.savings.toLocaleString("en-IN")}</span> vs budget</div>
                : <div className="text-white/80 text-xs mt-0.5">₹{Math.abs(plan.savings).toLocaleString("en-IN")} over budget</div>
              }
            </div>
          </div>
          {/* Why */}
          <div className={`px-6 py-3 text-sm flex items-start gap-2 ${dark ? "bg-gray-800/50 text-gray-300" : "bg-gray-50 text-gray-600"}`}>
            <span className="text-base flex-shrink-0">🤖</span>
            <span><strong className={dark ? "text-white" : "text-gray-800"}>Why this plan? </strong>{plan.why}</span>
          </div>
          {/* 4-cell grid */}
          <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "✈️ Flight",     val: plan.flight.price * 2, sub: plan.flight.provider },
              { label: "🏨 Hotel",      val: plan.hotel.price * 7,  sub: plan.hotel.name.split(" ").slice(0, 2).join(" ") + " · 7n" },
              { label: "🍽️ Food",      val: plan.food,              sub: "~₹857/day" },
              { label: "🎭 Activities", val: plan.activities,        sub: "Louvre, tours…" },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-4 ${dark ? "bg-gray-800" : "bg-gray-50"}`}>
                <div className={`text-xs mb-1 ${dark ? "text-gray-500" : "text-gray-400"}`}>{item.label}</div>
                <div className={`text-lg font-bold ${dark ? "text-white" : "text-gray-900"}`}>₹{item.val.toLocaleString("en-IN")}</div>
                <div className={`text-xs truncate ${dark ? "text-gray-600" : "text-gray-400"}`}>{item.sub}</div>
              </div>
            ))}
          </div>
          {/* CTA */}
          <div className="px-5 pb-5 flex flex-col sm:flex-row gap-3">
            {isOver && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-2xl px-4 py-3 flex-1">
                ⚠️ Exceeds ₹80,000 by ₹{(plan.total - BUDGET_TOTAL).toLocaleString("en-IN")}
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className={`flex-1 bg-gradient-to-r ${plan.color} text-white font-bold py-3.5 rounded-2xl shadow-lg text-sm flex items-center justify-center gap-2`}
            >
              Book {plan.label} →
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Expandable: Price Comparison + Chart + AI Tips ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {/* Price Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Flights */}
              <div className={`border ${card} rounded-2xl overflow-hidden shadow-sm`}>
                <div className={`px-5 py-3 border-b flex items-center justify-between ${dark ? "border-gray-800 bg-gray-800/30" : "border-gray-50 bg-gray-50/50"}`}>
                  <span className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-800"}`}>✈️ Flights · BOM → CDG</span>
                  <span className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>per person</span>
                </div>
                {FLIGHT_OPTIONS.map((f, i) => (
                  <motion.div
                    key={i} whileHover={{ x: 2 }}
                    className={`flex items-center gap-3 px-5 py-4 ${rowHover} transition-colors cursor-pointer ${i < FLIGHT_OPTIONS.length - 1 ? `border-b ${dark ? "border-gray-800" : "border-gray-50"}` : ""}`}
                  >
                    <ProviderLogo letter={f.logo} bg={f.logoBg} />
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-800"}`}>{f.provider}</div>
                      <div className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{f.duration} · {f.stops}</div>
                      <Stars rating={f.rating} />
                    </div>
                    <div className="text-right">
                      <div className={`text-base font-bold ${dark ? "text-white" : "text-gray-900"}`}>₹{f.price.toLocaleString("en-IN")}</div>
                      <Tag label={f.tag} colorClass={f.tagColor} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Hotels */}
              <div className={`border ${card} rounded-2xl overflow-hidden shadow-sm`}>
                <div className={`px-5 py-3 border-b flex items-center justify-between ${dark ? "border-gray-800 bg-gray-800/30" : "border-gray-50 bg-gray-50/50"}`}>
                  <span className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-800"}`}>🏨 Hotels · Paris</span>
                  <span className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>per night</span>
                </div>
                {HOTEL_OPTIONS.map((h, i) => (
                  <motion.div
                    key={i} whileHover={{ x: 2 }}
                    className={`flex items-center gap-3 px-5 py-4 ${rowHover} transition-colors cursor-pointer ${i < HOTEL_OPTIONS.length - 1 ? `border-b ${dark ? "border-gray-800" : "border-gray-50"}` : ""}`}
                  >
                    <ProviderLogo letter={h.logo} bg={h.logoBg} />
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-semibold truncate ${dark ? "text-white" : "text-gray-800"}`}>{h.name}</div>
                      <div className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{h.provider}</div>
                      <Stars rating={h.rating} />
                    </div>
                    <div className="text-right">
                      <div className={`text-base font-bold ${dark ? "text-white" : "text-gray-900"}`}>₹{h.price.toLocaleString("en-IN")}</div>
                      <Tag label={h.tag} colorClass={h.tagColor} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Budget Chart */}
            <div className={`border ${card} rounded-3xl p-5 mb-4 shadow-sm`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm font-bold ${dark ? "text-white" : "text-gray-800"}`}>💳 Budget Breakdown — {plan.label}</span>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${plan.total <= BUDGET_TOTAL ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                  {plan.total <= BUDGET_TOTAL ? `₹${(BUDGET_TOTAL - plan.total).toLocaleString("en-IN")} remaining` : `₹${(plan.total - BUDGET_TOTAL).toLocaleString("en-IN")} over`}
                </span>
              </div>
              <div className={`h-2.5 rounded-full overflow-hidden mb-1 ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className={`h-full rounded-full bg-gradient-to-r ${pct > 100 ? "from-red-500 to-rose-600" : "from-orange-500 to-pink-500"}`}
                />
              </div>
              <div className="flex justify-between text-xs mb-5">
                <span className={dark ? "text-gray-600" : "text-gray-400"}>₹0</span>
                <span className={`font-semibold ${pct > 100 ? "text-red-400" : "text-orange-400"}`}>₹{plan.total.toLocaleString("en-IN")} / ₹80,000</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={3} dataKey="value">
                        {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <Tooltip formatter={(v: any) => `₹${Number(v).toLocaleString("en-IN")}`} contentStyle={{ background: dark ? "#1f2937" : "#fff", border: "none", borderRadius: 8, fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-1">
                    {pieData.map((d, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                        <span className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>{d.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={barData} barGap={2}>
                      <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#374151" : "#f0f0f0"} vertical={false} />
                      <XAxis dataKey="cat" tick={{ fill: dark ? "#6b7280" : "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip formatter={(v: any) => `₹${Number(v).toLocaleString("en-IN")}`} contentStyle={{ background: dark ? "#1f2937" : "#fff", border: "none", borderRadius: 8, fontSize: 12 }} />
                      <Bar dataKey="budget" fill={dark ? "#374151" : "#f3f4f6"} radius={[4, 4, 0, 0]} name="Budget" />
                      <Bar dataKey="spend" radius={[4, 4, 0, 0]} name="Spend">
                        {barData.map((e, i) => <Cell key={i} fill={e.spend > e.budget ? "#ef4444" : "#f97316"} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-1">
                    <div className="flex items-center gap-1.5"><div className={`w-3 h-2 rounded-sm ${dark ? "bg-gray-700" : "bg-gray-200"}`} /><span className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>Budgeted</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-3 h-2 rounded-sm bg-orange-500" /><span className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>Actual</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Tips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
              {AI_TIPS.map((tip, i) =>
                dismissed.includes(i) ? null : (
                  <motion.div
                    key={i} layout exit={{ opacity: 0, scale: 0.9 }} whileHover={{ y: -2 }}
                    className={`border ${card} rounded-2xl p-4 flex items-start gap-3 relative group shadow-sm cursor-pointer`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400/20 to-pink-400/20 flex items-center justify-center text-lg flex-shrink-0">{tip.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-800"}`}>{tip.tip}</div>
                      <div className={`text-xs mt-0.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>{tip.reason}</div>
                      <div className={`text-xs font-bold mt-1 ${tip.actionable ? "text-emerald-500" : "text-amber-500"}`}>
                        {tip.actionable ? `→ ${tip.savings}` : tip.savings}
                      </div>
                    </div>
                    <button
                      onClick={() => setDismissed(d => [...d, i])}
                      className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity ${dark ? "text-gray-600 hover:text-gray-400" : "text-gray-300 hover:text-gray-500"}`}
                    >✕</button>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

// ══════════════════════════════════════════════════════════════════
// SECTION 4 — Upcoming Trips
// ══════════════════════════════════════════════════════════════════
function UpcomingTrips({ dark }: { dark: boolean }) {
  return (
    <motion.section {...stagger(3)} className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className={`text-xs uppercase tracking-widest font-semibold ${dark ? "text-gray-500" : "text-gray-400"}`}>Your Trips</h2>
        <button className="text-xs text-orange-400 font-semibold hover:text-orange-300 transition-colors">See all →</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TRIPS.map(trip => (
          <motion.div key={trip.id} whileHover={{ scale: 1.02 }} className="relative overflow-hidden rounded-2xl cursor-pointer group h-48">
            <img src={trip.image} alt={trip.city} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className={`absolute inset-0 bg-gradient-to-t ${trip.bg}/60 via-transparent to-transparent`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute top-3 right-3">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm border ${
                trip.status === "upcoming" ? "bg-orange-500/80 border-orange-400/30 text-white" :
                trip.status === "planning" ? "bg-white/20 border-white/30 text-white" :
                "bg-white/10 border-white/20 text-white/80"
              }`}>
                {trip.status === "upcoming" ? `${trip.daysLeft}d away` : trip.status}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="text-white font-bold text-lg leading-tight">{trip.emoji} {trip.city}</div>
              <div className="text-white/60 text-xs">{trip.country} · {trip.dates}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ══════════════════════════════════════════════════════════════════
// SECTION 5 — AI Destination Suggestions
// ══════════════════════════════════════════════════════════════════
function AISuggestions({ dark }: { dark: boolean }) {
  return (
    <motion.section {...stagger(4)} className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <h2 className={`text-xs uppercase tracking-widest font-semibold ${dark ? "text-gray-500" : "text-gray-400"}`}>Curated for You</h2>
        <span className="text-[10px] bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold px-2 py-0.5 rounded-full">AI ✦</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {AI_SUGGESTIONS.map((s, i) => (
          <motion.div key={i} whileHover={{ y: -3 }} className="relative overflow-hidden rounded-2xl cursor-pointer group h-40">
            <img src={s.img} alt={s.dest} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-3 right-3 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-pink-500 px-2 py-1 rounded-full">{s.match}% match</div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="text-white font-bold">{s.emoji} {s.dest}</div>
              <div className="text-white/60 text-xs">{s.reason}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ══════════════════════════════════════════════════════════════════
// SECTION 6 — Travel Story Insights
// ══════════════════════════════════════════════════════════════════
function InsightsSection({ dark }: { dark: boolean }) {
  const card = dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
  return (
    <motion.section {...stagger(5)} className="mb-6">
      <h2 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${dark ? "text-gray-500" : "text-gray-400"}`}>Your Travel Story</h2>
      <div className="grid grid-cols-2 gap-3">
        {INSIGHTS.map((ins, i) => (
          <motion.div key={i} whileHover={{ y: -2 }} className={`border ${card} rounded-2xl p-4`}>
            <div className="text-3xl font-bold bg-gradient-to-br from-orange-400 to-pink-500 bg-clip-text text-transparent mb-1">{ins.value}</div>
            <div className={`text-xs font-medium mb-0.5 ${dark ? "text-gray-300" : "text-gray-700"}`}>{ins.label}</div>
            <div className={`text-xs ${dark ? "text-gray-600" : "text-gray-400"}`}>{ins.sub}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ══════════════════════════════════════════════════════════════════
// SECTION 7 — Recent Activity
// ══════════════════════════════════════════════════════════════════
function RecentActivity({ dark }: { dark: boolean }) {
  const card = dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
  return (
    <motion.section {...stagger(6)}>
      <h2 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${dark ? "text-gray-500" : "text-gray-400"}`}>Recent Activity</h2>
      <div className={`border ${card} rounded-2xl overflow-hidden`}>
        {ACTIVITY.map((a, i) => (
          <div key={i} className={`flex items-center gap-4 px-5 py-4 ${i < ACTIVITY.length - 1 ? `border-b ${dark ? "border-gray-800" : "border-gray-50"}` : ""}`}>
            <div className={`w-8 h-8 rounded-full ${a.color} flex items-center justify-center flex-shrink-0`}>
              <Icon d={icons[a.icon as keyof typeof icons]} size={14} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium truncate ${dark ? "text-gray-200" : "text-gray-700"}`}>{a.text}</div>
            </div>
            <div className={`text-xs flex-shrink-0 ${dark ? "text-gray-600" : "text-gray-400"}`}>{a.time}</div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

// ══════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ══════════════════════════════════════════════════════════════════
export const DashboardHome = () => {
  const { isDarkMode } = useApp();
  const dark = isDarkMode;

  return (
    <div className={`max-w-5xl mx-auto ${dark ? "text-white" : "text-gray-900"}`}>
      {/* Full-width rows */}
      <HeroSection dark={dark} />
      <NextActions dark={dark} />
      <BudgetOptimizerSection dark={dark} />

      {/* 2/3 + 1/3 sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <UpcomingTrips dark={dark} />
          <AISuggestions dark={dark} />
        </div>
        <div>
          <InsightsSection dark={dark} />
          <RecentActivity dark={dark} />
        </div>
      </div>
    </div>
  );
};