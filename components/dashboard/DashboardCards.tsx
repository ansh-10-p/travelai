"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import CountUp from "react-countup";
import { useState } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  trend?: "up" | "down";
  trendValue?: number;
  delay?: number;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
  trendValue,
  delay = 0,
}: StatCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const colorMap: Record<string, { bg: string; text: string }> = {
    "bg-blue-500": { bg: "bg-blue-100", text: "text-blue-600" },
    "bg-green-500": { bg: "bg-green-100", text: "text-green-600" },
    "bg-purple-500": { bg: "bg-purple-100", text: "text-purple-600" },
    "bg-orange-500": { bg: "bg-orange-100", text: "text-orange-600" },
  };

  const mappedColor = colorMap[color] || { bg: "bg-gray-100", text: "text-gray-600" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg cursor-pointer transition-shadow"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-gray-600 text-xs sm:text-sm font-medium truncate">{title}</p>
          <motion.h3
            animate={{ color: isHovered ? "#8B4513" : "#000" }}
            className="text-2xl sm:text-3xl font-bold mt-2 break-words"
          >
            <CountUp end={value} duration={2} separator="," />
          </motion.h3>
          {trend && trendValue && (
            <p className={`text-xs sm:text-sm mt-2 ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
              {trend === "up" ? "↑" : "↓"} {trendValue}% from last month
            </p>
          )}
        </div>
        <motion.div
          animate={{ rotate: isHovered ? 10 : 0 }}
          className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${mappedColor.bg}`}
        >
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${mappedColor.text}`} />
        </motion.div>
      </div>
    </motion.div>
  );
};

interface ActivityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  timestamp: string;
  color: string;
  delay?: number;
}

export const ActivityCard = ({
  icon: Icon,
  title,
  description,
  timestamp,
  color,
  delay = 0,
}: ActivityCardProps) => {
  const colorMap: Record<string, string> = {
    "bg-blue-500": "text-blue-600",
    "bg-green-500": "text-green-600",
    "bg-purple-500": "text-purple-600",
    "bg-orange-500": "text-orange-600",
  };

  const mappedText = colorMap[color] || "text-gray-600";
  const mappedBg = color.replace("text-", "bg-").replace("-500", "-100");

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ x: 5 }}
      className="flex items-start gap-3 sm:gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
    >
      <motion.div
        whileHover={{ rotate: 10 }}
        className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${mappedBg}`}
      >
        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${mappedText}`} />
      </motion.div>
      <div className="flex-1 min-w-0">
        <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">{title}</p>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
        <p className="text-xs text-gray-400 mt-2">{timestamp}</p>
      </div>
    </motion.div>
  );
};

interface TripCardProps {
  destination: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "ongoing" | "completed";
  image: string;
  progress?: number;
  delay?: number;
}

export const TripCard = ({
  destination,
  startDate,
  endDate,
  status,
  image,
  progress,
  delay = 0,
}: TripCardProps) => {
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    ongoing: "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
    >
      <div className="relative h-32 sm:h-40 overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={destination}
          className="w-full h-full object-cover"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
        >
          <button className="px-3 sm:px-4 py-2 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 text-sm sm:text-base">
            View Details
          </button>
        </motion.div>
      </div>

      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2">{destination}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          {startDate} - {endDate}
        </p>

        {progress !== undefined && (
          <div className="mt-3 sm:mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-600">Progress</span>
              <span className="text-xs font-semibold text-primary">{progress}%</span>
            </div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: delay + 0.3 }}
              className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full relative overflow-hidden"
            >
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>
        )}

        <div className="mt-3 sm:mt-4">
          <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
