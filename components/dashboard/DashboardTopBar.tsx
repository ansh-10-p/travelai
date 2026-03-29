"use client";

import { motion } from "framer-motion";
import { Search, Bell, User, Sun, Moon } from "lucide-react";
import { useDashboard } from "./DashboardContext";
import { useState } from "react";

export const DashboardTopBar = () => {
  const { isDarkMode, toggleDarkMode } = useDashboard();
  const [searchQuery, setSearchQuery] = useState("");

  const bgClass = isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
  const textClass = isDarkMode ? "text-gray-300" : "text-gray-600";
  const inputClass = isDarkMode 
    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" 
    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400";

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`${bgClass} shadow-sm sticky top-0 z-30 border-b transition-colors duration-300`}
    >
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left Side - Search */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative hidden md:flex items-center gap-2 flex-1 max-w-lg">  
            <Search size={18} className={`${textClass} absolute left-3`} />
            <input
              type="text"
              placeholder="Search destinations, bookings, messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all ${inputClass}`}
            />
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`md:hidden p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
          >
            <Search size={20} className={textClass} />
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
          >
            {isDarkMode ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className={textClass} />
            )}
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
          >
            <Bell size={20} className={textClass} />
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
            />
          </motion.button>

          {/* User Profile */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white shadow-lg">
              <User size={18} />
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
