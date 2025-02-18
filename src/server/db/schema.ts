import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`);

// Define the domain table
export const domain = createTable("domain", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  boss_userId: varchar("user_id", { length: 255 })
    .notNull()
    .unique()
    .default("user"),
  name: varchar("name", { length: 255 }).notNull(),
  proAccountId: varchar("pro_account_id", { length: 255 }) // FK to pro_account
    .notNull()
    .references(() => pro_account.id), // A domain must be linked to a pro account
});

// Define the pro_account table
export const pro_account = createTable("pro_account", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 255 })
    .unique()
    .default("user")
    .references(() => actual_user.userId),
  name: varchar("name", { length: 255 }).notNull(),
});

// Create the explicit relationship between pro_account and domain
export const proAccountRelations = relations(pro_account, ({ many }) => ({
  domains: many(domain), // Direct many-to-one relationship using foreign key `proAccountId`
}));

export const domainRelations = relations(domain, ({ one }) => ({
  proAccount: one(pro_account, {
    fields: [domain.proAccountId],
    references: [pro_account.id],
  }),
}));

export const actual_user = createTable("actual_user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .unique()
    .default("user"),
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: varchar("role", { length: 255 }).notNull().default("user"),
});

// Client-related tables
export const clients = createTable("client", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => actual_user.userId),
  name: text("name").notNull(),
  taxId: text("tax_id").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  status: text("status", { enum: ["Active", "Pending", "Inactive"] }).notNull(),
  lastFiling: text("last_filing").notNull(),
  nextFiling: text("next_filing").notNull(),
  pendingTasks: integer("pending_tasks").notNull().default(0),
  alertCount: integer("alert_count").notNull().default(0),
});

export const alerts = createTable("alert", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  clientId: varchar("client_id", { length: 255 })
    .notNull()
    .references(() => clients.id),
  type: text("type", { enum: ["warning", "info"] }).notNull(),
  clientType: text("client_type").notNull(),
  taxId: text("tax_id").notNull(),
  alert: text("alert").notNull(),
  taxPeriod: text("tax_period").notNull(),
  alertDate: text("alert_date").notNull(),
  transactionDate: text("transaction_date").notNull(),
  amount: text("amount").notNull(),
});

export const transactions = createTable("transaction", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  clientId: varchar("client_id", { length: 255 })
    .notNull()
    .references(() => clients.id),
  type: text("type").notNull(),
  date: text("date").notNull(),
  form: text("form").notNull(),
  taxPeriod: text("tax_period").notNull(),
  amount: text("amount").notNull(),
});

// UI Configuration tables
export const logos = createTable("logo", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  type: text("type", { enum: ["url", "upload"] }).notNull(),
  value: text("value").notNull(),
});

export const uiConfigs = createTable("ui_config", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => actual_user.userId)
    .unique(),
  sidebarTitle: text("sidebar_title").notNull().default("TaxNow PRO"),
  sidebarLogoId: varchar("sidebar_logo_id", { length: 255 }).references(
    () => logos.id,
  ),
  greetingTitle: text("greeting_title").notNull().default("TaxNow PRO"),
  greetingSubtitle: text("greeting_subtitle")
    .notNull()
    .default("Your modern tax management solution"),
  greetingLogoId: varchar("greeting_logo_id", { length: 255 }).references(
    () => logos.id,
  ),
  layoutBorderRadius: text("layout_border_radius").notNull().default("0.5rem"),
  layoutDensity: text("layout_density", {
    enum: ["comfortable", "compact", "spacious"],
  })
    .notNull()
    .default("comfortable"),
  sidebarWidth: integer("sidebar_width").notNull().default(280),
  baseFontSize: text("base_font_size").notNull().default("1rem"),
  animationSpeed: text("animation_speed", {
    enum: ["slower", "default", "faster"],
  })
    .notNull()
    .default("default"),
});

// Theme Configuration tables
export const themeColors = createTable("theme_colors", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  primary: text("primary").notNull(),
  secondary: text("secondary").notNull(),
  accent: text("accent").notNull(),
});

export const themeConfigs = createTable("theme_config", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => actual_user.userId),
  lightThemeId: varchar("light_theme_id", { length: 255 })
    .notNull()
    .references(() => themeColors.id),
  darkThemeId: varchar("dark_theme_id", { length: 255 })
    .notNull()
    .references(() => themeColors.id),
  is_light_theme: boolean("is_light_theme").default(false).notNull(),
});

export const actual_userRelations = relations(actual_user, ({ many }) => ({
  clients: many(clients),
  uiConfigs: many(uiConfigs),
  themeConfigs: many(themeConfigs),
}));

// Tax History Models
export const taxHistoryEntries = createTable("tax_history_entry", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  clientId: varchar("client_id", { length: 255 })
    .notNull()
    .references(() => clients.id),
  period: text("period").notNull(),
  returnFiled: text("return_filed").notNull(),
  principalTax: text("principal_tax").notNull(),
  interest: text("interest").notNull(),
  penalties: text("penalties").notNull(),
  paymentsAndCredits: text("payments_and_credits").notNull(),
  refunds: text("refunds").notNull(),
  balance: text("balance").notNull(),
  type: text("type", { enum: ["income", "employment"] }).notNull(),
});

// ERC Tracker Models
export const ercTransactions = createTable("erc_transaction", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  clientId: varchar("client_id", { length: 255 })
    .notNull()
    .references(() => clients.id),
  irsTracking: text("irs_tracking").notNull(),
  filed: boolean("filed").notNull(),
  clientEnteredErcClaim: text("client_entered_erc_claim").notNull(),
  approvedErcAmount: text("approved_erc_amount").notNull(),
  interestAccrued: text("interest_accrued").notNull(),
  adjustments: text("adjustments").notNull(),
  totalRefundProcessed: text("total_refund_processed").notNull(),
  totalErcPending: text("total_erc_pending").notNull(),
});

export const ercEvents = createTable("erc_event", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  transactionId: varchar("transaction_id", { length: 255 })
    .notNull()
    .references(() => ercTransactions.id),
  irsTracking: text("irs_tracking").notNull(),
  form941xReceivedDate: text("form_941x_received_date").notNull(),
  form941xForwardDate: text("form_941x_forward_date").notNull(),
  refundApprovedDate: text("refund_approved_date").notNull(),
  refundPaidDate: text("refund_paid_date").notNull(),
  examinationIndicator: text("examination_indicator"),
});

// Documents Model
export const documents = createTable("document", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  clientId: varchar("client_id", { length: 255 })
    .notNull()
    .references(() => clients.id),
  name: text("name").notNull(),
  status: text("status", { enum: ["Ready", "Error"] }).notNull(),
  type: text("type").notNull(),
  taxPeriod: text("tax_period").notNull(),
  requestedOn: text("requested_on").notNull(),
});

// export const posts = createTable(
//   "post",
//   {
//     id: integer("id").primaryKey(),
//     name: varchar("name", { length: 256 }),
//     createdById: varchar("created_by", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     createdAt: timestamp("created_at", { withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
//       () => new Date(),
//     ),
//   },
//   (example) => ({
//     createdByIdIdx: index("created_by_idx").on(example.createdById),
//     nameIndex: index("name_idx").on(example.name),
//   }),
// );

// export const users = createTable("user", {
//   id: varchar("id", { length: 255 })
//     .notNull()
//     .primaryKey()
//     .$defaultFn(() => crypto.randomUUID()),
//   name: varchar("name", { length: 255 }),
//   email: varchar("email", { length: 255 }).notNull(),
//   emailVerified: timestamp("email_verified", {
//     mode: "date",
//     withTimezone: true,
//   }).default(sql`CURRENT_TIMESTAMP`),
//   image: varchar("image", { length: 255 }),
// });

// export const usersRelations = relations(users, ({ many }) => ({
//   accounts: many(accounts),
// }));

// export const accounts = createTable(
//   "account",
//   {
//     userId: varchar("user_id", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     type: varchar("type", { length: 255 })
//       .notNull(),
//     provider: varchar("provider", { length: 255 }).notNull(),
//     providerAccountId: varchar("provider_account_id", {
//       length: 255,
//     }).notNull(),
//     refresh_token: text("refresh_token"),
//     access_token: text("access_token"),
//     expires_at: integer("expires_at"),
//     token_type: varchar("token_type", { length: 255 }),
//     scope: varchar("scope", { length: 255 }),
//     id_token: text("id_token"),
//     session_state: varchar("session_state", { length: 255 }),
//   },
//   (account) => ({
//     compoundKey: primaryKey({
//       columns: [account.provider, account.providerAccountId],
//     }),
//     userIdIdx: index("account_user_id_idx").on(account.userId),
//   }),
// );

// export const accountsRelations = relations(accounts, ({ one }) => ({
//   user: one(users, { fields: [accounts.userId], references: [users.id] }),
// }));

// export const sessions = createTable(
//   "session",
//   {
//     sessionToken: varchar("session_token", { length: 255 })
//       .notNull()
//       .primaryKey(),
//     userId: varchar("user_id", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     expires: timestamp("expires", {
//       mode: "date",
//       withTimezone: true,
//     }).notNull(),
//   },
//   (session) => ({
//     userIdIdx: index("session_user_id_idx").on(session.userId),
//   }),
// );

// export const sessionsRelations = relations(sessions, ({ one }) => ({
//   user: one(users, { fields: [sessions.userId], references: [users.id] }),
// }));

// export const verificationTokens = createTable(
//   "verification_token",
//   {
//     identifier: varchar("identifier", { length: 255 }).notNull(),
//     token: varchar("token", { length: 255 }).notNull(),
//     expires: timestamp("expires", {
//       mode: "date",
//       withTimezone: true,
//     }).notNull(),
//   },
//   (vt) => ({
//     compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
//   }),
// );

// Relations
export const clientsRelations = relations(clients, ({ one, many }) => ({
  user: one(actual_user, {
    fields: [clients.userId],
    references: [actual_user.userId],
  }),
  taxHistory: many(taxHistoryEntries),
  ercTransactions: many(ercTransactions),
  documents: many(documents),
  alerts: many(alerts),
  transactions: many(transactions),
}));

export const uiConfigsRelations = relations(uiConfigs, ({ one }) => ({
  user: one(actual_user, {
    fields: [uiConfigs.userId],
    references: [actual_user.userId],
  }),
  sidebarLogo: one(logos, {
    fields: [uiConfigs.sidebarLogoId],
    references: [logos.id],
  }),
  greetingLogo: one(logos, {
    fields: [uiConfigs.greetingLogoId],
    references: [logos.id],
  }),
}));

export const themeConfigsRelations = relations(themeConfigs, ({ one }) => ({
  user: one(actual_user, {
    fields: [themeConfigs.userId],
    references: [actual_user.userId],
  }),
  lightTheme: one(themeColors, {
    fields: [themeConfigs.lightThemeId],
    references: [themeColors.id],
  }),
  darkTheme: one(themeColors, {
    fields: [themeConfigs.darkThemeId],
    references: [themeColors.id],
  }),
}));

export const alertsRelations = relations(alerts, ({ one }) => ({
  client: one(clients, {
    fields: [alerts.clientId],
    references: [clients.id],
  }),
}));

export const taxHistoryRelations = relations(taxHistoryEntries, ({ one }) => ({
  client: one(clients, {
    fields: [taxHistoryEntries.clientId],
    references: [clients.id],
  }),
}));

export const ercTransactionsRelations = relations(
  ercTransactions,
  ({ one, many }) => ({
    client: one(clients, {
      fields: [ercTransactions.clientId],
      references: [clients.id],
    }),
    events: many(ercEvents),
  }),
);

export const transactionsRelations = relations(transactions, ({ one }) => ({
  client: one(clients, {
    fields: [transactions.clientId],
    references: [clients.id],
  }),
}));

export const ercEventsRelations = relations(ercEvents, ({ one }) => ({
  transaction: one(ercTransactions, {
    fields: [ercEvents.transactionId],
    references: [ercTransactions.id],
  }),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  client: one(clients, {
    fields: [documents.clientId],
    references: [clients.id],
  }),
}));

// Type Exports
export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;

export type Alert = typeof alerts.$inferSelect;
export type NewAlert = typeof alerts.$inferInsert;

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;

export type Logo = typeof logos.$inferSelect;
export type NewLogo = typeof logos.$inferInsert;

export type UIConfig = typeof uiConfigs.$inferSelect;
export type NewUIConfig = typeof uiConfigs.$inferInsert;

export type ThemeColors = typeof themeColors.$inferSelect;
export type NewThemeColors = typeof themeColors.$inferInsert;

export type ThemeConfig = typeof themeConfigs.$inferSelect;
export type NewThemeConfig = typeof themeConfigs.$inferInsert;

export type TaxHistoryEntry = typeof taxHistoryEntries.$inferSelect;
export type NewTaxHistoryEntry = typeof taxHistoryEntries.$inferInsert;

export type ErcTransaction = typeof ercTransactions.$inferSelect;
export type NewErcTransaction = typeof ercTransactions.$inferInsert;

export type ErcEvent = typeof ercEvents.$inferSelect;
export type NewErcEvent = typeof ercEvents.$inferInsert;

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;

export type actual_userv2 = typeof actual_user.$inferSelect;
export type Newactual_userv2 = typeof actual_user.$inferInsert;
// Complete types that include relationships
export type CompleteUIConfig = UIConfig & {
  sidebarLogo: Logo | null;
  greetingLogo: Logo | null;
};

export type CompleteThemeConfig = ThemeConfig & {
  lightTheme: NewThemeColors;
  darkTheme: NewThemeColors;
};
