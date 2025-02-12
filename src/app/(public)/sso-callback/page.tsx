"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SSOCallback() {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    async function handleCallback() {
      if (!signIn) {
        console.error("Sign in not initialized");
        router.push("/login");
        return;
      }

      try {
        // Complete the OAuth flow
        await signIn.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/",
        });
      } catch (error) {
        console.error("Error during OAuth callback:", error);
        router.push("/login");
      }
    }

    void handleCallback();
  }, [isLoaded, signIn, router]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold">
            Setting up your account...
          </h2>
          <p className="text-gray-600">
            Please wait while we complete the authentication process.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
