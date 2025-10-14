import {
  heroSection,
  socialLink,
  techStack,
} from "../../../../drizzle/schema.ts";
import db from "../../../../db/index.ts";
import { eq } from "drizzle-orm";

export const heroQuery = async () => {
  // 1️⃣ Hero section থেকে ডেটা নাও
  const getHeroData = await db.select().from(heroSection).limit(1);
  const hero = getHeroData[0];

  if (!hero) {
    throw new Error("❌ No hero section data found!");
  }

  // 2️⃣ Social links আনো যেখানে section = 'hero_section'
  const socialLinks = await db
    .select()
    .from(socialLink)
    .where(eq(socialLink.section, "hero_section"));

  // 3️⃣ একসাথে merge করে return করো
  // 2️⃣ Social links আনো যেখানে section = 'hero_section'
  const techStacks = await db
    .select()
    .from(techStack)
    .where(eq(techStack.section, "hero_section"));

  // 3️⃣ একসাথে merge করে return করো
  return {
    ...hero,
    socialLinks,
    techStack:techStacks,
  };
};
