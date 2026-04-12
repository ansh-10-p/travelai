"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
// Note: Using useApp to match your new AppContext integration guide.
// If you haven't switched yet, change this back to useDashboard from DashboardContext.
import { useApp } from "../../travel/AppContext"; 

// ─── Mock Data ───────────────────────────────────────────────────────────────
const OVERALL_BUDGET = 80000;
const TOTAL_SPENT = 54250;

const CATEGORIES = [
  { id: "flights", name: "Flights", icon: "plane", spent: 17800, allocated: 20000, color: "#f97316" }, // Orange
  { id: "hotels", name: "Hotels", icon: "home", spent: 23400, allocated: 30000, color: "#ec4899" }, // Pink
  { id: "food", name: "Food & Dining", icon: "utensils", spent: 8500, allocated: 15000, color: "#8b5cf6" }, // Violet
  { id: "activities", name: "Activities", icon: "star", spent: 3200, allocated: 10000, color: "#06b6d4" }, // Cyan
  { id: "misc", name: "Transport & Misc", icon: "car", spent: 1350, allocated: 5000, color: "#10b981" }, // Emerald
];

const RECENT_TRANSACTIONS = [
  { id: 1, name: "Uber to Louvre", category: "Transport & Misc", amount: 850, date: "Today, 10:30 AM", icon: "car" },
  { id: 2, name: "Le Relais de la Butte", category: "Food & Dining", amount: 4200, date: "Yesterday, 8:15 PM", icon: "utensils" },
  { id: 3, name: "Louvre Museum Tickets", category: "Activities", amount: 3200, date: "Yesterday, 2:00 PM", icon: "star" },
  { id: 4, name: "Croissants & Coffee", category: "Food & Dining", amount: 650, date: "Yesterday, 9:00 AM", icon: "coffee" },
];

// ─── Micro Components ─────────────────────────────────────────────────────────
const formatINR = (val: number) => `₹${val.toLocaleString("en-IN")}`;

// ─── Overview Hero ────────────────────────────────────────────────────────────
function BudgetOverview({ dark }: { dark: boolean }) {
  const remaining = OVERALL_BUDGET - TOTAL_SPENT;
  const pctSpent = (TOTAL_SPENT / OVERALL_BUDGET) * 100;
  const card = dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden border ${card} rounded-3xl p-6 md:p-8 mb-6 shadow-sm`}
    >
      {/* Ambient background glow */}
      {dark && (
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      )}

      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        {/* Text Stats */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">₹</span>
            <h1 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>Paris Trip Budget</h1>
          </div>
          <p className={`text-sm mb-6 ${dark ? "text-gray-400" : "text-gray-500"}`}>
            7 Days • Apr 11 – 18
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className={`text-xs uppercase tracking-wider font-semibold mb-1 ${dark ? "text-gray-500" : "text-gray-400"}`}>Total Spent</div>
              <div className={`text-3xl font-black ${dark ? "text-white" : "text-gray-900"}`}>{formatINR(TOTAL_SPENT)}</div>
            </div>
            <div>
              <div className={`text-xs uppercase tracking-wider font-semibold mb-1 ${dark ? "text-gray-500" : "text-gray-400"}`}>Remaining</div>
              <div className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                {formatINR(remaining)}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-xs mb-2">
              <span className={dark ? "text-gray-400" : "text-gray-500"}>{pctSpent.toFixed(0)}% used</span>
              <span className={dark ? "text-gray-400" : "text-gray-500"}>Limit: {formatINR(OVERALL_BUDGET)}</span>
            </div>
            <div className={`h-2.5 rounded-full overflow-hidden ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pctSpent}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className={`h-full rounded-full bg-gradient-to-r ${pctSpent > 90 ? "from-red-500 to-rose-500" : "from-orange-500 to-pink-500"}`}
              />
            </div>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="w-48 h-48 flex-shrink-0 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={CATEGORIES}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="spent"
                stroke="none"
              >
                {CATEGORIES.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => formatINR(value)}
                contentStyle={{ background: dark ? "#1f2937" : "#fff", border: "none", borderRadius: 8, color: dark ? "#fff" : "#000" }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <span className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>Total</span>
            <span className={`font-bold text-lg ${dark ? "text-white" : "text-gray-900"}`}>{Math.round(pctSpent)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Category Breakdown ───────────────────────────────────────────────────────
function CategoryBreakdown({ dark }: { dark: boolean }) {
  const card = dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
  const hover = dark ? "hover:bg-gray-800/50" : "hover:bg-gray-50";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className={`border ${card} rounded-3xl p-6 mb-6 shadow-sm`}
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className={`text-sm font-bold uppercase tracking-widest ${dark ? "text-gray-400" : "text-gray-500"}`}>Category Limits</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {CATEGORIES.map((cat, i) => {
          const pct = Math.min((cat.spent / cat.allocated) * 100, 100);
          const isNearLimit = pct > 85;

          return (
            <div key={cat.id} className={`p-3 rounded-2xl transition-colors ${hover}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                    {cat.icon}
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-800"}`}>{cat.name}</div>
                    <div className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{formatINR(cat.allocated)} limit</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>{formatINR(cat.spent)}</div>
                  <div className={`text-xs font-medium ${isNearLimit ? "text-red-500" : dark ? "text-gray-500" : "text-gray-400"}`}>
                    {formatINR(cat.allocated - cat.spent)} left
                  </div>
                </div>
              </div>
              <div className={`h-1.5 rounded-full overflow-hidden ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + (i * 0.1) }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: isNearLimit ? "#ef4444" : cat.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Recent Transactions ──────────────────────────────────────────────────────
function RecentTransactions({ dark }: { dark: boolean }) {
  const card = dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
  const rowBorder = dark ? "border-gray-800" : "border-gray-50";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className={`border ${card} rounded-3xl overflow-hidden shadow-sm`}
    >
      <div className={`px-6 py-4 border-b ${rowBorder} flex items-center justify-between`}>
        <h2 className={`text-sm font-bold uppercase tracking-widest ${dark ? "text-gray-400" : "text-gray-500"}`}>Recent Expenses</h2>
        <button className="text-xs font-semibold bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1.5 rounded-full shadow hover:opacity-90 transition-opacity">
          + Add Expense
        </button>
      </div>
      
      <div className="divide-y divide-gray-100 dark:divide-gray-800/50">
        {RECENT_TRANSACTIONS.map((tx) => (
          <div key={tx.id} className={`flex items-center gap-4 px-6 py-4 transition-colors ${dark ? "hover:bg-gray-800/30" : "hover:bg-gray-50"}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
              {tx.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-semibold truncate ${dark ? "text-white" : "text-gray-800"}`}>{tx.name}</div>
              <div className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{tx.category} • {tx.date}</div>
            </div>
            <div className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>
              {formatINR(tx.amount)}
            </div>
          </div>
        ))}
      </div>
      
      <button className={`w-full py-3 text-xs font-semibold text-center transition-colors ${dark ? "text-gray-400 hover:text-white hover:bg-gray-800/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>
        View All Transactions →
      </button>
    </motion.div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export const BudgetTrackerPage = () => {
  // Pulling isDarkMode from your context hook
  const { isDarkMode } = useApp(); 
  const dark = isDarkMode;

  return (
    <div className={`max-w-4xl mx-auto pb-10 ${dark ? "text-white" : "text-gray-900"}`}>
      <BudgetOverview dark={dark} />
      <CategoryBreakdown dark={dark} />
      <RecentTransactions dark={dark} />
    </div>
  );
};