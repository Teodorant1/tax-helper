"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ThemeConfig } from "~/types/theme";
import type { UIConfig } from "~/types/ui";
import { cn } from "~/lib/utils";
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
    width: "var(--ui-sidebar-width)",
    padding: "var(--ui-layout-spacing)",
    transition: "all var(--ui-animation-speed) ease-in-out",
  } as React.CSSProperties;

  return (
    <nav
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col text-white",
        styles.sidebarWrapper,
      )}
      style={{
        ...sidebarStyle,
        backgroundColor: "var(--sidebar-bg)",
        padding: "var(--ui-layout-spacing)",
        transition: "all var(--ui-animation-speed) ease-in-out",
      }}
    >
      <div className="mb-8 flex items-center gap-2 px-2 transition-all duration-200">
        {settings.sidebarLogo ? (
          <img
            src={settings.sidebarLogo.value}
            alt="Sidebar Logo"
            className="h-6 w-6 object-contain"
          />
        ) : (
          <Building2 className="h-6 w-6" />
        )}
        <span className="text-lg font-semibold">{settings.sidebarTitle}</span>
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
      </div>
    </nav>
  );
}
