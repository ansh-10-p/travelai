"use client";

import { motion } from "framer-motion";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopBar } from "./DashboardTopBar";
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
  const { currentPage, isSidebarOpen } = useDashboard();

  const CurrentPageComponent = pageComponents[currentPage] || DashboardHome;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Top Bar */}
        <DashboardTopBar />

        {/* Page Content */}
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto"
        >
          <div className={`p-6 md:p-8 transition-all duration-300 ${
            isSidebarOpen ? "md:ml-0" : "md:ml-0"
          }`}>
            <CurrentPageComponent />
          </div>
        </motion.main>
      </div>
    </div>
  );
};
