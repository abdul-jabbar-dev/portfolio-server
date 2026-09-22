import db from "../../../../db/index.ts";
import { contactSection } from "../../../../drizzle/schema.ts";
import { eq } from "drizzle-orm";

export const deleteContactSection = async (
  _: any,
  args: { id: string },
  context: any
) => {
  if (!context?.user) {
    throw new Error("Unauthorized! You must be logged in.");
  }

  try {
    const deleted = await db
      .delete(contactSection)
      .where(eq(contactSection.id, Number(args.id)))
      .returning();

    if (!deleted || deleted.length === 0) {
      throw new Error(`Contact with ID ${args.id} not found.`);
    }

    return true;
  } catch (err) {
    console.error("Delete Contact error:", err);
    throw new Error("Failed to delete Contact: " + (err as any)?.message!);
  }
};
