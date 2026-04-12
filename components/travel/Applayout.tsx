"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useApp, type PageId } from "./AppContext";

// ── All 19 pages ─────────────────────────────────────────────────
import { AuthPage }              from "../auth/AuthPage";
import { DashboardHome }         from "../dashboard/pages/DashboardHome";
// AI Planning flow
import { SearchPage }            from "../dashboard/pages/Searchpage";
import { AIOptimizePage }        from "../dashboard/pages/Aioptimizepage";
import { ComparePage }           from "../dashboard/pages/Comparepage";
import { RecommendPage }         from "../dashboard/pages/Recommendpage";
// Book & Track
import { BookingsPage}           from "../dashboard/pages/BookingsPage";
import { BookingStatusPage }     from "../dashboard/pages/Recommendbookingstatus";
// Travel tools
import { ItineraryPage }         from "../dashboard/pages/Itinerarybudgetpages";
import { BudgetTrackerPage }     from "../dashboard/pages/BudgetTrackerPage";
import { CollabChatPage }        from "../dashboard/pages/Collabchatpage"; 
import { AIAssistantPage }       from "../dashboard/pages/Aiassistantpage";
// My Trips
import { MyTripsPage }           from "../dashboard/pages/MyTripsPage";
import { WishlistPage }          from "../dashboard/pages/WishlistPage";
import { AnalyticsPage }         from "../dashboard/pages/AnalyticsPage";
import { MessagesPage }          from "../dashboard/pages/MessagesPage";
// Account (Rendered via Topbar now)
import { ProfilePage }           from "../dashboard/pages/ProfilePage";
import { NotificationsPage }     from "../dashboard/pages/NotificationsPage";
import { SettingsPage }          from "../dashboard/pages/SettingsPage";

// ── Page registry ─────────────────────────────────────────────────
const PAGES: Record<PageId, React.ComponentType> = {
  auth:          AuthPage,
  home:          DashboardHome,
  search:        SearchPage,
  optimize:      AIOptimizePage,
  compare:       ComparePage,
  recommend:     RecommendPage,
  booking:       BookingsPage,
  status:        BookingStatusPage,
  itinerary:     ItineraryPage,
  budget:        BudgetTrackerPage,
  collab:        CollabChatPage,
  assistant:     AIAssistantPage,
  trips:         MyTripsPage,
  bookings:      BookingsPage,
  wishlist:      WishlistPage,
  analytics:     AnalyticsPage,
  messages:      MessagesPage,
  profile:       ProfilePage,
  notifications: NotificationsPage,
  settings:      SettingsPage,
};

// ── Icon helper ────────────────────────────────────────────────────
const I = ({ d }: { d: string }) => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ICON: Record<string, string> = {
  auth:          "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  home:          "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  search:        "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",
  optimize:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  compare:       "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 0-2-2V9m0 0h18",
  recommend:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  booking:       "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01",
  status:        "M22 12h-4l-3 9L9 3l-3 9H2",
  itinerary:     "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  budget:        "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  collab:        "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  assistant:     "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z M12 8v4 M12 16h.01",
  trips:         "M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z",
  bookings:      "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z",
  analytics:     "M18 20V10 M12 20V4 M6 20v-6",
  messages:      "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  wishlist:      "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  notifications: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
};

// ── Navigation structure (Removed Account Section) ─────────────────
type NavItem = { id: PageId; label: string; icon: string; badge?: string };
type NavSection = { title: string; items: NavItem[] };

const SIDEBAR_NAV: NavSection[] = [
  {
    title: "Overview",
    items: [
      { id: "home",      label: "Dashboard",    icon: "home" },
    ],
  },
  {
    title: "Plan a Trip",
    items: [
      { id: "search",    label: "Search",       icon: "search" },
      { id: "optimize",  label: "AI Optimize",  icon: "optimize",  badge: "AI" },
      { id: "compare",   label: "Compare",      icon: "compare" },
      { id: "recommend", label: "Recommend",    icon: "recommend", badge: "AI" },
    ],
  },
  {
    title: "Book & Track",
    items: [
      { id: "booking",   label: "Booking",      icon: "booking" },
      { id: "status",    label: "Status",       icon: "status" },
    ],
  },
  {
    title: "Travel Tools",
    items: [
      { id: "itinerary", label: "Itinerary",    icon: "itinerary" },
      { id: "budget",    label: "Budget",       icon: "budget" },
      { id: "collab",    label: "Group Chat",   icon: "collab" },
      { id: "assistant", label: "AI Assistant", icon: "assistant", badge: "AI" },
    ],
  },
  {
    title: "My Trips",
    items: [
      { id: "trips",     label: "All Trips",    icon: "trips" },
      { id: "bookings",  label: "Bookings",     icon: "bookings" },
      { id: "wishlist",  label: "Wishlist",     icon: "wishlist" },
      { id: "analytics", label: "Analytics",    icon: "analytics" },
      { id: "messages",  label: "Messages",     icon: "messages",  badge: "3" },
    ],
  }
];

