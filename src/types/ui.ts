interface Logo {
  type: "url" | "upload";
  value: string;
}

export interface UIConfig {
  sidebarTitle: string;
  sidebarLogo: Logo | null;
  greeting: {
    title: string;
    subtitle: string;
    logo: Logo | null;
  };
  layout: {
    borderRadius: string;
    layoutDensity: "comfortable" | "compact" | "spacious";
    sidebarWidth: number;
  };
  typography: {
    baseFontSize: string;
    animationSpeed: "slower" | "default" | "faster";
  };
}
