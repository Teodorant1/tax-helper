import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { ThemeProvider } from "~/components/theme-provider";
import { UISettingsProvider } from "~/components/ui-settings-provider";
import { Toaster } from "~/components/ui/toaster";
import { SidebarNav } from "~/components/sidebar-nav";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "TaxHelper",
  description: "A modern tax management application",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <TRPCReactProvider>
        <html lang="en">
          <body className={`font-sans ${inter.variable}`}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <UISettingsProvider>
                <div className="relative min-h-screen w-full">
                  <SidebarNav />
                  <main className="flex-1 transition-all duration-200 md:pl-[calc(var(--ui-sidebar-width)+1.5rem)]">
                    {children}
                  </main>
                </div>
                <Toaster />
              </UISettingsProvider>
            </ThemeProvider>
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
