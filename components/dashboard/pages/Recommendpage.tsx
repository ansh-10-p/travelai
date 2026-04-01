"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../travel/AppContext"; // or: import { useDashboard } from "../DashboardContext";

// ─── Types ────────────────────────────────────────────────────────
type PlanKey = "smart" | "budget" | "premium";

// ─── Data ────────────────────────────────────────────────────────
const FLIGHTS = {
  smart:   { airline: "Air India",  code: "AI 131", price: 35600, stops: "Non-stop", duration: "8h 30m", rating: 4.4, logo: "AI", logoBg: "bg-red-100 text-red-700" },
  budget:  { airline: "IndiGo",     code: "6E 1401", price: 28400, stops: "1 stop · DXB", duration: "9h 15m", rating: 4.1, logo: "6E", logoBg: "bg-blue-100 text-blue-700" },
  premium: { airline: "Emirates",   code: "EK 502",  price: 45000, stops: "1 stop · DXB", duration: "9h 45m", rating: 4.8, logo: "EK", logoBg: "bg-purple-100 text-purple-700" },
};
const HOTELS = {
  smart:   { name: "Montmartre Studio", provider: "Airbnb",      price: 27300, nights: 7, rating: 4.7, location: "Paris 18th", logo: "Ab", logoBg: "bg-rose-100 text-rose-700" },
  budget:  { name: "Ibis Paris Centre", provider: "Booking.com", price: 22400, nights: 7, rating: 4.0, location: "Paris 10th", logo: "Bk", logoBg: "bg-blue-100 text-blue-700" },
  premium: { name: "Le Marais Boutique",provider: "Hotels.com",  price: 40600, nights: 7, rating: 4.6, location: "Paris 4th",  logo: "Ht", logoBg: "bg-violet-100 text-violet-700" },
};
const PLANS: Record<PlanKey, {
  label: string; emoji: string; total: number; savings: number;
  food: number; activities: number; color: string; why: string;
}> = {
  smart: {
    label: "Smart Plan", emoji: "⚡", total: 72500, savings: 7500,
    food: 11900, activities: 8000,
    color: "from-orange-500 to-pink-500",
    why: "Air India non-stop saves 45 min vs IndiGo and includes baggage. Montmartre Airbnb is rated 4.7★ with free cancellation — unbeatable value. This plan keeps ₹7,500 in your pocket.",
  },
  budget: {
    label: "Budget Plan", emoji: "💰", total: 58400, savings: 21600,
    food: 9000, activities: 6000,
    color: "from-emerald-500 to-teal-500",
    why: "Cheapest available options across flights, hotels, food and activities. Saves ₹21,600 — ideal if you're flexible on comfort and want maximum budget buffer.",
  },
  premium: {
    label: "Premium Plan", emoji: "✨", total: 88900, savings: -8900,
    food: 18000, activities: 14000,
    color: "from-violet-500 to-fuchsia-500",
    why: "Emirates comfort class with 4.8★ service + boutique hotel in Le Marais — the most central arrondissement. Over budget by ₹8,900 but delivers a 5-star Paris experience.",
  },
};
const AI_TIPS = [
  { icon: "📅", tip: "Shift dates to Apr 14–21",        save: "₹5,000", reason: "Midweek demand is 35% lower" },
  { icon: "🍽️", tip: "Dine near Bastille, not Marais",  save: "₹2,200", reason: "Same cuisine, 40% cheaper prices" },
  { icon: "🎟️", tip: "Buy a 5-day Paris Museum Pass",   save: "₹1,800", reason: "Louvre + Orsay + Versailles bundled" },
  { icon: "🚇", tip: "Get a weekly Navigo metro pass",   save: "₹600",   reason: "Unlimited metro for 7 days" },
];
const BUDGET_TOTAL = 80000;

// ─── Stagger helper ───────────────────────────────────────────────
const s = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] as any },
});

