CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text,
	"otp" text,
	"otp_expires_at" timestamp,
	"name" text,
	"phone" text,
	"token" text,
	"permissions" text[],
	"metadata" jsonb,
	"status" text DEFAULT 'active',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX "unique_email" ON "users" USING btree ("email");