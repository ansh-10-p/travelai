"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import CreateTripForm from "@/components/CreateTripForm";
import ItineraryTimeline from "@/components/ItineraryTimeline";

const sampleItinerary = [
  {
    day: 1,
    title: "Arrival in Tokyo",
    activities: [
      "Check in at hotel in Shinjuku",
      "Evening stroll through Shibuya Crossing",
      "Ramen dinner at Ichiran",
    ],
  },
  {
    day: 2,
    title: "Shibuya & Harajuku Exploration",
    activities: [
      "Meiji Shrine morning visit",
      "Harajuku Takeshita Street shopping",
      "Shibuya Sky observation deck at sunset",
      "Izakaya dinner experience",
    ],
  },
  {
    day: 3,
    title: "Mount Fuji Day Trip",
    activities: [
      "Early morning bullet train to Fujikawaguchiko",
      "Lake Kawaguchiko boat ride with Fuji view",
      "Traditional onsen (hot spring) experience",
      "Return to Tokyo by evening",
    ],
  },
  {
    day: 4,
    title: "Tokyo Food Tour",
    activities: [
      "Tsukiji Outer Market breakfast",
      "Asakusa temple and Nakamise street",
      "Ramen, sushi, and street food crawl",
      "TeamLab Planets digital art museum",
    ],
  },
  {
    day: 5,
    title: "Departure Day",
    activities: [
      "Final morning in Akihabara",
      "Airport transfer and duty-free shopping",
      "Flight home with incredible memories",
    ],
  },
];

export default function CreateTripPage() {
  const [showItinerary, setShowItinerary] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3.5 py-1 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-accent">AI-Powered Planner</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-text mb-2">
              Plan Your Next Trip
            </h1>
            <p className="text-text-muted">
              Tell us your preferences and our AI will craft a personalized itinerary just for you.
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="card p-8 mb-8"
          >
            <CreateTripForm onGenerate={() => setShowItinerary(true)} />
          </motion.div>

          {/* Itinerary Preview */}
          <AnimatePresence>
            {showItinerary && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-2xl font-semibold text-text">
                    ✨ Itinerary Preview
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-medium border border-accent/20">
                      AI Generated
                    </span>
                  </div>
                </div>

                {/* Trip summary bar */}
                <div className="card p-4 mb-6 flex flex-wrap gap-4 items-center">
                  {[
                    { label: "Destination", value: "Tokyo, Japan 🗼" },
                    { label: "Duration", value: "5 days" },
                    { label: "Est. Budget", value: "$2,800" },
                    { label: "Style", value: "Cultural" },
                  ].map((item) => (
                    <div key={item.label} className="flex-1 min-w-28">
                      <p className="text-xs text-text-muted mb-0.5">{item.label}</p>
                      <p className="text-sm font-medium text-text">{item.value}</p>
                    </div>
                  ))}
                </div>

                <ItineraryTimeline items={sampleItinerary} />

                {/* Action buttons */}
                <div className="flex gap-3 mt-8">
                  <button className="btn-primary flex-1 py-3 text-sm">
                    Save Itinerary
                  </button>
                  <button className="btn-secondary flex-1 py-3 text-sm">
                    Regenerate
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}
