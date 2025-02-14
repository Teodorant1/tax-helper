"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { cn } from "~/lib/utils";
import { Menu, X } from "lucide-react";
// import { RoleToggler } from "./role-toggler";
import { useUISettings } from "~/store/ui-settings";
import { useTheme } from "~/store/theme";
import {
  LayoutDashboard,
  Bell,
  Users,
  Settings,
  HelpCircle,
  Building2,
  Sun,
  Moon,
  FileText,
  TrendingUp,
  Target,
  Palette,
  Sliders,
} from "lucide-react";
import styles from "~/styles/ui-settings.module.css";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { OrganizationSwitcher } from "./organization-switcher/organization-switcher";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Alerts",
    href: "/alerts",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Clients",
    href: "/clients",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Data",
    href: "/data",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "ERC Tracker",
    href: "/erc-tracker",
    icon: <Target className="h-5 w-5" />,
  },
  {
    title: "Tax History",
    href: "/tax-history",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    title: "Permissions",
    href: "/permissions",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Theme Settings",
    href: "/theme-config",
    icon: <Palette className="h-5 w-5" />,
  },
  {
    title: "UI Settings",
    href: "/ui-settings",
    icon: <Sliders className="h-5 w-5" />,
  },
  {
    title: "Support",
    href: "/support",
    icon: <HelpCircle className="h-5 w-5" />,
  },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { isDark, toggleDarkMode } = useTheme();
  const { settings } = useUISettings();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Apply theme colors
  const sidebarStyle = {
    "--sidebar-bg": isDark ? "#1f2937" : "#f3f4f6",
    "--sidebar-hover": isDark ? "#374151" : "#e5e7eb",
    backgroundColor: "var(--sidebar-bg)",
    transition: "all var(--ui-animation-speed) ease-in-out",
  } as React.CSSProperties;

  return (
    <div className="w-full md:w-[20%] lg:w-[16%] xl:w-[14%]">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-lg transition-all duration-200 hover:bg-primary/90 md:hidden"
        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileOpen}
        aria-controls="mobile-nav"
      >
        {isMobileOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out md:translate-x-0",
          !isMobileOpen && "-translate-x-full",
        )}
        id="mobile-nav"
        role="navigation"
        aria-label="Main navigation"
      >
        <nav
          className={cn(
            "relative flex h-full flex-col p-0 text-white shadow-xl md:p-[var(--ui-layout-spacing)] md:shadow-none",
            styles.sidebarWrapper,
          )}
          style={{
            ...sidebarStyle,
            backgroundColor: "var(--sidebar-bg)",
          }}
        >
          <div className="relative mb-8 mt-16 md:mt-0">
            <div className="flex items-center gap-2 px-2 transition-all duration-200">
              {settings.sidebarLogoId ? (
                <img
                  src={`/api/logos/${settings.sidebarLogoId}`}
                  alt="Sidebar Logo"
                  className="h-6 w-6 object-contain"
                />
              ) : (
                <Building2 className="h-6 w-6" />
              )}
              <span className="text-lg font-semibold">
                {settings.sidebarTitle}
              </span>
            </div>
          </div>
          <div className="space-y-1 transition-all duration-200">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-black/20",
                    isActive && "bg-black/20",
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              );
            })}
          </div>
          <div className="relative mt-auto space-y-4 transition-all duration-200">
            {/* <RoleToggler /> */}
            <button
              onClick={toggleDarkMode}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-black/20"
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? (
                <>
                  <Sun className="h-5 w-5" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5" />
                  Dark Mode
                </>
              )}
            </button>
            <div className="relative">
              <OrganizationSwitcher />
            </div>
            <div className="flex h-16 items-center justify-end gap-4 p-4">
              <SignedOut>
                <Link
                  href="/login"
                  className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
                >
                  Sign In / Sign Up
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
