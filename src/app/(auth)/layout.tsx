/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { SidebarNav } from "~/components/sidebar-nav";
import { AuthGuard } from "~/RandomFunctions/functions1";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await AuthGuard();

  return (
    <div className="relative min-h-screen w-full">
      <SidebarNav />
      <main className="flex-1 transition-all duration-200 md:pl-[calc(var(--ui-sidebar-width)+1.5rem)]">
        {children}
      </main>
    </div>
  );
}
