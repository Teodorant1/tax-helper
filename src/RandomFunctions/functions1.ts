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
    console.log("Generate mock logos for UI config" , options)
    // Generate mock logos for UI config
    const mockLogos = await tx
      .insert(logos)
      .values([
        {
          type: "url",
          value: "https://cdn.prod.website-files.com/65c4ff5034dd0560cb1d9428/65f074c84878cc4fdc075c4b_Logo%403x.png",
        },
        {
          type: "upload",
          value: "https://cdn.prod.website-files.com/65c4ff5034dd0560cb1d9428/65f074c84878cc4fdc075c4b_Logo%403x.png",
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

    // Generate mock clients with real data
    const mockClients = await tx
      .insert(clients)
      .values([
        {
          id: crypto.randomUUID(),
          userId: userId,
          name: "Big Sky Trading, LLC",
          taxId: "77-0616924",
          email: "contact@bigskytrading.com",
          phone: "(555) 123-4567",
          status: "Active",
          lastFiling: "2024 Q4",
          nextFiling: "2025 Q1",
          pendingTasks: 2,
          alertCount: 1,
        },
        {
          id: crypto.randomUUID(),
          userId: userId,
          name: "Carolina Food Services, Inc.",
          taxId: "20-5778510",
          email: "admin@carolinafood.com",
          phone: "(555) 234-5678",
          status: "Active",
          lastFiling: "2024 Q4",
          nextFiling: "2025 Q1",
          pendingTasks: 0,
          alertCount: 0,
        },
        {
          id: crypto.randomUUID(),
          userId: userId,
          name: "Cutting Edge Plumbing & Mechanical, Inc.",
          taxId: "94-2392371",
          email: "info@cuttingedgeplumbing.com",
          phone: "(555) 345-6789",
          status: "Pending",
          lastFiling: "2024 Q4",
          nextFiling: "2025 Q1",
          pendingTasks: 3,
          alertCount: 2,
        }
      ])
      .returning();

    // Generate mock alerts with real data
    for (const client of mockClients) {
      await tx.insert(alerts).values([
        {
          id: crypto.randomUUID(),
          clientId: client.id,
          type: "info",
          clientType: "Business",
          taxId: client.taxId,
          alert: "Code 960 - Appointed\nThe IRS has accepted TaxNow or another third party as an appointee for your tax matters.",
          taxPeriod: "2024 Q1",
          alertDate: "2025-02-05",
          transactionDate: "2023-12-13",
          amount: "$0.00"
        },
        {
          id: crypto.randomUUID(),
          clientId: client.id,
          type: "warning",
          clientType: "Business",
          taxId: client.taxId,
          alert: "Code 150 - Return Filed\nThe IRS has received your 1120 form for 2024 year. Note that processing may take 6-8 weeks.",
          taxPeriod: "2024 Q1",
          alertDate: "2025-02-05",
          transactionDate: "2024-01-15",
          amount: "$0.00"
        }
      ]);

      // Generate mock transactions with real data
      await tx.insert(transactions).values([
        {
          id: crypto.randomUUID(),
          clientId: client.id,
          type: "Appointed representative",
          date: "2024-06-10",
          form: "1120",
          taxPeriod: "2024",
          amount: "-"
        },
        {
          id: crypto.randomUUID(),
          clientId: client.id,
          type: "Tax return filed",
          date: "2024-04-22",
          form: "1120S",
          taxPeriod: "2023",
          amount: "-"
        },
        {
          id: crypto.randomUUID(),
          clientId: client.id,
          type: "Extension of time to file tax return ext. Date 09-15-2024",
          date: "2024-04-08",
          form: "1120S",
          taxPeriod: "2023",
          amount: "-"
        }
      ]);

      // Generate mock tax history entries with real data
      await tx.insert(taxHistoryEntries).values([
        {
          id: crypto.randomUUID(),
          clientId: client.id,
          period: "2022",
          returnFiled: "Original",
          principalTax: "$2,746.25",
          interest: "$0.00",
          penalties: "$0.00",
          paymentsAndCredits: "($2,746.25)",
          refunds: "$0.00",
          balance: "$0.00",
          type: "income"
        },
        {
          id: crypto.randomUUID(),
          clientId: client.id,
          period: "2021",
          returnFiled: "Original",
          principalTax: "$145,855.36",
          interest: "($17,977.99)",
          penalties: "$0.00",
          paymentsAndCredits: "($290,503.43)",
          refunds: "$162,626.06",
          balance: "$0.00",
          type: "income"
        },
        {
          id: crypto.randomUUID(),
          clientId: client.id,
          period: "2020",
          returnFiled: "Original",
          principalTax: "$713,169.00",
          interest: "($40,361.21)",
          penalties: "$0.00",
          paymentsAndCredits: "($1,041,021.70)",
          refunds: "$368,213.91",
          balance: "$0.00",
          type: "income"
        },
        {
          id: crypto.randomUUID(),
          clientId: client.id,
          period: "2024",
          returnFiled: "No",
          principalTax: "$0.00",
          interest: "$0.00",
          penalties: "$0.00",
          paymentsAndCredits: "$0.00",
          refunds: "$0.00",
          balance: "$0.00",
          type: "employment"
        }
      ]);

      // Generate mock ERC transactions with real data
      const mockErcTransactions = await tx
        .insert(ercTransactions)
        .values([
          {
            id: crypto.randomUUID(),
            clientId: client.id,
            irsTracking: "Q2 2020 06/30/20",
            filed: true,
            clientEnteredErcClaim: "$350,002.70",
            approvedErcAmount: "$350,002.70",
            interestAccrued: "$40,361.21",
            adjustments: "$2,150.00",
            totalRefundProcessed: "$368,213.91",
            totalErcPending: "$350,002.70"
          }
        ])
        .returning();

      // Generate mock ERC events with real data
      for (const ercTransaction of mockErcTransactions) {
        await tx.insert(ercEvents).values({
          id: crypto.randomUUID(),
          transactionId: ercTransaction.id,
          irsTracking: ercTransaction.irsTracking,
          form941xReceivedDate: "2023-05-30",
          form941xForwardDate: "2023-05-30",
          refundApprovedDate: "2024-09-23",
          refundPaidDate: "2024-09-23",
          examinationIndicator: "-"
        });
      }

      // Generate mock documents with real data
      await tx.insert(documents).values([
        {
          id: crypto.randomUUID(),
          clientId: client.id,
          name: "ACTR-941-2020-Q4",
          status: "Ready",
          type: "Account",
          taxPeriod: "2020 Q4",
          requestedOn: "2025-02-10"
        },
        {
          id: crypto.randomUUID(),
          clientId: client.id,
          name: "ACTR-941-2020-Q2",
          status: "Ready",
          type: "Account",
          taxPeriod: "2020 Q2",
          requestedOn: "2025-02-10"
        },
        {
          id: crypto.randomUUID(),
          clientId: client.id,
          name: "ACTR-941-2020-Q1",
          status: "Error",
          type: "Account",
          taxPeriod: "2020 Q1",
          requestedOn: "2025-02-10"
        },
        {
          id: crypto.randomUUID(),
          clientId: client.id,
          name: "ACTR-941-2020-Q3",
          status: "Ready",
          type: "Account",
          taxPeriod: "2020 Q3",
          requestedOn: "2025-02-10"
        }
      ]);
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
