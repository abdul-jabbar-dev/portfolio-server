import { eq } from "drizzle-orm";
import db from "../../../../db/index.ts";
import { heroSection } from "../../../../drizzle/schema.ts";

export const setHeroSection = async (
  _: any,
  args: { title: string; description: string; image: string },
  context: any
) => {
  if (!context?.user) {
    throw new Error("Unauthorized! You must be logged in.");
  }

  try {
    const existing = await db.select().from(heroSection);
    if (existing.length > 0) {
      // update existing row
      const updated = await db
        .update(heroSection)
        .set({
          title: args.title,
          description: args.description,
          image: args.image,
        })
        .where(eq(heroSection.id, existing[0].id)) // এখানে eq() ব্যবহার
        .returning();
      return updated[0];
    } else {
      // insert new row
      const inserted = await db
        .insert(heroSection)
        .values({
          title: args.title,
          description: args.description,
          image: args.image,
        })
        .returning();
      return inserted[0];
    }
  } catch (err) {
    console.error("Insert/Update error:", err);
    throw new Error("Failed to set HeroSection: " + (err as any)?.message!);
  }
};
