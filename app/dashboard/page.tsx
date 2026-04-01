"use client";

import { AppProvider, useApp } from "@/components/travel/AppContext";
import { AppLayout }    from "@/components/travel/Applayout";
 

export default function DashboardPage() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}
