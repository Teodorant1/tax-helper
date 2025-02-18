"use client";

import { type ReactNode, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { userId, sessionId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      if (process.env.NEXT_PUBLIC_VERCEL) {
        console.error("[AuthGuard] No user ID found, redirecting to login", {
          timestamp: new Date().toISOString(),
        });
      }
      router.push("/login");
    } else {
      if (process.env.NEXT_PUBLIC_VERCEL) {
        console.info("[AuthGuard] Checking auth", {
          userId,
          sessionId,
          timestamp: new Date().toISOString(),
        });
      }
    }
  }, [userId, sessionId, router]);

  // Show nothing until auth is confirmed
  if (!userId) return null;

  return <>{children}</>;
}
