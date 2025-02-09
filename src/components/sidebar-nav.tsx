"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
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

  return (
    <nav className="sidebar flex h-screen flex-col bg-primary p-4 text-primary-foreground">
      <div className="mb-8 flex items-center gap-2 px-2">
        <Building2 className="h-6 w-6" />
        <span className="text-lg font-semibold">TaxNow PRO</span>
      </div>
      <div className="space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "hover:bg-primary-muted flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive && "bg-primary-muted",
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          );
        })}
      </div>
      <div className="mt-auto space-y-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="hover:bg-primary-muted flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors"
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
        <div className="bg-primary-muted flex items-center gap-3 rounded-lg p-4">
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
