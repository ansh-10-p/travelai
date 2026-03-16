"use client";

import { motion } from "framer-motion";
import { Star, Calendar, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  city: string;
  country: string;
  emoji: string;
  gradient: string;
  budget: string;
  bestSeason: string;
  rating?: number;
  index?: number;
}

export default function DestinationCard({
  city,
  country,
  emoji,
  gradient,
  budget,
  bestSeason,
  rating = 4.8,
  index = 0,
}: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="card overflow-hidden group cursor-pointer"
    >
      {/* Image */}
      <div
        className={cn(
          "h-52 bg-gradient-to-br flex items-center justify-center relative overflow-hidden",
          gradient
        )}
      >
        <motion.span
          className="text-7xl"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {emoji}
        </motion.span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Trending badge */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-white/90 rounded-full px-2.5 py-1 shadow-soft">
            <TrendingUp className="w-3 h-3 text-accent" />
            <span className="text-[10px] font-semibold text-accent">Trending</span>
          </div>
        </div>

        {/* Country at bottom */}
        <div className="absolute bottom-3 left-4">
          <p className="text-white font-medium text-sm">{country}</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-heading text-xl font-semibold text-text">
            {city}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-accent fill-accent" />
            <span className="text-sm font-medium text-text">{rating}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px]">💰</span>
            </div>
            <span className="text-sm text-text-muted">
              Avg. budget: <span className="text-text font-medium">{budget}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-3 h-3 text-accent" />
            </div>
            <span className="text-sm text-text-muted">
              Best time: <span className="text-text font-medium">{bestSeason}</span>
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full text-sm font-medium text-accent hover:text-accent-dark transition-colors duration-200 flex items-center justify-center gap-1.5">
            <span>Explore destination</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
