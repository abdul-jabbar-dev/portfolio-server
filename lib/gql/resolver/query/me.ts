import { users } from "../../../../drizzle/schema.ts";
import db from "../../../../db/index.ts";
import { eq } from "drizzle-orm";
export const me = async (_parent, _args, context) => {

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
    
    console.log(user);
    // ekhane token verify kore user data return koro
    return user[0];
};