"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useApp } from '../../travel/AppContext';
import { Card, HeroBanner, BtnPrimary, Btn, Badge, stagger, ProgressBar, AI_TIPS, PLANS } from "../../ui/ui";

// ══════════════════════════════════════════════════════════
// RECOMMEND PAGE
// ══════════════════════════════════════════════════════════
export const RecommendPage = () => {
  const { setCurrentPage, selectedPlan, setSelectedPlan, isDarkMode } = useApp();
  const dark = isDarkMode;
  const plan = PLANS[selectedPlan];
  const BUDGET = 80000;
  const isOver = plan.total > BUDGET;
  const pct = Math.min((plan.total / BUDGET) * 100, 130);

  return (
    <div className="pb-10">
      <div className="mb-6">
        <h1 className={`text-2xl md:text-3xl font-bold mb-1 ${dark ? "text-white" : "text-gray-900"}`}>
          AI Recommendation
        </h1>
        <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
          Your best Paris trip — explained clearly, no surprises
        </p>
      </div>

      {/* Plan switcher */}
      <motion.div {...stagger(0)} className="flex gap-2 mb-4 flex-wrap">
        {(["smart", "budget", "premium"] as const).map(key => (
          <button
            key={key}
            onClick={() => setSelectedPlan(key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              selectedPlan === key
                ? `bg-gradient-to-r ${PLANS[key].color} text-white shadow-lg`
                : dark ? "bg-gray-800 text-gray-400 hover:bg-gray-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {PLANS[key].emoji} {PLANS[key].label}
          </button>
        ))}
      </motion.div>

      {/* Main plan card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPlan}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.3 }}
          className="mb-5"
        >
          <div className={`rounded-2xl border p-5 shadow-sm ${selectedPlan === "smart" ? (dark ? "bg-gray-900 border-orange-500/30" : "bg-white border-orange-200") : (dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200")}`}>
            
            {/* Header */}
            <div className={`-mx-5 -mt-5 px-5 py-5 rounded-t-2xl bg-gradient-to-r ${plan.color} mb-4`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">
                    {selectedPlan === "smart" ? "✦ AI Top Pick" : selectedPlan === "budget" ? "💰 Maximum savings" : "✨ Best experience"}
                  </div>
                  <div className="text-white text-xl font-bold">{plan.emoji} {plan.label}</div>
                </div>
                <div className="text-right">
                  <div className="text-white text-3xl font-black">₹{plan.total.toLocaleString("en-IN")}</div>
                  {plan.savings > 0
                    ? <div className="text-white/90 text-xs font-medium">Save <span className="font-bold text-white">₹{plan.savings.toLocaleString("en-IN")}</span></div>
                    : <div className="text-white/90 text-xs font-medium">₹{Math.abs(plan.savings).toLocaleString("en-IN")} over budget</div>
                  }
                </div>
              </div>
            </div>

            {/* AI why */}
            <div className={`flex items-start gap-3 rounded-xl p-3 mb-4 ${dark ? "bg-orange-500/10 border border-orange-500/20" : "bg-orange-50 border border-orange-100"}`}>
              <span className="text-base flex-shrink-0">🤖</span>
              <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"}`}>
                <strong className={dark ? "text-white" : "text-gray-900"}>Why this plan? </strong>{plan.why}
              </p>
            </div>

            {/* 4-cell breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {[
                { label: "✈️ Flights",     val: plan.flight.priceTotal },
                { label: "🏨 Hotel (7n)",  val: plan.hotel.priceTotal  },
                { label: "🍽️ Food",        val: plan.food              },
                { label: "🎭 Activities",  val: PLANS[selectedPlan].total - plan.flight.priceTotal - plan.hotel.priceTotal - plan.food },
              ].map((item, i) => (
                <div key={i} className={`rounded-xl p-3 text-center border ${dark ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-100"}`}>
                  <div className={`text-xs mb-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}>{item.label}</div>
                  <div className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>₹{item.val.toLocaleString("en-IN")}</div>
                </div>
              ))}
            </div>

            {/* Budget bar */}
            <div className={`h-2 rounded-full mb-1 overflow-hidden ${dark ? "bg-gray-800" : "bg-gray-200"}`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(pct, 100)}%` }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className={`h-full rounded-full ${isOver ? "bg-red-500" : "bg-gradient-to-r from-orange-500 to-pink-500"}`}
              />
            </div>
            <div className="flex justify-between text-xs mb-5">
              <span className={dark ? "text-gray-500" : "text-gray-400"}>₹0</span>
              <span className={isOver ? "text-red-500 font-bold" : "text-orange-500 font-bold"}>
                ₹{plan.total.toLocaleString("en-IN")} / ₹{BUDGET.toLocaleString("en-IN")} budget
              </span>
            </div>

            {isOver && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-400/30 text-red-600 dark:text-red-400 font-medium text-sm rounded-xl px-4 py-3 mb-4">
                ⚠️ Exceeds budget by ₹{(plan.total - BUDGET).toLocaleString("en-IN")}
              </div>
            )}

            <BtnPrimary onClick={() => setCurrentPage("booking")} className="w-full shadow-md">
              🎫 Book {plan.label} →
            </BtnPrimary>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* AI Saving Tips */}
      <motion.div {...stagger(2)}>
        <div className={`rounded-2xl border p-5 shadow-sm ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>🤖 AI Saving Tips</span>
            <span className="text-[10px] bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold px-2 py-0.5 rounded-md shadow-sm">✦ Smart</span>
          </div>
          <div className="space-y-2">
            {AI_TIPS.map((tip, i) => (
              <motion.div key={i} whileHover={{ x: 4 }} className={`flex items-center gap-3 p-3 rounded-xl transition-colors border ${dark ? "bg-gray-800/40 border-gray-700/50 hover:bg-gray-800" : "bg-gray-50 border-gray-100 hover:bg-gray-100"}`}>
                <span className="text-xl flex-shrink-0">{tip.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>{tip.tip}</div>
                  <div className={`text-xs mt-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}>{tip.reason}</div>
                </div>
                <span className="text-xs font-bold text-emerald-500 flex-shrink-0 bg-emerald-500/10 px-2 py-1 rounded-lg">→ Save {tip.save}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// BOOKING PAGE
// ══════════════════════════════════════════════════════════
export const BookingPage = () => {
  const { setCurrentPage, selectedPlan, isDarkMode } = useApp();
  const dark = isDarkMode;
  const plan = PLANS[selectedPlan];

  const LINE_ITEMS = [
    { label: "Base fare × 2 passengers", val: Math.round(plan.flight.priceTotal * 0.8) },
    { label: "Airline taxes & fees",      val: Math.round(plan.flight.priceTotal * 0.2) },
    { label: `${plan.hotel.provider} accommodation (7n)`, val: Math.round(plan.hotel.priceTotal * 0.88) },
    { label: `${plan.hotel.provider} service fee`,       val: Math.round(plan.hotel.priceTotal * 0.12) },
    { label: "TravelAI platform fee",     val: 0 },
  ];
  const total = LINE_ITEMS.reduce((s, x) => s + x.val, 0);

  const CANCEL_POLICY = [
    { icon: "✓", label: "Free",  desc: "Cancel before Apr 5 — full refund",        variant: "green" as const },
    { icon: "½", label: "50%",   desc: "Cancel Apr 5–9 — 50% flight refund",       variant: "amber" as const },
    { icon: "✕", label: "None",  desc: "Cancel after Apr 9 — no refund",           variant: "red"   as const },
    { icon: "✓", label: "Free",  desc: `${plan.hotel.name}: free cancel any time`, variant: "green" as const },
  ];

  return (
    <div className="pb-10">
      <div className="mb-6">
        <h1 className={`text-2xl md:text-3xl font-bold mb-1 ${dark ? "text-white" : "text-gray-900"}`}>
          Booking Summary 🎫
        </h1>
        <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
          Full transparency — no hidden charges, ever
        </p>
      </div>

      {/* What you're booking */}
      <motion.div {...stagger(0)} className="mb-4">
        <div className={`rounded-2xl border p-5 shadow-sm ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className={`text-sm font-bold mb-4 ${dark ? "text-white" : "text-gray-800"}`}>What you're booking</div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-2xl">✈️</span>
              <div className="flex-1">
                <div className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>{plan.flight.airline} — {plan.flight.code} · BOM → CDG</div>
                <div className={`text-xs mt-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}>Apr 11, 2025 · {plan.flight.dep} · {plan.flight.stops} · {plan.flight.duration} · Economy × 2</div>
              </div>
              <div className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>₹{plan.flight.priceTotal.toLocaleString("en-IN")}</div>
            </div>
            <div className={`h-px ${dark ? "bg-gray-800" : "bg-gray-100"}`} />
            <div className="flex items-center gap-4">
              <span className="text-2xl">🏠</span>
              <div className="flex-1">
                <div className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>{plan.hotel.name} · {plan.hotel.provider}</div>
                <div className={`text-xs mt-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}>Apr 11–18 · 7 nights · {plan.hotel.location} · ★ {plan.hotel.rating}</div>
              </div>
              <div className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>₹{plan.hotel.priceTotal.toLocaleString("en-IN")}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Price breakdown */}
      <motion.div {...stagger(1)} className="mb-4">
        <div className={`rounded-2xl border p-5 shadow-sm ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className={`text-sm font-bold mb-4 ${dark ? "text-white" : "text-gray-800"}`}>Price breakdown</div>
          <div className="space-y-3 text-sm">
            {LINE_ITEMS.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span className={dark ? "text-gray-400" : "text-gray-600"}>{item.label}</span>
                <span className={`font-semibold ${item.val === 0 ? "text-emerald-500" : dark ? "text-white" : "text-gray-900"}`}>
                  {item.val === 0 ? "Free 🎉" : `₹${item.val.toLocaleString("en-IN")}`}
                </span>
              </div>
            ))}
            <div className={`h-px my-2 ${dark ? "bg-gray-800" : "bg-gray-200"}`} />
            <div className="flex justify-between text-base font-black">
              <span className={dark ? "text-white" : "text-gray-900"}>Total</span>
              <span className="text-orange-500">₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cancellation */}
      <motion.div {...stagger(2)} className="mb-4">
        <div className={`rounded-2xl border p-5 shadow-sm ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className={`text-sm font-bold mb-4 ${dark ? "text-white" : "text-gray-800"}`}>Cancellation policy</div>
          <div className="space-y-3">
            {CANCEL_POLICY.map((p, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <Badge variant={p.variant}>{p.label}</Badge>
                <span className={dark ? "text-gray-300" : "text-gray-600"}>{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Payment */}
      <motion.div {...stagger(3)}>
        <div className={`rounded-2xl border p-5 shadow-sm ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className={`text-sm font-bold mb-4 ${dark ? "text-white" : "text-gray-800"}`}>Pay with</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {[{ label: "💳 Card ending 4821", active: true }, { label: "🏦 Net banking", active: false }].map((opt, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer font-medium text-sm transition-all ${opt.active ? "border-orange-500 bg-orange-50/50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 shadow-sm" : dark ? "border-gray-700 text-gray-400 hover:border-gray-500 hover:bg-gray-800" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                <span>{opt.label}</span>
                {opt.active && <span className="ml-auto text-orange-500 font-bold">✓</span>}
              </div>
            ))}
          </div>
          <div className={`text-xs rounded-xl px-4 py-3 mb-5 font-medium ${dark ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-emerald-50 border border-emerald-100 text-emerald-700"}`}>
            🔒 Payment processed securely via Razorpay · No card data stored on our servers
          </div>
          <BtnPrimary onClick={() => setCurrentPage("status")} className="w-full py-3 shadow-md">
            Confirm & Pay ₹{total.toLocaleString("en-IN")} →
          </BtnPrimary>
        </div>
      </motion.div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// BOOKING STATUS PAGE (FIXED FOR LIGHT MODE)
// ══════════════════════════════════════════════════════════
const STEPS = [
  { label: "Payment received",  sub: "₹62,900 debited · Apr 1, 2025 · 10:23 AM",                    status: "done"    },
  { label: "Booking confirmed", sub: "PNR: AISNK29 · e-ticket sent to sneha@email.com",             status: "done"    },
  { label: "Airline confirmed", sub: "Air India AI 131 · Seat 24A, 24B assigned",                   status: "done"    },
  { label: "Airbnb confirmation", sub: "Awaiting host confirmation · Usually within 2h",            status: "active"  },
  { label: "Check-in code",       sub: "Will be sent 24h before arrival (Apr 10)",                  status: "pending" },
];

export const BookingStatusPage = () => {
  const { isDarkMode } = useApp();
  const dark = isDarkMode;
  const completedCount = STEPS.filter(s => s.status === "done").length;
  const progress = Math.round((completedCount / STEPS.length) * 100);

  return (
    <div className="pb-10">
      <div className="mb-6">
        <h1 className={`text-2xl md:text-3xl font-bold mb-1 ${dark ? "text-white" : "text-gray-900"}`}>
          Booking Status 📡
        </h1>
        <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
          Real-time tracking of your Paris booking
        </p>
      </div>

      {/* Reference hero */}
      <motion.div {...stagger(0)} className="mb-5">
        <HeroBanner>
          <div className="p-6">
            <div className="text-xs opacity-80 text-white/80 mb-1 uppercase tracking-widest font-bold">Booking Reference</div>
            <div className="text-2xl md:text-3xl font-black text-white tracking-widest mb-1">TAI-2025-PRS</div>
            <div className="text-white/80 text-sm font-medium mb-6">Paris · Apr 11–18, 2025 · 2 travellers</div>
            
            <div className="grid grid-cols-3 gap-4">
              {[["Flight", "AI 131 BOM→CDG"], ["Accommodation", "Montmartre Airbnb"], ["Status", "In progress"]].map(([l, v]) => (
                <div key={l}>
                  <div className="text-white/60 text-[10px] uppercase tracking-widest font-bold mb-0.5">{l}</div>
                  <div className="text-white text-sm font-bold">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </HeroBanner>
      </motion.div>

      {/* Progress overview */}
      <motion.div {...stagger(1)} className="mb-5">
        <div className={`rounded-2xl border p-5 shadow-sm ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>Overall progress</span>
            <span className="text-sm font-bold text-orange-500">{progress}% complete</span>
          </div>
          <ProgressBar value={progress} />
        </div>
      </motion.div>

      {/* FIXED STEPS LIST */}
      <motion.div {...stagger(2)} className="mb-5">
        <div className={`rounded-2xl border p-2 shadow-sm ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          {STEPS.map((step, i) => (
            <div key={i}>
              <div className={`flex items-center gap-4 px-4 py-4 ${i < STEPS.length - 1 ? `border-b ${dark ? "border-gray-800" : "border-gray-100"}` : ""}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-base font-bold shadow-sm ${
                  step.status === "done"    ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" :
                  step.status === "active"  ? "bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400" :
                  dark ? "bg-gray-800 text-gray-500" : "bg-gray-100 text-gray-400"
                }`}>
                  {step.status === "done" ? "✓" : step.status === "active" ? "⟳" : "○"}
                </div>
                <div className="flex-1">
                  {/* THESE TWO LINES WERE CAUSING THE ISSUE! NOW THEY USE TEXT-GRAY-900 IN LIGHT MODE */}
                  <div className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>{step.label}</div>
                  <div className={`text-xs mt-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}>{step.sub}</div>
                </div>
                <div>
                  <Badge variant={step.status === "done" ? "green" : step.status === "active" ? "amber" : "default"}>
                    {step.status === "done" ? "Done" : step.status === "active" ? "In progress" : "Waiting"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* FIXED DOCUMENTS LIST */}
      <motion.div {...stagger(3)}>
        <div className={`rounded-2xl border p-5 shadow-sm ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className={`text-sm font-bold mb-4 ${dark ? "text-white" : "text-gray-800"}`}>Documents</div>
          <div className="space-y-3">
            {[
              { label: "✈️ E-Ticket — AI 131 (PDF)", ready: true  },
              { label: "🏠 Airbnb confirmation (PDF)", ready: false },
              { label: "📋 Travel insurance summary", ready: true  },
            ].map((doc, i) => (
              <div key={i} className={`flex items-center justify-between px-4 py-3 rounded-xl border ${dark ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-100"}`}>
                <span className={`text-sm font-medium ${dark ? "text-gray-200" : "text-gray-800"}`}>{doc.label}</span>
                {doc.ready
                  ? <button className="text-xs font-bold text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors bg-orange-500/10 px-3 py-1.5 rounded-lg">Download →</button>
                  : <span className={`text-xs font-medium px-3 py-1.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>Awaiting...</span>
                }
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};