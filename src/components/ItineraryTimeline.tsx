"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineItem {
  day: number;
  title: string;
  activities: string[];
}

interface ItineraryTimelineProps {
  items: TimelineItem[];
}

export default function ItineraryTimeline({ items }: ItineraryTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-6">
        {items.map((item, i) => (
          <motion.div
            key={item.day}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12, duration: 0.45, ease: "easeOut" }}
            className="relative flex gap-5"
          >
            {/* Day circle */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-soft z-10">
              <span className="text-white text-xs font-semibold">{item.day}</span>
            </div>

            {/* Content */}
            <div className="flex-1 pb-2">
              <div className="card p-4 group hover:border-accent/30 transition-colors duration-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-heading font-semibold text-base text-text">
                    Day {item.day}
                  </h4>
                  <span className="text-xs text-text-muted bg-surface px-2 py-1 rounded-full">
                    {item.activities.length} activities
                  </span>
                </div>
                <p className="text-sm font-medium text-accent mb-2">{item.title}</p>
                <ul className="space-y-1.5">
                  {item.activities.map((activity, ai) => (
                    <li
                      key={ai}
                      className="flex items-center gap-2 text-sm text-text-muted"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/50 flex-shrink-0" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
