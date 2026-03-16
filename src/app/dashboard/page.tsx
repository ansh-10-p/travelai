"use client";

import { motion } from "framer-motion";
import { Map, DollarSign, Bookmark, Bell, Plus } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import StatsCard from "@/components/StatsCard";
import TripCard from "@/components/TripCard";

const stats = [
  { label: "Trips Planned", value: "8", icon: Map, change: "2 new", positive: true },
  { label: "Saved Destinations", value: "24", icon: Bookmark, change: "5 new", positive: true },
  { label: "Travel Budget", value: "$12.4k", icon: DollarSign, change: "on track", positive: true },
];

const upcomingTrips = [
  {
    destination: "Tokyo Adventure",
    country: "Japan",
    dates: "Apr 12 – Apr 22, 2026",
    budget: "$2,800",
    emoji: "🗼",
    gradient: "from-violet-300/30 to-indigo-300/30",
  },
  {
    destination: "Bali Retreat",
    country: "Indonesia",
    dates: "Jun 5 – Jun 14, 2026",
    budget: "$1,400",
    emoji: "🌴",
    gradient: "from-emerald-300/30 to-teal-300/30",
  },
  {
    destination: "Paris Escape",
    country: "France",
    dates: "Aug 20 – Aug 28, 2026",
    budget: "$3,200",
    emoji: "🥐",
    gradient: "from-rose-300/30 to-pink-300/30",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-10">

          {/* Header */}
          <div className="flex items-start justify-between mb-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm text-text-muted mb-1">Good evening ✨</p>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-text">
                Welcome back, Traveler
              </h1>
            </motion.div>
            <div className="flex items-center gap-3 mt-1">
              <button className="p-2.5 rounded-xl hover:bg-surface border border-border transition-colors">
                <Bell className="w-4 h-4 text-text-muted" />
              </button>
              <Link
                href="/create-trip"
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Trip
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
            {stats.map((s, i) => (
              <StatsCard key={s.label} {...s} index={i} />
            ))}
          </div>

          {/* Upcoming Trips */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-semibold text-text">
                Upcoming Trips
              </h2>
              <Link
                href="#"
                className="text-sm text-accent hover:text-accent-dark font-medium transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcomingTrips.map((trip, i) => (
                <TripCard key={trip.destination} {...trip} index={i} />
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-text mb-6">
              Quick Actions
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { emoji: "✈️", title: "Plan New Trip", desc: "Start with AI assistance", href: "/create-trip" },
                { emoji: "🌍", title: "Explore Destinations", desc: "Discover trending places", href: "/#explore" },
                { emoji: "💾", title: "Saved Places", desc: "Review your wishlist", href: "#" },
              ].map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="card p-5 flex items-start gap-4 group hover:border-accent/30 transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    {action.emoji}
                  </div>
                  <div>
                    <p className="font-medium text-text text-sm">{action.title}</p>
                    <p className="text-xs text-text-muted mt-0.5">{action.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
