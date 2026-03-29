"use client";

import { motion } from "framer-motion";
import { StatCard } from "../DashboardCards";
import { Calendar, MapPin, DollarSign, Check, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const bookings = [
  {
    id: 1,
    name: "Hotel Eiffel Tower Paris",
    type: "Hotel",
    dates: "May 20 - May 27, 2024",
    amount: "$1,250",
    status: "confirmed" as const,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=100&q=80",
  },
  {
    id: 2,
    name: "Flight Paris CDG to Tokyo Narita",
    type: "Flight",
    dates: "May 27 - Jun 10, 2024",
    amount: "$850",
    status: "confirmed" as const,
    image: "https://images.unsplash.com/photo-1436262174933-1d8ffd3c9d9c?w=100&q=80",
  },
  {
    id: 3,
    name: "Luxury Mount Fuji View Resort",
    type: "Hotel",
    dates: "Jun 10 - Jun 25, 2024",
    amount: "$2,100",
    status: "pending" as const,
    image: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=100&q=80",
  },
  {
    id: 4,
    name: "Tokyo City Tour Guide",
    type: "Activity",
    dates: "Jun 12, 2024",
    amount: "$120",
    status: "pending" as const,
    image: "https://images.unsplash.com/photo-1497278460327-498ac084a8ca?w=100&q=80",
  },
  {
    id: 5,
    name: "Flight Tokyo to NYC",
    type: "Flight",
    dates: "Jun 25 - Jul 1, 2024",
    amount: "$920",
    status: "pending" as const,
    image: "https://images.unsplash.com/photo-1436262174933-1d8ffd3c9d9c?w=100&q=80",
  },
];

export const BookingsPage = () => {
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const pending = bookings.filter((b) => b.status === "pending").length;
  const totalSpent = bookings.reduce((acc, b) => acc + parseInt(b.amount.replace(/[$,]/g, "")), 0);

  const statusColors: Record<string, { bg: string; text: string; icon: any }> = {
    confirmed: { bg: "bg-green-100", text: "text-green-800", icon: Check },
    pending: { bg: "bg-yellow-100", text: "text-yellow-800", icon: Clock },
    cancelled: { bg: "bg-red-100", text: "text-red-800", icon: X },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        <p className="text-gray-600 mt-2">View and manage all your reservations</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Bookings" value={bookings.length} icon={Calendar} color="bg-blue-500" />
        <StatCard title="Confirmed" value={confirmed} icon={Check} color="bg-green-500" />
        <StatCard title="Total Spent" value={totalSpent} icon={DollarSign} color="bg-purple-500" />
      </div>

      {/* Bookings List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        {bookings.map((booking, index) => {
          const StatusIcon = statusColors[booking.status].icon;
          return (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ x: 5 }}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <img
                  src={booking.image}
                  alt={booking.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{booking.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{booking.type}</p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium ${
                        statusColors[booking.status].bg
                      } ${statusColors[booking.status].text}`}
                    >
                      <StatusIcon size={16} />
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </motion.div>
                  </div>
                  <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      {booking.dates}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-primary" />
                      {booking.amount}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};
