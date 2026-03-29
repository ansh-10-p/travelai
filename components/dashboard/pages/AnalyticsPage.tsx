"use client";

import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const spendingData = [
  { month: "Jan", hotels: 1200, flights: 800, activities: 400 },
  { month: "Feb", hotels: 900, flights: 600, activities: 300 },
  { month: "Mar", hotels: 1500, flights: 1000, activities: 500 },
  { month: "Apr", hotels: 1100, flights: 900, activities: 400 },
  { month: "May", hotels: 1800, flights: 1200, activities: 700 },
];

const destinationData = [
  { name: "Europe", value: 35 },
  { name: "Asia", value: 25 },
  { name: "Americas", value: 30 },
  { name: "Africa", value: 10 },
];

const COLORS = ["#8B4513", "#D2691E", "#FF8C42", "#F5F1E8"];

export const AnalyticsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Insights about your travel patterns</p>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-md"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Spending Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="hotels" stroke="#8B4513" strokeWidth={2} />
              <Line type="monotone" dataKey="flights" stroke="#D2691E" strokeWidth={2} />
              <Line type="monotone" dataKey="activities" stroke="#FF8C42" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-md"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Destinations by Region</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={destinationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ value }) => `${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {destinationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Avg Trip Duration", value: "10 days" },
          { label: "Avg Daily Spending", value: "$250" },
          { label: "Most Visited Month", value: "June" },
          { label: "Favorite Destination", value: "Paris" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg border border-gray-200 shadow-md text-center"
          >
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-primary mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
