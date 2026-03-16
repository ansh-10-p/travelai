"use client";

import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

const travelStyles = [
  "Adventure & Outdoors",
  "Cultural Immersion",
  "Luxury & Relaxation",
  "Budget Backpacking",
  "Family Friendly",
  "Romantic Getaway",
  "Solo Exploration",
  "Food & Culinary",
];

export default function CreateTripForm({
  onGenerate,
}: {
  onGenerate?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    style: "",
    travelers: "1",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onGenerate?.();
    }, 2200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Destination */}
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          Destination
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg">🌍</span>
          <input
            className="input-field pl-10"
            placeholder="Where do you want to go?"
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            Start Date
          </label>
          <input
            type="date"
            className="input-field"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            End Date
          </label>
          <input
            type="date"
            className="input-field"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          Budget (USD)
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted font-medium text-sm">
            $
          </span>
          <input
            type="number"
            className="input-field pl-8"
            placeholder="2,500"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Travel Style */}
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          Travel Style
        </label>
        <select
          className="input-field appearance-none cursor-pointer"
          value={form.style}
          onChange={(e) => setForm({ ...form, style: e.target.value })}
          required
        >
          <option value="" disabled>
            Select your travel style
          </option>
          {travelStyles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>

      {/* Travelers */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Number of Travelers
        </label>
        <div className="flex gap-2">
          {["1", "2", "3–4", "5+"].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setForm({ ...form, travelers: n })}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                form.travelers === n
                  ? "bg-accent text-white border-accent shadow-soft"
                  : "bg-surface border-border text-text-muted hover:border-accent/40 hover:text-text"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3.5 bg-accent hover:bg-accent-dark text-white rounded-xl font-medium text-sm transition-all duration-200 shadow-soft hover:shadow-card disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Generating your itinerary…</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Generate AI Trip</span>
          </>
        )}
      </motion.button>
    </form>
  );
}
