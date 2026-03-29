"use client";

import { motion } from "framer-motion";
import { Search, Bell, User, Menu } from "lucide-react";
import { useDashboard } from "./DashboardContext";
import { useState } from "react";

export const DashboardTopBar = () => {
  const { toggleSidebar, isSidebarOpen } = useDashboard();
  const [searchQuery, setSearchQuery] = useState("");

  const pageNames: Record<string, string> = {
    home: "Dashboard",
    trips: "My Trips",
    bookings: "Bookings",
    analytics: "Analytics",
    messages: "Messages",
    wishlist: "Wishlist",
    profile: "Profile",
    notifications: "Notifications",
    settings: "Settings",
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-md sticky top-0 z-30"
    >
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left Side - Title & Search */}
        <div className="flex items-center gap-6 flex-1">
          <h1 className="text-2xl font-bold text-primary hidden md:block">
            Dashboard
          </h1>
          <div className="relative hidden md:flex items-center gap-2 flex-1 max-w-md">
            <Search size={20} className="text-gray-400 absolute left-3" />
            <input
              type="text"
              placeholder="Search trips, bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-4">
          {/* Mobile Search */}
          <div className="md:hidden">
            <Search size={20} className="text-gray-600 cursor-pointer" />
          </div>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-2 hover:bg-gray-100 rounded-lg"
          >
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </motion.button>

          {/* User Profile */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white">
              <User size={18} />
            </div>
          </motion.button>

          {/* Mobile Sidebar Toggle */}
          <motion.button
            onClick={toggleSidebar}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={20} className="text-gray-600" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
