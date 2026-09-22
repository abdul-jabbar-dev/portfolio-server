import db from "../../../../db/index.ts";
import { experienceSection } from "../../../../drizzle/schema.ts";
import { eq } from "drizzle-orm";

export const deleteExperience = async (
  _: any,
  args: { id: string },
  context: any
) => {
  if (!context?.user) {
    throw new Error("Unauthorized! You must be logged in.");
  }

  try {
    await db.delete(experienceSection).where(eq(experienceSection.id, Number(args.id)));
    return true;
  } catch (err) {
    console.error("Delete experience error:", err);
    throw new Error("Failed to delete experience");
  }
};
