"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
  import { AppProvider, useApp } from '../../travel/AppContext';
import { Card, BtnPrimary, SectionHeader, stagger } from '../../ui/ui';

type Msg = { from: "user" | "ai"; text: string; time: string };

const AI_KB: { keys: string[]; answer: string }[] = [
  { keys: ["cancel", "refund", "cancellation"],
    answer: "Your Air India ticket can be cancelled **free before Apr 5** for a full ₹35,600 refund. Apr 5–9 = 50% penalty. After Apr 9 = no refund. Your Airbnb has **free cancellation any time before Apr 11** — no penalty." },
  { keys: ["weather", "climate", "temperature"],
    answer: "Paris in April: expect **10–16°C**, partly cloudy with light rain. Pack a waterproof jacket and layers. Golden hour is around 8 PM — perfect for the Eiffel Tower! 🌅 Sunrise is 7:12 AM." },
  { keys: ["cdg", "airport", "train", "transport", "metro", "get to"],
    answer: "From CDG → Montmartre: take **RER B** to Gare du Nord (35 min, ~₹280/person), then **Metro Line 12** to Abbesses — total ~55 min. Or taxi is €45–55 (₹4,000–5,000). Uber is usually cheaper." },
  { keys: ["pack", "packing", "luggage", "bag", "bring"],
    answer: "Paris April essentials: light layers, waterproof jacket 🧥, comfortable walking shoes (15,000+ steps/day!), EU adapter (Type E), Museum Pass, camera, and a crossbody bag. Avoid big backpacks — pickpockets target tourists." },
  { keys: ["airbnb", "host", "check-in", "checkin", "accommodation"],
    answer: "Your Airbnb (Montmartre Studio) is **pending host confirmation** — hosts usually respond within 2h. Check-in is Apr 11 from 3 PM. The host (Marie) has a 4.9★ rating. You'll get the key code 24h before arrival." },
  { keys: ["restaurant", "eat", "food", "dinner", "lunch"],
    answer: "Near Montmartre: **Le Relais de la Butte** (classic French, ~₹1,600/person), **Café des 2 Moulins** (from the Amélie movie!), **La Famille** for modern bistro. Avoid tourist traps near Sacré-Cœur — walk 2 blocks away for authentic spots." },
  { keys: ["louvre", "museum", "ticket", "attraction"],
    answer: "Your Louvre skip-the-line tickets are confirmed (GYG-774KL) for Apr 13 at 10:00 AM. Plan 3–4 hours. Pro tip: start with Winged Victory and Venus de Milo on level 0 before heading to the Mona Lisa — crowds are lighter early." },
  { keys: ["budget", "money", "spend", "cost"],
    answer: "You've spent ₹62,900 of your ₹80,000 budget. Remaining: ₹17,100 for food, transport & activities. Daily food budget: ~₹1,700/day. At current pace you'll finish ₹4,800 under budget — great!" },
  { keys: ["flight", "check in", "boarding", "seat"],
    answer: "Your Air India AI 131 flight departs Apr 11 at 02:15 AM from BOM Terminal 2. Online check-in opens 48h before (Apr 9). Your seats are 24A and 24B (window + middle). Baggage: 23kg checked + 7kg cabin. Meal: AVML (Asian Veg) confirmed." },
  { keys: ["versailles", "day trip", "excursion"],
    answer: "Versailles is ~45 min from Paris via RER C (₹350/person return). Buy a **Paris Museum Pass** — it includes Versailles and saves queuing. Best day is Tuesday (Monday closed). Book Palace + Gardens combo for the full experience! 🏛️" },
];

const QUICK_Q = [
  "Can I cancel my flight?",
  "What's the weather in Paris?",
  "How do I get from CDG to Montmartre?",
  "What should I pack?",
  "Is my Airbnb confirmed?",
  "Best restaurants near Montmartre?",
];

