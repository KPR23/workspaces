DO $$ BEGIN
 CREATE TYPE "public"."availability_status" AS ENUM('OFF', 'TOTAL', 'CUSTOM');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "availability" (
	"employee_id" integer NOT NULL,
	"cinema_week_id" integer NOT NULL,
	"date" date NOT NULL,
	"status" "availability_status" DEFAULT 'OFF' NOT NULL,
	"start_time" time,
	"end_time" time,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pk_availability" PRIMARY KEY("employee_id","cinema_week_id","date")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cinema_week" (
	"id" serial PRIMARY KEY NOT NULL,
	"start_week" date NOT NULL,
	"end_week" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "cinema_week_start_week_unique" UNIQUE("start_week"),
	CONSTRAINT "cinema_week_end_week_unique" UNIQUE("end_week")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"provider_id" text DEFAULT 'magic-link' NOT NULL,
	"account_id" text DEFAULT 'primary' NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "employees" ALTER COLUMN "first_name" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "employees" ALTER COLUMN "last_name" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "employees" ALTER COLUMN "email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "employees" ALTER COLUMN "phone" SET DATA TYPE varchar(9);--> statement-breakpoint
ALTER TABLE "employees" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "avatar" text;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "user_id" text;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "invitation_token" text;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "invitation_expires" timestamp;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "availability" ADD CONSTRAINT "availability_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "availability" ADD CONSTRAINT "availability_cinema_week_id_cinema_week_id_fk" FOREIGN KEY ("cinema_week_id") REFERENCES "public"."cinema_week"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "employees" DROP COLUMN IF EXISTS "hire_date";--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_invitation_token_unique" UNIQUE("invitation_token");