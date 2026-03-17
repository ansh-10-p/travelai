"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Star, Calendar, TrendingUp, Brain, Map, Wallet, Globe } from "lucide-react";
import { HeroSection } from "@/components/blocks/hero-section-3";

const trending = [
  {
    city: "Tokyo",
    country: "Japan",
    tag: "Culture",
    tagColor: "bg-violet-100 text-violet-700",
    budget: "$2,800 / week",
    bestSeason: "Mar – May",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=320&fit=crop",
    accent: "from-violet-500/20 to-indigo-500/20",
  },
  {
    city: "Bali",
    country: "Indonesia",
    tag: "Adventure",
    tagColor: "bg-emerald-100 text-emerald-700",
    budget: "$1,200 / week",
    bestSeason: "Apr – Oct",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=320&fit=crop",
    accent: "from-emerald-500/20 to-teal-500/20",
  },
  {
    city: "Paris",
    country: "France",
    tag: "Romantic",
    tagColor: "bg-rose-100 text-rose-700",
    budget: "$3,400 / week",
    bestSeason: "Jun – Aug",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=320&fit=crop",
    accent: "from-rose-500/20 to-pink-500/20",
  },
  {
    city: "Santorini",
    country: "Greece",
    tag: "Scenic",
    tagColor: "bg-sky-100 text-sky-700",
    budget: "$2,600 / week",
    bestSeason: "May – Sep",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=320&fit=crop",
    accent: "from-sky-500/20 to-blue-500/20",
  },
  {
    city: "Kyoto",
    country: "Japan",
    tag: "Heritage",
    tagColor: "bg-orange-100 text-orange-700",
    budget: "$2,200 / week",
    bestSeason: "Mar – Apr",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&h=320&fit=crop",
    accent: "from-orange-500/20 to-amber-500/20",
  },
  {
    city: "Iceland",
    country: "Europe",
    tag: "Nature",
    tagColor: "bg-cyan-100 text-cyan-700",
    budget: "$3,800 / week",
    bestSeason: "Jun – Aug",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=320&fit=crop",
    accent: "from-cyan-500/20 to-teal-500/20",
  },
];

const features = [
  {
    icon: Brain,
    title: "AI-Powered Planning",
    desc: "Our AI understands your travel style, budget, and preferences to create truly personalized itineraries.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    accent: "from-violet-400 to-indigo-400",
  },
  {
    icon: Map,
    title: "Day-by-Day Itinerary",
    desc: "Get a complete schedule with activities, restaurants, and accommodations—all curated for you.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    accent: "from-amber-400 to-orange-400",
  },
  {
    icon: Wallet,
    title: "Smart Budget Tracking",
    desc: "Stay within your budget with real-time cost estimates and smart recommendations.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    accent: "from-emerald-400 to-teal-400",
  },
  {
    icon: Globe,
    title: "Multi-Destination Trips",
    desc: "Plan complex multi-stop journeys effortlessly with optimized routes and connections.",
    color: "text-sky-600",
    bg: "bg-sky-50",
    accent: "from-sky-400 to-blue-400",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* ── NEW HERO ── */}
      <HeroSection />

      {/* ── TRENDING DESTINATIONS ── */}
      <section id="explore" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/60 rounded-full px-3 py-1 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Discover the world</span>
            </div>
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-3 tracking-tight">
              Trending Destinations
            </h2>
            <p className="text-gray-500 max-w-lg leading-relaxed">
              The most popular destinations this season, curated by our community of globetrotters.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trending.map((dest, i) => (
              <DestinationCard key={dest.city} {...dest} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/60 rounded-full px-3 py-1 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Why TravelAI</span>
            </div>
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-3 tracking-tight">
              Travel smarter, not harder
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
              Everything you need to plan the perfect trip — powered by cutting-edge AI.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                whileHover={{ y: -4 }}
                className="group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-default overflow-hidden"
              >
                {/* Subtle gradient top accent */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${f.accent ?? 'from-amber-400 to-orange-400'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`w-11 h-11 ${f.bg} rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} strokeWidth={1.8} />
                </div>
                <h3 className="font-bold text-base text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl p-12 shadow-2xl shadow-amber-500/20"
          >
            {/* bg decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3" />
            <div className="relative z-10">
              <div className="text-5xl mb-5">✈️</div>
              <h2 className="font-bold text-3xl md:text-4xl text-white mb-4 tracking-tight">
                Ready to start your adventure?
              </h2>
              <p className="text-amber-100 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                Join thousands of travelers who plan smarter with TravelAI.
              </p>
              <Link
                href="/create-trip"
                className="inline-flex items-center gap-2 bg-white text-amber-700 font-semibold px-8 py-3.5 rounded-2xl text-sm hover:bg-amber-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Plan My Trip
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-100 bg-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">✈</span>
            </div>
            <span className="font-bold text-gray-900">
              Travel<span className="text-amber-600">AI</span>
            </span>
          </div>
          <p className="text-sm text-gray-400">© 2026 TravelAI. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-gray-700 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-gray-700 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-gray-700 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ───────────────── Refined Destination Card ───────────────── */
interface DestinationCardProps {
  city: string;
  country: string;
  tag: string;
  tagColor: string;
  budget: string;
  bestSeason: string;
  rating?: number;
  index?: number;
  image: string;
  accent?: string;
}

function DestinationCard({
  city,
  country,
  tag,
  tagColor,
  budget,
  bestSeason,
  rating = 4.8,
  index = 0,
  image,
  accent,
}: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-500 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={`${city}, ${country}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Tag */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColor} shadow-sm backdrop-blur-sm`}>
            {tag}
          </span>
        </div>

        {/* Trending badge */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
            <TrendingUp className="w-3 h-3 text-amber-600" />
            <span className="text-[10px] font-bold text-amber-700">Trending</span>
          </div>
        </div>

        {/* Country name at bottom of image */}
        <div className="absolute bottom-3 left-4">
          <p className="text-white/80 text-sm font-medium">{country}</p>
        </div>
      </div>

      {/* Card content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-xl text-gray-900 tracking-tight">{city}</h3>
          <div className="flex items-center gap-1 bg-amber-50 rounded-full px-2.5 py-1">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="text-sm font-bold text-amber-700">{rating}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px]">💰</span>
            </div>
            <span className="text-sm text-gray-500">
              Avg. budget: <span className="text-gray-800 font-semibold">{budget}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-3 h-3 text-amber-600" />
            </div>
            <span className="text-sm text-gray-500">
              Best time: <span className="text-gray-800 font-semibold">{bestSeason}</span>
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button className="w-full text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors duration-200 flex items-center justify-center gap-1.5 group/btn">
            <span>Explore destination</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
