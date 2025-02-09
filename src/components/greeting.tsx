"use client";

import * as React from "react";
import Image from "next/image";

interface UIConfig {
  greeting: { title: string; subtitle: string };
  logo: { url: string; alt: string };
}

const defaultConfig: UIConfig = {
  greeting: {
    title: "Welcome to TaxNow PRO",
    subtitle: "Your modern tax management solution",
  },
  logo: {
    url: "",
    alt: "TaxNow PRO Logo",
  },
};

export function Greeting() {
  const [uiConfig, setUiConfig] = React.useState<UIConfig>(defaultConfig);

  const loadConfig = React.useCallback(() => {
    try {
      const savedSettings = localStorage.getItem("ui-config");
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings) as UIConfig;
        setUiConfig({
          greeting: {
            ...defaultConfig.greeting,
            ...parsed.greeting,
          },
          logo: {
            ...defaultConfig.logo,
            ...parsed.logo,
          },
        });
      }
    } catch (error) {
      console.error("Failed to parse UI settings:", error);
    }
  }, []);

  React.useEffect(() => {
    loadConfig();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ui-config") {
        loadConfig();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadConfig]);

  return (
    <div className="mb-8 space-y-4">
      {uiConfig.logo.url && (
        <div className="flex justify-center">
          <Image
            src={uiConfig.logo.url}
            alt={uiConfig.logo.alt}
            width={200}
            height={80}
            className="h-20 w-auto object-contain"
            unoptimized // For external images
          />
        </div>
      )}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          {uiConfig.greeting.title}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {uiConfig.greeting.subtitle}
        </p>
      </div>
    </div>
  );
}
