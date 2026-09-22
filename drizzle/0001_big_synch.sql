CREATE TABLE "technical_skills_section" (
	"id" serial PRIMARY KEY NOT NULL,
	"icon" text,
	"field_name" text NOT NULL,
	"desc" text NOT NULL,
	"link" text,
	"order" integer NOT NULL,
	CONSTRAINT "technical_skills_section_field_name_unique" UNIQUE("field_name"),
	CONSTRAINT "technical_skills_section_order_unique" UNIQUE("order")
);
--> statement-breakpoint
CREATE TABLE "technical_skills_tech_stack" (
	"technical_skills_field_id" integer NOT NULL,
	"tech_stack_id" integer NOT NULL,
	"order" integer NOT NULL,
	CONSTRAINT "technical_skills_tech_stack_order_unique" UNIQUE("order")
);
--> statement-breakpoint
ALTER TABLE "technical_skills_tech_stack" ADD CONSTRAINT "technical_skills_tech_stack_technical_skills_field_id_technical_skills_section_id_fk" FOREIGN KEY ("technical_skills_field_id") REFERENCES "public"."technical_skills_section"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "technical_skills_tech_stack" ADD CONSTRAINT "technical_skills_tech_stack_tech_stack_id_tech_stack_id_fk" FOREIGN KEY ("tech_stack_id") REFERENCES "public"."tech_stack"("id") ON DELETE no action ON UPDATE no action;