import {
  technicalSkillsSection,
  technical_skills_tech_stack,
  techStack,
} from "../../../../drizzle/schema.ts";
import db from "../../../../db/index.ts";
import { eq, inArray } from "drizzle-orm";

export const technicalSkillsQuery = async () => {
  // 1️⃣ Main TechnicalSkills section গুলো আনো
  const sections = await db
    .select()
    .from(technicalSkillsSection)
    .orderBy(technicalSkillsSection.order);

  if (!sections?.length) {
    throw new Error("❌ No technical skills section data found!");
  }

  // 2️⃣ প্রতিটা section এর জন্য related tech stack আনো
  const sectionWithStacks = await Promise.all(
    sections.map(async (section) => {
      // related tech_stack ids fetch করো
      const techLinks = await db
        .select()
        .from(technical_skills_tech_stack)
        .where(
          eq(technical_skills_tech_stack.technicalSkillsFieldId, section.id)
        );

      // 3️⃣ এখন tech_stack টেবিল থেকে ওই IDs অনুযায়ী data আনো
      const techStackIds = techLinks.map((link) => link.techStackId);

      const stacks = techStackIds.length
        ? await db
            .select()
            .from(techStack)
            .where(inArray(techStack.id, techStackIds))
        : [];

      // 4️⃣ optional: order বা skillsPercentage থাকলে junction table থেকে নাও
      const techStacksWithExtra = stacks.map((stack) => {
        const meta = techLinks.find((link) => link.techStackId === stack.id);
        return {
          ...stack,
          skillsPercentage: meta?.skillsPercentage ?? 0,
          order: meta?.order ?? 0,
        };
      });

      return {
        ...section,
        techStack: techStacksWithExtra,
      };
    })
  );

  return sectionWithStacks;
};
