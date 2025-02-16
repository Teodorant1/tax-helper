"use client";

import * as React from "react";
import Image from "next/image";
import type { CompleteUIConfig , CompleteThemeConfig } from "~/server/db/schema";

interface GreetingProps {
  uiConfig: CompleteUIConfig;
  themeConfig: CompleteThemeConfig;
}

export function Greeting({ uiConfig, themeConfig }: GreetingProps) {
  // Memoize the logo element to prevent unnecessary re-renders
  const logoElement = React.useMemo(() => {
    if (!uiConfig.greetingLogo) return null;

    return (
      <div className="flex justify-center">
        <Image
          src={uiConfig.greetingLogo.value}
          alt="Dashboard Logo"
          width={200}
          height={80}
          className="h-20 w-auto object-contain"
          unoptimized // For external images
          priority // Load immediately
          key={uiConfig.greetingLogo.value} // Force re-render on logo change
          style={{
            borderRadius: `calc(${uiConfig.layoutBorderRadius} * 0.75)`,
            transition: `all ${
              uiConfig.animationSpeed === 'slower' ? '0.4s' :
              uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
          }}
        />
      </div>
    );
  }, [uiConfig.greetingLogo, uiConfig.layoutBorderRadius, uiConfig.animationSpeed]);

  return (
    <div 
      className={`mb-8 space-y-${uiConfig.layoutDensity === 'compact' ? '3' : 
                 uiConfig.layoutDensity === 'spacious' ? '6' : '4'}`}
      style={{
        transition: `all ${
          uiConfig.animationSpeed === 'slower' ? '0.4s' :
          uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
        } ease`
      }}
    >
      {logoElement}
      <div className="text-center">
        <h1 
          className="font-bold tracking-tight"
          style={{
            fontSize: `calc(${uiConfig.baseFontSize} * 2.5)`,
            color: themeConfig.lightTheme.primary,
            transition: `all ${
              uiConfig.animationSpeed === 'slower' ? '0.4s' :
              uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
          }}
        >
          Welcome to {uiConfig.greetingTitle}
        </h1>
        <p 
          className="mt-2"
          style={{
            fontSize: `calc(${uiConfig.baseFontSize} * 1.125)`,
            color: themeConfig.lightTheme.secondary,
            transition: `all ${
              uiConfig.animationSpeed === 'slower' ? '0.4s' :
              uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
          }}
        >
          {uiConfig.greetingSubtitle}
        </p>
      </div>
    </div>
  );
}
