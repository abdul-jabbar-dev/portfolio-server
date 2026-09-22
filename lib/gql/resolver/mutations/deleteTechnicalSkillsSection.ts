import db from "../../../../db/index.ts";
import { technicalSkillsSection, technical_skills_tech_stack } from "../../../../drizzle/schema.ts";
import { eq } from "drizzle-orm";

export const deleteTechnicalSkillsSection = async (
  _: any,
  args: { id: string },
  context: any
) => {
  if (!context?.user) {
    throw new Error("Unauthorized! You must be logged in.");
  }

  try {
    const id = Number(args.id);
    
    // 1. Delete associated tech stack relationships first (due to foreign key constraints)
    await db
      .delete(technical_skills_tech_stack)
      .where(eq(technical_skills_tech_stack.technicalSkillsFieldId, id));

    // 2. Delete the section itself
    const deleted = await db
      .delete(technicalSkillsSection)
      .where(eq(technicalSkillsSection.id, id))
      .returning();

    if (!deleted || deleted.length === 0) {
      throw new Error(`Technical Skills Section with ID ${id} not found.`);
    }

    return true;
  } catch (err) {
    console.error("Delete Technical Skills error:", err);
    throw new Error("Failed to delete Technical Skills Section: " + (err as any)?.message!);
  }
};
