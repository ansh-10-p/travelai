"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  Map,
  Compass,
  Bookmark,
  Settings,
  Compass as Logo,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Create Trip", href: "/create-trip", icon: PlusCircle },
  { label: "My Trips", href: "/dashboard", icon: Map },
  { label: "Explore", href: "/", icon: Compass },
  { label: "Saved", href: "/dashboard", icon: Bookmark },
  { label: "Settings", href: "/dashboard", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen sticky top-0 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shadow-soft">
            <Logo className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
          <span className="font-heading font-semibold text-lg text-text tracking-tight">
            Travel<span className="text-accent">AI</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                active
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "text-text-muted hover:bg-surface hover:text-text"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 flex-shrink-0",
                  active ? "text-accent" : "text-text-muted"
                )}
                strokeWidth={active ? 2.25 : 1.75}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border space-y-1">
        {/* User avatar */}
        <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl mb-1">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold text-accent">T</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text truncate">Traveler</p>
            <p className="text-xs text-text-muted truncate">traveler@email.com</p>
          </div>
        </div>
        <Link
          href="/login"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:bg-surface hover:text-text transition-all duration-200"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.75} />
          Sign out
        </Link>
      </div>
    </aside>
  );
}
