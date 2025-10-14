import { JWTPayload, jwtVerify, SignJWT } from "npm:jose@5.9.6";
import { ENV } from "../config/path.ts";
const secret = new TextEncoder().encode(ENV.JWT_SECRET);

export async function createJWT(payload: JWTPayload, expiresIn: string = "1h"): Promise<string> {
    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(secret);

    return jwt;
}
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        if (error.name === "JWTExpired") {
            throw new Error("Token Expired");
        } else {
            throw error;
        }
    }
}