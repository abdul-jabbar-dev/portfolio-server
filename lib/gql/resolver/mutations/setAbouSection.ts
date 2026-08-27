import { eq } from "drizzle-orm";
import db from "../../../../db/index.ts";
import { aboutSection } from "../../../../drizzle/schema.ts";

export const setAboutSection = async (
  _: any,
  args: {
    aboutSection: {
      title: string;
      desc: string;
      img: string;
      link: string;
      linkTitle: string;
      descPosition: string;
    }
  },
  context: any
) => {
  if (!context?.user) {
    throw new Error("Unauthorized! You must be logged in.");
  }

  try {
    const existing = await db.select().from(aboutSection);  /// get the collection of about section.
    // update existing row


    if (existing[0]) {
      const updateData = Object.fromEntries(
        Object.entries({
          title: args.aboutSection.title,
          desc: args.aboutSection.desc,
          img: args.aboutSection.img,

          link: args.aboutSection.link,
          linkTitle: args.aboutSection.linkTitle,
          descPosition: args.aboutSection.descPosition,
        }).filter(([_, v]) => v !== undefined)
      );

      if (Object.keys(updateData).length === 0) {
        return existing[0];
      }

      console.log(updateData)

      const updated = await db
        .update(aboutSection)
        .set(updateData)
        .where(eq(aboutSection.id, existing[0].id)) // এখানে eq() ব্যবহার
        .returning();
      return updated[0];
    } else {
      const [inserted] = await db
        .insert(aboutSection)
        .values({
          title: args.aboutSection.title,
          desc: args.aboutSection.desc,
          img: args.aboutSection.img,
          link: args.aboutSection.link,
          linkTitle: args.aboutSection.linkTitle,
          descPosition: args.aboutSection.descPosition,
        })
        .returning();
      return inserted;
    }
  } catch (err) {
    console.error("Insert/Update error:", err);
    throw new Error("Failed to set AboutSection: " + (err as any)?.message!);
  }
};
