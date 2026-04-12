"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
 import { AppProvider, useApp } from '../../travel/AppContext';
import { Card, HeroBanner, BtnPrimary, Btn, SectionHeader, Badge, stagger, ProgressBar, StatTile } from "../../ui/ui";

// ══════════════════════════════════════════════════════════
// ITINERARY PAGE
// ══════════════════════════════════════════════════════════
const DAYS = [
  {
    day: 1, date: "Apr 11", title: "Arrival & Montmartre",
    activities: [
      { time: "02:15", emoji: "plane", title: "Depart BOM",          sub: "Air India AI 131 · Terminal 2" },
      { time: "08:45", emoji: "landing", title: "Arrive CDG",           sub: "Immigration · Baggage claim" },
      { time: "10:30", emoji: "transit", title: "RER B → Gare du Nord", sub: "35 min · ₹280/person" },
      { time: "12:00", emoji: "home", title: "Check-in Airbnb",      sub: "Montmartre Studio · Host: Marie" },
      { time: "15:00", emoji: "church", title: "Sacré-Cœur Basilica",  sub: "Walk up · Free entry · Sunset views" },
      { time: "19:30", emoji: "utensils", title: "Dinner: Le Relais",    sub: "Classic French · ~₹1,600/person" },
    ],
  },
  {
    day: 2, date: "Apr 12", title: "Louvre & The Seine",
    activities: [
      { time: "10:00", emoji: "art", title: "Louvre Museum",         sub: "Skip-the-line · GYG-774KL · 3h guided tour" },
      { time: "13:30", emoji: "coffee", title: "Lunch: Café Marly",     sub: "Louvre view terrace · ~₹1,400/person" },
      { time: "15:30", emoji: "bridge", title: "Walk along the Seine",  sub: "Pont des Arts → Notre-Dame · 2h" },
      { time: "18:00", emoji: "compass", title: "Marais district",       sub: "Explore galleries & boutiques" },
      { time: "20:00", emoji: "wine", title: "Wine & cheese",         sub: "Île Saint-Louis bistro · ~₹1,200" },
    ],
  },
  {
    day: 3, date: "Apr 13", title: "Versailles & Eiffel Tower",
    activities: [
      { time: "09:00", emoji: "train", title: "RER C to Versailles",  sub: "45 min · Château opens 9 AM" },
      { time: "09:45", emoji: "landmark", title: "Palace of Versailles", sub: "Palace + Hall of Mirrors + Gardens" },
      { time: "14:00", emoji: "train", title: "Return to Paris",       sub: "RER C back" },
      { time: "16:00", emoji: "tower", title: "Eiffel Tower summit",   sub: "Pre-booked · Golden hour views" },
      { time: "20:00", emoji: "utensils", title: "Bistrot du 7ème",      sub: "Near Eiffel · Cozy French bistro" },
    ],
  },
];

