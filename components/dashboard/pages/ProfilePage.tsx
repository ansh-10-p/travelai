"use client";

import { motion } from "framer-motion";
import { User, Mail, MapPin, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProfilePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-2">Manage your profile information</p>
      </motion.div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-white p-8 rounded-lg border border-gray-200 shadow-md"
      >
        <div className="flex items-center gap-6">
          <motion.img
            whileHover={{ scale: 1.1 }}
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-primary"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900">Alex Johnson</h2>
            <p className="text-gray-600 mt-1">Adventure Enthusiast • Travel Blogger</p>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                ⭐ Verified Traveler
              </span>
              <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                Active Community Member
              </span>
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white">Edit Profile</Button>
        </div>
      </motion.div>

      {/* Profile Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[
          { icon: Mail, label: "Email", value: "alex@example.com" },
          { icon: MapPin, label: "Location", value: "New York, USA" },
          { icon: Calendar, label: "Member Since", value: "January 2023" },
          { icon: Award, label: "Total Trips", value: "24 Destinations" },
        ].map((info, index) => {
          const Icon = info.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-md flex items-center gap-4"
            >
              <Icon className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-gray-600">{info.label}</p>
                <p className="text-lg font-semibold text-gray-900">{info.value}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white p-8 rounded-lg border border-gray-200 shadow-md"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Travel Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Total Trips", value: "24" },
            { label: "Countries", value: "18" },
            { label: "Continent", value: "6" },
            { label: "Travel Days", value: "360" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
