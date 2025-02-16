"use client";

import Link from "next/link";
import type { CompleteUIConfig, CompleteThemeConfig } from "~/server/db/schema";

interface ThemeConfigProps {
  theme_config: CompleteThemeConfig;
  uiConfig: CompleteUIConfig;
}

export function Resources({ uiConfig, theme_config }: ThemeConfigProps) {
  const resources = [
    {
      name: "Add/Invite Client",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
      ),
      href: "/clients/invite",
    },
    {
      name: "Contact Us",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
          <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
        </svg>
      ),
      href: "/support",
    },
    {
      name: "IRS Resources",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
      href: "/resources/irs",
    },
    {
      name: "FAQs",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      ),
      href: "/faqs",
    },
  ];

  const sectionStyle = {
    borderRadius: uiConfig.layoutBorderRadius,
    fontSize: uiConfig.baseFontSize,
    padding: uiConfig.layoutDensity === "compact" 
      ? "1rem" 
      : uiConfig.layoutDensity === "spacious" 
        ? "2rem" 
        : "1.5rem",
    transition: `all ${uiConfig.animationSpeed === "slower" 
      ? "400ms" 
      : uiConfig.animationSpeed === "faster" 
        ? "100ms" 
        : "200ms"} ease-in-out`,
    background: `linear-gradient(to bottom right, ${theme_config.lightTheme.primary}15, ${theme_config.lightTheme.secondary}10)`,
    border: `1px solid ${theme_config.lightTheme.accent}40`,
    boxShadow: '0 0 10px #00000010'
  };

  return (
    <section 
      className="rounded-lg p-6"
      style={sectionStyle}
    >
      <h2 
        className="mb-2 text-xl font-semibold"
        style={{ color: theme_config.lightTheme.primary }}
      >Resources & Updates</h2>
      <p 
        className="mb-6 text-sm"
        style={{ color: theme_config.lightTheme.secondary }}
      >
        Some resources to help you get started and stay informed
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {resources.map((resource) => (
          <Link
            key={resource.name}
            href={resource.href}
            className="flex flex-col items-center gap-2 rounded-lg p-4 text-center transition-all hover:scale-105 hover:bg-opacity-10"
            style={{
              borderRadius: uiConfig.layoutBorderRadius,
              padding: uiConfig.layoutDensity === "compact" 
                ? "0.75rem" 
                : uiConfig.layoutDensity === "spacious" 
                  ? "1.5rem" 
                  : "1rem",
              transition: `all ${uiConfig.animationSpeed === "slower" 
                ? "400ms" 
                : uiConfig.animationSpeed === "faster" 
                  ? "100ms" 
                  : "200ms"} ease-in-out`,
              backgroundColor: `${theme_config.lightTheme.primary}05`,
              border: `1px solid ${theme_config.lightTheme.primary}20`,
              color: theme_config.lightTheme.primary
            }}
          >
            <div 
              style={{
                borderRadius: "9999px",
                padding: "0.5rem",
                backgroundColor: `${theme_config.lightTheme.primary}10`,
                color: theme_config.lightTheme.primary,
                transition: `all ${uiConfig.animationSpeed === "slower" 
                  ? "400ms" 
                  : uiConfig.animationSpeed === "faster" 
                    ? "100ms" 
                    : "200ms"} ease-in-out`
              }}
            >
              {resource.icon}
            </div>
            <span 
              className="text-sm font-medium"
              style={{ color: theme_config.lightTheme.primary }}
            >{resource.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
