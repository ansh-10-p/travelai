"use client";

import { motion } from "framer-motion";
import { useDashboard } from "../DashboardContext";
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
  const { isDarkMode } = useDashboard();

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
        <motion.h1 
          className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
          whileHover={{ scale: 1.02 }}
        >
          Analytics
        </motion.h1>
        <p className={`${subtextClass} text-sm sm:text-base`}>Insights about your travel patterns and spending</p>
      </motion.div>

      {/* Charts Grid - Enhanced */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
      >
        {/* Line Chart */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
          className={`${cardBg} p-4 sm:p-6 rounded-xl border shadow-lg hover:shadow-2xl transition-all overflow-x-auto group`}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
            initial={false}
          />
          <div className="relative z-10">
            <h3 className={`text-base sm:text-lg font-bold ${textClass} mb-4`}>Spending Trends</h3>
            <ResponsiveContainer width="100%" height={250} minWidth={300}>
              <LineChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey="month" tick={{ fill: isDarkMode ? "#9ca3af" : "#6b7280" }} />
                <YAxis tick={{ fill: isDarkMode ? "#9ca3af" : "#6b7280" }} />
                <Tooltip contentStyle={{ backgroundColor: isDarkMode ? "#1f2937" : "#ffffff", border: "none", borderRadius: "8px" }} />
                <Legend />
                <Line type="monotone" dataKey="hotels" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="flights" stroke="#f97316" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="activities" stroke="#ec4899" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
          className={`${cardBg} p-4 sm:p-6 rounded-xl border shadow-lg hover:shadow-2xl transition-all overflow-x-auto group`}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
            initial={false}
          />
          <div className="relative z-10">
            <h3 className={`text-base sm:text-lg font-bold ${textClass} mb-4`}>Destinations by Region</h3>
            <ResponsiveContainer width="100%" height={250} minWidth={300}>
              <PieChart>
                <Pie
                  data={destinationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ value }) => `${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {destinationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Grid - Enhanced */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
      >
        {[
          { label: "Avg Trip Duration", value: "10 days", icon: "📅", color: "from-blue-500 to-cyan-500" },
          { label: "Avg Daily Spending", value: "$250", icon: "💰", color: "from-green-500 to-emerald-500" },
          { label: "Most Visited Month", value: "June", icon: "📈", color: "from-purple-500 to-pink-500" },
          { label: "Favorite Destination", value: "Paris", icon: "🗺️", color: "from-orange-500 to-red-500" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -6, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
            className={`${cardBg} p-6 rounded-xl border shadow-lg hover:shadow-2xl transition-all overflow-hidden relative group`}
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`}
            />
            <div className="relative z-10 text-center">
              <motion.div 
                className="text-3xl mb-3"
                whileHover={{ scale: 1.2 }}
              >
                {stat.icon}
              </motion.div>
              <p className={`text-xs sm:text-sm ${subtextClass}`}>{stat.label}</p>
              <motion.p 
                className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mt-2`}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {stat.value}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Key Insights */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
        className={`${cardBg} p-6 sm:p-8 rounded-xl border shadow-lg hover:shadow-2xl transition-all`}
      >
        <h3 className={`text-lg sm:text-xl font-bold ${textClass} mb-4`}>📊 Key Insights</h3>
        <div className="space-y-3">
          {[
            { title: "Peak Season", desc: "Your highest spending is in summer months (Jun-Aug)" },
            { title: "Budget Friendly", desc: "Southeast Asia offers the best value for money" },
            { title: "Travel Frequency", desc: "You travel approximately 4 times per year" },
          ].map((insight, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className={`flex gap-3 p-4 rounded-lg ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"} transition-all`}
            >
              <motion.div 
                className="text-orange-500 flex-shrink-0"
                whileHover={{ scale: 1.2 }}
              >
                ✓
              </motion.div>
              <div>
                <p className={`font-semibold ${textClass}`}>{insight.title}</p>
                <p className={`text-sm ${subtextClass} mt-1`}>{insight.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
