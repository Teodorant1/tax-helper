"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import type { ThemeConfig } from "~/types/theme";
// import type { UIConfig } from "~/types/ui";
import { cn } from "~/lib/utils";
import { Menu, X } from "lucide-react";
import { useUISettings } from "~/store/ui-settings";
import {
  LayoutDashboard,
  Bell,
  Users,
  Settings,
  HelpCircle,
  Building2,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import styles from "~/styles/ui-settings.module.css";
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Alerts",
    href: "/Alerts",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Clients",
    href: "/Clients",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Permissions",
    href: "/permissions",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Theme Settings",
    href: "/theme-config",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: "UI Settings",
    href: "/ui-settings",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: "Support",
    href: "/support",
    icon: <HelpCircle className="h-5 w-5" />,
  },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [themeConfig, setThemeConfig] = useState<ThemeConfig | null>(null);
  const { settings } = useUISettings();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Load initial theme config
    const loadThemeConfig = () => {
      const savedConfig = localStorage.getItem("theme-config");
      if (savedConfig) {
        try {
          const parsed = JSON.parse(savedConfig) as Record<string, unknown>;
          if (
            parsed &&
            typeof parsed === "object" &&
            typeof parsed.light === "object" &&
            typeof parsed.dark === "object" &&
            typeof (parsed.light as Record<string, unknown>).primary ===
              "string" &&
            typeof (parsed.light as Record<string, unknown>).secondary ===
              "string" &&
            typeof (parsed.light as Record<string, unknown>).accent ===
              "string" &&
            typeof (parsed.dark as Record<string, unknown>).primary ===
              "string" &&
            typeof (parsed.dark as Record<string, unknown>).secondary ===
              "string" &&
            typeof (parsed.dark as Record<string, unknown>).accent === "string"
          ) {
            const config: ThemeConfig = {
              light: {
                primary: (parsed.light as Record<string, unknown>)
                  .primary as string,
                secondary: (parsed.light as Record<string, unknown>)
                  .secondary as string,
                accent: (parsed.light as Record<string, unknown>)
                  .accent as string,
              },
              dark: {
                primary: (parsed.dark as Record<string, unknown>)
                  .primary as string,
                secondary: (parsed.dark as Record<string, unknown>)
                  .secondary as string,
                accent: (parsed.dark as Record<string, unknown>)
                  .accent as string,
              },
            };
            setThemeConfig(config);
          }
        } catch (e) {
          console.error("Failed to parse theme config:", e);
        }
      }
    };

    loadThemeConfig();

    // Listen for theme config changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme-config") {
        loadThemeConfig();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Apply theme colors
  const sidebarStyle = {
    "--sidebar-bg":
      theme === "dark"
        ? (themeConfig?.dark?.primary ?? "#8b5cf6")
        : (themeConfig?.light?.primary ?? "#7c3aed"),
    "--sidebar-hover":
      theme === "dark"
        ? (themeConfig?.dark?.secondary ?? "#9ca3af")
        : (themeConfig?.light?.secondary ?? "#6b7280"),
    backgroundColor: "var(--sidebar-bg)",
    transition: "all var(--ui-animation-speed) ease-in-out",
  } as React.CSSProperties;

  return (
    <div className="w-full md:w-[20%] lg:w-[16%] xl:w-[14%]">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-lg transition-all duration-200 hover:bg-primary/90 md:hidden"
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
          "fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out md:translate-x-0",
          !isMobileOpen && "-translate-x-full",
        )}
      >
        <nav
          className={cn(
            "flex h-full flex-col p-0 text-white shadow-xl md:p-[var(--ui-layout-spacing)] md:shadow-none",
            styles.sidebarWrapper,
          )}
          style={{
            ...sidebarStyle,
            backgroundColor: "var(--sidebar-bg)",
          }}
        >
          <div className="relative mb-8 mt-16 md:mt-0">
            <div className="flex items-center gap-2 px-2 transition-all duration-200">
              {settings.sidebarLogo ? (
                <img
                  src={settings.sidebarLogo.value}
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
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-lg bg-black/20 text-white transition-colors hover:bg-black/30 md:hidden"
            >
              <X className="h-4 w-4" />
            </button>
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
          <div className="mt-auto space-y-4 transition-all duration-200">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-black/20"
            >
              {theme === "dark" ? (
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
            <div className="flex items-center gap-3 rounded-lg bg-black/20 p-4">
              <Building2 className="h-8 w-8" />
              <div>
                <div className="font-medium">Edgewater Ventures</div>
                <div className="text-sm opacity-80">Admin</div>
              </div>
            </div>
            <div>
              <header className="flex h-16 items-center justify-end gap-4 p-4">
                <SignedOut>
                  <SignInButton />
                  <SignUpButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </header>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
