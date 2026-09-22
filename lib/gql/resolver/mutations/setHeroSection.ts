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


  console.log("Image URL: ", args.image);
  try {
    let imageUrl = args.image;
    if (!imageUrl) {
      throw new Error("Invalid image URL provided.");
    }

    const existing = await db.select().from(heroSection);
    if (existing.length > 0) {
      if (existing[0].image !== imageUrl) {
        // Delete the old image from S3
        const { deleteImageFromS3 } = await import("../../../../lib/s3.ts");
        await deleteImageFromS3(existing[0].image);
        
        // Also remove from documents library
        const { documents } = await import("../../../../drizzle/schema.ts");
        await db.delete(documents).where(eq(documents.fileUrl, existing[0].image));
      }

      // update existing row
      const updated = await db
        .update(heroSection)
        .set({
          title: args.title,
          description: args.description,
          image: imageUrl,
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
          image: imageUrl,
        })
        .returning();
      return inserted[0];
    }
  } catch (err) {
    console.error("Insert/Update error:", err);
    throw new Error("Failed to set HeroSection: " + (err as any)?.message!);
  }
};
