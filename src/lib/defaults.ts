import { type UIConfig } from "~/types/ui";

export const defaultUIConfig: Omit<UIConfig, "id" | "userId"> = {
  sidebarTitle: "TaxNow PRO",
  sidebarLogoId: null,
  greetingTitle: "TaxNow PRO",
  greetingSubtitle: "Your modern tax management solution",
  greetingLogoId: null,
  layoutBorderRadius: "0.5rem",
  layoutDensity: "comfortable",
  sidebarWidth: 280,
  baseFontSize: "1rem",
  animationSpeed: "default",
};
