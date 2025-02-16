"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { cn } from "~/lib/utils";
import { Menu, X } from "lucide-react";
// import { RoleToggler } from "./role-toggler";
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
import { type CompleteThemeConfig, type CompleteUIConfig } from "~/server/db/schema";
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
  // {
  //   title: "Theme Settings",
  //   href: "/theme-config",
  //   icon: <Palette className="h-5 w-5" />,
  // },
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

interface SidebarNavProps {
  uiConfig: CompleteUIConfig;
  themeConfig: CompleteThemeConfig;
}

export function SidebarNav({uiConfig ,themeConfig }:SidebarNavProps) {

  const pathname = usePathname();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleDarkMode = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const colors = isDark ? themeConfig.darkTheme : themeConfig.lightTheme;

  // Get padding based on density
  const getDensityPadding = () => {
    switch (uiConfig.layoutDensity) {
      case "compact":
        return "0.5rem";
      case "spacious":
        return "1.5rem";
      default: // comfortable
        return "1rem";
    }
  };

  // Get transition timing
  const getTransitionTiming = () => {
    switch (uiConfig.animationSpeed) {
      case "slower":
        return "0.4s";
      case "faster":
        return "0.1s";
      default: // default
        return "0.2s";
    }
  };

  const sidebarStyle = {
    backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
    borderRadius: uiConfig.layoutBorderRadius,
    fontSize: uiConfig.baseFontSize,
    padding: getDensityPadding(),
    transition: `all ${getTransitionTiming()} ease-in-out`,
    width: `${uiConfig.sidebarWidth}px`,
  } as React.CSSProperties;

  return (
    <div style={{ width: `${uiConfig.sidebarWidth}px` }}>
s              {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center text-white shadow-lg hover:opacity-90 md:hidden"
        style={{
          backgroundColor: colors.primary,
          borderRadius: uiConfig.layoutBorderRadius,
          transition: `all ${getTransitionTiming()} ease-in-out`,
        }}
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
            "relative flex h-full flex-col shadow-xl md:shadow-none",
            styles.sidebarWrapper,
          )}
          style={{
            ...sidebarStyle,
            backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
            color: isDark ? "#ffffff" : "#000000",
          }}
        >
          <div className="relative mb-8 mt-16 md:mt-0">
            <div className="flex items-center gap-2 px-2 transition-all duration-200">
              {uiConfig.sidebarLogo ? (
                <img
                  src={uiConfig.sidebarLogo.value}
                  alt="Sidebar Logo"
                  className="h-6 w-6 object-contain"
                />
              ) : (
                <Building2 className="h-6 w-6" />
              )}
              <span className="text-lg font-semibold">
                {uiConfig.sidebarTitle}
              </span>
            </div>
          </div>
          <div className="flex h-16 items-center justify-end gap-4 p-4">
              <SignedOut>
                <Link
                  href="/login"
                className={cn(
                  "px-4 py-2 text-sm font-medium bg-white/10 hover:bg-white/20",
                  isDark ? "text-white" : "text-black"
                )}
                style={{
                  borderRadius: uiConfig.layoutBorderRadius,
                  transition: `all ${getTransitionTiming()} ease-in-out`,
                }}
                >
                  Sign In / Sign Up
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          <div className="space-y-1 transition-all duration-200">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm hover:bg-black/20",
                    isActive && "bg-black/20"
                  )}
                  style={{
                    borderRadius: uiConfig.layoutBorderRadius,
                    transition: `all ${getTransitionTiming()} ease-in-out`,
                  }}
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
              className="flex w-full items-center gap-3 px-3 py-2 text-sm hover:bg-black/20"
              style={{
                borderRadius: uiConfig.layoutBorderRadius,
                transition: `all ${getTransitionTiming()} ease-in-out`,
              }}
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

          </div>
        </nav>
      </div>
    </div>
  );
}
