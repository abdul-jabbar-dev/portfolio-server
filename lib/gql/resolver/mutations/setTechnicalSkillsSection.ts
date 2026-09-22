import db from "../../../../db/index.ts";
import { technicalSkillsSection, technical_skills_tech_stack } from "../../../../drizzle/schema.ts";
import { eq } from "drizzle-orm";

export const setTechnicalSkillsSection = async (
  _: any,
  args: {
    technicalSkillsSection: {
      id?: string;
      icon?: string;
      iconStr?: string;
      fieldName: string;
      desc: string;
      link?: string;
      order: number;
      techStack?: { techStackId: string; order: number; skillsPercentage: number }[];
    }
  },
  context: any
) => {
  if (!context?.user) {
    throw new Error("Unauthorized! You must be logged in.");
  }

  try {
    const input = args.technicalSkillsSection;
    let sectionId = input.id ? Number(input.id) : null;

    if (sectionId) {
      // Update existing section
      await db
        .update(technicalSkillsSection)
        .set({
          icon: input.icon,
          iconStr: input.iconStr || input.icon,
          fieldName: input.fieldName,
          desc: input.desc,
          link: input.link,
          order: input.order,
        })
        .where(eq(technicalSkillsSection.id, sectionId));

      // Delete existing technical_skills_tech_stack relations
      await db
        .delete(technical_skills_tech_stack)
        .where(eq(technical_skills_tech_stack.technicalSkillsFieldId, sectionId));
    } else {
      // Insert new section
      const [inserted] = await db
        .insert(technicalSkillsSection)
        .values({
          icon: input.icon,
          iconStr: input.iconStr || input.icon,
          fieldName: input.fieldName,
          desc: input.desc,
          link: input.link,
          order: input.order,
        })
        .returning();
      
      sectionId = inserted.id;
    }

    // Insert new techStack relations
    if (input.techStack && input.techStack.length > 0) {
      const links = input.techStack.map((item) => ({
        technicalSkillsFieldId: sectionId as number,
        techStackId: Number(item.techStackId),
        order: item.order,
        skillsPercentage: item.skillsPercentage,
      }));

      await db.insert(technical_skills_tech_stack).values(links);
    }

    // Return partial matching object
    return {
      id: sectionId,
      icon: input.icon,
      iconStr: input.iconStr || input.icon,
      fieldName: input.fieldName,
      desc: input.desc,
      link: input.link,
      order: input.order,
      techStack: []
    };
  } catch (err) {
    console.error("Insert/Update error:", err);
    throw new Error(
      "Failed to set TechnicalSkillsSection: " + (err as any)?.message!
    );
  }
};
