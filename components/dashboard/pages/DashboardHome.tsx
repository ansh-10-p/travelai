"use client";

import { motion } from "framer-motion";
import { StatCard, ActivityCard, TripCard } from "../DashboardCards";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Plane, MapPin, Calendar, Users, TrendingUp, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const chartData = [
  { month: "Jan", trips: 4, bookings: 24, spending: 1200 },
  { month: "Feb", trips: 3, bookings: 13, spending: 900 },
  { month: "Mar", trips: 5, bookings: 29, spending: 2290 },
  { month: "Apr", trips: 2, bookings: 22, spending: 1400 },
  { month: "May", trips: 8, bookings: 35, spending: 2500 },
  { month: "Jun", trips: 6, bookings: 31, spending: 2100 },
];

const pieData = [
  { name: "Hotels", value: 40 },
  { name: "Flights", value: 30 },
  { name: "Activities", value: 20 },
  { name: "Food", value: 10 },
];

const COLORS = ["#8B4513", "#D2691E", "#FF8C42", "#F5F1E8"];

const activityData = [
  { icon: Plane, title: "Flight Booked", description: "New York to Paris", timestamp: "2 hours ago", color: "bg-blue-500" },
  { icon: MapPin, title: "Destination Added", description: "Bali marked as visited", timestamp: "1 day ago", color: "bg-green-500" },
  { icon: Calendar, title: "Trip Planned", description: "Tokyo at cherry blossom season", timestamp: "3 days ago", color: "bg-purple-500" },
  { icon: Users, title: "Traveler Added", description: "Sarah joined your Paris trip", timestamp: "5 days ago", color: "bg-orange-500" },
];

const upcomingTrips = [
  { destination: "Paris, France", startDate: "May 20", endDate: "May 27", status: "upcoming" as const, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&q=80", progress: 60 },
  { destination: "Tokyo, Japan", startDate: "Jun 10", endDate: "Jun 25", status: "upcoming" as const, image: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=300&q=80", progress: 30 },
  { destination: "New York, USA", startDate: "Jul 1", endDate: "Jul 8", status: "upcoming" as const, image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&q=80", progress: 10 },
];

export const DashboardHome = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-lg"
      >
        <h1 className="text-4xl font-bold">Welcome back, Traveler! 👋</h1>
        <p className="mt-2 text-white/80">You have 3 upcoming trips and 12 unread messages</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Trips"
          value={24}
          icon={Plane}
          color="bg-blue-500"
          trend="up"
          trendValue={12}
          delay={0}
        />
        <StatCard
          title="Countries Visited"
          value={18}
          icon={MapPin}
          color="bg-green-500"
          trend="up"
          trendValue={5}
          delay={0.1}
        />
        <StatCard
          title="Total Spending"
          value={45230}
          icon={TrendingUp}
          color="bg-purple-500"
          trend="down"
          trendValue={8}
          delay={0.2}
        />
        <StatCard
          title="Travel Buddies"
          value={32}
          icon={Users}
          color="bg-orange-500"
          trend="up"
          trendValue={3}
          delay={0.3}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200 shadow-md"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Travel Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="trips" fill="#8B4513" name="Trips" />
              <Bar dataKey="bookings" fill="#D2691E" name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-md"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Spending Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white p-6 rounded-lg border border-gray-200 shadow-md"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
          <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {activityData.map((activity, index) => (
            <ActivityCard
              key={index}
              icon={activity.icon}
              title={activity.title}
              description={activity.description}
              timestamp={activity.timestamp}
              color={activity.color}
              delay={index * 0.1}
            />
          ))}
        </div>
      </motion.div>

      {/* Upcoming Trips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Upcoming Trips</h3>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Plan New Trip
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingTrips.map((trip, index) => (
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
    </motion.div>
  );
};
