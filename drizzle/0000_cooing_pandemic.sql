CREATE TABLE "about_section" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"desc" text NOT NULL,
	"img" text NOT NULL,
	"link" text,
	"link_title" text,
	"desc_position" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_section" (
	"id" serial PRIMARY KEY NOT NULL,
	"icon" text NOT NULL,
	"title" text NOT NULL,
	"desc" text NOT NULL,
	"link" text,
	"order" integer NOT NULL,
	CONSTRAINT "contact_section_title_unique" UNIQUE("title"),
	CONSTRAINT "contact_section_order_unique" UNIQUE("order")
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"file_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experience_section" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_position" text NOT NULL,
	"company_name" text NOT NULL,
	"desc" text NOT NULL,
	"location" text NOT NULL,
	"start_date" text NOT NULL,
	"end_date" text NOT NULL,
	"company_link" text,
	"order" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "experience_section_order_unique" UNIQUE("order")
);
--> statement-breakpoint
CREATE TABLE "hero_section" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"resume" text,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hero_social_link" (
	"hero_id" integer NOT NULL,
	"social_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hero_tech_stack" (
	"hero_id" integer NOT NULL,
	"tech_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_link" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"section" text NOT NULL,
	"desc" text,
	"url" text NOT NULL,
	"icon" text NOT NULL,
	CONSTRAINT "social_link_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "tech_stack" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"section" text NOT NULL,
	"desc" text,
	"url" text,
	"icon" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hero_social_link" ADD CONSTRAINT "hero_social_link_hero_id_hero_section_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."hero_section"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hero_social_link" ADD CONSTRAINT "hero_social_link_social_id_social_link_id_fk" FOREIGN KEY ("social_id") REFERENCES "public"."social_link"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hero_tech_stack" ADD CONSTRAINT "hero_tech_stack_hero_id_hero_section_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."hero_section"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hero_tech_stack" ADD CONSTRAINT "hero_tech_stack_tech_id_tech_stack_id_fk" FOREIGN KEY ("tech_id") REFERENCES "public"."tech_stack"("id") ON DELETE no action ON UPDATE no action;