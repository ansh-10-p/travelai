"use client";

import { motion } from "framer-motion";
import { Search, Bell, User, Sun, Moon, Home, Plane, Bookmark, BarChart3, MessageSquare, Heart, Settings } from "lucide-react";
import { useDashboard } from "./DashboardContext";
import { useState } from "react";

const navItems = [
  { id: "home", label: "Dashboard", icon: Home },
  { id: "trips", label: "Trips", icon: Plane },
  { id: "bookings", label: "Bookings", icon: Bookmark },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "wishlist", label: "Wishlist", icon: Heart },
];

const settingsItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

export const DashboardNavbar = () => {
  const { isDarkMode, toggleDarkMode, currentPage, setCurrentPage } = useDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bgClass = isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
  const textClass = isDarkMode ? "text-gray-300" : "text-gray-600";
  const inputClass = isDarkMode 
    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" 
    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400";

  const handleNavigation = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`${bgClass} shadow-md sticky top-0 z-40 border-b transition-colors duration-300`}
      >
        <div className="px-6 py-4">
          {/* Top Row - Logo & Controls */}
          <div className="flex items-center justify-between mb-4 md:mb-0">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-lg font-bold text-white shadow-lg">✈️</div>
              <span className="font-bold text-lg hidden md:inline bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">TravelAI</span>
            </div>

            {/* Right Controls - Mobile */}
            <div className="flex items-center gap-2 md:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
              >
                <Search size={20} className={textClass} />
              </motion.button>

              <motion.button
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
              >
                {isDarkMode ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className={textClass} />
                )}
              </motion.button>

              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
              >
                <div className="w-5 h-5 flex flex-col justify-between">
                  <div className={`h-0.5 w-full ${isDarkMode ? "bg-gray-300" : "bg-gray-600"} rounded transition-all`} />
                  <div className={`h-0.5 w-full ${isDarkMode ? "bg-gray-300" : "bg-gray-600"} rounded transition-all`} />
                  <div className={`h-0.5 w-full ${isDarkMode ? "bg-gray-300" : "bg-gray-600"} rounded transition-all`} />
                </div>
              </motion.button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {/* Nav Items */}
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-500/25 text-white"
                      : `${textClass} hover:bg-gray-100 dark:hover:bg-gray-800`
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              );
            })}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Search Bar */}
            <div className="relative flex items-center gap-2 max-w-xs mr-4">  
              <Search size={18} className={`${textClass} absolute left-3`} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all ${inputClass}`}
              />
            </div>

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

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: mobileMenuOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className={`px-6 py-4 space-y-2 border-t ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : `${textClass} hover:bg-gray-100 dark:hover:bg-gray-800`
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              );
            })}

            {/* Settings Section */}
            <div className={`border-t ${isDarkMode ? "border-gray-800" : "border-gray-200"} pt-2 mt-2`}>
              {settingsItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                        : `${textClass} hover:bg-gray-100 dark:hover:bg-gray-800`
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Notifications & User */}
            <div className={`flex gap-4 border-t ${isDarkMode ? "border-gray-800" : "border-gray-200"} pt-4 mt-4`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} relative`}
              >
                <Bell size={20} className={textClass} />
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white shadow-lg">
                  <User size={18} />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};
