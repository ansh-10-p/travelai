"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
  import { AppProvider, useApp } from '../../travel/AppContext';

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
});

type BookingTab = "all" | "flights" | "hotels" | "activities";

const BOOKINGS = [
  {
    id: 1, type: "flight", icon: "✈️",
    title: "BOM → CDG", sub: "Air India · AI 131 · Non-stop",
    date: "Apr 11, 2025 · 02:15 AM", ref: "AI-8X92K4",
    price: "₹35,600", status: "confirmed", trip: "Paris",
    detail: "Economy · 2 passengers · 8h 30m",
    color: "from-orange-400 to-pink-500",
  },
  {
    id: 2, type: "hotel", icon: "🏨",
    title: "Montmartre Studio", sub: "Airbnb · Paris 18th",
    date: "Apr 11–18, 2025 · 7 nights", ref: "ABB-29481",
    price: "₹27,300", status: "confirmed", trip: "Paris",
    detail: "Studio · 2 guests · Free cancellation till Apr 5",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 3, type: "activity", icon: "🎭",
    title: "Louvre Museum — Skip-the-Line", sub: "GetYourGuide",
    date: "Apr 13, 2025 · 10:00 AM", ref: "GYG-774KL",
    price: "₹4,800", status: "confirmed", trip: "Paris",
    detail: "2 tickets · Guided tour 3h · Audio guide incl.",
    color: "from-rose-400 to-pink-600",
  },
  {
    id: 4, type: "flight", icon: "✈️",
    title: "CDG → BOM", sub: "Air India · AI 142 · Non-stop",
    date: "Apr 18, 2025 · 09:30 PM", ref: "AI-8X92K5",
    price: "Included", status: "confirmed", trip: "Paris",
    detail: "Economy · 2 passengers · 8h 45m",
    color: "from-orange-400 to-pink-500",
  },
  {
    id: 5, type: "hotel", icon: "🏨",
    title: "Arashiyama Ryokan", sub: "Booking.com · Kyoto",
    date: "Jun 3–10, 2025 · 7 nights", ref: "BKG-11203",
    price: "₹42,000", status: "pending", trip: "Kyoto",
    detail: "Traditional room · Breakfast incl. · 2 guests",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 6, type: "activity", icon: "🍷",
    title: "Santorini Wine Tour", sub: "Viator · Oia, Greece",
    date: "Aug 22, 2025 · 05:00 PM", ref: "VTR-990X2",
    price: "₹6,200", status: "pending", trip: "Santorini",
    detail: "2 persons · 3 wineries · Sunset view included",
    color: "from-rose-400 to-pink-600",
  },
];

const STATUS_CONFIG = {
  confirmed: { label: "Confirmed", cls: "bg-emerald-100 text-emerald-700" },
  pending:   { label: "Pending",   cls: "bg-amber-100 text-amber-700"    },
  cancelled: { label: "Cancelled", cls: "bg-red-100 text-red-500"        },
};

function BookingRow({ b, dark, i }: { b: typeof BOOKINGS[0]; dark: boolean; i: number }) {
  const [open, setOpen] = useState(false);
  const s = STATUS_CONFIG[b.status as keyof typeof STATUS_CONFIG];
  const border = dark ? "border-gray-800" : "border-gray-100";
  const bg = dark ? "bg-gray-900" : "bg-white";
  const hov = dark ? "hover:bg-gray-800/40" : "hover:bg-orange-50/40";

  return (
    <motion.div {...stagger(i)} className={`border ${border} ${bg} rounded-2xl overflow-hidden shadow-sm mb-3`}>
      <div
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-4 px-5 py-4 cursor-pointer ${hov} transition-colors`}
      >
        {/* Icon badge */}
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center text-lg flex-shrink-0`}>
          {b.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className={`font-semibold text-sm ${dark ? "text-white" : "text-gray-800"}`}>{b.title}</div>
          <div className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{b.sub}</div>
        </div>

        <div className="hidden sm:block text-right mr-4">
          <div className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>{b.date.split("·")[0]}</div>
          <div className={`text-xs ${dark ? "text-gray-600" : "text-gray-400"}`}>Ref: {b.ref}</div>
        </div>

        <div className="text-right flex-shrink-0">
          <div className={`font-bold text-sm ${dark ? "text-white" : "text-gray-900"}`}>{b.price}</div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.cls}`}>{s.label}</span>
        </div>

        <span className={`text-xs ml-2 ${dark ? "text-gray-600" : "text-gray-400"} transition-transform ${open ? "rotate-180" : ""} inline-block`}>▾</span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className={`px-5 pb-4 pt-0 border-t ${dark ? "border-gray-800" : "border-gray-50"}`}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex-1">
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${dark ? "text-gray-500" : "text-gray-400"}`}>Details</div>
                  <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>{b.detail}</p>
                  <p className={`text-xs mt-1 ${dark ? "text-gray-600" : "text-gray-400"}`}>Trip: {b.trip}</p>
                </div>
                <div className="flex gap-2 sm:flex-col sm:items-end">
                  <button className={`text-xs font-semibold px-4 py-2 rounded-xl border ${dark ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-600 hover:bg-gray-50"} transition-colors`}>
                    View Ticket
                  </button>
                  {b.status !== "cancelled" && (
                    <button className="text-xs font-semibold px-4 py-2 rounded-xl border border-red-200 text-red-400 hover:bg-red-50 transition-colors">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export const BookingsPage = () => {
  const { isDarkMode } = useApp();
  const dark = isDarkMode;
  const [tab, setTab] = useState<BookingTab>("all");
  const card = dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";

  const tabs: BookingTab[] = ["all", "flights", "hotels", "activities"];
  const filtered = tab === "all" ? BOOKINGS : BOOKINGS.filter(b => b.type === tab.slice(0, -1));

  const totalConfirmed = BOOKINGS.filter(b => b.status === "confirmed").length;
  const totalSpend = "₹1,15,900";

  return (
    <div className={`max-w-5xl mx-auto ${dark ? "text-white" : "text-gray-900"}`}>

      {/* Header */}
      <motion.div {...stagger(0)} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings 🎫</h1>
          <p className={`text-sm mt-0.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>All your reservations in one place</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold px-5 py-2.5 rounded-2xl shadow-lg shadow-orange-500/20 text-sm"
        >
          + Add Booking
        </motion.button>
      </motion.div>

      {/* Summary cards */}
      <motion.div {...stagger(1)} className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Total Bookings", value: `${BOOKINGS.length}`, color: "from-orange-400 to-pink-500" },
          { label: "Confirmed",      value: `${totalConfirmed}`,  color: "from-emerald-400 to-teal-500" },
          { label: "Total Value",    value: totalSpend,           color: "from-amber-400 to-orange-500" },
        ].map((s, i) => (
          <div key={i} className={`border ${card} rounded-2xl p-4 text-center`}>
            <div className={`text-2xl font-black bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
            <div className={`text-xs mt-0.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Tabs */}
      <motion.div {...stagger(2)} className="flex gap-2 mb-5 flex-wrap">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
              tab === t
                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
                : dark ? "bg-gray-800 text-gray-400 hover:bg-gray-700" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {t === "all" ? "✈️🏨🎭 All" : t === "flights" ? "✈️ Flights" : t === "hotels" ? "🏨 Hotels" : "🎭 Activities"}
          </button>
        ))}
      </motion.div>

      {/* Bookings list */}
      <AnimatePresence mode="popLayout">
        {filtered.map((b, i) => (
          <BookingRow key={b.id} b={b} dark={dark} i={i} />
        ))}
      </AnimatePresence>
    </div>
  );
};