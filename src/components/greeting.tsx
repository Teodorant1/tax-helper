"use client";

import * as React from "react";
import Image from "next/image";
import { useUISettings } from "~/store/ui-settings";

export function Greeting() {
  const { settings } = useUISettings();

  // Memoize the logo element to prevent unnecessary re-renders
  const logoElement = React.useMemo(() => {
    if (!settings.greetingLogoId) return null;

    return (
      <div className="flex justify-center">
        <Image
          src={settings.greetingLogoId}
          alt="Dashboard Logo"
          width={200}
          height={80}
          className="h-20 w-auto object-contain"
          unoptimized // For external images
          priority // Load immediately
          key={settings.greetingLogoId} // Force re-render on logo change
        />
      </div>
    );
  }, [settings.greetingLogoId]);

  return (
    <div className="mb-8 space-y-4">
      {logoElement}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to {settings.greetingTitle}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {settings.greetingSubtitle}
        </p>
      </div>
    </div>
  );
}
