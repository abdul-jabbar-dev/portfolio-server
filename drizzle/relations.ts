import { relations } from "drizzle-orm/relations";
import * as schema from "./schema.ts";

// Hero ↔ Documents, SocialLinks, TechStack
export const heroRelations = relations(schema.heroSection, ({ one, many }) => ({
 
  // Hero ↔ SocialLinks (one-to-many via junction table)
  heroSocialLinks: many(schema.hero_social_link),

  // Hero ↔ TechStack (one-to-many via junction table)
  heroTechStack: many(schema.hero_tech_stack),
}));