// ─── Component ────────────────────────────────────────────────────
export const RecommendPage = () => {
  // Works with AppContext (useApp), or swap for useDashboard / useTravel
  const { setCurrentPage, isDarkMode } = useApp();
  const dark = isDarkMode;

  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("smart");
  const [dismissedTips, setDismissedTips] = useState<number[]>([]);

  const plan    = PLANS[selectedPlan];
  const flight  = FLIGHTS[selectedPlan];
  const hotel   = HOTELS[selectedPlan];
  const isOver  = plan.total > BUDGET_TOTAL;
  const pct     = Math.min((plan.total / BUDGET_TOTAL) * 100, 130);

  // Card & input styles
  const card  = `rounded-2xl border p-5 ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`;
  const tile  = `rounded-xl p-3 text-center ${dark ? "bg-gray-800" : "bg-gray-50"}`;
  const tipRow = `flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all group relative ${dark ? "hover:bg-gray-800" : "hover:bg-gray-50"}`;

  return (
    <div className={`max-w-4xl mx-auto ${dark ? "text-white" : "text-gray-900"}`}>

      {/* ── Page header ── */}
      <motion.div {...s(0)} className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">AI Recommendation 🎯</h1>
        <p className={`text-sm mt-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}>
          Your best Paris trip — explained clearly, no surprises
        </p>
      </motion.div>

      {/* ── Plan switcher ── */}
      <motion.div {...s(1)} className="flex gap-2 mb-5 flex-wrap">
        {(["smart", "budget", "premium"] as PlanKey[]).map(key => (
          <button
            key={key}
            onClick={() => setSelectedPlan(key)}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              selectedPlan === key
                ? `bg-gradient-to-r ${PLANS[key].color} text-white shadow-lg shadow-orange-500/20`
                : dark
                  ? "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
            }`}
          >
            <span>{PLANS[key].emoji}</span>
            <span>{PLANS[key].label}</span>
          </button>
        ))}
      </motion.div>

      {/* ── Main plan card (animates on plan switch) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPlan}
          initial={{ opacity: 0, scale: 0.97, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5"
        >
          <div className={`rounded-3xl border overflow-hidden shadow-xl ${
            selectedPlan === "smart" ? "border-orange-400/50" : dark ? "border-gray-800" : "border-gray-100"
          } ${dark ? "bg-gray-900" : "bg-white"}`}>

            {/* Gradient header */}
            <div className={`bg-gradient-to-r ${plan.color} px-6 py-6`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1.5">
                    {selectedPlan === "smart" ? "✦ AI Top Pick" : selectedPlan === "budget" ? "💰 Maximum Savings" : "✨ Best Experience"}
                  </div>
                  <div className="text-white text-2xl font-black tracking-tight">{plan.emoji} {plan.label}</div>
                  <div className="text-white/70 text-sm mt-1">Paris · Apr 11–18, 2025 · 2 travellers</div>
                </div>
                <div className="text-right">
                  <div className="text-white text-3xl font-black tracking-tight">
                    ₹{plan.total.toLocaleString("en-IN")}
                  </div>
                  {plan.savings > 0 ? (
                    <div className="text-white/80 text-sm mt-0.5">
                      Save <span className="font-bold text-white">₹{plan.savings.toLocaleString("en-IN")}</span> vs budget
                    </div>
                  ) : (
                    <div className="text-white/80 text-sm mt-0.5">
                      ₹{Math.abs(plan.savings).toLocaleString("en-IN")} over budget
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-5">
              {/* Why this plan */}
              <div className={`flex items-start gap-3 rounded-2xl p-4 mb-5 ${
                dark ? "bg-orange-500/8 border border-orange-500/15" : "bg-orange-50 border border-orange-100"
              }`}>
                <span className="text-xl flex-shrink-0">🤖</span>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${dark ? "text-orange-400" : "text-orange-600"}`}>
                    Why this plan?
                  </div>
                  <p className={`text-sm leading-relaxed ${dark ? "text-gray-300" : "text-gray-600"}`}>
                    {plan.why}
                  </p>
                </div>
              </div>

              {/* What's included — flight + hotel cards */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {/* Flight */}
                <div className={`rounded-2xl p-4 ${dark ? "bg-gray-800" : "bg-gray-50"}`}>
                  <div className={`text-[10px] font-bold uppercase tracking-wider mb-3 ${dark ? "text-gray-500" : "text-gray-400"}`}>
                    ✈️ Flight
                  </div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 ${flight.logoBg}`}>
                      {flight.logo}
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>{flight.airline}</div>
                      <div className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{flight.code}</div>
                    </div>
                  </div>
                  <div className={`text-xs space-y-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                    <div>{flight.stops} · {flight.duration}</div>
                    <div className="text-amber-400">{"★".repeat(Math.floor(flight.rating))} {flight.rating}</div>
                  </div>
                  <div className={`text-base font-black mt-2 ${dark ? "text-white" : "text-gray-900"}`}>
                    ₹{flight.price.toLocaleString("en-IN")}
                  </div>
                  <div className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>for 2 passengers</div>
                </div>

                {/* Hotel */}
                <div className={`rounded-2xl p-4 ${dark ? "bg-gray-800" : "bg-gray-50"}`}>
                  <div className={`text-[10px] font-bold uppercase tracking-wider mb-3 ${dark ? "text-gray-500" : "text-gray-400"}`}>
                    🏨 Hotel
                  </div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 ${hotel.logoBg}`}>
                      {hotel.logo}
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>{hotel.name}</div>
                      <div className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{hotel.provider}</div>
                    </div>
                  </div>
                  <div className={`text-xs space-y-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                    <div>{hotel.location} · {hotel.nights} nights</div>
                    <div className="text-amber-400">{"★".repeat(Math.floor(hotel.rating))} {hotel.rating}</div>
                  </div>
                  <div className={`text-base font-black mt-2 ${dark ? "text-white" : "text-gray-900"}`}>
                    ₹{hotel.price.toLocaleString("en-IN")}
                  </div>
                  <div className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>total for 7 nights</div>
                </div>
              </div>

              {/* 4-cell cost breakdown */}
              <div className="grid grid-cols-4 gap-2 mb-5">
                {[
                  { label: "✈️ Flights",     val: flight.price },
                  { label: "🏨 Hotel",       val: hotel.price  },
                  { label: "🍽️ Food",        val: plan.food    },
                  { label: "🎭 Activities",  val: plan.activities },
                ].map((item, i) => (
                  <div key={i} className={tile}>
                    <div className={`text-[10px] font-semibold mb-1 ${dark ? "text-gray-500" : "text-gray-400"}`}>{item.label}</div>
                    <div className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>
                      ₹{item.val.toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Budget utilisation bar */}
              <div className="mb-5">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className={dark ? "text-gray-500" : "text-gray-400"}>Budget usage</span>
                  <span className={isOver ? "text-red-500 font-bold" : "text-orange-500 font-bold"}>
                    ₹{plan.total.toLocaleString("en-IN")} / ₹{BUDGET_TOTAL.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className={`h-2.5 rounded-full overflow-hidden ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
                  <motion.div
                    key={selectedPlan}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(pct, 100)}%` }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                    className={`h-full rounded-full ${
                      isOver
                        ? "bg-red-500"
                        : `bg-gradient-to-r ${plan.color}`
                    }`}
                  />
                </div>
                {!isOver && (
                  <div className={`text-xs mt-1.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>
                    ₹{(BUDGET_TOTAL - plan.total).toLocaleString("en-IN")} remaining after this plan
                  </div>
                )}
              </div>

              {/* Over-budget warning */}
              {isOver && (
                <div className={`flex items-center gap-3 rounded-xl px-4 py-3 mb-4 border text-sm ${
                  dark
                    ? "bg-red-500/10 border-red-400/30 text-red-400"
                    : "bg-red-50 border-red-200 text-red-600"
                }`}>
                  <span className="text-lg">⚠️</span>
                  <span>
                    This plan exceeds your ₹{BUDGET_TOTAL.toLocaleString("en-IN")} budget by{" "}
                    <strong>₹{(plan.total - BUDGET_TOTAL).toLocaleString("en-IN")}</strong>.
                    Consider the Smart or Budget plan instead.
                  </span>
                </div>
              )}

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentPage("booking")}
                className={`w-full bg-gradient-to-r ${plan.color} text-white font-bold py-3.5 rounded-2xl shadow-lg text-sm flex items-center justify-center gap-2`}
              >
                🎫 Book {plan.label} →
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Alternative plans (mini cards) ── */}
      <motion.div {...s(3)} className="mb-5">
        <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${dark ? "text-gray-500" : "text-gray-400"}`}>
          Alternative plans
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(["smart", "budget", "premium"] as PlanKey[])
            .filter(k => k !== selectedPlan)
            .map((key, i) => (
              <motion.div
                key={key}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedPlan(key)}
                className={`rounded-2xl border p-4 cursor-pointer transition-all hover:shadow-md ${
                  dark ? "bg-gray-900 border-gray-800 hover:border-gray-700" : "bg-white border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${PLANS[key].color} text-white`}>
                    {PLANS[key].emoji} {PLANS[key].label}
                  </span>
                </div>
                <div className={`text-xl font-black ${dark ? "text-white" : "text-gray-900"}`}>
                  ₹{PLANS[key].total.toLocaleString("en-IN")}
                </div>
                {PLANS[key].savings > 0 ? (
                  <div className="text-xs text-emerald-500 font-semibold mt-0.5">
                    Saves ₹{PLANS[key].savings.toLocaleString("en-IN")}
                  </div>
                ) : (
                  <div className="text-xs text-red-400 font-semibold mt-0.5">
                    ₹{Math.abs(PLANS[key].savings).toLocaleString("en-IN")} over budget
                  </div>
                )}
                <div className={`text-xs mt-2 ${dark ? "text-gray-500" : "text-gray-400"}`}>
                  {FLIGHTS[key].airline} · {HOTELS[key].name}
                </div>
                <div className={`text-xs font-semibold mt-2 bg-gradient-to-r ${PLANS[key].color} bg-clip-text text-transparent`}>
                  Switch to this plan →
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* ── AI Saving Tips ── */}
      <motion.div {...s(4)}>
        <div className={card}>
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-sm font-bold ${dark ? "text-white" : "text-gray-800"}`}>🤖 AI Saving Tips</span>
            <span className="text-[10px] bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold px-2 py-0.5 rounded-full">
              ✦ Smart
            </span>
          </div>
          <div className="space-y-1">
            {AI_TIPS.map((tip, i) =>
              dismissedTips.includes(i) ? null : (
                <motion.div key={i} layout exit={{ opacity: 0, height: 0 }} className={tipRow}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                    dark ? "bg-gray-700" : "bg-orange-50"
                  }`}>
                    {tip.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-800"}`}>{tip.tip}</div>
                    <div className={`text-xs mt-0.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>{tip.reason}</div>
                  </div>
                  <span className="text-xs font-bold text-emerald-500 flex-shrink-0">→ Save {tip.save}</span>
                  <button
                    onClick={e => { e.stopPropagation(); setDismissedTips(d => [...d, i]); }}
                    className={`text-xs ml-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ${
                      dark ? "text-gray-600 hover:text-gray-400" : "text-gray-300 hover:text-gray-500"
                    }`}
                  >
                    ✕
                  </button>
                </motion.div>
              )
            )}
            {dismissedTips.length === AI_TIPS.length && (
              <div className={`text-center py-4 text-sm ${dark ? "text-gray-600" : "text-gray-400"}`}>
                All tips dismissed ·{" "}
                <button onClick={() => setDismissedTips([])} className="text-orange-400 hover:text-orange-300 font-semibold">
                  Show again
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};