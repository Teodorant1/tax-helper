/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { ThemeProvider } from "~/components/theme-provider";
import { UISettingsProvider } from "~/components/ui-settings-provider";
import { Toaster } from "~/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "~/trpc/react";
import { SidebarNav } from "~/components/sidebar-nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "TaxHelper",
  description: "A modern tax management application",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
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
                  <main className="flex-1 transition-all duration-200">
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
