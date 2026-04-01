"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
 import { AppProvider, useApp } from '../../travel/AppContext';
import { Card, BtnPrimary, Btn, SectionHeader, Badge, stagger } from "../../ui/ui";

type Msg = {
  id: number; from: "sneha" | "priya" | "rohan" | "ai";
  text: string; time: string;
  card?: { title: string; body: string; yes: number; no: number; voted?: boolean };
};

const INIT_MSGS: Msg[] = [
  { id: 1, from: "priya", text: "Hey everyone! Paris trip is getting close 🎉", time: "10:10 AM" },
  { id: 2, from: "rohan", text: "So pumped! Did we book the Louvre yet?", time: "10:12 AM" },
  { id: 3, from: "sneha", text: "Yes! Got skip-the-line tickets via GetYourGuide 🙌 Day 2 at 10 AM", time: "10:14 AM" },
  {
    id: 4, from: "ai", text: "I have a suggestion for the group:", time: "10:15 AM",
    card: { title: "🎭 Add: Moulin Rouge dinner show?", body: "Apr 14 (Day 4) · ₹8,500/person · Includes 3-course dinner. Great addition to evening itinerary.", yes: 1, no: 0 },
  },
  { id: 5, from: "priya", text: "Voted yes! That sounds amazing 😍", time: "10:16 AM" },
  { id: 6, from: "rohan", text: "I'm in too. Let's do it!", time: "10:17 AM" },
];

