import ServerSidebarNav from "~/components/server-sidebar-nav";
import { AuthGuard } from "~/RandomFunctions/functions1";
import { AccountConfirmerModal } from "~/components/account-confirmer-modal";


export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get auth session
  const session = await AuthGuard();
  



  return (
    <div className="relative min-h-screen w-full">
      <AccountConfirmerModal />
      <ServerSidebarNav />
      <main className="flex-1 transition-all duration-200 md:pl-[calc(var(--ui-sidebar-width)+1.5rem)]">
        {children}
      </main>
    </div>
  );
}
