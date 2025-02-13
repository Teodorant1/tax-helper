/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { db } from "~/server/db";
import {
  actual_user,
  alerts,
  clients,
  documents,
  ercEvents,
  ercTransactions,
  logos,
  taxHistoryEntries,
  themeColors,
  themeConfigs,
  transactions,
  uiConfigs,
} from "~/server/db/schema";

export type UserRole = "admin" | "user" | "manager"; // Define your actual roles here

type ClientStatus = "Active" | "Pending" | "Inactive";
type AlertType = "warning" | "info";
type ClientType = "Individual" | "Business";
type TaxHistoryType = "income" | "employment";
type DocumentStatus = "Ready" | "Error";
type LayoutDensity = "comfortable" | "compact" | "spacious";
type AnimationSpeed = "slower" | "default" | "faster";

interface MockDataOptions {
  userId: string; // For actual_user.id
  userID: string; // For actual_user.userID
  clientCount?: number;
  alertsPerClient?: number;
  transactionsPerClient?: number;
  documentsPerClient?: number;
  taxHistoryPerClient?: number;
  ercTransactionsPerClient?: number;
}

export async function generateMockDataForUser(options: MockDataOptions) {
  const {
    userId,
    userID,
    clientCount = 5,
    alertsPerClient = 3,
    transactionsPerClient = 5,
    documentsPerClient = 3,
    taxHistoryPerClient = 4,
    ercTransactionsPerClient = 2,
  } = options;

  return await db.transaction(async (tx) => {
    // Generate mock logos for UI config
    const mockLogos = await tx
      .insert(logos)
      .values([
        {
          type: "url",
          value: "https://example.com/sidebar-logo.png",
        },
        {
          type: "url",
          value: "https://example.com/greeting-logo.png",
        },
      ])
      .returning();

    // Generate mock theme colors
    const mockThemeColors = await tx
      .insert(themeColors)
      .values([
        {
          primary: "#007bff",
          secondary: "#6c757d",
          accent: "#28a745",
        },
        {
          primary: "#212529",
          secondary: "#343a40",
          accent: "#0d6efd",
        },
      ])
      .returning();

    // Generate mock clients
    const mockClients = await tx
      .insert(clients)
      .values(
        Array.from({ length: clientCount }, () => {
          const status = (["Active", "Pending", "Inactive"][
            Math.floor(Math.random() * 3)
          ] ?? "Active") as ClientStatus;
          return {
            id: crypto.randomUUID(),
            userId: userId,
            name: `Client ${Math.random().toString(36).substring(7)}`,
            taxId: `TAX-${Math.random().toString().substring(2, 11)}`,
            email: `client${Math.random().toString(36).substring(7)}@example.com`,
            phone: `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
            status,
            lastFiling: new Date(
              Date.now() - Math.random() * 10000000000,
            ).toISOString(),
            nextFiling: new Date(
              Date.now() + Math.random() * 10000000000,
            ).toISOString(),
          };
        }),
      )
      .returning();

    // Generate mock alerts for each client
    for (const client of mockClients) {
      const alertsData = Array.from({ length: alertsPerClient }, () => {
        const type = (Math.random() > 0.5 ? "warning" : "info") as AlertType;
        const clientType = (["Individual", "Business"][
          Math.floor(Math.random() * 2)
        ] ?? "Individual") as ClientType;
        return {
          id: crypto.randomUUID(),
          clientId: client.id,
          type,
          clientType,
          taxId: client.taxId,
          alert: `Alert message ${Math.random().toString(36).substring(7)}`,
          taxPeriod: `2024-Q${Math.floor(Math.random() * 4) + 1}`,
          alertDate: new Date().toISOString(),
          transactionDate: new Date(
            Date.now() - Math.random() * 10000000000,
          ).toISOString(),
          amount: `$${(Math.random() * 10000).toFixed(2)}`,
        };
      });
      await tx.insert(alerts).values(alertsData);

      // Generate mock transactions
      const transactionsData = Array.from(
        { length: transactionsPerClient },
        () => {
          const type =
            ["Payment", "Refund", "Adjustment"][
              Math.floor(Math.random() * 3)
            ] ?? "Payment";
          const form =
            ["1040", "1120", "941"][Math.floor(Math.random() * 3)] ?? "1040";
          return {
            id: crypto.randomUUID(),
            clientId: client.id,
            type,
            date: new Date(
              Date.now() - Math.random() * 10000000000,
            ).toISOString(),
            form,
            taxPeriod: `2024-Q${Math.floor(Math.random() * 4) + 1}`,
            amount: `$${(Math.random() * 10000).toFixed(2)}`,
          };
        },
      );
      await tx.insert(transactions).values(transactionsData);

      // Generate mock tax history entries
      const taxHistoryData = Array.from({ length: taxHistoryPerClient }, () => {
        const type = (
          Math.random() > 0.5 ? "income" : "employment"
        ) as TaxHistoryType;
        return {
          id: crypto.randomUUID(),
          clientId: client.id,
          period: `2024-Q${Math.floor(Math.random() * 4) + 1}`,
          returnFiled: new Date(
            Date.now() - Math.random() * 10000000000,
          ).toISOString(),
          principalTax: `$${(Math.random() * 50000).toFixed(2)}`,
          interest: `$${(Math.random() * 1000).toFixed(2)}`,
          penalties: `$${(Math.random() * 2000).toFixed(2)}`,
          paymentsAndCredits: `$${(Math.random() * 40000).toFixed(2)}`,
          refunds: `$${(Math.random() * 5000).toFixed(2)}`,
          balance: `$${(Math.random() * 10000).toFixed(2)}`,
          type,
        };
      });
      await tx.insert(taxHistoryEntries).values(taxHistoryData);

      // Generate mock ERC transactions and events
      const mockErcTransactions = await tx
        .insert(ercTransactions)
        .values(
          Array.from({ length: ercTransactionsPerClient }, () => ({
            id: crypto.randomUUID(),
            clientId: client.id,
            irsTracking: `IRS-${Math.random().toString(36).substring(7)}`,
            filed: Math.random() > 0.3,
            clientEnteredErcClaim: `$${(Math.random() * 100000).toFixed(2)}`,
            approvedErcAmount: `$${(Math.random() * 80000).toFixed(2)}`,
            interestAccrued: `$${(Math.random() * 1000).toFixed(2)}`,
            adjustments: `$${(Math.random() * 5000).toFixed(2)}`,
            totalRefundProcessed: `$${(Math.random() * 75000).toFixed(2)}`,
            totalErcPending: `$${(Math.random() * 25000).toFixed(2)}`,
          })),
        )
        .returning();

      // Generate mock ERC events for each transaction
      for (const ercTransaction of mockErcTransactions) {
        await tx.insert(ercEvents).values({
          id: crypto.randomUUID(),
          transactionId: ercTransaction.id,
          irsTracking: ercTransaction.irsTracking,
          form941xReceivedDate: new Date(
            Date.now() - Math.random() * 10000000000,
          ).toISOString(),
          form941xForwardDate: new Date(
            Date.now() - Math.random() * 8000000000,
          ).toISOString(),
          refundApprovedDate: new Date(
            Date.now() - Math.random() * 5000000000,
          ).toISOString(),
          refundPaidDate: new Date(
            Date.now() - Math.random() * 2000000000,
          ).toISOString(),
          examinationIndicator: Math.random() > 0.7 ? "Under Review" : null,
        });
      }

      // Generate mock documents
      const documentsData = Array.from({ length: documentsPerClient }, () => {
        const docType =
          ["Tax Return", "W2", "1099", "Correspondence"][
            Math.floor(Math.random() * 4)
          ] ?? "Tax Return";
        const status = (
          Math.random() > 0.2 ? "Ready" : "Error"
        ) as DocumentStatus;
        return {
          id: crypto.randomUUID(),
          clientId: client.id,
          name: `Document ${Math.random().toString(36).substring(7)}`,
          status,
          type: docType,
          taxPeriod: `2024-Q${Math.floor(Math.random() * 4) + 1}`,
          requestedOn: new Date(
            Date.now() - Math.random() * 10000000000,
          ).toISOString(),
        };
      });
      await tx.insert(documents).values(documentsData);
    }

    // Generate UI config
    const [sidebarLogo, greetingLogo] = mockLogos;
    if (sidebarLogo && greetingLogo) {
      const layoutDensity: LayoutDensity = "comfortable";
      const animationSpeed: AnimationSpeed = "default";
      await tx.insert(uiConfigs).values({
        id: crypto.randomUUID(),
        userId: userId,
        sidebarTitle: "Tax Helper Pro",
        sidebarLogoId: sidebarLogo.id,
        greetingTitle: "Welcome Back!",
        greetingSubtitle: "Here's your tax management overview",
        greetingLogoId: greetingLogo.id,
        layoutBorderRadius: "8px",
        layoutDensity,
        sidebarWidth: 280,
        baseFontSize: "16px",
        animationSpeed,
      });
    }

    // Generate theme config
    const [lightTheme, darkTheme] = mockThemeColors;
    if (lightTheme && darkTheme) {
      await tx.insert(themeConfigs).values({
        id: crypto.randomUUID(),
        userId: userId,
        lightThemeId: lightTheme.id,
        darkThemeId: darkTheme.id,
      });
    }

    return {
      message: `Successfully generated mock data for user ${userId}`,
      clientCount: mockClients.length,
    };
  });
}

interface UpdateRoleResult {
  success: boolean;
  message: string;
}

interface ClerkSession {
  id: string;
  status: string;
}

interface ClerkUser {
  id: string;
  publicMetadata: Record<string, unknown>;
}

export async function updateUserRole(
  userId: string,
  role: UserRole,
): Promise<UpdateRoleResult> {
  try {
    const secretKey = process.env.CLERK_SECRET_KEY;
    if (!secretKey) {
      throw new Error("CLERK_SECRET_KEY is not configured");
    }

    const baseUrl = "https://api.clerk.com/v1";
    const headers = {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    };

    // First check if user exists
    const userResponse = await fetch(`${baseUrl}/users/${userId}`, {
      headers,
    });

    if (!userResponse.ok) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const user = (await userResponse.json()) as ClerkUser;

    // Update user metadata with new role
    const updateResponse = await fetch(`${baseUrl}/users/${userId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        public_metadata: { ...user.publicMetadata, role },
      }),
    });

    if (!updateResponse.ok) {
      throw new Error("Failed to update user role");
    }

    // Get user's sessions
    const sessionsResponse = await fetch(
      `${baseUrl}/users/${userId}/sessions`,
      {
        headers,
      },
    );

    if (sessionsResponse.ok) {
      const { data: sessions } = (await sessionsResponse.json()) as {
        data: ClerkSession[];
      };

      // Revoke all active sessions
      if (sessions.length > 0) {
        await Promise.all(
          sessions.map((session) =>
            fetch(`${baseUrl}/sessions/${session.id}/revoke`, {
              method: "POST",
              headers,
            }),
          ),
        );
      }
    }

    return {
      success: true,
      message: `Successfully updated user ${userId} with role: ${role}`,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error updating user role:", errorMessage);
    return {
      success: false,
      message: `Failed to update user role: ${errorMessage}`,
    };
  }
}

export async function AuthGuard() {
  const awaited_auth = await auth();

  if (process.env.VERCEL) {
    console.info("[AuthGuard] Checking auth", {
      userId: awaited_auth?.userId ?? "unknown",
      sessionId: awaited_auth?.sessionId ?? "unknown",
      timestamp: new Date().toISOString(),
    });
  }

  if (!awaited_auth?.userId) {
    if (process.env.VERCEL) {
      console.error("[AuthGuard] No user ID found, redirecting to login", {
        timestamp: new Date().toISOString(),
      });
    }
    redirect("/login");
  }

  return awaited_auth;
}
