import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

// Hero Section
export const heroSection = pgTable("hero_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  resume: text("resume"),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Documents (Generic)
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  fileUrl: text("file_url").notNull(),
});

// Tech Stack (Generic)
export const techStack = pgTable("tech_stack", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  section: text("section").notNull(),
  desc: text("desc"),
  url: text("url"),
  icon: text("icon").notNull(),
});

// Social Links (Generic)
export const socialLink = pgTable("social_link", {
  id: serial("id").primaryKey(),
  title: text("title").notNull().unique(),
  section: text("section").notNull(),
  desc: text("desc"),
  url: text("url").notNull(),
  icon: text("icon").notNull(),
});

// Junction Table: Hero ↔ SocialLink
export const hero_social_link = pgTable("hero_social_link", {
  heroId: integer("hero_id")
    .references(() => heroSection.id)
    .notNull(),
  socialId: integer("social_id")
    .references(() => socialLink.id)
    .notNull(),
});

// Junction Table: Hero ↔ TechStack
export const hero_tech_stack = pgTable("hero_tech_stack", {
  heroId: integer("hero_id")
    .references(() => heroSection.id)
    .notNull(),
  techId: integer("tech_id")
    .references(() => techStack.id)
    .notNull(),
});
// About section
export const aboutSection = pgTable("about_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  desc: text("desc").notNull(),
  img: text("img").notNull(),
  link: text("link"),
  linkTitle: text("link_title"),
  descPosition: text("desc_position"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});
// Experience section
export const experienceSection = pgTable("experience_section", {
  id: serial("id").primaryKey(),
  jobPosition: text("job_position").notNull(),
  companyName: text("company_name").notNull(),
  desc: text("desc").notNull(),
  location: text("location").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  companyLink: text("company_link"),
  order: integer("order").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});
// Contact section
export const contactSection = pgTable("contact_section", {
  id: serial("id").primaryKey(),
  icon: text("icon").notNull(),
  title: text("title").notNull().unique(),
  desc: text("desc").notNull(),
  link: text("link"),
  order: integer("order").notNull().unique(),
});
