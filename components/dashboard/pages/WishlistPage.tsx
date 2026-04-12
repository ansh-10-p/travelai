"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
  import { AppProvider, useApp } from '../../travel/AppContext';

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
});

type WishCategory = "all" | "destinations" | "hotels" | "activities" | "restaurants";

const WISHLIST = [
  {
    id: 1, category: "destinations", emoji: "palm",
    title: "Bali, Indonesia", sub: "Southeast Asia · Best Nov–Mar",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    match: 94, budget: "₹65,000", note: "Loved by similar travellers", saved: "3 days ago",
    tags: ["Beach", "Culture", "Yoga"],
  },
  {
    id: 2, category: "destinations", emoji: "lemon",
    title: "Amalfi Coast, Italy", sub: "Southern Europe · Best May–Oct",
    image: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=600&q=80",
    match: 87, budget: "₹95,000", note: "Similar to Santorini wishlist", saved: "1 week ago",
    tags: ["Scenic", "Food", "Coastline"],
  },
  {
    id: 3, category: "destinations", emoji: "stars",
    title: "Reykjavík, Iceland", sub: "Northern Europe · Best Sep–Mar",
    image: "https://images.unsplash.com/photo-1474690870753-1b92efa1f2d8?w=600&q=80",
    match: 79, budget: "₹1,20,000", note: "Northern lights season", saved: "2 weeks ago",
    tags: ["Northern Lights", "Adventure", "Nature"],
  },
  {
    id: 4, category: "hotels", emoji: "home",
    title: "Le Meurice, Paris", sub: "1st Arrondissement · 5-star Palace",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
    match: 91, budget: "₹18,000/night", note: "Overlooking Tuileries Garden", saved: "5 days ago",
    tags: ["Luxury", "Central", "Michelin"],
  },
  {
    id: 5, category: "hotels", emoji: "tent",
    title: "Overwater Villa, Maldives", sub: "Velaa Private Island · All-inclusive",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80",
    match: 88, budget: "₹45,000/night", note: "Dream honeymoon stay", saved: "1 month ago",
    tags: ["Overwater", "Luxury", "Snorkelling"],
  },
  {
    id: 6, category: "activities", emoji: "🎭",
    title: "Moulin Rouge, Paris", sub: "Dinner + Show · Montmartre",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
    match: 83, budget: "₹8,500/person", note: "Book 2 weeks in advance", saved: "4 days ago",
    tags: ["Entertainment", "Dinner", "Iconic"],
  },
  {
    id: 7, category: "activities", emoji: "🧗",
    title: "Hot Air Balloon, Cappadocia", sub: "Sunrise flight · Turkey",
    image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=600&q=80",
    match: 90, budget: "₹12,000/person", note: "Bucket list experience", saved: "2 weeks ago",
    tags: ["Adventure", "Sunrise", "Scenic"],
  },
  {
    id: 8, category: "restaurants", emoji: "🍽️",
    title: "Le Jules Verne, Paris", sub: "Eiffel Tower · 1 Michelin Star",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    match: 85, budget: "₹6,000/person", note: "Inside the Eiffel Tower", saved: "1 week ago",
    tags: ["Fine Dining", "Eiffel", "Romantic"],
  },
];

const CATEGORY_LABELS: Record<WishCategory, string> = {
  all:          "All",
  destinations: "✈️ Destinations",
  hotels:       "🏨 Hotels",
  activities:   "🎯 Activities",
  restaurants:  "🍽️ Restaurants",
};

function WishCard({ item, dark, i }: { item: typeof WISHLIST[0]; dark: boolean; i: number }) {
  const [saved, setSaved] = useState(true);
  const card = dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";

  return (
    <motion.div
      {...stagger(i)}
      layout
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className={`border ${card} rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer group`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Match badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
          {item.match}% match
        </div>

        {/* Heart */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => setSaved(s => !s)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
        >
          <span className={`text-lg transition-all ${saved ? "text-pink-400" : "text-white/60"}`}>
            {saved ? "♥" : "♡"}
          </span>
        </motion.button>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-white font-bold text-base leading-tight">{item.emoji} {item.title}</div>
          <div className="text-white/60 text-xs">{item.sub}</div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.tags.map((t, idx) => (
            <span key={idx} className={`text-xs px-2 py-0.5 rounded-full ${dark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"}`}>{t}</span>
          ))}
        </div>

        <div className={`text-xs italic mb-3 ${dark ? "text-gray-500" : "text-gray-400"}`}>🤖 {item.note}</div>

        <div className="flex items-center justify-between">
          <div>
            <div className={`text-sm font-bold ${dark ? "text-white" : "text-gray-800"}`}>{item.budget}</div>
            <div className={`text-xs ${dark ? "text-gray-600" : "text-gray-400"}`}>Saved {item.saved}</div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="text-xs font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-xl shadow-md"
          >
            Plan →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export const WishlistPage = () => {
  const { isDarkMode } = useApp();
  const dark = isDarkMode;
  const [cat, setCat] = useState<WishCategory>("all");
  const card = dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";

  const filtered = cat === "all" ? WISHLIST : WISHLIST.filter(w => w.category === cat);

  return (
    <div className={`max-w-5xl mx-auto ${dark ? "text-white" : "text-gray-900"}`}>

      {/* Header */}
      <motion.div {...stagger(0)} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wishlist 💖</h1>
          <p className={`text-sm mt-0.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>Places and experiences you're dreaming of</p>
        </div>
        <div className={`text-sm font-semibold px-4 py-2 rounded-2xl border ${card}`}>
          {WISHLIST.length} saved
        </div>
      </motion.div>

      {/* AI Banner */}
      <motion.div
        {...stagger(1)}
        className="relative overflow-hidden rounded-3xl mb-6 p-5"
        style={{ background: "linear-gradient(135deg,#1a0f2e,#2d1008)" }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="text-3xl">🤖</div>
          <div>
            <div className="text-white font-bold text-sm mb-0.5">AI added 3 new items to your wishlist</div>
            <div className="text-white/50 text-xs">Based on your Bali trip and Santorini wishlist — Amalfi, Iceland & Cappadocia match your travel DNA</div>
          </div>
          <button className="ml-auto flex-shrink-0 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors">
            View all →
          </button>
        </div>
      </motion.div>

      {/* Category tabs */}
      <motion.div {...stagger(2)} className="flex gap-2 mb-5 flex-wrap">
        {(Object.keys(CATEGORY_LABELS) as WishCategory[]).map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              cat === c
                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
                : dark ? "bg-gray-800 text-gray-400 hover:bg-gray-700" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <WishCard key={item.id} item={item} dark={dark} i={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};