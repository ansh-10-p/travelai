"use client";

import React, { createContext, useContext, useState } from "react";

interface DashboardContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <DashboardContext.Provider value={{ currentPage, setCurrentPage, isDarkMode, toggleDarkMode }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
};
