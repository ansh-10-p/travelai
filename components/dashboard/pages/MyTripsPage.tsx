"use client";

import { motion } from "framer-motion";
import { useDashboard } from "../DashboardContext";
import { TripCard, StatCard } from "../DashboardCards";
import { Plane, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const allTrips = [
  { destination: "Paris, France", startDate: "May 20", endDate: "May 27", status: "upcoming" as const, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&q=80", progress: 60 },
  { destination: "Tokyo, Japan", startDate: "Jun 10", endDate: "Jun 25", status: "upcoming" as const, image: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=300&q=80", progress: 30 },
  { destination: "New York, USA", startDate: "Jul 1", endDate: "Jul 8", status: "upcoming" as const, image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&q=80", progress: 10 },
  { destination: "Barcelona, Spain", startDate: "Apr 5", endDate: "Apr 12", status: "completed" as const, image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300&q=80", progress: 100 },
  { destination: "Bali, Indonesia", startDate: "Mar 15", endDate: "Mar 25", status: "completed" as const, image: "https://images.unsplash.com/photo-1537225228614-b4fad34a0b60?w=300&q=80", progress: 100 },
  { destination: "Dubai, UAE", startDate: "Feb 10", endDate: "Feb 17", status: "completed" as const, image: "https://images.unsplash.com/photo-1512453409338-ab7779ca7d69?w=300&q=80", progress: 100 },
];

export const MyTripsPage = () => {
  const { isDarkMode } = useDashboard();
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "completed">("all");

  const filteredTrips = filterStatus === "all" 
    ? allTrips 
    : allTrips.filter(trip => trip.status === filterStatus);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const bgClass = isDarkMode ? "bg-gray-900" : "bg-gray-50";
  const cardBg = isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const subtextClass = isDarkMode ? "text-gray-400" : "text-gray-600";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`space-y-6 sm:space-y-8 ${bgClass}`}
    >
      {/* Header - Enhanced */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <motion.div
          whileHover={{ x: 4 }}
          className="group"
        >
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">My Trips</h1>
          <p className={`${subtextClass} mt-2 text-sm sm:text-base`}>Organize and track all your adventures</p>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all gap-2 w-full sm:w-auto flex items-center justify-center"
        >
          <Plus size={20} />
          New Trip
        </motion.button>
      </motion.div>

      {/* Stats - Enhanced */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
      >
        {[
          { title: "Total Trips", value: 24, color: "from-blue-500 to-cyan-500" },
          { title: "Upcoming", value: 3, color: "from-orange-500 to-red-500" },
          { title: "Completed", value: 21, color: "from-green-500 to-emerald-500" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            className={`${cardBg} p-6 rounded-xl border shadow-lg hover:shadow-2xl transition-all overflow-hidden relative`}
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 hover:opacity-5 transition-opacity`}
            />
            <div className="relative z-10">
              <p className={`text-sm ${subtextClass}`}>{stat.title}</p>
              <p className={`text-3xl font-bold ${textClass} mt-2`}>{stat.value}</p>
              <motion.div
                className={`h-1 w-12 bg-gradient-to-r ${stat.color} rounded-full mt-4`}
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters - Enhanced */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap gap-3 items-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-orange-500"
        >
          <Filter size={20} />
        </motion.div>
        {(["all", "upcoming", "completed"] as const).map((status) => (
          <motion.button
            key={status}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base relative overflow-hidden group ${
              filterStatus === status
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                : `${cardBg} ${textClass} border shadow-md hover:shadow-lg`
            }`}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-10 transition-opacity"
              initial={false}
            />
            <span className="relative z-10">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Trips Grid - Enhanced */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredTrips.map((trip, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -12, boxShadow: "0 30px 60px rgba(0,0,0,0.3)" }}
            className={`${cardBg} rounded-xl overflow-hidden border shadow-lg hover:shadow-2xl transition-all group`}
          >
            <div className="relative h-56 overflow-hidden">
              <motion.img
                src={trip.image}
                alt={trip.destination}
                className="w-full h-full object-cover group-hover:scale-120 transition-transform duration-500"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col items-end justify-between p-4"
              >
                <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                  trip.status === 'upcoming' 
                    ? 'bg-orange-500' 
                    : 'bg-green-500'
                }`}>
                  {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                </span>
              </motion.div>
            </div>
            <div className="p-5">
              <motion.p className={`font-bold text-lg ${textClass}`}>{trip.destination}</motion.p>
              <p className={`text-xs ${subtextClass} mt-1`}>{trip.startDate} - {trip.endDate}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <p className={`text-xs font-semibold ${subtextClass}`}>Progress</p>
                  <p className={`text-xs font-bold text-orange-500`}>{trip.progress}%</p>
                </div>
                <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2 overflow-hidden`}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${trip.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-orange-400 to-red-500"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredTrips.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${cardBg} rounded-xl p-12 text-center border`}
        >
          <Plane size={48} className={`mx-auto mb-4 ${subtextClass}`} />
          <p className={`${textClass} text-lg font-semibold`}>No trips found</p>
          <p className={`${subtextClass} text-sm mt-1`}>Create a new trip to get started</p>
        </motion.div>
      )}
    </motion.div>
  );
};
