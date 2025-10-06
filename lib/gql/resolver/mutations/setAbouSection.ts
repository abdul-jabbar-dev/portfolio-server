import { eq } from "drizzle-orm";
import db from "../../../../db/index.ts";
import { aboutSection } from "../../../../drizzle/schema.ts";

export const setAboutSection = async (
  _: any,
  args: {
    title: string;
    desc: string;
    img: string;
    link: string;
    linkTitle: string;
    descPosition: string;
  }
) => {
  try {
    const existing = await db.select().from(aboutSection);
    // update existing row
    if (existing[0]) {
      const updated = await db
        .update(aboutSection)
        .set({
          title: args.title,
          desc: args.desc,
          img: args.img,
          link: args.link,
          linkTitle: args.linkTitle,
          descPosition: args.descPosition,
        })
        .where(eq(aboutSection.id, existing[0].id)) // এখানে eq() ব্যবহার
        .returning();
      return updated[0];
    } else {
      const [inserted] = await db
        .insert(aboutSection)
        .values({
          title: args.title,
          desc: args.desc,
          img: args.img,
          link: args.link,
          linkTitle: args.linkTitle,
          descPosition: args.descPosition,
        })
        .returning();
      return inserted;
    }
  } catch (err) {
    console.error("Insert/Update error:", err);
    throw new Error("Failed to set HeroSection: " + (err as any)?.message!);
  }
};
