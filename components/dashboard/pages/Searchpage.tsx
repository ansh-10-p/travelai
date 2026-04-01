"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppProvider, useApp } from '../../travel/AppContext';
import { Card, HeroBanner, BtnPrimary, SectionHeader, stagger, GRAD_TEXT } from "../../ui/ui";

const POPULAR = [
  { city: "Paris",     country: "France",    emoji: "🗼", from: "₹58,400",  img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", match: 94 },
  { city: "Kyoto",     country: "Japan",     emoji: "⛩️", from: "₹72,000",  img: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80",  match: 87 },
  { city: "Bali",      country: "Indonesia", emoji: "🌴", from: "₹48,000",  img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", match: 91 },
  { city: "Santorini", country: "Greece",    emoji: "🏛️", from: "₹95,000", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80", match: 79 },
  { city: "Amalfi",    country: "Italy",     emoji: "🍋", from: "₹88,000",  img: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=600&q=80", match: 83 },
  { city: "Reykjavík", country: "Iceland",   emoji: "🌌", from: "₹1,10,000",img: "https://images.unsplash.com/photo-1474690870753-1b92efa1f2d8?w=600&q=80", match: 76 },
];

const FLEX_PILLS = ["Non-stop preferred", "Free cancellation", "Airbnb OK", "Vegetarian meals", "Flexible ±3 days", "Include activities"];

export const SearchPage = () => {
  const { setCurrentPage, searchParams, setSearchParams, isDarkMode } = useApp();
  const dark = isDarkMode;
  const [flexPills, setFlexPills] = useState(["Non-stop preferred", "Free cancellation", "Airbnb OK"]);

  const togglePill = (p: string) =>
    setFlexPills(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  const inp = `w-full rounded-xl px-3 py-2.5 text-sm border outline-none transition-colors focus:border-orange-400 ${dark ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400"}`;
  const lbl = `text-xs font-semibold uppercase tracking-wider mb-1.5 block ${dark ? "text-gray-500" : "text-gray-400"}`;

  return (
    <div>
      <SectionHeader title="Where to next? ✈️" sub="Tell us your dream — AI will handle the rest" />

      {/* Hero */}
      <motion.div {...stagger(0)} className="mb-6">
        <HeroBanner>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-semibold tracking-widest uppercase">AI Search Active</span>
          </div>
          <h2 className="text-2xl font-bold mb-1">Smart trip planning in seconds</h2>
          <p className="text-white/60 text-sm">Compares 200+ platforms · Skyscanner · Booking · Airbnb · MakeMyTrip</p>
        </HeroBanner>
      </motion.div>

      {/* Search form */}
      <motion.div {...stagger(1)}>
        <Card className="mb-6">
          <div className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Trip Details</div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className={lbl}>From</label>
              <input className={inp} value={searchParams.from}
                onChange={e => setSearchParams({ ...searchParams, from: e.target.value })} />
            </div>
            <div>
              <label className={lbl}>To</label>
              <input className={inp} value={searchParams.to}
                onChange={e => setSearchParams({ ...searchParams, to: e.target.value })} />
            </div>
            <div>
              <label className={lbl}>Depart</label>
              <input type="date" className={inp} value={searchParams.departDate}
                onChange={e => setSearchParams({ ...searchParams, departDate: e.target.value })} />
            </div>
            <div>
              <label className={lbl}>Return</label>
              <input type="date" className={inp} value={searchParams.returnDate}
                onChange={e => setSearchParams({ ...searchParams, returnDate: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <label className={lbl}>Travellers</label>
              <input type="number" min={1} max={9} className={inp} value={searchParams.travelers}
                onChange={e => setSearchParams({ ...searchParams, travelers: +e.target.value })} />
            </div>
            <div>
              <label className={lbl}>Budget (₹)</label>
              <input type="number" className={inp} value={searchParams.budget}
                onChange={e => setSearchParams({ ...searchParams, budget: +e.target.value })} />
            </div>
            <div>
              <label className={lbl}>Trip type</label>
              <select className={inp} value={searchParams.tripType}
                onChange={e => setSearchParams({ ...searchParams, tripType: e.target.value })}>
                {["Leisure", "Adventure", "Business", "Honeymoon", "Family"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className={`h-px mb-4 ${dark ? "bg-gray-800" : "bg-gray-100"}`} />
          <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${dark ? "text-gray-500" : "text-gray-400"}`}>Flexible preferences</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {FLEX_PILLS.map(p => (
              <button
                key={p}
                onClick={() => togglePill(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  flexPills.includes(p)
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-transparent"
                    : dark ? "border-gray-700 text-gray-400 hover:border-gray-600" : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <BtnPrimary onClick={() => setCurrentPage("optimize")} className="w-full">
            ⚡ Find best trip with AI →
          </BtnPrimary>
        </Card>
      </motion.div>

      {/* Popular destinations */}
      <motion.div {...stagger(2)}>
        <div className={`flex items-center justify-between mb-3`}>
          <p className={`text-xs font-semibold uppercase tracking-widest ${dark ? "text-gray-500" : "text-gray-400"}`}>Popular right now 🔥</p>
          <span className="text-xs text-orange-400 font-semibold cursor-pointer hover:text-orange-300">See all →</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {POPULAR.map((dest, i) => (
            <motion.div
              key={dest.city}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => {
                setSearchParams({ ...searchParams, to: `${dest.city} (${dest.country})` });
                setCurrentPage("optimize");
              }}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group h-36 border ${dark ? "border-gray-800" : "border-gray-100"}`}
            >
              <img src={dest.img} alt={dest.city} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-2.5 right-2.5 text-[10px] font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2 py-0.5 rounded-full">
                {dest.match}% match
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="text-white font-bold text-sm">{dest.emoji} {dest.city}</div>
                <div className="text-white/60 text-xs">{dest.country}</div>
                <div className="text-orange-300 text-xs font-semibold mt-0.5">from {dest.from}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};