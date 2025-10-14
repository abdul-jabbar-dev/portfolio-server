import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { ENV } from "../config/path.ts";
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  // Simple comparison for demonstration (replace with real hash comparison)
  return await bcrypt.compareSync(plainPassword, hashedPassword);
};

export const hashPassword = async (plainPassword: string) => {
  // Simple hash for demonstration (replace with real hashing, e.g., bcrypt)
  const salt = bcrypt.genSaltSync(ENV.SALT);
  const hash = bcrypt.hashSync(plainPassword, salt);
  return hash;
};
