DO $$ BEGIN
 CREATE TYPE "public"."employee_position" AS ENUM('OBSLUGA', 'BAR', 'KAWIARNIA', 'KIEROWNIK', 'DYREKTOR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."employee_status" AS ENUM('ACTIVE', 'INACTIVE', 'DISMISSED', 'ON_LEAVE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employees" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"address" text NOT NULL,
	"hire_date" timestamp DEFAULT now() NOT NULL,
	"status" "employee_status" NOT NULL,
	"positions" employee_position[] DEFAULT '{"OBSLUGA"}' NOT NULL,
	CONSTRAINT "employees_email_unique" UNIQUE("email")
);
