"use client";

import { motion } from "framer-motion";
import { useDashboard } from "../DashboardContext";
import { User, Mail, MapPin, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProfilePage = () => {
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
      className={`space-y-6 sm:space-y-8 ${bgClass}`}
    >
      {/* Header - Enhanced */}
      <motion.div 
        variants={itemVariants}
        className="space-y-2"
      >
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Profile</h1>
        <p className={`${subtextClass} text-sm sm:text-base`}>Manage your travel profile and achievements</p>
      </motion.div>

      {/* Profile Header - Enhanced */}
      <motion.div
        variants={itemVariants}
        whileHover={{ boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
        className={`${cardBg} p-6 sm:p-8 rounded-xl border shadow-lg hover:shadow-2xl transition-all overflow-hidden relative`}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 hover:opacity-100 transition-opacity"
        />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6">
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80"
              alt="Profile"
              className="w-28 h-28 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gradient-to-r from-orange-500 to-red-500 flex-shrink-0 shadow-xl"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full border-4 border-white shadow-lg"
            />
          </motion.div>
          <div className="flex-1">
            <motion.h2 
              className={`text-2xl sm:text-3xl font-bold ${textClass}`}
            >
              Alex Johnson
            </motion.h2>
            <p className={`${subtextClass} mt-1 text-sm sm:text-base`}>Adventure Enthusiast • Travel Blogger</p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4">
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="text-xs sm:text-sm bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full font-semibold border border-orange-500/30"
              >
                ⭐ Verified Traveler
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className={`text-xs sm:text-sm px-3 py-1 rounded-full font-semibold border ${
                  isDarkMode 
                    ? "bg-green-900/30 text-green-400 border-green-600/30" 
                    : "bg-green-100 text-green-700 border-green-300"
                }`}
              >
                ✓ Active Member
              </motion.span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all w-full sm:w-auto"
          >
            Edit Profile
          </motion.button>
        </div>
      </motion.div>

      {/* Profile Information - Enhanced */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
      >
        {[
          { icon: Mail, label: "Email", value: "alex@example.com", color: "from-blue-500 to-cyan-500" },
          { icon: MapPin, label: "Location", value: "New York, USA", color: "from-purple-500 to-pink-500" },
          { icon: Calendar, label: "Member Since", value: "January 2023", color: "from-green-500 to-emerald-500" },
          { icon: Award, label: "Total Trips", value: "24 Destinations", color: "from-orange-500 to-red-500" },
        ].map((info, index) => {
          const Icon = info.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className={`${cardBg} p-6 rounded-xl border shadow-lg hover:shadow-2xl transition-all flex items-center gap-4 group overflow-hidden relative`}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-5 transition-opacity`}
              />
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${info.color} p-2.5 flex-shrink-0 shadow-md`}
              >
                <Icon className="w-full h-full text-white" />
              </motion.div>
              <div className="min-w-0 relative z-10">
                <p className={`text-xs sm:text-sm ${subtextClass}`}>{info.label}</p>
                <p className={`text-sm sm:text-lg font-semibold ${textClass} break-all`}>{info.value}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Statistics - Enhanced */}
      <motion.div
        variants={itemVariants}
        whileHover={{ boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
        className={`${cardBg} p-6 sm:p-8 rounded-xl border shadow-lg hover:shadow-2xl transition-all`}
      >
        <h3 className={`text-lg sm:text-xl font-bold ${textClass} mb-6`}>📊 Travel Statistics</h3>
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {[
            { label: "Total Trips", value: "24", color: "from-blue-500 to-cyan-500" },
            { label: "Countries", value: "18", color: "from-purple-500 to-pink-500" },
            { label: "Continents", value: "6", color: "from-green-500 to-emerald-500" },
            { label: "Travel Days", value: "360", color: "from-orange-500 to-red-500" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="text-center group"
            >
              <motion.p 
                className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {stat.value}
              </motion.p>
              <p className={`text-xs sm:text-sm ${subtextClass} mt-2 group-hover:font-semibold transition-all`}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Achievements Section */}
      <motion.div
        variants={itemVariants}
        whileHover={{ boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
        className={`${cardBg} p-6 sm:p-8 rounded-xl border shadow-lg hover:shadow-2xl transition-all`}
      >
        <h3 className={`text-lg sm:text-xl font-bold ${textClass} mb-6`}>🏆 Achievements</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { emoji: "🌍", title: "World Explorer" },
            { emoji: "🏔️", title: "Mountain Climber" },
            { emoji: "🏖️", title: "Beach Lover" },
            { emoji: "🎒", title: "Budget Traveler" },
          ].map((achievement, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.15, rotate: 5, boxShadow: "0 15px 30px rgba(0,0,0,0.2)" }}
              className={`${isDarkMode ? "bg-gray-700" : "bg-gray-100"} p-4 rounded-lg text-center cursor-pointer group hover:shadow-lg transition-all`}
            >
              <motion.div 
                className="text-4xl mb-2"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
              >
                {achievement.emoji}
              </motion.div>
              <p className={`text-xs sm:text-sm font-semibold ${textClass} group-hover:text-orange-500 transition-colors`}>{achievement.title}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
