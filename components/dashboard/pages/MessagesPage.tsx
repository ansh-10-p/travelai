"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
  import { AppProvider, useApp } from '../../travel/AppContext';

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] as any },
});

const CONVERSATIONS = [
  {
    id: 1, name: "Airbnb Support", avatar: "home", badge: "Airbnb",
    last: "Your check-in code for Montmartre is ready!", time: "2m ago",
    unread: 2, online: true, type: "support",
    messages: [
      { from: "them", text: "Hi Sneha! Your booking for Montmartre Studio has been confirmed.", time: "10:02 AM" },
      { from: "them", text: "Your check-in is April 11. The host will share the access code 24h before.", time: "10:03 AM" },
      { from: "me",   text: "Thank you! Can I do an early check-in around 11 AM?", time: "10:15 AM" },
      { from: "them", text: "We've passed your request to the host. They'll confirm within 24h", time: "10:20 AM" },
      { from: "them", text: "Your check-in code for Montmartre is ready!", time: "Just now" },
    ],
  },
  {
    id: 2, name: "Priya Sharma", avatar: "person", badge: "Friend",
    last: "Are you free for Louvre on Day 2?", time: "1h ago",
    unread: 1, online: true, type: "friend",
    messages: [
      { from: "them", text: "Sneha!! Paris trip confirmed", time: "Yesterday" },
      { from: "me",   text: "I know right!! So excited", time: "Yesterday" },
      { from: "them", text: "Should we book Louvre tickets in advance? I heard the queue is 3 hours", time: "9:30 AM" },
      { from: "me",   text: "Yes! Already got skip-the-line ones from GetYourGuide", time: "9:45 AM" },
      { from: "them", text: "Are you free for Louvre on Day 2?", time: "1h ago" },
    ],
  },
  {
    id: 3, name: "Air India", avatar: "plane", badge: "Airline",
    last: "Your flight AI 131 departs in 12 days.", time: "3h ago",
    unread: 0, online: false, type: "support",
    messages: [
      { from: "them", text: "Dear Sneha, your booking AI-8X92K4 is confirmed for BOM → CDG on Apr 11.", time: "Mar 28" },
      { from: "them", text: "Web check-in opens 48 hours before departure. Seat selection is complimentary.", time: "Mar 28" },
      { from: "me",   text: "Can I request a vegetarian meal?", time: "Mar 29" },
      { from: "them", text: "Meal preference updated to AVML (Asian Vegetarian)", time: "Mar 29" },
      { from: "them", text: "Your flight AI 131 departs in 12 days.", time: "3h ago" },
    ],
  },
  {
    id: 4, name: "Rohan Mehta", avatar: "👨", badge: "Friend",
    last: "Let's do Sacré-Cœur on Day 1!", time: "Yesterday",
    unread: 0, online: false, type: "friend",
    messages: [
      { from: "them", text: "Sneha bhai, Paris trip plan confirmed karo!", time: "2 days ago" },
      { from: "me",   text: "Done! Flights and hotel both booked 💪", time: "2 days ago" },
      { from: "them", text: "Let's do Sacré-Cœur on Day 1!", time: "Yesterday" },
    ],
  },
  {
    id: 5, name: "GetYourGuide", avatar: "🎟️", badge: "Activity",
    last: "Your Louvre tour confirmation: GYG-774KL", time: "2 days ago",
    unread: 0, online: false, type: "support",
    messages: [
      { from: "them", text: "Hi Sneha! Your Louvre Skip-the-Line tour is confirmed for Apr 13 at 10:00 AM.", time: "2 days ago" },
      { from: "them", text: "Your Louvre tour confirmation: GYG-774KL. Download tickets below.", time: "2 days ago" },
    ],
  },
];

const badgeColors: Record<string, string> = {
  Airbnb:   "bg-rose-100 text-rose-600",
  Friend:   "bg-blue-100 text-blue-600",
  Airline:  "bg-orange-100 text-orange-600",
  Activity: "bg-purple-100 text-purple-600",
};

