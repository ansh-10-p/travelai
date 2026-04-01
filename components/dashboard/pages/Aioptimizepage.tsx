"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
 import { AppProvider, useApp } from '../../travel/AppContext';
import { Card, HeroBanner, BtnPrimary, Btn, SectionHeader, Badge, stagger, ProgressBar, StatTile } from '../../ui/ui';

const SCAN_STEPS = [
  { platform: "Skyscanner",  msg: "Scanning 8 airlines for BOM → CDG...",         flights: 8,  hotels: 0  },
  { platform: "MakeMyTrip",  msg: "IndiGo cheapest found at ₹14,200/pax...",       flights: 14, hotels: 0  },
  { platform: "Booking.com", msg: "Comparing 47 Paris hotels under ₹5k/night...",  flights: 14, hotels: 14 },
  { platform: "Airbnb",      msg: "Airbnb Montmartre — 4.7★ at ₹3,900/night...",  flights: 14, hotels: 28 },
  { platform: "Google Flights","msg": "Price calendar analysis: Apr 11 optimal...", flights: 22, hotels: 28 },
  { platform: "Agoda",        msg: "8 more hotel options added to shortlist...",    flights: 22, hotels: 36 },
  { platform: "Kayak",        msg: "Air India non-stop scores best value ratio...", flights: 28, hotels: 36 },
  { platform: "Expedia",      msg: "Final combination check — 312 combos...",       flights: 28, hotels: 47 },
  { platform: "AI Engine",    msg: "Running optimization against ₹80,000 budget...",flights: 28, hotels: 47 },
  { platform: "Complete",     msg: "Best plan found — saving ₹7,500 vs budget ✓",  flights: 28, hotels: 47 },
];
 
export const AIOptimizePage = () => {
  const { setCurrentPage, searchParams, isDarkMode } = useApp();
  const dark = isDarkMode;
  const [step, setStep] = useState(-1);
  const [logLines, setLogLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [running, setRunning] = useState(false);
 
  const startScan = () => {
    setStep(-1); setLogLines([]); setDone(false); setRunning(true);
  };
 
  useEffect(() => {
    if (!running) return;
    if (step >= SCAN_STEPS.length - 1) { setDone(true); setRunning(false); return; }
    const t = setTimeout(() => {
      const next = step + 1;
      setStep(next);
      setLogLines(prev => [...prev, `→ [${SCAN_STEPS[next].platform}] ${SCAN_STEPS[next].msg}`]);
    }, step === -1 ? 200 : 700);
    return () => clearTimeout(t);
  }, [running, step]);
 
  useEffect(() => { startScan(); }, []);
 
  const progress = step < 0 ? 0 : Math.round(((step + 1) / SCAN_STEPS.length) * 100);
  const curStep = step >= 0 ? SCAN_STEPS[step] : SCAN_STEPS[0];
 
  return (
    <div>
      <SectionHeader title="AI Optimizing ⚡" sub={`Finding the best ${searchParams.to} trip within ₹${searchParams.budget.toLocaleString("en-IN")}`} />
 
      {/* Hero scan block */}
      <motion.div {...stagger(0)} className="mb-5">
        <HeroBanner>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full ${done ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`} />
            <span className={`text-xs font-semibold tracking-widest uppercase ${done ? "text-emerald-400" : "text-amber-400"}`}>
              {done ? "Optimization complete" : "AI scanning live"}
            </span>
          </div>
          <h2 className="text-xl font-bold mb-1">{searchParams.from} → {searchParams.to}</h2>
          <p className="text-white/60 text-sm mb-5">
            Budget: <span className="text-white font-semibold">₹{searchParams.budget.toLocaleString("en-IN")}</span>
            {" · "}{searchParams.travelers} travellers · {searchParams.departDate} – {searchParams.returnDate}
          </p>
          <div>
            <div className="flex justify-between text-xs mb-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={step}
                  initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="text-white/60"
                >
                  {step >= 0 ? curStep.msg : "Initialising scan..."}
                </motion.span>
              </AnimatePresence>
              <span className={`font-bold flex-shrink-0 ml-3 ${done ? "text-emerald-400" : "text-orange-400"}`}>{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`h-full rounded-full ${done ? "bg-gradient-to-r from-emerald-400 to-teal-400" : "bg-gradient-to-r from-orange-400 to-pink-500"}`}
              />
            </div>
          </div>
          {/* Platform pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {["Skyscanner", "Booking", "Airbnb", "MakeMyTrip", "Google", "Agoda", "Kayak", "Expedia"].map((p, i) => (
              <motion.div
                key={p}
                animate={{ opacity: step >= i ? 1 : 0.3 }}
                className="bg-white/10 border border-white/10 rounded-lg px-3 py-1"
              >
                <span className="text-white/70 text-[10px] font-semibold">{p}</span>
              </motion.div>
            ))}
          </div>
        </HeroBanner>
      </motion.div>
 
      {/* Live counters */}
      <motion.div {...stagger(1)} className="grid grid-cols-3 gap-3 mb-5">
        <StatTile label="Platforms scanned" value={`${Math.min(step + 1, 8)}`} />
        <StatTile label="Flight options" value={`${step >= 0 ? curStep.flights : 0}`} />
        <StatTile label="Hotel options" value={`${step >= 0 ? curStep.hotels : 0}`} />
      </motion.div>
 
      {/* Live log */}
      <motion.div {...stagger(2)} className="mb-5">
        <Card>
          <div className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Live scan feed</div>
          <div className={`text-xs font-mono leading-loose overflow-y-auto max-h-44 space-y-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}>
            {logLines.length === 0 && <div className="text-gray-400 italic">Initialising...</div>}
            {logLines.map((l, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className={i === logLines.length - 1 ? "text-orange-400" : ""}>
                {l}
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
 
      {/* Result card */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card accent>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge variant="green" className="mb-2">✓ Optimization complete</Badge>
                  <div className="text-base font-bold text-gray-900 dark:text-white">Best value found — saving ₹7,500</div>
                  <div className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">Air India non-stop + Airbnb Montmartre (4.7★)</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-orange-500">₹72,500</div>
                  <div className="text-xs text-gray-400">vs ₹80,000 budget</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="green">Non-stop flight</Badge>
                <Badge variant="blue">4.7★ Airbnb</Badge>
                <Badge variant="amber">Saves ₹7,500</Badge>
                <Badge variant="green">Free cancellation</Badge>
              </div>
              <div className="flex gap-3">
                <BtnPrimary onClick={() => setCurrentPage("recommend")} className="flex-1">View recommendation →</BtnPrimary>
                <Btn onClick={() => setCurrentPage("compare")}>Compare all options</Btn>
                <Btn onClick={startScan}>Re-scan</Btn>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};