"use client";

import { useState } from "react";
import { motion } from "framer-motion"; 
import { useApp } from '../../travel/AppContext';
import { BtnPrimary, stagger, Toggle, Divider } from "../../ui/ui";

const BADGES = [
  { icon: "globe", label: "Globe Trotter",     desc: "18 countries" },
  { icon: "plane", label: "Frequent Flyer",    desc: "12 trips" },
  { icon: "star", label: "Top Reviewer",      desc: "25 reviews" },
  { icon: "wallet", label: "Smart Spender",     desc: "₹38k saved" },
  { icon: "home", label: "Connoisseur",       desc: "47 nights" },
  { icon: "compass", label: "Explorer",         desc: "4 continents" },
];

const TRAVEL_PREFS = [
  { label: "Budget range",      value: "₹50k – ₹1.2L per trip" },
  { label: "Flight class",      value: "Economy / Premium Eco"  },
  { label: "Avg trip length",   value: "7–10 days"              },
  { label: "Preferred regions", value: "Europe, Southeast Asia" },
  { label: "Favourite stay",    value: "Airbnb / Boutique hotel"},
];

const STYLE_TAGS = ["Culture", "Food", "Art", "Architecture", "Nature", "Adventure", "Nightlife", "Photography"];

export const ProfilePage = () => {
  const { isDarkMode } = useApp();
  const dark = isDarkMode;
  const [editing, setEditing] = useState(false);
  const [name, setName]   = useState("Sneha Patel");
  const [bio, setBio]     = useState("Travel addict · Coffee lover · Always chasing sunsets");
  const [budgetStyle, setBudgetStyle] = useState("smart");
  const [activeTags, setActiveTags]   = useState(["Culture", "Food", "Art", "Architecture"]);
  const [settings, setSettings] = useState({
    priceAlerts: true, tripSuggestions: true, groupCollab: true,
    budgetAlerts: true, emailDigest: false, smsAlerts: false,
  });

  const toggleTag = (t: string) =>
    setActiveTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const toggleSetting = (k: keyof typeof settings) =>
    setSettings(s => ({ ...s, [k]: !s[k] }));

  const card = `rounded-2xl border ${dark ? "border-gray-800 bg-gray-900" : "border-gray-100 bg-white"} p-5 mb-4`;

  return (
    <div className="pb-10">
      {/* ── HEADER ── */}
      <div className="mb-6">
        <h1 className={`text-2xl md:text-3xl font-bold mb-1 ${dark ? "text-white" : "text-gray-900"}`}>
          Profile & Preferences 👤
        </h1>
        <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
          Your travel identity and AI personalisation
        </p>
      </div>

      {/* Profile card */}
      <motion.div {...stagger(0)} className={card}>
        {/* Cover */}
        <div className="-mx-5 -mt-5 h-24 rounded-t-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-rose-400 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=40)", backgroundSize: "cover" }} />
        </div>
        
        {/* Avatar + actions */}
        <div className="flex items-end justify-between -mt-8 mb-4 px-0 relative z-10">
          <div className={`w-16 h-16 rounded-2xl border-4 ${dark ? "border-gray-900" : "border-white"} bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-3xl shadow-lg`}>
            👩
          </div>
          <div className="flex gap-2">
            <BtnPrimary onClick={() => setEditing(e => !e)} className="text-xs py-2 px-4 shadow-sm">
              {editing ? "Save" : "Edit Profile"}
            </BtnPrimary>
          </div>
        </div>

        {editing ? (
          <div className="space-y-2 mb-4">
            <input value={name} onChange={e => setName(e.target.value)}
              className={`w-full text-lg font-bold rounded-xl px-3 py-2 outline-none border ${dark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`} />
            <input value={bio} onChange={e => setBio(e.target.value)}
              className={`w-full text-sm rounded-xl px-3 py-2 outline-none border ${dark ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-gray-50 border-gray-200 text-gray-500"}`} />
          </div>
        ) : (
          <div className="mb-4">
            <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>{name}</h2>
            <p className={`text-sm mt-0.5 ${dark ? "text-gray-400" : "text-gray-600"}`}>{bio}</p>
            <p className={`text-xs mt-1 ${dark ? "text-gray-500" : "text-gray-400"}`}>📍 Mumbai, India · 🗓️ Member since Jan 2021</p>
          </div>
        )}

        {/* STATS TILES */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Trips", value: "12", color: "from-orange-500 to-pink-500" },
            { label: "Countries", value: "18", color: "from-pink-500 to-rose-500" },
            { label: "Nights", value: "47", color: "from-amber-500 to-orange-500" },
            { label: "Saved", value: "₹38k", color: "from-emerald-500 to-teal-500" }
          ].map((stat, i) => (
            <div key={i} className={`p-4 rounded-xl border ${dark ? "bg-gray-800/50 border-gray-800" : "bg-gray-50 border-gray-100"}`}>
              <div className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className={`text-xs mt-1 font-medium ${dark ? "text-gray-400" : "text-gray-500"}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div {...stagger(1)} className={card}>
        <div className={`text-sm font-semibold mb-4 ${dark ? "text-white" : "text-gray-800"}`}>🏅 Travel Badges</div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {BADGES.map((b, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05, y: -2 }} className="text-center">
              <div className={`w-12 h-12 rounded-2xl mx-auto mb-2 flex items-center justify-center text-2xl ${dark ? "bg-gray-800" : "bg-gray-50"}`}>{b.icon}</div>
              <div className={`text-[10px] font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>{b.label}</div>
              <div className={`text-[9px] ${dark ? "text-gray-500" : "text-gray-400"}`}>{b.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Travel preferences */}
      <motion.div {...stagger(2)} className={card}>
        <div className={`text-sm font-semibold mb-4 ${dark ? "text-white" : "text-gray-800"}`}>🎯 Travel Preferences</div>

        {/* Budget style */}
        <div className="mb-4">
          <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${dark ? "text-gray-500" : "text-gray-400"}`}>Budget style</div>
          <div className="flex gap-2">
            {[["smart", "⚡ Smart value"], ["budget", "💰 Budget"], ["premium", "✨ Luxury"]].map(([k, l]) => (
              <button key={k} onClick={() => setBudgetStyle(k)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${budgetStyle === k ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-sm" : dark ? "bg-gray-800 text-gray-400 hover:bg-gray-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Travel style tags */}
        <div className="mb-4">
          <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${dark ? "text-gray-500" : "text-gray-400"}`}>Travel interests</div>
          <div className="flex flex-wrap gap-2">
            {STYLE_TAGS.map(t => (
              <button key={t} onClick={() => toggleTag(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${activeTags.includes(t) ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-transparent shadow-sm" : dark ? "border-gray-700 text-gray-400 hover:border-gray-600" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Key prefs list */}
        <Divider className="mb-3" />
        <div className="space-y-0">
          {TRAVEL_PREFS.map((p, i) => (
            <div key={i} className={`flex items-center justify-between py-2.5 ${i < TRAVEL_PREFS.length - 1 ? `border-b ${dark ? "border-gray-800" : "border-gray-100"}` : ""}`}>
              <span className={`text-xs ${dark ? "text-gray-500" : "text-gray-500"}`}>{p.label}</span>
              <span className={`text-xs font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>{p.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI & notifications */}
      <motion.div {...stagger(3)} className={card}>
        <div className={`text-sm font-semibold mb-4 ${dark ? "text-white" : "text-gray-800"}`}>🤖 AI & Notification Settings</div>
        <div className="space-y-0">
          {[
            { key: "priceAlerts",    label: "Price drop alerts",    sub: "Get notified when saved prices fall" },
            { key: "tripSuggestions",label: "AI trip suggestions",  sub: "Personalised destination picks" },
            { key: "groupCollab",    label: "Group collaboration",  sub: "Allow friends to join your trips" },
            { key: "budgetAlerts",   label: "Smart budget alerts",  sub: "Warn when nearing spend limit" },
            { key: "emailDigest",    label: "Weekly email digest",  sub: "Summary of deals and updates" },
            { key: "smsAlerts",      label: "SMS alerts",           sub: "Critical travel notifications via SMS" },
          ].map((item, i, arr) => (
            <div key={item.key} className={`flex items-center justify-between py-3.5 ${i < arr.length - 1 ? `border-b ${dark ? "border-gray-800" : "border-gray-100"}` : ""}`}>
              <div>
                <div className={`text-sm font-medium ${dark ? "text-gray-200" : "text-gray-800"}`}>{item.label}</div>
                <div className={`text-xs ${dark ? "text-gray-500" : "text-gray-500"}`}>{item.sub}</div>
              </div>
              <Toggle on={settings[item.key as keyof typeof settings]} onChange={() => toggleSetting(item.key as keyof typeof settings)} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Danger zone */}
      <motion.div {...stagger(4)} className={`rounded-2xl border ${dark ? "border-red-500/20 bg-gray-900" : "border-red-200 bg-white"} p-5`}>
        <div className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-4">Danger zone</div>
        <div className="flex gap-3">
          <button className={`flex-1 text-sm font-medium border py-2.5 rounded-xl transition-colors ${dark ? "text-red-400 border-red-500/30 hover:bg-red-500/10" : "text-red-500 border-red-200 hover:bg-red-50"}`}>
            Clear all data
          </button>
          <button className={`flex-1 text-sm font-medium border py-2.5 rounded-xl transition-colors ${dark ? "text-red-500 border-red-500/50 hover:bg-red-500/20" : "text-red-600 border-red-300 hover:bg-red-100"}`}>
            Delete account
          </button>
        </div>
      </motion.div>
    </div>
  );
};