export const MessagesPage = () => {
  const { isDarkMode } = useApp();
  const dark = isDarkMode;
  const [active, setActive] = useState(CONVERSATIONS[0]);
  const [input, setInput] = useState("");
  const [localMsgs, setLocalMsgs] = useState<{ from: string; text: string; time: string }[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const allMsgs = [...active.messages, ...localMsgs];

  useEffect(() => {
    setLocalMsgs([]);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMsgs.length]);

  const send = () => {
    if (!input.trim()) return;
    setLocalMsgs(m => [...m, { from: "me", text: input.trim(), time: "Just now" }]);
    setInput("");
  };

  const sidebar = dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
  const chat    = dark ? "bg-gray-950"               : "bg-gray-50";
  const header  = dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
  const inputBg = dark ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-400";

  return (
    <div className={`max-w-5xl mx-auto ${dark ? "text-white" : "text-gray-900"}`}>
      <motion.div {...stagger(0)} className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Messages 💬</h1>
        <p className={`text-sm mt-0.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>All your travel conversations</p>
      </motion.div>

      <motion.div {...stagger(1)} className={`border ${sidebar} rounded-3xl overflow-hidden shadow-sm flex`} style={{ height: 580 }}>
        {/* Sidebar */}
        <div className={`w-72 flex-shrink-0 border-r ${dark ? "border-gray-800" : "border-gray-100"} flex flex-col`}>
          {/* Search */}
          <div className={`p-3 border-b ${dark ? "border-gray-800" : "border-gray-100"}`}>
            <input
              placeholder="Search messages…"
              className={`w-full text-xs px-3 py-2 rounded-xl border ${inputBg} outline-none`}
            />
          </div>
          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto">
            {CONVERSATIONS.map((c, i) => (
              <div
                key={c.id}
                onClick={() => setActive(c)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                  active.id === c.id
                    ? dark ? "bg-gray-800" : "bg-orange-50"
                    : dark ? "hover:bg-gray-800/50" : "hover:bg-gray-50"
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${dark ? "bg-gray-700" : "bg-gray-100"}`}>
                    {c.avatar}
                  </div>
                  {c.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold truncate ${dark ? "text-white" : "text-gray-800"}`}>{c.name}</span>
                    <span className={`text-[10px] flex-shrink-0 ml-1 ${dark ? "text-gray-600" : "text-gray-400"}`}>{c.time}</span>
                  </div>
                  <div className={`text-xs truncate ${dark ? "text-gray-500" : "text-gray-400"}`}>{c.last}</div>
                </div>
                {c.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                    {c.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat pane */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className={`flex items-center gap-3 px-5 py-3.5 border-b ${dark ? "border-gray-800 bg-gray-900" : "border-gray-100 bg-white"}`}>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg ${dark ? "bg-gray-700" : "bg-gray-100"}`}>{active.avatar}</div>
            <div className="flex-1">
              <div className={`font-semibold text-sm ${dark ? "text-white" : "text-gray-800"}`}>{active.name}</div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColors[active.badge] || "bg-gray-100 text-gray-500"}`}>{active.badge}</span>
                {active.online && <span className="text-xs text-emerald-500">● Online</span>}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${chat}`}>
            {allMsgs.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-xs lg:max-w-sm`}>
                  <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                    msg.from === "me"
                      ? "bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-br-sm"
                      : dark ? "bg-gray-800 text-gray-200 rounded-bl-sm" : "bg-white text-gray-700 rounded-bl-sm shadow-sm"
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`text-[10px] mt-1 ${msg.from === "me" ? "text-right" : "text-left"} ${dark ? "text-gray-600" : "text-gray-400"}`}>
                    {msg.time}
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className={`px-4 py-3 border-t ${dark ? "border-gray-800 bg-gray-900" : "border-gray-100 bg-white"} flex items-center gap-3`}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Type a message…"
              className={`flex-1 text-sm px-4 py-2.5 rounded-2xl border ${inputBg} outline-none`}
            />
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={send}
              className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white flex-shrink-0"
            >
              ➤
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};