const AVATARS: Record<string, { initials: string; color: string }> = {
  sneha: { initials: "S", color: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400" },
  priya: { initials: "P", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" },
  rohan: { initials: "R", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400" },
  ai:    { initials: "🤖", color: "bg-orange-50 text-orange-500 dark:bg-orange-900/20 dark:text-orange-400" },
};

const EXPENSES = [
  { label: "✈️ Flights (Air India)",    payer: "Sneha", total: 35600, share: 17800 },
  { label: "🏠 Airbnb Montmartre",      payer: "Sneha", total: 27300, share: 13650 },
  { label: "🎟️ Louvre tickets",         payer: "Priya", total: 4800,  share: 2400,  owe: "Sneha owes Priya ₹2,400" },
  { label: "🎭 Moulin Rouge (pending)", payer: "—",     total: 17000, share: 8500 },
];

export const CollabChatPage = () => {
  const { isDarkMode } = useApp();
  const dark = isDarkMode;
  const [msgs, setMsgs] = useState<Msg[]>(INIT_MSGS);
  const [input, setInput] = useState("");
  const [votes, setVotes] = useState<Record<number, { yes: number; no: number; voted: boolean }>>({ 4: { yes: 1, no: 0, voted: false } });
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const sendMsg = () => {
    if (!input.trim()) return;
    setMsgs(m => [...m, { id: Date.now(), from: "sneha", text: input.trim(), time: "Just now" }]);
    setInput("");
  };

  const vote = (msgId: number, dir: "yes" | "no") => {
    if (votes[msgId]?.voted) return;
    setVotes(v => ({
      ...v,
      [msgId]: { yes: (v[msgId]?.yes || 0) + (dir === "yes" ? 1 : 0), no: (v[msgId]?.no || 0) + (dir === "no" ? 1 : 0), voted: true },
    }));
  };

  const inp = `flex-1 text-sm px-4 py-2.5 rounded-xl border outline-none transition-colors focus:border-orange-400 ${dark ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"}`;

  return (
    <div>
      <SectionHeader title="Group Chat 👥" sub="Paris trip · Sneha, Priya, Rohan" />

      {/* Members */}
      <motion.div {...stagger(0)} className="flex items-center gap-3 mb-5">
        {[
          { name: "Sneha", role: "Organiser", ...AVATARS.sneha, online: true },
          { name: "Priya", role: "Traveller", ...AVATARS.priya, online: true },
          { name: "Rohan", role: "Traveller", ...AVATARS.rohan, online: false },
        ].map(m => (
          <div key={m.name} className={`flex items-center gap-2 px-3 py-2 rounded-2xl border ${dark ? "border-gray-800 bg-gray-900" : "border-gray-100 bg-white"}`}>
            <div className="relative">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${m.color}`}>{m.initials}</div>
              {m.online && <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full border border-white dark:border-gray-900" />}
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-800 dark:text-gray-200">{m.name}</div>
              <div className="text-[10px] text-gray-400">{m.role}</div>
            </div>
          </div>
        ))}
        <Badge variant="green" className="ml-auto">2 online</Badge>
      </motion.div>

      {/* Chat */}
      <motion.div {...stagger(1)} className="mb-4">
        <Card className="p-0 overflow-hidden">
          <div className="overflow-y-auto max-h-96 p-4 space-y-4">
            {msgs.map(msg => {
              const isMe = msg.from === "sneha";
              const av = AVATARS[msg.from];
              const vd = votes[msg.id];

              return (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
                  className={`flex gap-2.5 ${isMe ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${av.color}`}>{av.initials}</div>
                  <div className={`max-w-xs ${isMe ? "items-end" : ""} flex flex-col gap-1`}>
                    {/* AI suggestion card */}
                    {msg.card && (
                      <div className={`rounded-2xl border p-4 text-sm ${dark ? "bg-orange-500/5 border-orange-500/20" : "bg-orange-50 border-orange-100"}`}>
                        <div className="font-semibold text-gray-900 dark:text-white mb-1">{msg.card.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">{msg.card.body}</div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => vote(msg.id, "yes")}
                            className={`flex-1 text-xs font-semibold py-1.5 rounded-lg border transition-all ${vd?.voted && vd.yes > vd.no ? "bg-emerald-100 border-emerald-300 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-500/30 dark:text-emerald-400" : dark ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                          >
                            👍 Yes ({(vd?.yes || msg.card.yes) + (vd?.voted && !vd.no ? 0 : 0)})
                          </button>
                          <button
                            onClick={() => vote(msg.id, "no")}
                            className={`flex-1 text-xs font-semibold py-1.5 rounded-lg border transition-all ${vd?.voted && vd.no > vd.yes ? "bg-red-100 border-red-300 text-red-700" : dark ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                          >
                            👎 No ({vd?.no || msg.card.no})
                          </button>
                          <BtnPrimary className="flex-1 text-xs py-1.5 px-3 rounded-lg" onClick={() => {}}>Book</BtnPrimary>
                        </div>
                      </div>
                    )}
                    {/* Regular bubble */}
                    {!msg.card && (
                      <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                        isMe ? "bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-br-sm" :
                        msg.from === "ai" ? `border text-sm ${dark ? "bg-orange-500/5 border-orange-500/20 text-gray-300" : "bg-orange-50 border-orange-100 text-gray-700"}` :
                        dark ? "bg-gray-800 text-gray-200 rounded-bl-sm" : "bg-gray-100 text-gray-700 rounded-bl-sm"
                      }`}>
                        {msg.text}
                      </div>
                    )}
                    <div className={`text-[10px] text-gray-400 ${isMe ? "text-right" : ""}`}>{msg.time}</div>
                  </div>
                </motion.div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className={`flex gap-2 p-3 border-t ${dark ? "border-gray-800" : "border-gray-100"}`}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} placeholder="Message the group..." className={inp} />
            <BtnPrimary onClick={sendMsg} className="px-4">→</BtnPrimary>
          </div>
        </Card>
      </motion.div>

      {/* Expense split */}
      <motion.div {...stagger(2)}>
        <Card>
          <div className="text-sm font-semibold text-gray-800 dark:text-white mb-4">💸 Expense Split</div>
          <div className="space-y-3">
            {EXPENSES.map((e, i) => (
              <div key={i} className={`flex items-center justify-between py-2.5 ${i < EXPENSES.length - 1 ? `border-b ${dark ? "border-gray-800" : "border-gray-100"}` : ""}`}>
                <div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{e.label}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-600">Paid by {e.payer} · ₹{e.total.toLocaleString("en-IN")} total</div>
                  {e.owe && <div className="text-xs text-orange-500 font-semibold mt-0.5">{e.owe}</div>}
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">₹{e.share.toLocaleString("en-IN")}</div>
                  <div className="text-xs text-gray-400">each</div>
                </div>
              </div>
            ))}
            <div className={`flex items-center justify-between pt-2 border-t ${dark ? "border-gray-800" : "border-gray-100"}`}>
              <span className="text-sm font-bold text-gray-900 dark:text-white">Your total share</span>
              <span className="text-base font-black text-orange-500">₹42,350</span>
            </div>
          </div>
          <Btn className="w-full mt-3">Settle up with Priya</Btn>
        </Card>
      </motion.div>
    </div>
  );
};