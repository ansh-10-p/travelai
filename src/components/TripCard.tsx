"use client";

import { motion } from "framer-motion";
import { Calendar, DollarSign, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TripCardProps {
  destination: string;
  country: string;
  dates: string;
  budget: string;
  emoji: string;
  gradient: string;
  index?: number;
}

export default function TripCard({
  destination,
  country,
  dates,
  budget,
  emoji,
  gradient,
  index = 0,
}: TripCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="card overflow-hidden group cursor-pointer"
    >
      {/* Image area */}
      <div
        className={cn(
          "h-48 bg-gradient-to-br flex items-center justify-center relative overflow-hidden",
          gradient
        )}
      >
        <span className="text-6xl">{emoji}</span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-white/90" />
            <span className="text-white/90 text-xs font-medium">{country}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading text-xl font-semibold text-text mb-3">
          {destination}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Calendar className="w-4 h-4 text-accent" />
            <span>{dates}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <DollarSign className="w-4 h-4 text-accent" />
            <span>Est. budget: <span className="font-medium text-text">{budget}</span></span>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="flex items-center justify-between w-full px-4 py-2.5 bg-surface rounded-xl hover:bg-border text-sm font-medium text-text transition-all duration-200 group/btn"
        >
          <span>View Itinerary</span>
          <ArrowRight className="w-4 h-4 text-accent group-hover/btn:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </motion.div>
  );
}
