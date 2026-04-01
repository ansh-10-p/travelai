// ─── Shared UI primitives ─────────────────────────────────────────────────────

import { motion } from "framer-motion";

export const GRAD = "bg-gradient-to-r from-orange-500 to-pink-500";
export const GRAD_TEXT = "bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent";

export const stagger = (i: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
});

// Card wrapper
export const Card = ({
  children, className = "", accent = false, onClick,
}: { children: React.ReactNode; className?: string; accent?: boolean; onClick?: () => void }) => {
  const base = `rounded-2xl border transition-shadow ${accent ? "border-orange-400/60 shadow-orange-100" : "border-gray-100 dark:border-gray-800"}`;
  const bg = "bg-white dark:bg-gray-900";
  return onClick ? (
    <motion.div whileHover={{ y: -2 }} onClick={onClick} className={`${base} ${bg} p-5 cursor-pointer hover:shadow-lg ${className}`}>
      {children}
    </motion.div>
  ) : (
    <div className={`${base} ${bg} p-5 ${className}`}>{children}</div>
  );
};

// Gradient hero banner
export const HeroBanner = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative overflow-hidden rounded-3xl p-6 md:p-8 ${className}`}
    style={{ background: "linear-gradient(135deg,#0f0f1a 0%,#1e0d2e 45%,#2d0f08 100%)" }}
  >
    <div className="absolute top-0 left-1/3 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
    <div className="relative z-10 text-white">{children}</div>
  </div>
);

// Badge
export const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "green" | "amber" | "red" | "pink" | "blue" }) => {
  const v = {
    default: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    green:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
    amber:   "bg-amber-100   text-amber-700   dark:bg-amber-900/40   dark:text-amber-400",
    red:     "bg-red-100     text-red-600     dark:bg-red-900/40     dark:text-red-400",
    pink:    "bg-pink-100    text-pink-700    dark:bg-pink-900/40    dark:text-pink-400",
    blue:    "bg-blue-100    text-blue-700    dark:bg-blue-900/40    dark:text-blue-400",
  }[variant];
  return <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${v}`}>{children}</span>;
};

// Primary button
export const BtnPrimary = ({ children, onClick, className = "", disabled = false }: { children: React.ReactNode; onClick?: () => void; className?: string; disabled?: boolean }) => (
  <motion.button
    whileHover={disabled ? {} : { scale: 1.02 }}
    whileTap={disabled ? {} : { scale: 0.97 }}
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 text-sm transition-opacity ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
  >
    {children}
  </motion.button>
);

// Secondary button
export const Btn = ({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <motion.button
    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium px-4 py-2.5 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${className}`}
  >
    {children}
  </motion.button>
);

// Animated progress bar
export const ProgressBar = ({ value, className = "" }: { value: number; className?: string }) => (
  <div className={`h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden ${className}`}>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${Math.min(value, 100)}%` }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="h-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500"
    />
  </div>
);

// Pill filter
export const Pill = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
      active
        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-transparent shadow-md"
        : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
    }`}
  >
    {label}
  </button>
);

// Section header
export const SectionHeader = ({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) => (
  <div className="flex items-start justify-between mb-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
      {sub && <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>}
    </div>
    {action}
  </div>
);

// Divider
export const Divider = ({ className = "" }: { className?: string }) => (
  <div className={`h-px bg-gray-100 dark:bg-gray-800 ${className}`} />
);

// Stat tile
export const StatTile = ({ label, value, color = "from-orange-400 to-pink-500" }: { label: string; value: string; color?: string }) => (
  <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-4">
    <div className={`text-xl font-black bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{value}</div>
    <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{label}</div>
  </div>
);

// Toggle switch
export const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`w-10 h-5 rounded-full relative flex-shrink-0 transition-all ${on ? "bg-gradient-to-r from-orange-500 to-pink-500" : "bg-gray-200 dark:bg-gray-700"}`}
  >
    <motion.div
      animate={{ x: on ? 20 : 2 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
    />
  </button>
);

// ─── Shared Data ──────────────────────────────────────────────────────────────
export const FLIGHTS = [
  { id: 1, airline: "Air India",  code: "AI",  logo: "AI", price: 17800, priceTotal: 35600, duration: "8h 30m", stops: "Non-stop", rating: 4.4, tag: "best value", dep: "02:15", arr: "08:45", color: "bg-red-100 text-red-700" },
  { id: 2, airline: "IndiGo",     code: "6E",  logo: "6E", price: 14200, priceTotal: 28400, duration: "9h 15m", stops: "1 stop · DXB", rating: 4.1, tag: "cheapest",   dep: "04:00", arr: "12:15", color: "bg-blue-100 text-blue-700" },
  { id: 3, airline: "Emirates",   code: "EK",  logo: "EK", price: 22500, priceTotal: 45000, duration: "9h 45m", stops: "1 stop · DXB", rating: 4.8, tag: "premium",    dep: "23:55", arr: "10:40", color: "bg-purple-100 text-purple-700" },
];

export const HOTELS = [
  { id: 1, name: "Montmartre Studio",  provider: "Airbnb",      logo: "Ab", priceNight: 3900, priceTotal: 27300, rating: 4.7, tag: "best value", location: "Paris 18th", amenities: ["Free cancel", "Self check-in", "Studio"], color: "bg-rose-100 text-rose-700" },
  { id: 2, name: "Ibis Paris Centre",  provider: "Booking.com",  logo: "Bk", priceNight: 3200, priceTotal: 22400, rating: 4.0, tag: "cheapest",   location: "Paris 10th", amenities: ["Breakfast opt.", "24h reception"], color: "bg-blue-100 text-blue-700" },
  { id: 3, name: "Le Marais Boutique", provider: "Hotels.com",   logo: "Ht", priceNight: 5800, priceTotal: 40600, rating: 4.6, tag: "luxury",     location: "Paris 4th",  amenities: ["Rooftop terrace", "Concierge", "Bar"], color: "bg-violet-100 text-violet-700" },
];

export const PLANS = {
  smart:   { label: "Smart Plan",   emoji: "⚡", total: 72500, savings: 7500,  flight: FLIGHTS[0], hotel: HOTELS[0],  food: 11900, why: "Non-stop Air India + 4.7★ Airbnb = max comfort within budget. Free cancellation on both.", color: "from-orange-500 to-pink-500" },
  budget:  { label: "Budget Plan",  emoji: "💰", total: 58400, savings: 21600, flight: FLIGHTS[1], hotel: HOTELS[1],  food:  9000, why: "Cheapest flight + cheapest hotel. Saves ₹21,600 — ideal if flexibility matters more than comfort.", color: "from-emerald-500 to-teal-500" },
  premium: { label: "Premium Plan", emoji: "✨", total: 88900, savings: -8900, flight: FLIGHTS[2], hotel: HOTELS[2],  food: 18000, why: "Emirates business + Le Marais boutique. ₹8,900 over budget but exceptional experience.", color: "from-violet-500 to-fuchsia-500" },
};

export const AI_TIPS = [
  { icon: "📅", tip: "Shift dates to Apr 14–21",       save: "₹5,000", reason: "Midweek flights are cheaper" },
  { icon: "🍽️", tip: "Dine near Bastille, not Marais", save: "₹2,200", reason: "Same food, 40% lower prices" },
  { icon: "🎟️", tip: "Buy a Museum Pass (5 days)",     save: "₹1,800", reason: "Louvre + Orsay + Versailles bundled" },
  { icon: "🚇", tip: "Get a weekly Navigo pass",        save: "₹600",   reason: "Unlimited metro for 7 days" },
];