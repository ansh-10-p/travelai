"use client";

import { motion } from "framer-motion";
import { useDashboard } from "../DashboardContext";
import { StatCard, ActivityCard, TripCard } from "../DashboardCards";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Plane, MapPin, Calendar, Users, TrendingUp, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const chartData = [
  { month: "Jan", trips: 4, bookings: 24, spending: 1200 },
  { month: "Feb", trips: 3, bookings: 13, spending: 900 },
  { month: "Mar", trips: 5, bookings: 29, spending: 2290 },
  { month: "Apr", trips: 2, bookings: 22, spending: 1400 },
  { month: "May", trips: 8, bookings: 35, spending: 2500 },
  { month: "Jun", trips: 6, bookings: 31, spending: 2100 },
];

const pieData = [
  { name: "Hotels", value: 40 },
  { name: "Flights", value: 30 },
  { name: "Activities", value: 20 },
  { name: "Food", value: 10 },
];

const COLORS = ["#8B4513", "#D2691E", "#FF8C42", "#F5F1E8"];

const activityData = [
  { icon: Plane, title: "Flight Booked", description: "New York to Paris", timestamp: "2 hours ago", color: "bg-blue-500" },
  { icon: MapPin, title: "Destination Added", description: "Bali marked as visited", timestamp: "1 day ago", color: "bg-green-500" },
  { icon: Calendar, title: "Trip Planned", description: "Tokyo at cherry blossom season", timestamp: "3 days ago", color: "bg-purple-500" },
  { icon: Users, title: "Traveler Added", description: "Sarah joined your Paris trip", timestamp: "5 days ago", color: "bg-orange-500" },
];

const upcomingTrips = [
  { destination: "Paris, France", startDate: "May 20", endDate: "May 27", status: "upcoming" as const, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&q=80", progress: 60 },
  { destination: "Tokyo, Japan", startDate: "Jun 10", endDate: "Jun 25", status: "upcoming" as const, image: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=300&q=80", progress: 30 },
  { destination: "New York, USA", startDate: "Jul 1", endDate: "Jul 8", status: "upcoming" as const, image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&q=80", progress: 10 },
];

export const DashboardHome = () => {
  const { isDarkMode } = useDashboard();
  
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
      className={`space-y-8 ${bgClass}`}
    >
      {/* Welcome Section - Enhanced */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="relative overflow-hidden rounded-2xl p-8 sm:p-12 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 text-white shadow-2xl"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        />
        
        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-5xl font-bold mb-2 drop-shadow-lg"
          >
            Welcome back, Traveler! 👋
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/90 text-sm sm:text-lg drop-shadow max-w-md"
          >
            You have 3 upcoming trips and 12 unread messages
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold shadow-lg hover:shadow-2xl transition-all"
            >
              Start Planning
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid - Enhanced */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
      >
        {[
          { title: "Total Trips", value: "24", icon: Plane, color: "from-blue-500 to-cyan-500", delay: 0 },
          { title: "Countries", value: "18", icon: MapPin, color: "from-green-500 to-emerald-500", delay: 0.1 },
          { title: "Spending", value: "$45K", icon: TrendingUp, color: "from-purple-500 to-pink-500", delay: 0.2 },
          { title: "Buddies", value: "32", icon: Users, color: "from-orange-500 to-red-500", delay: 0.3 },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              className={`${cardBg} p-6 rounded-xl border shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden relative`}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}
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

      {/* Charts Section - Enhanced */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Bar Chart */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
          className={`${cardBg} lg:col-span-2 p-6 rounded-xl border shadow-lg hover:shadow-2xl transition-all overflow-x-auto`}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-bold ${textClass}`}>Travel Activity</h3>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
            />
          </div>
          <ResponsiveContainer width="100%" height={250} minWidth={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
              <XAxis dataKey="month" tick={{ fill: isDarkMode ? "#9ca3af" : "#6b7280" }} />
              <YAxis tick={{ fill: isDarkMode ? "#9ca3af" : "#6b7280" }} />
              <Tooltip contentStyle={{ backgroundColor: isDarkMode ? "#1f2937" : "#ffffff", border: "none", borderRadius: "8px" }} />
              <Legend />
              <Bar dataKey="trips" fill="#f97316" radius={[8, 8, 0, 0]} />
              <Bar dataKey="bookings" fill="#ff6b6b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
          className={`${cardBg} p-6 rounded-xl border shadow-lg hover:shadow-2xl transition-all overflow-x-auto`}
        >
          <h3 className={`text-lg font-bold ${textClass} mb-4`}>Spending Breakdown</h3>
          <ResponsiveContainer width="100%" height={250} minWidth={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Recent Activity - Enhanced */}
      <motion.div
        variants={itemVariants}
        whileHover={{ boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
        className={`${cardBg} p-6 sm:p-8 rounded-xl border shadow-lg hover:shadow-2xl transition-all`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className={`text-lg sm:text-xl font-bold ${textClass}`}>Recent Activity</h3>
            <p className={`text-sm ${subtextClass} mt-1`}>Your latest travel moments</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-gradient bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-semibold hover:underline"
          >
            View All →
          </motion.button>
        </div>
        <div className="space-y-4">
          {activityData.map((activity, index) => {
            const ActivityIcon = activity.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className={`flex items-start gap-4 p-4 rounded-lg ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"} transition-all group cursor-pointer`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`${activity.color} p-3 rounded-lg text-white flex-shrink-0 group-hover:shadow-lg transition-shadow`}
                >
                  <ActivityIcon size={20} />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold ${textClass}`}>{activity.title}</p>
                  <p className={`text-sm ${subtextClass}`}>{activity.description}</p>
                  <p className={`text-xs ${subtextClass} mt-1`}>{activity.timestamp}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Upcoming Trips - Enhanced */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className={`text-lg sm:text-xl font-bold ${textClass}`}>Upcoming Trips</h3>
            <p className={`text-sm ${subtextClass} mt-1`}>Plan your next adventure</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-2xl transition-all w-full sm:w-auto"
          >
            + Plan New Trip
          </motion.button>
        </div>
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {upcomingTrips.map((trip, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.2)" }}
              className={`${cardBg} rounded-xl overflow-hidden border shadow-lg hover:shadow-2xl transition-all group`}
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={trip.image}
                  alt={trip.destination}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4"
                >
                  <div className="w-full">
                    <p className="text-white font-bold text-sm">Progress: {trip.progress}%</p>
                    <div className="w-full bg-white/20 rounded-full h-1 mt-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${trip.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-orange-400 to-red-500"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="p-4">
                <p className={`font-bold ${textClass}`}>{trip.destination}</p>
                <p className={`text-sm ${subtextClass} mt-1`}>{trip.startDate} - {trip.endDate}</p>
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
      </motion.div>
    </motion.div>
  );
};