export const AppLayout = () => {
  const { currentPage, setCurrentPage, isDarkMode, toggleDarkMode, user, setUser } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const logoutMenuRef = React.useRef<HTMLDivElement>(null);

  const bg       = isDarkMode ? "bg-gray-950" : "bg-gray-50";
  const surface  = isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
  
  // Close logout menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (logoutMenuRef.current && !logoutMenuRef.current.contains(event.target as Node)) {
        setShowLogoutConfirm(false);
      }
    };

    if (showLogoutConfirm) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showLogoutConfirm]);

  // If not authenticated, show auth page full screen
  if (!user || currentPage === "auth") {
    return <AuthPage />;
  }
  
  const sideBtn  = (active: boolean) =>
    `w-full flex items-center ${isSidebarOpen ? "gap-3 px-3" : "justify-center px-0"} py-2.5 rounded-xl text-sm font-medium mb-1 transition-all ${
      active
        ? isDarkMode
          ? "bg-gradient-to-r from-orange-500/15 to-pink-500/10 text-orange-400"
          : "bg-gradient-to-r from-orange-50 to-pink-50 text-orange-600 border border-orange-100 shadow-sm"
        : isDarkMode
          ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
    }`;

  const CurrentPage = PAGES[currentPage] ?? DashboardHome;

  return (
    <div className={`flex flex-col h-screen overflow-hidden ${bg} transition-colors duration-300`}>

      {/* ══════════════════════════════ TOP NAVBAR ══════════════════════════════ */}
      <header className={`flex items-center gap-4 px-5 py-3 border-b ${surface} flex-shrink-0 z-20 shadow-sm`}>

        {/* App Logo */}
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentPage("home")} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
              T
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent hidden sm:block">
              TravelAI
            </span>
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Global Controls (Search, Theme, Notifications, Profile) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search bar */}
          <button
            onClick={() => setCurrentPage("search")}
            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border text-sm ${
              isDarkMode ? "border-gray-700 bg-gray-800 text-gray-400" : "border-gray-200 bg-gray-100/50 text-gray-500"
            } transition-colors hover:border-orange-300`}
          >
            <I d={ICON.search} />
            Search trips...
            <span className={`text-[10px] px-1.5 py-0.5 rounded ml-4 ${isDarkMode ? "bg-gray-700 text-gray-500" : "bg-gray-200 text-gray-400"}`}>
              ⌘K
            </span>
          </button>

          {/* Dark mode */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-xl transition-colors text-lg ${
              isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
            title={isDarkMode ? "Light mode" : "Dark mode"}
          >
            {isDarkMode ? (
              <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24" stroke="currentColor" strokeWidth="2"/>
              </svg>
            ) : (
              <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Notifications */}
          <button
            onClick={() => setCurrentPage("notifications")}
            className={`relative p-2 rounded-xl transition-colors ${
              isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d={ICON.notifications} />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white dark:border-gray-900" />
          </button>

          {/* Avatar Profile with Logout */}
          <div className="relative" ref={logoutMenuRef}>
            <button
              onClick={() => setShowLogoutConfirm(!showLogoutConfirm)}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-md flex-shrink-0 ml-1 hover:opacity-90 transition-opacity"
              title={user?.name}
            >
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </button>
            
            {/* Logout Dropdown */}
            {showLogoutConfirm && (
              <div className={`absolute right-0 top-full mt-2 rounded-xl border shadow-lg p-3 z-50 min-w-max ${surface}`}>
                <div className={`text-sm mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-xs">{user?.email}</p>
                </div>
                <button
                  onClick={() => setCurrentPage("profile")}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors mb-1 ${
                    isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  View Profile
                </button>
                <button
                  onClick={() => {
                    setUser(null);
                    setShowLogoutConfirm(false);
                  }}
                  className="w-full text-left text-sm px-3 py-2 rounded-lg transition-colors text-red-500 hover:bg-red-500/10"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ══════════════════════════════ BODY ══════════════════════════════ */}
      <div className="flex flex-1 overflow-hidden">

        {/* ══ SIDEBAR ══ */}
        <aside 
          className={`flex-shrink-0 border-r ${surface} flex flex-col transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "w-60" : "w-16"
          }`}
        >
          <div className="overflow-y-auto flex-1 p-3">
            <nav>
              {SIDEBAR_NAV.map((section, idx) => (
                <div key={section.title} className={`${idx !== 0 ? "mt-6" : ""} mb-2`}>
                  
                  {/* Section Title (Hidden when collapsed) */}
                  <div className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 transition-opacity duration-200 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  } ${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}>
                    {section.title}
                  </div>

                  {/* Section Divider (Shown when collapsed) */}
                  {!isSidebarOpen && idx !== 0 && (
                    <div className={`h-px w-8 mx-auto mb-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`} />
                  )}

                  {section.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentPage(item.id)}
                      className={sideBtn(currentPage === item.id)}
                      title={!isSidebarOpen ? item.label : undefined}
                    >
                      <div className="flex-shrink-0">
                        <I d={ICON[item.icon] || ICON.home} />
                      </div>
                      
                      {isSidebarOpen && (
                        <>
                          <span className="flex-1 truncate text-left">{item.label}</span>
                          {item.badge && (
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 ${
                              item.badge === "AI"
                                ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white"
                                : "bg-orange-500 text-white"
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </nav>
          </div>

          {/* ══ BOTTOM SIDEBAR TOGGLE ══ */}
          <div className={`p-3 border-t ${isDarkMode ? "border-gray-800" : "border-gray-100"}`}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`w-full flex items-center ${isSidebarOpen ? "justify-between px-3" : "justify-center px-0"} py-2.5 rounded-xl text-sm font-medium transition-all ${
                isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {isSidebarOpen && <span>Collapse</span>}
              <svg 
                width={18} 
                height={18} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth={2.5} 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`transform transition-transform duration-300 ${!isSidebarOpen ? "rotate-180" : ""}`}
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          </div>
        </aside>

        {/* ══ PAGE CONTENT ══ */}
        <main className="flex-1 overflow-y-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="p-6 md:p-8 max-w-6xl mx-auto min-h-full"
            >
              <CurrentPage />
            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
};