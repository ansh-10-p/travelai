"use client";

import { motion } from "framer-motion";
import { useDashboard } from "../DashboardContext";
import { StatCard } from "../DashboardCards";
import { Calendar, MapPin, DollarSign, Check, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const bookings = [
  {
    id: 1,
    name: "Hotel Eiffel Tower Paris",
    type: "Hotel",
    dates: "May 20 - May 27, 2024",
    amount: "$1,250",
    status: "confirmed" as const,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=100&q=80",
  },
  {
    id: 2,
    name: "Flight Paris CDG to Tokyo Narita",
    type: "Flight",
    dates: "May 27 - Jun 10, 2024",
    amount: "$850",
    status: "confirmed" as const,
    image: "https://images.unsplash.com/photo-1436262174933-1d8ffd3c9d9c?w=100&q=80",
  },
  {
    id: 3,
    name: "Luxury Mount Fuji View Resort",
    type: "Hotel",
    dates: "Jun 10 - Jun 25, 2024",
    amount: "$2,100",
    status: "pending" as const,
    image: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=100&q=80",
  },
  {
    id: 4,
    name: "Tokyo City Tour Guide",
    type: "Activity",
    dates: "Jun 12, 2024",
    amount: "$120",
    status: "pending" as const,
    image: "https://images.unsplash.com/photo-1497278460327-498ac084a8ca?w=100&q=80",
  },
  {
    id: 5,
    name: "Flight Tokyo to NYC",
    type: "Flight",
    dates: "Jun 25 - Jul 1, 2024",
    amount: "$920",
    status: "pending" as const,
    image: "https://images.unsplash.com/photo-1436262174933-1d8ffd3c9d9c?w=100&q=80",
  },
];

export const BookingsPage = () => {
  const { isDarkMode } = useDashboard();
  
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const pending = bookings.filter((b) => b.status === "pending").length;
  const totalSpent = bookings.reduce((acc, b) => acc + parseInt(b.amount.replace(/[$,]/g, "")), 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
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

  const statusColors: Record<string, { bg: string; darkBg: string; text: string; icon: any }> = {
    confirmed: { bg: "bg-green-100/80", darkBg: "bg-green-900/30", text: "text-green-700 dark:text-green-400", icon: Check },
    pending: { bg: "bg-yellow-100/80", darkBg: "bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-400", icon: Clock },
    cancelled: { bg: "bg-red-100/80", darkBg: "bg-red-900/30", text: "text-red-700 dark:text-red-400", icon: X },
  };

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
        className="space-y-2"
      >
        <motion.h1 
          className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
          whileHover={{ scale: 1.02 }}
        >
          Bookings
        </motion.h1>
        <p className={`${subtextClass} text-sm sm:text-base`}>View and manage all your reservations</p>
      </motion.div>

      {/* Stats - Enhanced */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
      >
        {[
          { title: "Total Bookings", value: bookings.length, icon: Calendar, color: "from-blue-500 to-cyan-500" },
          { title: "Confirmed", value: confirmed, icon: Check, color: "from-green-500 to-emerald-500" },
          { title: "Pending", value: pending, icon: Clock, color: "from-yellow-500 to-orange-500" },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className={`${cardBg} p-6 rounded-xl border shadow-lg hover:shadow-2xl transition-all overflow-hidden relative group`}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`}
              />
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} p-2.5 mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                <p className={`text-sm ${subtextClass} mb-1`}>{stat.title}</p>
                <p className={`text-2xl sm:text-3xl font-bold ${textClass}`}>{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bookings List - Enhanced */}
      <motion.div
        variants={containerVariants}
        className="space-y-4"
      >
        {bookings.map((booking, index) => {
          const StatusIcon = statusColors[booking.status].icon;
          return (
            <motion.div
              key={booking.id}
              variants={itemVariants}
              whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
              className={`${cardBg} p-4 sm:p-6 rounded-xl border shadow-lg hover:shadow-2xl transition-all group overflow-hidden relative`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="overflow-hidden rounded-lg flex-shrink-0"
                >
                  <img
                    src={booking.image}
                    alt={booking.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex-1">
                      <motion.h3 
                        className={`text-base sm:text-lg font-bold ${textClass} line-clamp-2 group-hover:text-gradient group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-600 group-hover:bg-clip-text group-hover:text-transparent transition-all`}
                      >
                        {booking.name}
                      </motion.h3>
                      <p className={`text-xs sm:text-sm ${subtextClass} mt-1`}>{booking.type}</p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.12, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-full flex items-center gap-2 text-xs sm:text-sm font-semibold flex-shrink-0 ${
                        isDarkMode 
                          ? statusColors[booking.status].darkBg 
                          : statusColors[booking.status].bg
                      } ${statusColors[booking.status].text} shadow-md hover:shadow-lg transition-all`}
                    >
                      <StatusIcon size={16} />
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </motion.div>
                  </div>
                  <motion.div 
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-4 text-xs sm:text-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div 
                      className={`flex items-center gap-2 ${subtextClass} group/item`}
                      whileHover={{ x: 2 }}
                    >
                      <motion.div className="text-orange-500 group-hover/item:scale-125 transition-transform">
                        <Calendar size={16} className="flex-shrink-0" />
                      </motion.div>
                      <span className="break-all">{booking.dates}</span>
                    </motion.div>
                    <motion.div 
                      className={`flex items-center gap-2 font-semibold text-orange-600 dark:text-orange-400 group/item`}
                      whileHover={{ x: 2 }}
                    >
                      <motion.div className="group-hover/item:scale-125 transition-transform">
                        <DollarSign size={16} className="flex-shrink-0" />
                      </motion.div>
                      {booking.amount}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Total Summary - Enhanced */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
        className={`${cardBg} p-6 rounded-xl border shadow-lg hover:shadow-2xl transition-all`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className={`text-sm ${subtextClass}`}>Total Booking Amount</p>
            <p className={`text-3xl font-bold text-transparent bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text mt-2`}>
              ${totalSpent.toLocaleString()}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-2xl transition-all"
          >
            Download Receipt
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
