import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  jsonb,
  uniqueIndex,
} from "drizzle-orm/pg-core";

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

// Social Links (Generic)
export const socialLink = pgTable("social_link", {
  id: serial("id").primaryKey(),
  title: text("title").notNull().unique(),
  section: text("section").notNull(),
  desc: text("desc"),
  url: text("url").notNull(),
  icon: text("icon").notNull(),
  iconStr: text("icon_str"),
});

// Tech Stack (Generic)
export const techStack = pgTable("tech_stack", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  section: text("section").notNull(),
  desc: text("desc"),
  url: text("url"),
  icon: text("icon").notNull(),
  iconStr: text("icon_str"),
});

// Social Links (Generic)
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  img: text("img").notNull(),
  title: text("title").notNull().unique(),
  section: text("section").notNull(),
  desc: text("desc").notNull(),
  projectTools: text("project_tools").array().default([]),
});

// Junction Table: Hero ↔ SocialLink
export const project_tech_stack = pgTable("project_tech_stack", {
  id: serial("id").primaryKey(),
  order: integer("order").notNull(),
  projectId: integer("project_id")
    .references(() => projects.id)
    .notNull(),
  techId: integer("tech_id")
    .references(() => techStack.id)
    .notNull(),
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
  iconStr: text("icon_str"),
  icon: text("icon").notNull(),
  title: text("title").notNull().unique(),
  desc: text("desc").notNull(),
  link: text("link"),
  order: integer("order").notNull().unique(),
});
// TechnicalSkills section
export const technicalSkillsSection = pgTable("technical_skills_section", {
  id: serial("id").primaryKey(),
  icon: text("icon"),
  iconStr: text("icon_str"),
  fieldName: text("field_name").notNull().unique(),
  desc: text("desc").notNull(),
  link: text("link"),
  order: integer("order").notNull().unique(),
});
// Junction Table: TechnicalSkills ↔ TechStack
export const technical_skills_tech_stack = pgTable(
  "technical_skills_tech_stack",
  {
    technicalSkillsFieldId: integer("technical_skills_field_id")
      .references(() => technicalSkillsSection.id)
      .notNull(),
    techStackId: integer("tech_stack_id")
      .references(() => techStack.id)
      .notNull(),
    order: integer("order").notNull(),
    skillsPercentage: integer("skills_percentage").notNull(),
  }
);

// Define possible enum values
const USER_TYPE = ["me", "notMe"] as const;
const USER_STATUS = ["active", "blocked"] as const;

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    type: text("type").notNull(), // enum: "me" | "notMe"
    email: text("email").notNull(),
    passwordHash: text("password_hash"),
    otp: text("otp"),
    otpExpiresAt: timestamp("otp_expires_at"),
    name: text("name"),
    phone: text("phone"),
    token: text("token"),
    permissions: text("permissions").array(),
    metadata: text("metadata"), // files, images, pdf info
    status: text("status").default("active"), // enum: "active" | "blocked"
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    uniqueEmail: uniqueIndex("unique_email").on(table.email),
    // Conditional checks
    checkMePassword: `CHECK ((type = 'me' AND password_hash IS NOT NULL) OR type = 'notMe')`,
    checkNotMeEmail: `CHECK ((type = 'notMe' AND email IS NOT NULL) OR type = 'me')`,
    checkNotMeNamePhone: `CHECK ((type = 'notMe' AND name IS NOT NULL AND phone IS NOT NULL) OR type = 'me')`,
    checkTypeEnum: `CHECK (type IN ('${USER_TYPE.join("','")}'))`,
    checkStatusEnum: `CHECK (status IN ('${USER_STATUS.join("','")}'))`,
  })
);
