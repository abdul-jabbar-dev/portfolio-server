import { aboutSection } from "../../../../drizzle/schema.ts";
import db from "../../../../db/index.ts";

export const aboutQuery = async () => {
  // 1️⃣ About section থেকে ডেটা নাও
  const getAboutData = await db.select().from(aboutSection).limit(1);
  const about = getAboutData[0];

  if (!about) {
    throw new Error("❌ No about section data found!");
  }

  return {
    ...about,
  };
};
