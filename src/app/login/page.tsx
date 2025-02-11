"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInLoaded) return;

    try {
      setIsLoading(true);
      await signIn.create({
        identifier: email,
        strategy: "email_code",
      });
      router.push("/verify-email");
    } catch (err) {
      console.error("Error sending email:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpLoaded) return;

    try {
      setIsLoading(true);
      await signUp.create({
        emailAddress: email,
      });
      router.push("/verify-email");
    } catch (err) {
      console.error("Error signing up:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async (mode: "signin" | "signup") => {
    const auth = mode === "signin" ? signIn : signUp;
    if (!auth || (mode === "signin" ? !signInLoaded : !signUpLoaded)) return;

    try {
      await auth.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      console.error(`Error with Google ${mode}:`, err);
    }
  };

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center bg-background">
      <div className="flex w-full rounded-lg bg-white shadow-sm">
        {/* Left side - Auth Form */}
        <div className="flex h-full w-full max-w-[50%] justify-center pt-24">
          <div className="w-full max-w-[360px] space-y-8">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-8">
                <div className="text-center">
                  <h1 className="text-3xl font-bold tracking-tight">
                    Welcome Back!
                  </h1>
                </div>

                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="signin-email"
                      className="text-sm font-medium"
                    >
                      Email
                    </label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Continue"}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                      OR
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleGoogleAuth("signin")}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Sign in with Google
                </Button>

                <div className="text-center">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-purple-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-8">
                <div className="text-center">
                  <h1 className="text-3xl font-bold tracking-tight">
                    Create your account
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Get started with TaxHelper today
                  </p>
                </div>

                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="signup-email"
                      className="text-sm font-medium"
                    >
                      Email
                    </label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Continue"}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                      OR
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleGoogleAuth("signup")}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Sign up with Google
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right side - Feature Highlights */}
        <div className="hidden h-full min-h-screen w-full flex-1 justify-center bg-slate-50 lg:flex">
          <div className="w-[90%] space-y-8 py-8">
            <div>
              <h2 className="text-2xl font-bold">
                Welcome to a brand new way
                <br />
                to experience your taxes.
              </h2>
            </div>

            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="rounded-lg border bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Mend your estranged relationship with the IRS.
                </h3>
                <p className="text-muted-foreground">
                  TaxNow brings your IRS tax account into focus by providing
                  real-time access to historical tax return and transaction
                  data, as well as actionable insights and alerts to save you
                  time and money.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="rounded-lg border bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <svg
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  TaxNow&apos;s IRS account access is always free for first-time
                  users.
                </h3>
                <p className="text-muted-foreground">
                  Enjoy TaxNow&apos;s core features, including IRS tax account
                  monitoring and alerts for up to one IRS individual or business
                  tax account completely on the house.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="rounded-lg border bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Data security beyond measure.
                </h3>
                <p className="text-muted-foreground">
                  We are obsessed with the security and confidentiality of your
                  data and personal information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
