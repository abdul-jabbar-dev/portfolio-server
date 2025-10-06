import db from "../../../../db/index.ts";
import { experienceSection } from "../../../../drizzle/schema.ts";

export const setExperianceSection = async (
  _: any,
  args: {
    jobPosition: string;
    companyName: string;
    desc: string;
    startDate: string;
    endDate: string;
    companyLink: string;
    order: number;
  }
) => {
  try {
    const [inserted] = await db
      .insert(experienceSection)
      .values({
        jobPosition: args.jobPosition,
        companyName: args.companyName,
        desc: args.desc,
        startDate: args.startDate,
        endDate: args.endDate,
        companyLink: args.companyLink,
        order: args.order,
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
