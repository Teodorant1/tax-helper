CREATE TABLE IF NOT EXISTS "actual_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) DEFAULT 'user' NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" varchar(255) DEFAULT 'user' NOT NULL,
	CONSTRAINT "actual_user_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "actual_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "alert" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"client_id" varchar(255) NOT NULL,
	"type" text NOT NULL,
	"client_type" text NOT NULL,
	"tax_id" text NOT NULL,
	"alert" text NOT NULL,
	"tax_period" text NOT NULL,
	"alert_date" text NOT NULL,
	"transaction_date" text NOT NULL,
	"amount" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "client" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"name" text NOT NULL,
	"tax_id" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"status" text NOT NULL,
	"last_filing" text NOT NULL,
	"next_filing" text NOT NULL,
	"pending_tasks" integer DEFAULT 0 NOT NULL,
	"alert_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "document" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"client_id" varchar(255) NOT NULL,
	"name" text NOT NULL,
	"status" text NOT NULL,
	"type" text NOT NULL,
	"tax_period" text NOT NULL,
	"requested_on" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "erc_event" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"transaction_id" varchar(255) NOT NULL,
	"irs_tracking" text NOT NULL,
	"form_941x_received_date" text NOT NULL,
	"form_941x_forward_date" text NOT NULL,
	"refund_approved_date" text NOT NULL,
	"refund_paid_date" text NOT NULL,
	"examination_indicator" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "erc_transaction" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"client_id" varchar(255) NOT NULL,
	"irs_tracking" text NOT NULL,
	"filed" boolean NOT NULL,
	"client_entered_erc_claim" text NOT NULL,
	"approved_erc_amount" text NOT NULL,
	"interest_accrued" text NOT NULL,
	"adjustments" text NOT NULL,
	"total_refund_processed" text NOT NULL,
	"total_erc_pending" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "logo" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tax_history_entry" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"client_id" varchar(255) NOT NULL,
	"period" text NOT NULL,
	"return_filed" text NOT NULL,
	"principal_tax" text NOT NULL,
	"interest" text NOT NULL,
	"penalties" text NOT NULL,
	"payments_and_credits" text NOT NULL,
	"refunds" text NOT NULL,
	"balance" text NOT NULL,
	"type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "theme_colors" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"primary" text NOT NULL,
	"secondary" text NOT NULL,
	"accent" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "theme_config" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"light_theme_id" varchar(255) NOT NULL,
	"dark_theme_id" varchar(255) NOT NULL,
	"is_light_theme" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"client_id" varchar(255) NOT NULL,
	"type" text NOT NULL,
	"date" text NOT NULL,
	"form" text NOT NULL,
	"tax_period" text NOT NULL,
	"amount" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ui_config" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"sidebar_title" text DEFAULT 'TaxNow PRO' NOT NULL,
	"sidebar_logo_id" varchar(255),
	"greeting_title" text DEFAULT 'TaxNow PRO' NOT NULL,
	"greeting_subtitle" text DEFAULT 'Your modern tax management solution' NOT NULL,
	"greeting_logo_id" varchar(255),
	"layout_border_radius" text DEFAULT '0.5rem' NOT NULL,
	"layout_density" text DEFAULT 'comfortable' NOT NULL,
	"sidebar_width" integer DEFAULT 280 NOT NULL,
	"base_font_size" text DEFAULT '1rem' NOT NULL,
	"animation_speed" text DEFAULT 'default' NOT NULL,
	CONSTRAINT "ui_config_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "alert" ADD CONSTRAINT "alert_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client" ADD CONSTRAINT "client_user_id_actual_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."actual_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document" ADD CONSTRAINT "document_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "erc_event" ADD CONSTRAINT "erc_event_transaction_id_erc_transaction_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."erc_transaction"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "erc_transaction" ADD CONSTRAINT "erc_transaction_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tax_history_entry" ADD CONSTRAINT "tax_history_entry_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "theme_config" ADD CONSTRAINT "theme_config_user_id_actual_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."actual_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "theme_config" ADD CONSTRAINT "theme_config_light_theme_id_theme_colors_id_fk" FOREIGN KEY ("light_theme_id") REFERENCES "public"."theme_colors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "theme_config" ADD CONSTRAINT "theme_config_dark_theme_id_theme_colors_id_fk" FOREIGN KEY ("dark_theme_id") REFERENCES "public"."theme_colors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction" ADD CONSTRAINT "transaction_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ui_config" ADD CONSTRAINT "ui_config_user_id_actual_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."actual_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ui_config" ADD CONSTRAINT "ui_config_sidebar_logo_id_logo_id_fk" FOREIGN KEY ("sidebar_logo_id") REFERENCES "public"."logo"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ui_config" ADD CONSTRAINT "ui_config_greeting_logo_id_logo_id_fk" FOREIGN KEY ("greeting_logo_id") REFERENCES "public"."logo"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
