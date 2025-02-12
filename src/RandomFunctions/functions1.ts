/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function AuthGuard() {
  const route = (await headers()).get("x-pathname") || "/";
  console.log("route", route);
  const awaited_auth = await auth();

  console.log("awaited_auth", awaited_auth);

  if (!awaited_auth.userId && route !== "/login") {
    redirect("/login");
  }
}
