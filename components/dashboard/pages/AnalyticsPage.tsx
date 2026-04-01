"use client";

import { useState } from "react";
import { motion } from "framer-motion";
  import { AppProvider, useApp } from '../../travel/AppContext';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
});

const SPEND_TREND = [
  { month: "Jan", spend: 0 },
  { month: "Feb", spend: 0 },
  { month: "Mar", spend: 8200 },
  { month: "Apr", spend: 72500 },
  { month: "May", spend: 0 },
  { month: "Jun", spend: 90000 },
  { month: "Jul", spend: 54100 },
  { month: "Aug", spend: 0 },
  { month: "Sep", spend: 78500 },
  { month: "Oct", spend: 0 },
  { month: "Nov", spend: 63200 },
  { month: "Dec", spend: 0 },
];

const CATEGORY_SPLIT = [
  { name: "Flights",    value: 38, color: "#f97316" },
  { name: "Hotels",     value: 32, color: "#ec4899" },
  { name: "Food",       value: 18, color: "#fb923c" },
  { name: "Activities", value: 12, color: "#f43f5e" },
];

const REGIONS = [
  { region: "Europe",    trips: 6, spend: 280000 },
  { region: "Asia",      trips: 3, spend: 180000 },
  { region: "Middle East", trips: 2, spend: 95000 },
  { region: "Oceania",   trips: 1, spend: 63000 },
];

const TOP_CITIES = [
  { city: "Paris 🗼",    visits: 2, rating: 4.9 },
  { city: "Bali 🌴",     visits: 2, rating: 4.8 },
  { city: "Dubai 🏙️",   visits: 3, rating: 4.2 },
  { city: "Amsterdam 🌷", visits: 1, rating: 4.5 },
  { city: "Kyoto ⛩️",   visits: 1, rating: 4.7 },
];

const KEY_STATS = [
  { value: "12",    label: "Total Trips",     sub: "since 2021",         color: "from-orange-400 to-pink-500" },
  { value: "₹6.2L", label: "Total Spent",     sub: "avg ₹51k/trip",     color: "from-pink-400 to-rose-500"  },
  { value: "47",    label: "Nights Abroad",   sub: "this year",          color: "from-amber-400 to-orange-500"},
  { value: "9.2",   label: "Avg Trip Rating", sub: "from your reviews",  color: "from-rose-400 to-pink-600"  },
  { value: "18",    label: "Countries",       sub: "+3 this year",       color: "from-orange-500 to-amber-400"},
  { value: "May",   label: "Busiest Month",   sub: "4 trips taken",      color: "from-pink-500 to-fuchsia-500"},
];

const INSIGHTS = [
  { icon: "📈", title: "Spending up 24%",    desc: "vs last year — mainly due to Paris + Santorini budgets" },
  { icon: "✈️", title: "Prefer non-stop",   desc: "82% of your flight bookings are non-stop" },
  { icon: "🏨", title: "Airbnb favourite",  desc: "You book Airbnb 60% of the time for stays over 5 nights" },
  { icon: "📅", title: "Weekend traveller", desc: "73% of trips start on a Friday or Saturday" },
  { icon: "🌏", title: "Europe lover",      desc: "50% of your trips are to European destinations" },
  { icon: "💰", title: "Smart spender",     desc: "You save avg ₹8,200 per trip vs initial budget estimates" },
];

