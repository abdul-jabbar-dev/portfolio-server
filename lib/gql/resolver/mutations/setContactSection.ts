import db from "../../../../db/index.ts";
import { contactSection } from "../../../../drizzle/schema.ts";
import { eq } from "drizzle-orm";

export const setContactSection = async (
  _: any,
  args: {
    contactSection: {
      id?: string;
      iconStr?: string;
      icon: string;
      title: string;
      desc: string;
      link?: string;
      order: number;
    }
  },
  context: any
) => {
  if (!context?.user) {
    throw new Error("Unauthorized! You must be logged in.");
  }

  try {
    const input = args.contactSection;
    if (input.id) {
      const [updated] = await db
        .update(contactSection)
        .set({
          iconStr: input.iconStr,
          icon: input.icon,
          title: input.title,
          desc: input.desc,
          link: input.link,
          order: input.order,
        })
        .where(eq(contactSection.id, Number(input.id)))
        .returning();
      return updated;
    } else {
      const [inserted] = await db
        .insert(contactSection)
        .values({
          iconStr: input.iconStr,
          icon: input.icon,
          title: input.title,
          desc: input.desc,
          link: input.link,
          order: input.order,
        })
        .returning();
      return inserted;
    }
  } catch (err) {
    console.error("Insert/Update error:", err);
    throw new Error(
      "Failed to set ContactSection: " + (err as any)?.message!
    );
  }
};