export const ItineraryPage = () => {
  const { isDarkMode } = useApp();
  const dark = isDarkMode;
  const [openDay, setOpenDay] = useState<number | null>(1);
  const [view, setView] = useState<"list" | "timeline">("list");

  return (
    <div>
      <SectionHeader
        title="Itinerary 🗓️"
        sub="Paris · Apr 11–18 · AI-crafted day-by-day plan"
        action={
          <div className="flex gap-2">
            {(["list", "timeline"] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${view === v ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white" : dark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"}`}>
                {v}
              </button>
            ))}
          </div>
        }
      />

      {/* Trip summary hero */}
      <motion.div {...stagger(0)} className="mb-5">
        <HeroBanner>
          <div className="flex gap-8">
            {[["Trip", "Paris, France 🗼"], ["Duration", "7 nights"], ["Travellers", "Sneha + Priya"], ["Status", "✅ Confirmed"]].map(([l, v]) => (
              <div key={l}>
                <div className="text-white/40 text-[10px] uppercase tracking-widest mb-0.5">{l}</div>
                <div className="text-white text-sm font-semibold">{v}</div>
              </div>
            ))}
          </div>
        </HeroBanner>
      </motion.div>

      {/* Days */}
      <div className="space-y-3">
        {DAYS.map((day, di) => (
          <motion.div key={day.day} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: di * 0.08, duration: 0.4 }}>
            <Card>
              {/* Day header — clickable */}
              <button
                onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {day.day}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">{day.title}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">{day.date} · {day.activities.length} activities</div>
                  </div>
                </div>
                <span className={`text-gray-400 text-sm transition-transform ${openDay === day.day ? "rotate-180" : ""}`}>▾</span>
              </button>

              <AnimatePresence>
                {openDay === day.day && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className={`mt-4 pt-4 border-t ${dark ? "border-gray-800" : "border-gray-100"} space-y-0`}>
                      {day.activities.map((act, ai) => (
                        <div key={ai} className={`flex gap-3 py-3 ${ai < day.activities.length - 1 ? `border-b ${dark ? "border-gray-800/60" : "border-gray-50"}` : ""}`}>
                          <div className="text-xs text-gray-400 dark:text-gray-600 w-10 flex-shrink-0 pt-0.5 tabular-nums">{act.time}</div>
                          <div className="text-lg flex-shrink-0">{act.emoji}</div>
                          <div>
                            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{act.title}</div>
                            <div className="text-xs text-gray-400 dark:text-gray-500">{act.sub}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Remaining days placeholder */}
      <motion.div {...stagger(4)} className="mt-4">
        <Card>
          <div className="text-center py-4">
            <div className="text-2xl mb-2">🤖</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Days 4–7 ready to plan</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mb-4">AI will suggest Musée d'Orsay, Sainte-Chapelle, Seine cruise & more</div>
            <BtnPrimary className="mx-auto">+ Generate remaining days with AI</BtnPrimary>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// BUDGET TRACKER PAGE
// ══════════════════════════════════════════════════════════
const CATEGORIES = [
  { label: "✈️ Flights",     spent: 35600, budget: 40000, icon: "✈️" },
  { label: "🏨 Hotel",       spent: 27300, budget: 30000, icon: "🏨" },
  { label: "🍽️ Food",        spent:  2400, budget: 12000, icon: "🍽️" },
  { label: "🎭 Activities",  spent:  4800, budget: 10000, icon: "🎭" },
  { label: "🚇 Transport",   spent:   840, budget:  4000, icon: "🚇" },
  { label: "🛍️ Shopping",    spent:   500, budget:  4000, icon: "🛍️" },
];

const RECENT = [
  { label: "☕ Coffee — Café de Flore",    amount: 480,  date: "Today 08:30" },
  { label: "🍽️ Dinner — Le Comptoir",     amount: 1920, date: "Yesterday" },
  { label: "🎟️ Louvre tickets ×2",        amount: 4800, date: "Apr 12" },
  { label: "🚇 Navigo weekly pass ×2",     amount: 840,  date: "Apr 11" },
  { label: "🛍️ Souvenirs — Montmartre",   amount: 500,  date: "Apr 11" },
];

export const BudgetTrackerPage = () => {
  const { isDarkMode } = useApp();
  const dark = isDarkMode;
  const TOTAL_BUDGET = 80000;
  const totalSpent = CATEGORIES.reduce((s, c) => s + c.spent, 0);
  const remaining = TOTAL_BUDGET - totalSpent;
  const overallPct = Math.round((totalSpent / TOTAL_BUDGET) * 100);

  return (
    <div>
      <SectionHeader title="Budget Tracker 💳" sub="Real-time spending across your Paris trip" />

      {/* Top stat tiles */}
      <motion.div {...stagger(0)} className="grid grid-cols-3 gap-3 mb-5">
        <StatTile label="Total budget"  value={`₹${TOTAL_BUDGET.toLocaleString("en-IN")}`} color="from-gray-400 to-gray-500" />
        <StatTile label="Spent so far"  value={`₹${totalSpent.toLocaleString("en-IN")}`}   color="from-orange-400 to-pink-500" />
        <StatTile label="Remaining"     value={`₹${remaining.toLocaleString("en-IN")}`}    color="from-emerald-500 to-teal-500" />
      </motion.div>

      {/* Overall bar */}
      <motion.div {...stagger(1)} className="mb-5">
        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-800 dark:text-white">Overall budget utilisation</span>
            <span className="text-sm font-bold text-orange-500">{overallPct}%</span>
          </div>
          <ProgressBar value={overallPct} />
          <div className="flex justify-between text-xs mt-1.5">
            <span className="text-gray-400">₹0</span>
            <span className="text-gray-400">₹{TOTAL_BUDGET.toLocaleString("en-IN")}</span>
          </div>
        </Card>
      </motion.div>

      {/* Category breakdown */}
      <motion.div {...stagger(2)} className="mb-5">
        <Card>
          <div className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Category breakdown</div>
          <div className="space-y-4">
            {CATEGORIES.map((cat, i) => {
              const pct = Math.round((cat.spent / cat.budget) * 100);
              const over = pct > 100;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{cat.label}</span>
                    <div className="text-right">
                      <span className="text-gray-900 dark:text-white font-semibold">₹{cat.spent.toLocaleString("en-IN")}</span>
                      <span className="text-gray-400 dark:text-gray-600"> / ₹{cat.budget.toLocaleString("en-IN")}</span>
                      <span className={`ml-2 text-xs font-bold ${over ? "text-red-500" : "text-orange-400"}`}>{pct}%</span>
                    </div>
                  </div>
                  <div className={`h-1.5 rounded-full overflow-hidden ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(pct, 100)}%` }}
                      transition={{ delay: 0.2 + i * 0.07, duration: 0.7, ease: "easeOut" }}
                      className={`h-full rounded-full ${over ? "bg-red-500" : "bg-gradient-to-r from-orange-400 to-pink-500"}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Alerts */}
      <motion.div {...stagger(3)} className="mb-5 space-y-3">
        <div className={`rounded-2xl px-4 py-3 text-sm border ${dark ? "bg-orange-500/8 border-orange-500/20 text-orange-300" : "bg-orange-50 border-orange-100 text-orange-700"}`}>
          🍽️ <strong>Food pace alert:</strong> You've spent ₹2,400 in 2 days. At this pace, total food spend will reach ~₹8,400 — within budget but slim buffer.
        </div>
        <div className={`rounded-2xl px-4 py-3 text-sm border ${dark ? "bg-emerald-500/8 border-emerald-500/20 text-emerald-300" : "bg-emerald-50 border-emerald-100 text-emerald-700"}`}>
          ✅ <strong>Flights & hotel paid in full.</strong> No more surprises — ₹62,900 locked in.
        </div>
      </motion.div>

      {/* Recent expenses */}
      <motion.div {...stagger(4)}>
        <Card>
          <div className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Recent expenses</div>
          <div className="space-y-0">
            {RECENT.map((e, i) => (
              <div key={i} className={`flex items-center justify-between py-3 ${i < RECENT.length - 1 ? `border-b ${dark ? "border-gray-800" : "border-gray-100"}` : ""}`}>
                <div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{e.label}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-600">{e.date}</div>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">₹{e.amount.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
          <div className={`mt-3 pt-3 border-t ${dark ? "border-gray-800" : "border-gray-100"}`}>
            <Btn className="w-full">+ Add expense</Btn>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};