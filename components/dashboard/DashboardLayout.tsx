"use client";

import { motion } from "framer-motion";
import { DashboardNavbar } from "./DashboardNavbar";
import { useDashboard } from "./DashboardContext";

// Import all page components
import { DashboardHome } from "./pages/DashboardHome";
import { MyTripsPage } from "./pages/MyTripsPage";
import { BookingsPage } from "./pages/BookingsPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { MessagesPage } from "./pages/MessagesPage";
import { WishlistPage } from "./pages/WishlistPage";
import { ProfilePage } from "./pages/ProfilePage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { SettingsPage } from "./pages/SettingsPage";

const pageComponents: Record<string, React.ComponentType> = {
  home: DashboardHome,
  trips: MyTripsPage,
  bookings: BookingsPage,
  analytics: AnalyticsPage,
  messages: MessagesPage,
  wishlist: WishlistPage,
  profile: ProfilePage,
  notifications: NotificationsPage,
  settings: SettingsPage,
};

export const DashboardLayout = () => {
  const { currentPage, isDarkMode } = useDashboard();

  const CurrentPageComponent = pageComponents[currentPage] || DashboardHome;
  const bgClass = isDarkMode ? "bg-gray-950" : "bg-gray-50";

  return (
    <div className={`flex flex-col h-screen ${bgClass} transition-colors duration-300`}>
      {/* Navbar */}
      <DashboardNavbar />

      {/* Page Content */}
      <motion.main
        key={currentPage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-transparent"
      >
        <div className="p-6 md:p-8">
          <CurrentPageComponent />
        </div>
      </motion.main>
    </div>
  );
};
