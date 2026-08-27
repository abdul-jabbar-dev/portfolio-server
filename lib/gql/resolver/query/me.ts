import { users } from "../../../../drizzle/schema.ts";
import db from "../../../../db/index.ts";
import { eq, SQLWrapper } from "drizzle-orm";
export const me = async (_parent: any, _args: any, context: { error: string | undefined; user: { id: number | SQLWrapper; }; }) => {

    if (context.error) {
        throw new Error(context.error);
    }
    if (!context.user) {
        throw new Error("Unauthorized");
    }
    const user = await db.select().from(users).where(eq(users.id, context.user.id));
    if (!user) {
        throw new Error("User not found");
    }

    // ekhane token verify kore user data return koro
    return user[0];
};