function getAIResponse(q: string): string {
  const lower = q.toLowerCase();
  for (const entry of AI_KB) {
    if (entry.keys.some(k => lower.includes(k))) {
      return entry.answer.replace(/\*\*(.*?)\*\*/g, "$1"); // strip markdown bold for display
    }
  }
  return `Great question! Based on your Paris trip (Apr 11–18, Montmartre Airbnb + Air India AI 131), I'd suggest planning Versailles on Day 3 to avoid weekend crowds. Is there anything specific about your booking, budget, or itinerary I can help with?`;
}

export const AIAssistantPage = () => {
  const { isDarkMode } = useApp();
  const dark = isDarkMode;
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "ai", text: "Hi Sneha! I'm your TravelAI assistant. I know your Paris trip inside out — flights, hotel, budget, itinerary. Ask me anything!", time: "Just now" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const sendMsg = (text: string = input) => {
    const q = text.trim();
    if (!q) return;
    setInput("");
    const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    setMsgs(m => [...m, { from: "user", text: q, time: now }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { from: "ai", text: getAIResponse(q), time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) }]);
    }, 900 + Math.random() * 400);
  };

  const inp = `flex-1 text-sm px-4 py-2.5 rounded-xl border outline-none transition-colors focus:border-orange-400 ${dark ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"}`;

  return (
    <div>
      <SectionHeader title="AI Assistant" sub="Your 24/7 Paris trip companion — ask anything" />

      {/* Context banner */}
      <motion.div {...stagger(0)} className={`flex items-center gap-3 mb-5 px-4 py-3 rounded-2xl border text-sm ${dark ? "bg-orange-500/5 border-orange-500/15" : "bg-orange-50 border-orange-100"}`}>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-base">AI</div>
        <div>
          <div className="font-semibold text-gray-800 dark:text-white text-sm">Context loaded: Paris trip (Apr 11–18)</div>
          <div className="text-xs text-gray-400 dark:text-gray-500">Booking TAI-2025-PRS · Air India AI 131 · Montmartre Airbnb · ₹80k budget</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-500 font-semibold">Online</span>
        </div>
      </motion.div>

      {/* Chat */}
      <motion.div {...stagger(1)} className="mb-4">
        <Card className="p-0 overflow-hidden">
          <div className="overflow-y-auto max-h-96 p-4 space-y-4">
            {msgs.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
                className={`flex gap-2.5 ${msg.from === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  msg.from === "ai"
                    ? "bg-orange-100 text-orange-500 dark:bg-orange-900/30 dark:text-orange-400"
                    : "bg-gradient-to-br from-orange-400 to-pink-500 text-white"
                }`}>
                  {msg.from === "ai" ? "🤖" : "S"}
                </div>
                <div className={`max-w-sm ${msg.from === "user" ? "items-end" : ""} flex flex-col gap-1`}>
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-br-sm"
                      : dark ? "bg-gray-800 text-gray-200 rounded-bl-sm" : "bg-gray-100 text-gray-700 rounded-bl-sm"
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`text-[10px] text-gray-400 ${msg.from === "user" ? "text-right" : ""}`}>{msg.time}</div>
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-xs">🤖</div>
                <div className={`px-4 py-3 rounded-2xl rounded-bl-sm ${dark ? "bg-gray-800" : "bg-gray-100"} flex items-center gap-1`}>
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ delay: i * 0.15, repeat: Infinity, duration: 0.6 }}
                      className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className={`flex gap-2 p-3 border-t ${dark ? "border-gray-800" : "border-gray-100"}`}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMsg()}
              placeholder="Ask about your trip…"
              className={inp}
            />
            <BtnPrimary onClick={() => sendMsg()} disabled={!input.trim()}>Ask</BtnPrimary>
          </div>
        </Card>
      </motion.div>

      {/* Quick questions */}
      <motion.div {...stagger(2)}>
        <p className="text-xs text-gray-400 dark:text-gray-600 mb-3 font-semibold uppercase tracking-wider">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {QUICK_Q.map(q => (
            <button
              key={q}
              onClick={() => sendMsg(q)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all hover:border-orange-300 ${dark ? "border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-orange-400" : "border-gray-200 text-gray-500 hover:bg-orange-50 hover:text-orange-600"}`}
            >
              {q}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};