export const AnalyticsPage = () => {
  const { isDarkMode } = useApp();
  const dark = isDarkMode;
  const [period, setPeriod] = useState<"6m" | "1y" | "all">("1y");

  const card = dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
  const axis = dark ? "#4b5563" : "#d1d5db";
  const tickFill = dark ? "#6b7280" : "#9ca3af";
  const tooltipBg = dark ? "#1f2937" : "#fff";

  return (
    <div className={`max-w-5xl mx-auto ${dark ? "text-white" : "text-gray-900"}`}>

      {/* Header */}
      <motion.div {...stagger(0)} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics 📊</h1>
          <p className={`text-sm mt-0.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>Your travel story, told in data</p>
        </div>
        <div className="flex gap-1.5">
          {(["6m", "1y", "all"] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                period === p
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                  : dark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"
              }`}
            >
              {p === "6m" ? "6 Months" : p === "1y" ? "This Year" : "All Time"}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Key stats */}
      <motion.div {...stagger(1)} className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
        {KEY_STATS.map((s, i) => (
          <div key={i} className={`border ${card} rounded-2xl p-3 text-center`}>
            <div className={`text-xl font-black bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
            <div className={`text-[10px] font-semibold mt-0.5 ${dark ? "text-gray-400" : "text-gray-600"}`}>{s.label}</div>
            <div className={`text-[9px] mt-0.5 ${dark ? "text-gray-600" : "text-gray-400"}`}>{s.sub}</div>
          </div>
        ))}
      </motion.div>

      {/* Spend trend */}
      <motion.div {...stagger(2)} className={`border ${card} rounded-3xl p-5 mb-5 shadow-sm`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`font-bold text-sm ${dark ? "text-white" : "text-gray-800"}`}>💸 Spending Trend</h3>
            <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>Monthly travel spend across all trips</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-black bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">₹6.2L</div>
            <div className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>total this year</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={SPEND_TREND}>
            <CartesianGrid strokeDasharray="3 3" stroke={axis} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: tickFill, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: tickFill, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => v ? `₹${(v / 1000).toFixed(0)}k` : "₹0"} />
            <Tooltip
              formatter={(v: any) => `₹${Number(v).toLocaleString("en-IN")}`}
              contentStyle={{ background: tooltipBg, border: "none", borderRadius: 10, fontSize: 12 }}
            />
            <defs>
              <linearGradient id="spendGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <Line
              type="monotone" dataKey="spend"
              stroke="url(#spendGrad)" strokeWidth={3}
              dot={{ r: 4, fill: "#f97316", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#ec4899" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Two-col row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

        {/* Spend by category */}
        <motion.div {...stagger(3)} className={`border ${card} rounded-3xl p-5 shadow-sm`}>
          <h3 className={`font-bold text-sm mb-4 ${dark ? "text-white" : "text-gray-800"}`}>🥧 Spend by Category</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={CATEGORY_SPLIT} cx="50%" cy="50%" innerRadius={52} outerRadius={78} paddingAngle={3} dataKey="value">
                {CATEGORY_SPLIT.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v: any) => `${v}%`} contentStyle={{ background: tooltipBg, border: "none", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-2">
            {CATEGORY_SPLIT.map((d, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                <span className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>{d.name} {d.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trips by region */}
        <motion.div {...stagger(4)} className={`border ${card} rounded-3xl p-5 shadow-sm`}>
          <h3 className={`font-bold text-sm mb-4 ${dark ? "text-white" : "text-gray-800"}`}>🌍 Spend by Region</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={REGIONS} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke={axis} horizontal={false} />
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="region" tick={{ fill: tickFill, fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip formatter={(v: any) => `₹${Number(v).toLocaleString("en-IN")}`} contentStyle={{ background: tooltipBg, border: "none", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="spend" radius={[0, 8, 8, 0]}>
                {REGIONS.map((_, i) => (
                  <Cell key={i} fill={["#f97316","#ec4899","#fb923c","#f43f5e"][i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top cities + Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Top cities */}
        <motion.div {...stagger(5)} className={`border ${card} rounded-3xl p-5 shadow-sm`}>
          <h3 className={`font-bold text-sm mb-4 ${dark ? "text-white" : "text-gray-800"}`}>🏆 Most Visited Cities</h3>
          <div className="space-y-3">
            {TOP_CITIES.map((c, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  i === 0 ? "bg-amber-400 text-white" : i === 1 ? "bg-gray-300 text-gray-700" : dark ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-500"
                }`}>{i + 1}</div>
                <div className="flex-1">
                  <div className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-800"}`}>{c.city}</div>
                  <div className={`text-xs ${dark ? "text-gray-600" : "text-gray-400"}`}>{c.visits} visit{c.visits > 1 ? "s" : ""}</div>
                </div>
                <div className="text-xs text-amber-400 font-bold">★ {c.rating}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key Insights */}
        <motion.div {...stagger(6)} className={`border ${card} rounded-3xl p-5 shadow-sm`}>
          <h3 className={`font-bold text-sm mb-4 ${dark ? "text-white" : "text-gray-800"}`}>🤖 AI Insights</h3>
          <div className="space-y-3">
            {INSIGHTS.slice(0, 4).map((ins, i) => (
              <motion.div key={i} whileHover={{ x: 3 }} className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${dark ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}>
                <span className="text-base flex-shrink-0">{ins.icon}</span>
                <div>
                  <div className={`text-xs font-semibold ${dark ? "text-white" : "text-gray-800"}`}>{ins.title}</div>
                  <div className={`text-xs mt-0.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>{ins.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};