"use client";

import { motion } from "framer-motion";
import { TripCard, StatCard } from "../DashboardCards";
import { Plane, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const allTrips = [
  { destination: "Paris, France", startDate: "May 20", endDate: "May 27", status: "upcoming" as const, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&q=80", progress: 60 },
  { destination: "Tokyo, Japan", startDate: "Jun 10", endDate: "Jun 25", status: "upcoming" as const, image: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=300&q=80", progress: 30 },
  { destination: "New York, USA", startDate: "Jul 1", endDate: "Jul 8", status: "upcoming" as const, image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&q=80", progress: 10 },
  { destination: "Barcelona, Spain", startDate: "Apr 5", endDate: "Apr 12", status: "completed" as const, image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300&q=80", progress: 100 },
  { destination: "Bali, Indonesia", startDate: "Mar 15", endDate: "Mar 25", status: "completed" as const, image: "https://images.unsplash.com/photo-1537225228614-b4fad34a0b60?w=300&q=80", progress: 100 },
  { destination: "Dubai, UAE", startDate: "Feb 10", endDate: "Feb 17", status: "completed" as const, image: "https://images.unsplash.com/photo-1512453409338-ab7779ca7d69?w=300&q=80", progress: 100 },
];

export const MyTripsPage = () => {
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "completed">("all");

  const filteredTrips = filterStatus === "all" 
    ? allTrips 
    : allTrips.filter(trip => trip.status === filterStatus);

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
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
          <p className="text-gray-600 mt-2">Manage and track all your adventures</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
          <Plus size={20} />
          New Trip
        </Button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Trips" value={24} icon={Plane} color="bg-blue-500" />
        <StatCard title="Upcoming" value={3} icon={Plane} color="bg-orange-500" />
        <StatCard title="Completed" value={21} icon={Plane} color="bg-green-500" />
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex gap-4 items-center"
      >
        <Filter size={20} className="text-gray-600" />
        {(["all", "upcoming", "completed"] as const).map((status) => (
          <motion.button
            key={status}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterStatus === status
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrips.map((trip, index) => (
          <TripCard
            key={index}
            destination={trip.destination}
            startDate={trip.startDate}
            endDate={trip.endDate}
            status={trip.status}
            image={trip.image}
            progress={trip.progress}
            delay={index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
};
