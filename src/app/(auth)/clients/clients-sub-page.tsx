"use client";

import * as React from "react";
import type { CompleteThemeConfig, CompleteUIConfig } from "~/server/db/schema";

interface UICustomizationProps {
  theme_config: CompleteThemeConfig;
  ui_config: CompleteUIConfig;
}

export function ClientsSubPage({ theme_config, ui_config }: UICustomizationProps) {
  return (
    <div 
      className={`space-y-${ui_config.layoutDensity === 'compact' ? '4' : 
                 ui_config.layoutDensity === 'spacious' ? '8' : '6'}`}
    >
      {/* Client Overview Section */}
      <div
        style={{
          background: `linear-gradient(to bottom right, ${theme_config.lightTheme.primary}15, ${theme_config.lightTheme.secondary}10)`,
          border: `1px solid ${theme_config.lightTheme.accent}40`,
          boxShadow: '0 0 10px #00000010',
          borderRadius: ui_config.layoutBorderRadius,
          padding: ui_config.layoutDensity === 'compact' ? '1rem' : 
                  ui_config.layoutDensity === 'spacious' ? '2rem' : '1.5rem',
          transition: `all ${
            ui_config.animationSpeed === 'slower' ? '0.4s' :
            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
          } ease`
        }}
      >
        <h2 
          className="font-semibold"
          style={{
            fontSize: `calc(${ui_config.baseFontSize} * 1.5)`,
            color: theme_config.lightTheme.primary,
            transition: `all ${
              ui_config.animationSpeed === 'slower' ? '0.4s' :
              ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
          }}
        >
          Client Overview
        </h2>
        
        <div 
          className="mt-4"
          style={{
            fontSize: ui_config.baseFontSize,
            transition: `all ${
              ui_config.animationSpeed === 'slower' ? '0.4s' :
              ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
          }}
        >
          {/* Client content will go here */}
          <p style={{ color: theme_config.lightTheme.secondary }}>
            Client information and statistics
          </p>
        </div>
      </div>

      {/* Client Actions Section */}
      <div
        style={{
          background: `linear-gradient(to bottom right, ${theme_config.lightTheme.secondary}15, ${theme_config.lightTheme.accent}10)`,
          border: `1px solid ${theme_config.lightTheme.primary}40`,
          boxShadow: '0 0 10px #00000010',
          borderRadius: ui_config.layoutBorderRadius,
          padding: ui_config.layoutDensity === 'compact' ? '1rem' : 
                  ui_config.layoutDensity === 'spacious' ? '2rem' : '1.5rem',
          transition: `all ${
            ui_config.animationSpeed === 'slower' ? '0.4s' :
            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
          } ease`
        }}
      >
        <h2 
          className="font-semibold"
          style={{
            fontSize: `calc(${ui_config.baseFontSize} * 1.5)`,
            color: theme_config.lightTheme.secondary,
            transition: `all ${
              ui_config.animationSpeed === 'slower' ? '0.4s' :
              ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
          }}
        >
          Client Actions
        </h2>
        
        <div 
          className="mt-4"
          style={{
            fontSize: ui_config.baseFontSize,
            transition: `all ${
              ui_config.animationSpeed === 'slower' ? '0.4s' :
              ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
          }}
        >
          {/* Action buttons and controls will go here */}
          <button
            className="px-4 py-2 hover:opacity-90"
            style={{
              backgroundColor: theme_config.lightTheme.primary,
              color: '#ffffff',
              borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
              transition: `all ${
                ui_config.animationSpeed === 'slower' ? '0.4s' :
                ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
              } ease`
            }}
          >
            Add New Client
          </button>
        </div>
      </div>

      {/* Client List Section */}
      <div
        style={{
          background: `linear-gradient(to bottom right, ${theme_config.lightTheme.accent}15, ${theme_config.lightTheme.primary}10)`,
          border: `1px solid ${theme_config.lightTheme.secondary}40`,
          boxShadow: '0 0 10px #00000010',
          borderRadius: ui_config.layoutBorderRadius,
          padding: ui_config.layoutDensity === 'compact' ? '1rem' : 
                  ui_config.layoutDensity === 'spacious' ? '2rem' : '1.5rem',
          transition: `all ${
            ui_config.animationSpeed === 'slower' ? '0.4s' :
            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
          } ease`
        }}
      >
        <h2 
          className="font-semibold"
          style={{
            fontSize: `calc(${ui_config.baseFontSize} * 1.5)`,
            color: theme_config.lightTheme.accent,
            transition: `all ${
              ui_config.animationSpeed === 'slower' ? '0.4s' :
              ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
          }}
        >
          Client List
        </h2>
        
        <div 
          className="mt-4"
          style={{
            fontSize: ui_config.baseFontSize,
            transition: `all ${
              ui_config.animationSpeed === 'slower' ? '0.4s' :
              ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
          }}
        >
          {/* Client list items will go here */}
          <div 
            className="p-4 mb-2"
            style={{
              backgroundColor: `${theme_config.lightTheme.primary}10`,
              borderRadius: ui_config.layoutBorderRadius,
              border: `1px solid ${theme_config.lightTheme.primary}20`,
              transition: `all ${
                ui_config.animationSpeed === 'slower' ? '0.4s' :
                ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
              } ease`
            }}
          >
            <p style={{ color: theme_config.lightTheme.primary }}>
              Sample Client Item
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
