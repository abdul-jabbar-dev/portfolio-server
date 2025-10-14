import { socialLink } from "../../../../drizzle/schema.ts";
import db from "../../../../db/index.ts";
import { eq } from "drizzle-orm";
import SectionName from "../../../../types/sectionName.ts";

export const footerLinks = async () => {
  // 1️⃣ Work FooterLinks থেকে ডেটা নাও
  const getExperianceData = await db
    .select()
    .from(socialLink)
    .where(eq(socialLink.section, SectionName.FOOTER));

  if (!getExperianceData) {
    throw new Error("❌ No footer links data found!");
  }

  return getExperianceData;
};
