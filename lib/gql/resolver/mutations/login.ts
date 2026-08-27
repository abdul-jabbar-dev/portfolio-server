import { and, eq } from "drizzle-orm";
import db from "../../../../db/index.ts";
import { users } from "../../../../drizzle/schema.ts";
import { comparePassword } from "../../../../utils/hashedPassword.ts";
import { createJWT } from "../../../../utils/jwt.ts";
async function login(
  parent: any,
  args: { type: any; credential: any },
  context: any
) {
  const { type, credential } = args;
  let tokenData: Partial<typeof users.$inferInsert> = {}

  if (type === "me") {
    //     // Admin login
    const adminUser = await db
      .select()
      .from(users)
      .where(eq(users.type, "me"))
      .limit(1)
      .then((res) => res[0]);

    if (!adminUser) throw new Error("Admin not found");
    if (!adminUser.passwordHash) throw new Error("Admin password not set");
    const isValid = await comparePassword(credential, adminUser.passwordHash);

    if (!isValid) throw new Error("Invalid password");
 
    tokenData = {
      type: adminUser.type,
      email: adminUser.email,
      name: adminUser.name,
      id: adminUser.id,
    }

    //     return { token, user: adminUser.user };
  } else {
    // Normal user login via email
    const user = await db
      .select()
      .from(users)
      .where(and(eq(users.type, "notMe"), eq(users.email, credential)))
      .limit(1)
      .then((res) => res[0]);
    if (!user) throw new Error("User not found");
    tokenData = {
      type: user.type,
      email: user.email,
      name: user.name,
      phone: user.phone,
      id: user.id,
      permissions: user.permissions,
      status: user.status
    }


  }
  const token = await createJWT(tokenData)
  if (!token) {
    throw new Error("Server Error, Try Again!")
  }
  return {
    token: token,
    user: {
      id: tokenData.id,
      type: tokenData.type,
      email: tokenData.email,
      name: tokenData?.name,
      phone: tokenData?.phone,
      permissions: tokenData?.permissions,
      status: tokenData?.status
    },
  };
}
export default login;
