import db from "../../../../db/index.ts";
import { experienceSection } from "../../../../drizzle/schema.ts";
import { eq } from "drizzle-orm";

export const setExperianceSection = async (
  _: any,
  args: {
    experianceSection: {
      id?: string;
      jobPosition: string;
      companyName: string;
      desc: string;
      location: string;
      startDate: string;
      endDate: string;
      companyLink: string;
      order: number;
    }
  },
  context: any
) => {
  if (!context?.user) {
    throw new Error("Unauthorized! You must be logged in.");
  }

  try {
    const input = args.experianceSection;
    if (input.id) {
      const [updated] = await db
        .update(experienceSection)
        .set({
          jobPosition: input.jobPosition,
          companyName: input.companyName,
          location: input.location,
          desc: input.desc,
          startDate: input.startDate,
          endDate: input.endDate,
          companyLink: input.companyLink,
          order: input.order,
        })
        .where(eq(experienceSection.id, Number(input.id)))
        .returning();
      return updated;
    } else {
      const [inserted] = await db
        .insert(experienceSection)
        .values({
          jobPosition: input.jobPosition,
          companyName: input.companyName,
          location: input.location,
          desc: input.desc,
          startDate: input.startDate,
          endDate: input.endDate,
          companyLink: input.companyLink,
          order: input.order,
        })
        .returning();
      return inserted;
    }
  } catch (err) {
    console.error("Insert/Update error:", err);
    throw new Error(
      "Failed to set ExperienceSection: " + (err as any)?.message!
    );
  }
};
