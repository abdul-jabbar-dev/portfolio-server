import { contactSection } from "../../../../drizzle/schema.ts";
import db from "../../../../db/index.ts";

export const contactQuery = async () => {
  // 1️⃣ Contact section থেকে ডেটা নাও
  const getContactData = await db
    .select()
    .from(contactSection)
    .orderBy(contactSection.order);
  const contact = getContactData;

  if (!contact) {
    throw new Error("❌ No contact section data found!");
  }

  return contact;
};
