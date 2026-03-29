"use client";

import { motion } from "framer-motion";
import { useDashboard } from "../DashboardContext";
import { Bell, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const notifications = [
  { id: 1, title: "Flight Booking Confirmed", message: "Your flight to Paris is confirmed for May 20", time: "2 hours ago", read: false },
  { id: 2, title: "Hotel Available", message: "Your wishlist item 'Santorini Hotel' is now available", time: "5 hours ago", read: false },
  { id: 3, title: "Trip Reminder", message: "Your Tokyo trip starts in 20 days", time: "1 day ago", read: true },
  { id: 4, title: "Friend Joined", message: "Sarah joined your Paris trip planning", time: "2 days ago", read: true },
];

export const NotificationsPage = () => {
  const { isDarkMode } = useDashboard();
  const [items, setItems] = useState(notifications);

  const deleteNotification = (id: number) => {
    setItems(items.filter(n => n.id !== id));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
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
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Notifications</h1>
        <p className={`${subtextClass} text-sm sm:text-base`}>Stay updated with your travel activities and reminders</p>
      </motion.div>

      {/* Notification List - Enhanced */}
      <motion.div 
        variants={containerVariants}
        className="max-w-full space-y-3 sm:space-y-4"
      >
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${cardBg} rounded-xl p-12 text-center border shadow-lg`}
          >
            <Bell size={48} className={`mx-auto mb-4 ${subtextClass}`} />
            <p className={`${textClass} text-lg font-semibold`}>No notifications</p>
            <p className={`${subtextClass} text-sm mt-1`}>You're all caught up!</p>
          </motion.div>
        ) : (
          items.map((notification, index) => (
            <motion.div
              key={notification.id}
              variants={itemVariants}
              layout
              whileHover={{ x: 4, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              className={`p-4 sm:p-5 rounded-xl border shadow-lg hover:shadow-2xl transition-all flex items-start justify-between gap-4 group overflow-hidden relative ${
                notification.read
                  ? `${cardBg}`
                  : isDarkMode 
                    ? "bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-700/50"
                    : "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200"
              }`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              
              <div className="flex items-start gap-4 flex-1 min-w-0 relative z-10">
                <motion.div
                  animate={!notification.read ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`flex-shrink-0 mt-1 p-2 rounded-lg ${
                    notification.read
                      ? `${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`
                      : "bg-gradient-to-r from-orange-500 to-red-500"
                  }`}
                >
                  <Bell
                    size={18}
                    className={notification.read ? subtextClass : "text-white"}
                  />
                </motion.div>
                
                <div className="min-w-0 flex-1">
                  <motion.h3 
                    className={`font-bold text-sm sm:text-base ${
                      notification.read ? `${subtextClass}` : textClass
                    }`}
                  >
                    {notification.title}
                    {!notification.read && (
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="ml-2 inline-block w-2 h-2 bg-orange-500 rounded-full"
                      />
                    )}
                  </motion.h3>
                  <p className={`text-xs sm:text-sm ${subtextClass} mt-1 break-all line-clamp-2`}>{notification.message}</p>
                  <p className={`text-xs ${subtextClass} mt-2`}>{notification.time}</p>
                </div>
              </div>

              {/* Delete Button - Enhanced */}
              <motion.button
                whileHover={{ scale: 1.15, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => deleteNotification(notification.id)}
                className={`relative z-10 flex-shrink-0 p-2 rounded-lg transition-all ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <motion.div
                  whileHover={{ rotate: 90 }}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </motion.div>
              </motion.button>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Action Section */}
      {items.length > 0 && (
        <motion.div
          variants={itemVariants}
          className={`${cardBg} p-6 rounded-xl border shadow-lg text-center`}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setItems([])}
            className="px-6 py-2 text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors"
          >
            Clear all notifications
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};
