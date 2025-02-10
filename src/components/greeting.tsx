"use client";

import * as React from "react";
import Image from "next/image";
import { useUISettings } from "~/store/ui-settings";

export function Greeting() {
  const { settings } = useUISettings();
  const { greeting } = settings;

  // Memoize the logo element to prevent unnecessary re-renders
  const logoElement = React.useMemo(() => {
    if (!greeting.logo) return null;

    return (
      <div className="flex justify-center">
        <Image
          src={greeting.logo.value}
          alt="Dashboard Logo"
          width={200}
          height={80}
          className="h-20 w-auto object-contain"
          unoptimized // For external images
          priority // Load immediately
          key={greeting.logo.value} // Force re-render on logo change
        />
      </div>
    );
  }, [greeting.logo]);

  return (
    <div className="mb-8 space-y-4">
      {logoElement}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to {greeting.title}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {greeting.subtitle}
        </p>
      </div>
    </div>
  );
}
