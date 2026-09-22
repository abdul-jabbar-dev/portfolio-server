CREATE TABLE "project_tech_stack" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer NOT NULL,
	"project_id" integer NOT NULL,
	"tech_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"section" text NOT NULL,
	"desc" text NOT NULL,
	"project_tools" text[] DEFAULT '{}',
	CONSTRAINT "projects_title_unique" UNIQUE("title")
);
--> statement-breakpoint
ALTER TABLE "project_tech_stack" ADD CONSTRAINT "project_tech_stack_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_tech_stack" ADD CONSTRAINT "project_tech_stack_tech_id_tech_stack_id_fk" FOREIGN KEY ("tech_id") REFERENCES "public"."tech_stack"("id") ON DELETE no action ON UPDATE no action;