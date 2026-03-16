"use client";

import { motion } from "framer-motion";
import { MapPin, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

const destinations = [
  {
    city: "Tokyo",
    country: "Japan",
    tag: "Culture",
    tagColor: "bg-violet-100 text-violet-700",
    gradient: "from-violet-400/20 to-indigo-400/20",
    emoji: "🗼",
    delay: 0,
    rotate: -4,
    top: "5%",
    left: "5%",
  },
  {
    city: "Bali",
    country: "Indonesia",
    tag: "Adventure",
    tagColor: "bg-emerald-100 text-emerald-700",
    gradient: "from-emerald-400/20 to-teal-400/20",
    emoji: "🌴",
    delay: 0.15,
    rotate: 3,
    top: "30%",
    left: "52%",
  },
  {
    city: "Paris",
    country: "France",
    tag: "Food",
    tagColor: "bg-rose-100 text-rose-700",
    gradient: "from-rose-400/20 to-pink-400/20",
    emoji: "🗼",
    delay: 0.3,
    rotate: -2,
    top: "58%",
    left: "10%",
  },
  {
    city: "Iceland",
    country: "Europe",
    tag: "Nature",
    tagColor: "bg-sky-100 text-sky-700",
    gradient: "from-sky-400/20 to-blue-400/20",
    emoji: "🌌",
    delay: 0.45,
    rotate: 4,
    top: "62%",
    left: "55%",
  },
];

export default function FloatingDestinations() {
  return (
    <div className="relative w-full h-[500px] md:h-[520px]">
      {destinations.map((dest, i) => (
        <motion.div
          key={dest.city}
          initial={{ opacity: 0, y: 30, rotate: dest.rotate }}
          animate={{ opacity: 1, y: 0, rotate: dest.rotate }}
          transition={{ delay: dest.delay + 0.3, duration: 0.7, ease: "easeOut" }}
          style={{ top: dest.top, left: dest.left, rotate: `${dest.rotate}deg` }}
          className="absolute w-52"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
            whileHover={{ scale: 1.04, rotate: 0, y: -6 }}
            className="glass-card rounded-2xl shadow-float overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-float"
          >
            {/* Image area with gradient */}
            <div className={cn("h-28 bg-gradient-to-br", dest.gradient, "flex items-center justify-center relative")}>
              <span className="text-5xl">{dest.emoji}</span>
              {/* subtle shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
            {/* Info area */}
            <div className="p-3.5 bg-white/90">
              <div className="flex items-start justify-between mb-1.5">
                <div>
                  <p className="font-heading font-semibold text-base text-text leading-none">
                    {dest.city}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-text-muted" />
                    <p className="text-xs text-text-muted">{dest.country}</p>
                  </div>
                </div>
              </div>
              <span className={cn("tag text-[10px]", dest.tagColor)}>
                {dest.tag}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
