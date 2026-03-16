"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingDestinations from "@/components/FloatingDestinations";
import DestinationCard from "@/components/DestinationCard";

const trending = [
  {
    city: "Tokyo",
    country: "Japan",
    emoji: "🗼",
    gradient: "from-violet-300/30 to-indigo-300/30",
    budget: "$2,800 / week",
    bestSeason: "Mar – May",
    rating: 4.9,
  },
  {
    city: "Bali",
    country: "Indonesia",
    emoji: "🌴",
    gradient: "from-emerald-300/30 to-teal-300/30",
    budget: "$1,200 / week",
    bestSeason: "Apr – Oct",
    rating: 4.8,
  },
  {
    city: "Paris",
    country: "France",
    emoji: "🗼",
    gradient: "from-rose-300/30 to-pink-300/30",
    budget: "$3,400 / week",
    bestSeason: "Jun – Aug",
    rating: 4.9,
  },
  {
    city: "Santorini",
    country: "Greece",
    emoji: "🏛️",
    gradient: "from-sky-300/30 to-blue-300/30",
    budget: "$2,600 / week",
    bestSeason: "May – Sep",
    rating: 4.7,
  },
  {
    city: "Kyoto",
    country: "Japan",
    emoji: "⛩️",
    gradient: "from-orange-300/30 to-amber-300/30",
    budget: "$2,200 / week",
    bestSeason: "Mar – Apr",
    rating: 4.8,
  },
  {
    city: "Iceland",
    country: "Europe",
    emoji: "🌌",
    gradient: "from-cyan-300/30 to-teal-300/30",
    budget: "$3,800 / week",
    bestSeason: "Jun – Aug",
    rating: 4.6,
  },
];

const features = [
  {
    icon: "🧠",
    title: "AI-Powered Planning",
    desc: "Our AI understands your travel style, budget, and preferences to create truly personalized itineraries.",
  },
  {
    icon: "🗺️",
    title: "Day-by-Day Itinerary",
    desc: "Get a complete schedule with activities, restaurants, and accommodations—all curated for you.",
  },
  {
    icon: "💡",
    title: "Smart Budget Tracking",
    desc: "Stay within your budget with real-time cost estimates and smart recommendations.",
  },
  {
    icon: "✈️",
    title: "Multi-Destination Trips",
    desc: "Plan complex multi-stop journeys effortlessly with optimized routes and connections.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div>
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-accent">AI Travel Planning, Reimagined</span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-text leading-[1.08] mb-6"
            >
              Plan Your{" "}
              <span className="italic text-accent">Dream</span>
              <br />
              Journey With AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-text-muted text-lg leading-relaxed mb-10 max-w-md"
            >
              Describe your destination, travel style, and budget. Our AI creates
              a personalized itinerary with hotels, activities, and daily plans.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/create-trip" className="btn-primary flex items-center gap-2 px-7 py-3 text-base">
                Start Planning
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#explore" className="btn-secondary flex items-center gap-2 px-7 py-3 text-base">
                Explore Destinations
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {["🧑‍💻", "👩‍🦰", "👨‍🦱", "👩‍🦳"].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-surface border-2 border-background flex items-center justify-center text-base"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium text-text">12,000+ trips planned</p>
                <div className="flex items-center gap-1">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} className="text-accent text-xs">{s}</span>
                  ))}
                  <span className="text-xs text-text-muted ml-1">4.9 / 5</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — floating cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <FloatingDestinations />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-muted">
          <span className="text-xs font-medium">Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </section>

      {/* ── TRENDING DESTINATIONS ── */}
      <section id="explore" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-sm font-medium text-accent mb-3 tracking-wide uppercase">
              Discover the world
            </p>
            <h2 className="section-title mb-3">Trending Destinations</h2>
            <p className="text-text-muted max-w-lg">
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
      <section id="features" className="py-24 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-medium text-accent mb-3 tracking-wide uppercase">
              Why TravelAI
            </p>
            <h2 className="section-title mb-3">Travel smarter, not harder</h2>
            <p className="text-text-muted max-w-lg mx-auto">
              Everything you need to plan the perfect trip — powered by cutting-edge AI.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 text-center group"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-heading font-semibold text-lg text-text mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">{f.desc}</p>
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
            className="bg-accent/10 border border-accent/20 rounded-3xl p-12"
          >
            <p className="text-5xl mb-6">✈️</p>
            <h2 className="font-heading text-4xl font-bold text-text mb-4">
              Ready to start your adventure?
            </h2>
            <p className="text-text-muted text-lg mb-8">
              Join thousands of travelers who plan smarter with TravelAI.
            </p>
            <Link href="/create-trip" className="btn-primary text-base px-8 py-3 inline-flex items-center gap-2">
              Plan My Trip
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-semibold text-text">
              Travel<span className="text-accent">AI</span>
            </span>
          </div>
          <p className="text-sm text-text-muted">
            © 2026 TravelAI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-text-muted">
            <Link href="#" className="hover:text-text transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-text transition-colors">Terms</Link>
            <Link href="#" className="hover:text-text transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
