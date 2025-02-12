export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface ClientThemeConfig {
  light: ThemeColors;
  dark: ThemeColors;
}

// Re-export database types for server usage
export type {
  ThemeColors as DBThemeColors,
  ThemeConfig as DBThemeConfig,
} from "~/server/db/schema";
