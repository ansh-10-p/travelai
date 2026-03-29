"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Home, 
  Plane, 
  Bookmark, 
  BarChart3, 
  MessageSquare, 
  Heart, 
  User, 
  Bell, 
  Settings,
  LogOut 
} from "lucide-react";
import { useDashboard } from "./DashboardContext";

const sidebarItems = [
  { id: "home", label: "Dashboard", icon: Home },
  { id: "trips", label: "My Trips", icon: Plane },
  { id: "bookings", label: "Bookings", icon: Bookmark },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "wishlist", label: "Wishlist", icon: Heart },
];

const bottomItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

export const DashboardSidebar = () => {
  const { isSidebarOpen, toggleSidebar, currentPage, setCurrentPage } = useDashboard();

  const handleNavigation = (pageId: string) => {
    setCurrentPage(pageId);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? 280 : 80,
          x: isSidebarOpen ? 0 : -280,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed left-0 top-0 h-screen bg-gradient-to-b from-primary to-secondary text-white shadow-2xl z-40 md:z-20 md:translate-x-0"
      >
        {/* Logo/Header */}
        <div className="p-6 border-b border-white/20">
          <motion.div
            animate={{ opacity: isSidebarOpen ? 1 : 0 }}
            className="flex items-center justify-center"
          >
            <div className="text-2xl font-bold">✈️</div>
            {isSidebarOpen && <span className="ml-2 font-bold text-lg">TravelAI</span>}
          </motion.div>
        </div>

        {/* Main Navigation */}
        <nav className="p-4 space-y-2 flex-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-white/20 border-l-4 border-white"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon size={24} />
                <AnimatePresence mode="wait">
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-sm font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="border-t border-white/20 my-4" />

        {/* Bottom Navigation */}
        <nav className="p-4 space-y-2">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-white/20 border-l-4 border-white"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon size={24} />
                <AnimatePresence mode="wait">
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-sm font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-red-500/20 transition-all text-red-200"
          >
            <LogOut size={24} />
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-sm font-medium"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.aside>

      {/* Content Padding */}
      <motion.div
        animate={{
          marginLeft: isSidebarOpen ? 280 : 80,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex-1 hidden md:block"
      />
    </>
  );
};
