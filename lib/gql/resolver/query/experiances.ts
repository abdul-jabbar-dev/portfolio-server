import { experienceSection } from "../../../../drizzle/schema.ts";
import db from "../../../../db/index.ts";

export const experianceQuery = async () => {
  // 1️⃣ Work experience section থেকে ডেটা নাও
  const getExperianceData = await db
    .select()
    .from(experienceSection)
    .orderBy(experienceSection.order);

  if (!getExperianceData) {
    throw new Error("❌ No experiance section data found!");
  }

  return getExperianceData;
};
