"use client";

import { motion } from "framer-motion";
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
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({});

  const handleToggle = (key: string) => {
    setToggleStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account and preferences</p>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settings.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden"
            >
              {/* Section Header */}
              <div className="p-6 border-b border-gray-200 flex items-center gap-3">
                <Icon className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-bold text-gray-900">{section.category}</h3>
              </div>

              {/* Settings Items */}
              <div className="divide-y divide-gray-200">
                {section.items.map((item, itemIndex) => {
                  const key = `${section.category}-${item.label}`;
                  const isEnabled = toggleStates[key] !== undefined ? toggleStates[key] : item.enabled;

                  return (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <label className="text-gray-700 font-medium cursor-pointer">{item.label}</label>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleToggle(key)}
                        className={`relative w-12 h-7 rounded-full transition-all ${
                          isEnabled ? "bg-primary" : "bg-gray-300"
                        }`}
                      >
                        <motion.div
                          animate={{ x: isEnabled ? 24 : 2 }}
                          className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
                        />
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Account Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-lg border border-gray-200 shadow-md p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-6">Account</h3>
        <div className="space-y-4">
          <Button className="w-full bg-gray-100 text-gray-900 hover:bg-gray-200 flex items-center justify-center gap-2">
            <Lock size={20} />
            Change Password
          </Button>
          <Button className="w-full bg-red-100 text-red-700 hover:bg-red-200 flex items-center justify-center gap-2">
            <LogOut size={20} />
            Logout
          </Button>
          <Button className="w-full bg-red-500 text-white hover:bg-red-600 flex items-center justify-center gap-2">
            Delete Account
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};
