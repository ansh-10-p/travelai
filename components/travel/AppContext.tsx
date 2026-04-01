"use client";

/**
 * AppContext.tsx
 * ─────────────────────────────────────────────────────────────────
 * Single unified context for the entire TravelAI app.
 * Replaces both DashboardContext.tsx and TravelContext.tsx.
 *
 * Usage:
 *   import { AppProvider, useApp } from './AppContext';
 *
 * Then in any page:
 *   const { currentPage, setCurrentPage, isDarkMode } = useApp();
 */

import React, { createContext, useContext, useState } from "react";

// ─── All page IDs in the app ───────────────────────────────────────
export type PageId =
  // Dashboard
  | "home"
  // AI Planning Flow
  | "search" | "optimize" | "compare" | "recommend"
  // Book & Track
  | "booking" | "status"
  // Travel
  | "itinerary" | "budget" | "collab" | "assistant"
  // My Trips section (original dashboard pages)
  | "trips" | "bookings" | "wishlist" | "analytics" | "messages"
  // Account
  | "profile" | "notifications" | "settings";

// ─── Context shape ────────────────────────────────────────────────
interface AppContextType {
  // Navigation
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;

  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Search parameters (shared across planning flow)
  searchParams: {
    from: string;
    to: string;
    departDate: string;
    returnDate: string;
    travelers: number;
    budget: number;
    tripType: string;
  };
  setSearchParams: (params: Partial<AppContextType["searchParams"]>) => void;

  // Selected options (shared between Compare → Recommend → Booking)
  selectedFlight: number;   // flight id (1 = Air India, 2 = IndiGo, 3 = Emirates)
  setSelectedFlight: (id: number) => void;

  selectedHotel: number;    // hotel id (1 = Airbnb, 2 = Ibis, 3 = Le Marais)
  setSelectedHotel: (id: number) => void;

  selectedPlan: "smart" | "budget" | "premium";
  setSelectedPlan: (plan: "smart" | "budget" | "premium") => void;
}

// ─── Context ──────────────────────────────────────────────────────
const AppContext = createContext<AppContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<"smart" | "budget" | "premium">("smart");
  const [searchParams, setSearchParamsState] = useState({
    from: "Mumbai (BOM)",
    to: "Paris (CDG)",
    departDate: "2025-04-11",
    returnDate: "2025-04-18",
    travelers: 2,
    budget: 80000,
    tripType: "Leisure",
  });

  const setSearchParams = (partial: Partial<AppContextType["searchParams"]>) =>
    setSearchParamsState(prev => ({ ...prev, ...partial }));

  return (
    <AppContext.Provider value={{
      currentPage, setCurrentPage,
      isDarkMode, toggleDarkMode: () => setIsDarkMode(d => !d),
      searchParams, setSearchParams,
      selectedFlight, setSelectedFlight,
      selectedHotel, setSelectedHotel,
      selectedPlan, setSelectedPlan,
    }}>
      {children}
    </AppContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────
export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

// ─── Backward-compatibility aliases ───────────────────────────────
// These let existing pages that import `useDashboard` or `useTravel` work
// without any changes, as long as they're inside <AppProvider>.
export const useDashboard = useApp;   // alias for old dashboard pages
export const useTravel    = useApp;   // alias for old travel pages