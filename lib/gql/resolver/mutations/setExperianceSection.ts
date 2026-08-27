import db from "../../../../db/index.ts";
import { experienceSection } from "../../../../drizzle/schema.ts";

export const setExperianceSection = async (
  _: any,
  args: {
    experianceSection: {
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
  } catch (err) {
    console.error("Insert/Update error:", err);
    throw new Error(
      "Failed to set ExperienceSection: " + (err as any)?.message!
    );
  }
};
