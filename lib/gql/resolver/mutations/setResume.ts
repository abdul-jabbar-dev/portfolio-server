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
    
    if (existing.length > 0) {
      if (existing[0].resume && existing[0].resume !== args.resume) {
        const { deleteImageFromS3 } = await import("../../../../lib/s3.ts");
        await deleteImageFromS3(existing[0].resume);
        
        const { documents } = await import("../../../../drizzle/schema.ts");
        await db.delete(documents).where(eq(documents.fileUrl, existing[0].resume));
      }

      // update existing row
      const updated = await db
        .update(heroSection)
        .set({
          resume: args.resume,
        })
        .where(eq(heroSection.id, existing[0].id))
        .returning();
      return updated[0];
    }
    
    return null; // or insert if you want
  } catch (err) {
    console.error("Insert/Update error:", err);
    throw new Error("Failed to set HeroSection: " + (err as any)?.message!);
  }
};
