import db from "../../../../db/index.ts";
import { documents as documentsSchema } from "../../../../drizzle/schema.ts";
import { desc } from "drizzle-orm";

export const documentsQuery = async (_: any, args: any, context: any) => {
  try {
    const docs = await db.select().from(documentsSchema).orderBy(desc(documentsSchema.id));
    return docs;
  } catch (err) {
    console.error("Error fetching documents:", err);
    throw new Error("Failed to fetch documents");
  }
};
