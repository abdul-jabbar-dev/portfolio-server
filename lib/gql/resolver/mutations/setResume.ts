import { eq } from "drizzle-orm";
import db from "../../../../db/index.ts";
import { heroSection } from "../../../../drizzle/schema.ts";

export const setResume = async (
  _: any,
  args: { resume: string },
  context: any
) => {
  if (!context?.user) {
    throw new Error("Unauthorized! You must be logged in.");
  }
  try {
    const existing = await db.select().from(heroSection);
    // update existing row
    const updated = await db
      .update(heroSection)
      .set({
        resume: args.resume,
      })
      .where(eq(heroSection.id, existing[0].id)) // এখানে eq() ব্যবহার
      .returning();
    return updated[0];
  } catch (err) {
    console.error("Insert/Update error:", err);
    throw new Error("Failed to set HeroSection: " + (err as any)?.message!);
  }
};
