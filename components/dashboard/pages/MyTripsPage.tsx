"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboard } from "../DashboardContext";

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
});

type TripStatus = "all" | "upcoming" | "planning" | "completed";

const TRIPS = [
  {
    id: 1, city: "Paris", country: "France", dates: "Apr 11 – Apr 18, 2025",
    daysLeft: 12, nights: 7, status: "upcoming", emoji: "🗼",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=700&q=80",
    bg: "from-rose-900 to-orange-800", budget: "₹72,500", spent: "₹14,200",
    highlights: ["Eiffel Tower", "Louvre", "Montmartre"], progress: 43,
  },
  {
    id: 2, city: "Kyoto", country: "Japan", dates: "Jun 3 – Jun 10, 2025",
    daysLeft: 65, nights: 7, status: "planning", emoji: "⛩️",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=700&q=80",
    bg: "from-pink-900 to-violet-800", budget: "₹90,000", spent: "₹0",
    highlights: ["Arashiyama", "Fushimi Inari", "Gion"], progress: 20,
  },
  {
    id: 3, city: "Santorini", country: "Greece", dates: "Aug 20 – Aug 28, 2025",
    daysLeft: 143, nights: 8, status: "planning", emoji: "🏛️",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=700&q=80",
    bg: "from-sky-900 to-blue-800", budget: "₹1,10,000", spent: "₹0",
    highlights: ["Oia Sunset", "Caldera", "Wine Tasting"], progress: 10,
  },
  {
    id: 4, city: "Bali", country: "Indonesia", dates: "Nov 5 – Nov 14, 2024",
    daysLeft: 0, nights: 9, status: "completed", emoji: "🌴",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=80",
    bg: "from-green-900 to-teal-800", budget: "₹65,000", spent: "₹63,200",
    highlights: ["Ubud Rice Fields", "Uluwatu", "Seminyak"], progress: 100,
    rating: 4.8,
  },
  {
    id: 5, city: "Amsterdam", country: "Netherlands", dates: "Sep 12 – Sep 18, 2024",
    daysLeft: 0, nights: 6, status: "completed", emoji: "🌷",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=700&q=80",
    bg: "from-indigo-900 to-blue-800", budget: "₹80,000", spent: "₹78,500",
    highlights: ["Canal Cruise", "Rijksmuseum", "Vondelpark"], progress: 100,
    rating: 4.5,
  },
  {
    id: 6, city: "Dubai", country: "UAE", dates: "Jul 4 – Jul 8, 2024",
    daysLeft: 0, nights: 4, status: "completed", emoji: "🏙️",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80",
    bg: "from-amber-900 to-yellow-800", budget: "₹55,000", spent: "₹54,100",
    highlights: ["Burj Khalifa", "Desert Safari", "Marina"], progress: 100,
    rating: 4.2,
  },
];

const STATS = [
  { value: "12", label: "Total Trips", sub: "since 2021", color: "from-orange-400 to-pink-500" },
  { value: "18", label: "Countries", sub: "across 4 continents", color: "from-pink-400 to-rose-500" },
  { value: "47", label: "Nights Abroad", sub: "this year", color: "from-amber-400 to-orange-500" },
  { value: "₹6.2L", label: "Total Spent", sub: "avg ₹51k/trip", color: "from-rose-400 to-pink-600" },
];

function TripCard({ trip, dark, i }: { trip: typeof TRIPS[0]; dark: boolean; i: number }) {
  const [hovered, setHovered] = useState(false);
  const card = dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
  const statusConfig = {
    upcoming:  { label: "12d away",   cls: "bg-orange-500/90 text-white" },
    planning:  { label: "Planning",   cls: "bg-white/20 text-white backdrop-blur-sm border border-white/30" },
    completed: { label: "Completed",  cls: "bg-emerald-500/90 text-white" },
  }[trip.status] ?? { label: trip.status, cls: "" };

  return (
    <motion.div
      {...stagger(i)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      className={`border ${card} rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={trip.image} alt={trip.city}
          className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? "scale-110" : "scale-100"}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${trip.bg}/40 to-transparent`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${statusConfig.cls}`}>
          {trip.status === "upcoming" ? `${trip.daysLeft}d away` : statusConfig.label}
        </span>
        {trip.rating && (
          <span className="absolute top-3 right-3 text-xs font-bold bg-black/40 backdrop-blur-sm text-amber-400 px-2.5 py-1 rounded-full">
            ★ {trip.rating}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-white font-bold text-xl">{trip.emoji} {trip.city}</div>
          <div className="text-white/70 text-xs">{trip.country} · {trip.nights} nights</div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{trip.dates}</span>
          <span className={`text-xs font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>{trip.budget}</span>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {trip.highlights.map((h, idx) => (
            <span key={idx} className={`text-xs px-2 py-0.5 rounded-full ${dark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"}`}>{h}</span>
          ))}
        </div>

        {/* Progress bar */}
        {trip.status !== "completed" && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className={dark ? "text-gray-600" : "text-gray-400"}>Planning progress</span>
              <span className="text-orange-400 font-semibold">{trip.progress}%</span>
            </div>
            <div className={`h-1.5 rounded-full ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${trip.progress}%` }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-orange-400 to-pink-500"
              />
            </div>
          </div>
        )}

        {/* Completed spend */}
        {trip.status === "completed" && (
          <div className={`flex items-center justify-between text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>
            <span>Spent: <span className={`font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>{trip.spent}</span></span>
            <span className="text-emerald-500 font-semibold">✓ Completed</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export const MyTripsPage = () => {
  const { isDarkMode } = useDashboard();
  const dark = isDarkMode;
  const [filter, setFilter] = useState<TripStatus>("all");
  const card = dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";

  const filtered = filter === "all" ? TRIPS : TRIPS.filter(t => t.status === filter);

  return (
    <div className={`max-w-5xl mx-auto ${dark ? "text-white" : "text-gray-900"}`}>

      {/* Header */}
      <motion.div {...stagger(0)} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Trips ✈️</h1>
          <p className={`text-sm mt-0.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>All your adventures, past and future</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold px-5 py-2.5 rounded-2xl shadow-lg shadow-orange-500/20 text-sm"
        >
          + New Trip
        </motion.button>
      </motion.div>

      {/* Stats row */}
      <motion.div {...stagger(1)} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {STATS.map((s, i) => (
          <div key={i} className={`border ${card} rounded-2xl p-4`}>
            <div className={`text-2xl font-black bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
            <div className={`text-xs font-semibold mt-0.5 ${dark ? "text-gray-300" : "text-gray-700"}`}>{s.label}</div>
            <div className={`text-xs mt-0.5 ${dark ? "text-gray-600" : "text-gray-400"}`}>{s.sub}</div>
          </div>
        ))}
      </motion.div>

      {/* Filter tabs */}
      <motion.div {...stagger(2)} className="flex gap-2 mb-5 flex-wrap">
        {(["all", "upcoming", "planning", "completed"] as TripStatus[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all capitalize ${
              filter === f
                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
                : dark ? "bg-gray-800 text-gray-400 hover:bg-gray-700" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {f} {f === "all" ? `(${TRIPS.length})` : `(${TRIPS.filter(t => t.status === f).length})`}
          </button>
        ))}
      </motion.div>

      {/* Trip grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((trip, i) => (
            <TripCard key={trip.id} trip={trip} dark={dark} i={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};