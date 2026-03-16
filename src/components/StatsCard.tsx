"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  positive?: boolean;
  index?: number;
}

export default function StatsCard({
  label,
  value,
  icon: Icon,
  change,
  positive = true,
  index = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      className="card p-6 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200",
            "bg-accent/10 group-hover:bg-accent/20"
          )}
        >
          <Icon className="w-5 h-5 text-accent" strokeWidth={1.75} />
        </div>
        {change && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              positive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-rose-50 text-rose-600"
            )}
          >
            {positive ? "↑" : "↓"} {change}
          </span>
        )}
      </div>

      <p className="text-3xl font-heading font-semibold text-text mb-1">
        {value}
      </p>
      <p className="text-sm text-text-muted">{label}</p>
    </motion.div>
  );
}
