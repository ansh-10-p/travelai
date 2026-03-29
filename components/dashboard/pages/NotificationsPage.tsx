"use client";

import { motion } from "framer-motion";
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
  const [items, setItems] = useState(notifications);

  const deleteNotification = (id: number) => {
    setItems(items.filter(n => n.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-2">Stay updated with your travel activities</p>
      </motion.div>

      <div className="max-w-2xl space-y-4">
        {items.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ x: 5 }}
            className={`p-4 rounded-lg border flex items-start justify-between gap-4 ${
              notification.read ? "bg-white border-gray-200" : "bg-blue-50 border-blue-200"
            }`}
          >
            <div className="flex items-start gap-4 flex-1">
              <Bell
                size={20}
                className={notification.read ? "text-gray-400" : "text-blue-500"}
              />
              <div>
                <h3 className={`font-semibold ${notification.read ? "text-gray-700" : "text-gray-900"}`}>
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => deleteNotification(notification.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 size={18} />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
