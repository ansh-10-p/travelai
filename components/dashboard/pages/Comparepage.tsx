"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from '../../travel/AppContext';
import { BtnPrimary, Btn, Badge, Pill, stagger, FLIGHTS, HOTELS } from "../../ui/ui";

type Tab = "flights" | "hotels";
type Sort = "cheapest" | "fastest" | "best";

const STARS = (r: number) => "★".repeat(Math.floor(r)) + "☆".repeat(5 - Math.floor(r));

export const ComparePage = () => {
  const { setCurrentPage, selectedFlight, setSelectedFlight, selectedHotel, setSelectedHotel, isDarkMode } = useApp();
  const dark = isDarkMode;
  const [tab, setTab] = useState<Tab>("flights");
  const [sort, setSort] = useState<Sort>("best");

  const sortedFlights = [...FLIGHTS].sort((a, b) =>
    sort === "cheapest" ? a.price - b.price :
    sort === "fastest"  ? a.duration.localeCompare(b.duration) :
    b.rating - a.rating
  );
  const sortedHotels = [...HOTELS].sort((a, b) =>
    sort === "cheapest" ? a.priceNight - b.priceNight :
    sort === "fastest"  ? 0 :
    b.rating - a.rating
  );

  const row = (selected: boolean) =>
    `flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
      selected
        ? "border-orange-400 bg-orange-50 dark:bg-orange-500/10 shadow-sm"
        : dark ? "border-gray-800 hover:border-gray-700 bg-gray-900/50 hover:bg-gray-800/80" : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"
    }`;

  return (
    <div className="pb-10">
      {/* ── FIXED HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-1 ${dark ? "text-white" : "text-gray-900"}`}>
            Compare Options
          </h1>
          <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
            All flights and hotels side-by-side with full pricing
          </p>
        </div>
        <BtnPrimary onClick={() => setCurrentPage("recommend")} className="shadow-md">
          View recommendation →
        </BtnPrimary>
      </div>

      {/* Tab + sort row */}
      <motion.div {...stagger(0)} className="flex items-center gap-2 mb-5 flex-wrap">
        <Pill label="Flights" active={tab === "flights"} onClick={() => setTab("flights")} />
        <Pill label="Hotels"  active={tab === "hotels"}  onClick={() => setTab("hotels")}  />
        <div className="flex-1" />
        <Pill label="Cheapest"   active={sort === "cheapest"} onClick={() => setSort("cheapest")} />
        <Pill label="Fastest"    active={sort === "fastest"}  onClick={() => setSort("fastest")}  />
        <Pill label="Best value" active={sort === "best"}     onClick={() => setSort("best")}     />
      </motion.div>

      {/* FLIGHTS */}
      {tab === "flights" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {sortedFlights.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              onClick={() => setSelectedFlight(f.id)}
              className={row(selectedFlight === f.id)}
            >
              {/* Logo */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 ${f.color}`}>
                {f.logo}
              </div>
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>{f.airline}</span>
                  <Badge variant={f.tag === "best value" ? "green" : f.tag === "cheapest" ? "amber" : "pink"}>{f.tag}</Badge>
                </div>
                <div className={`text-xs mt-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                  {f.dep} → {f.arr} · {f.duration} · {f.stops}
                </div>
                <div className="text-xs text-amber-500 mt-0.5">
                  {STARS(f.rating)} <span className={`ml-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>{f.rating}</span>
                </div>
              </div>
              
              {/* Price */}
              <div className="text-right flex-shrink-0">
                <div className={`text-base font-bold ${dark ? "text-white" : "text-gray-900"}`}>
                  ₹{f.price.toLocaleString("en-IN")}
                </div>
                <div className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>per person</div>
                <div className="text-xs text-orange-500 font-bold mt-0.5">
                  ₹{f.priceTotal.toLocaleString("en-IN")} total
                </div>
              </div>
              
              {/* Checkmark */}
              <div className="w-6 flex justify-end">
                {selectedFlight === f.id && (
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-xs shadow-sm">
                    ✓
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* FIXED: Selected flight detail card */}
          <div className={`mt-6 p-5 rounded-2xl border shadow-sm ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className={`text-sm font-bold mb-4 ${dark ? "text-white" : "text-gray-800"}`}>
              Selected flight details
            </div>
            {(() => {
              const f = FLIGHTS.find(x => x.id === selectedFlight) || FLIGHTS[0];
              return (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                  {[["Departure", f.dep], ["Arrival", f.arr], ["Duration", f.duration], ["Baggage", "23kg incl."]].map(([l, v]) => (
                    <div key={l} className={`rounded-xl p-3 ${dark ? "bg-gray-800/60" : "bg-gray-50 border border-gray-100"}`}>
                      <div className={`text-xs mb-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>{l}</div>
                      <div className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>{v}</div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </motion.div>
      )}

      {/* HOTELS */}
      {tab === "hotels" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {sortedHotels.map((h, i) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              onClick={() => setSelectedHotel(h.id)}
              className={row(selectedHotel === h.id)}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 ${h.color}`}>
                {h.logo}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>{h.name}</span>
                  <Badge variant={h.tag === "best value" ? "green" : h.tag === "cheapest" ? "amber" : "pink"}>{h.tag}</Badge>
                </div>
                <div className={`text-xs mt-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                  {h.provider} · {h.location}
                </div>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  {h.amenities.map(a => (
                    <span key={a} className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${dark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"}`}>
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-right flex-shrink-0">
                <div className={`text-base font-bold ${dark ? "text-white" : "text-gray-900"}`}>
                  ₹{h.priceNight.toLocaleString("en-IN")}
                </div>
                <div className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>per night</div>
                <div className="text-xs text-orange-500 font-bold mt-0.5">
                  ₹{h.priceTotal.toLocaleString("en-IN")} total
                </div>
              </div>

              {/* Checkmark */}
              <div className="w-6 flex justify-end">
                {selectedHotel === h.id && (
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-xs shadow-sm">
                    ✓
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <BtnPrimary onClick={() => setCurrentPage("recommend")} className="flex-1 shadow-md">
          View AI recommendation →
        </BtnPrimary>
        <Btn onClick={() => setCurrentPage("booking")} className="flex-1 border-gray-300 dark:border-gray-700">
          Book selected →
        </Btn>
      </div>
    </div>
  );
};