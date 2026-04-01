"use client";

import { motion } from "framer-motion";
  import { AppProvider, useApp } from '../../travel/AppContext';
import { Bell, Lock, Globe, Inbox, Eye, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const settings = [
  {
    category: "Notifications",
    icon: Bell,
    items: [
      { label: "Email Notifications", enabled: true },
      { label: "Trip Reminders", enabled: true },
      { label: "Booking Updates", enabled: false },
    ],
  },
  {
    category: "Privacy",
    icon: Lock,
    items: [
      { label: "Profile Visibility", enabled: true },
      { label: "Show Travel History", enabled: true },
      { label: "Allow Messages", enabled: true },
    ],
  },
  {
    category: "Preferences",
    icon: Globe,
    items: [
      { label: "Dark Mode", enabled: false },
      { label: "Email Digest", enabled: true },
      { label: "Marketing Emails", enabled: false },
    ],
  },
];

export const SettingsPage = () => {
  const { isDarkMode } = useApp();
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({});

  const handleToggle = (key: string) => {
    setToggleStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Settings</h1>
        <p className={`${subtextClass} text-sm sm:text-base`}>Manage your account and preferences</p>
      </motion.div>

      {/* Settings Sections - Enhanced */}
      <motion.div 
        variants={containerVariants}
        className="space-y-6"
      >
        {settings.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={sectionIndex}
              variants={itemVariants}
              whileHover={{ boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
              className={`${cardBg} rounded-xl border shadow-lg hover:shadow-2xl transition-all overflow-hidden`}
            >
              {/* Section Header - Enhanced */}
              <motion.div 
                className="p-6 border-b bg-gradient-to-r from-orange-500/10 to-red-500/10"
                style={{ borderColor: isDarkMode ? "#374151" : "#e5e7eb" }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-2.5 shadow-lg"
                  >
                    <Icon className="w-full h-full text-white" />
                  </motion.div>
                  <h3 className={`text-lg font-bold ${textClass}`}>{section.category}</h3>
                </div>
              </motion.div>

              {/* Settings Items - Enhanced */}
              <motion.div 
                className="divide-y"
                style={{ borderColor: isDarkMode ? "#374151" : "#e5e7eb" }}
              >
                {section.items.map((item, itemIndex) => {
                  const key = `${section.category}-${item.label}`;
                  const isEnabled = toggleStates[key] !== undefined ? toggleStates[key] : item.enabled;

                  return (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.05 }}
                      whileHover={{ x: 4 }}
                      className={`p-6 flex items-center justify-between group ${isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50"} transition-all`}
                    >
                      <label className={`text-base font-medium cursor-pointer flex-1 ${textClass} group-hover:text-orange-500 transition-colors`}>
                        {item.label}
                      </label>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleToggle(key)}
                        className={`relative w-14 h-8 rounded-full transition-all flex-shrink-0 ${
                          isEnabled 
                            ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-lg" 
                            : isDarkMode ? "bg-gray-600" : "bg-gray-300"
                        }`}
                      >
                        <motion.div
                          animate={{ x: isEnabled ? 28 : 2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                        />
                      </motion.button>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Account Actions - Enhanced */}
      <motion.div
        variants={itemVariants}
        whileHover={{ boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
        className={`${cardBg} rounded-xl border shadow-lg hover:shadow-2xl transition-all p-6 sm:p-8`}
      >
        <h3 className={`text-lg sm:text-xl font-bold ${textClass} mb-6`}>⚙️ Account Management</h3>
        <div className="space-y-3 sm:space-y-4">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            className={`w-full px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-3 ${
              isDarkMode
                ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            <Lock size={20} />
            Change Password
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            className={`w-full px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-3 ${
              isDarkMode
                ? "bg-orange-900/30 text-orange-400 hover:bg-orange-900/50 border border-orange-700/50"
                : "bg-orange-100 text-orange-700 hover:bg-orange-200 border border-orange-300"
            }`}
          >
            <LogOut size={20} />
            Logout
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(239, 68, 68, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-2xl transition-all flex items-center justify-center gap-3"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ⚠️
            </motion.div>
            Delete Account
          </motion.button>
        </div>
      </motion.div>

      {/* Info Box */}
      <motion.div
        variants={itemVariants}
        className={`${cardBg} rounded-xl p-6 border shadow-lg`}
      >
        <div className="flex gap-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl flex-shrink-0"
          >
            ℹ️
          </motion.div>
          <div>
            <p className={`font-semibold ${textClass}`}>Need help?</p>
            <p className={`text-sm ${subtextClass} mt-1`}>Check our support center or contact us for assistance with your account settings.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
