import db from "../../../../db/index.ts";
import { hero_social_link, heroSection, socialLink } from "./../../../../db/schema.ts";

export const setLinks = async (
  _: any,
  args: {
    links: {
      icon: string;
      title: string;
      section: string;
      desc: string;
      url: string;
    }[];
  }
) => {
  try {
    const hero = await db.select().from(heroSection).limit(1);
    if (!hero[0]) {
      throw new Error("Hero section not found");
    }

    const insertedLinks = [];

    for (const arg of args.links) {
      const [inserted] = await db
        .insert(socialLink)
        .values({
          icon: arg.icon,
          title: arg.title,
          section: arg.section || "hero_section",
          desc: arg.desc,
          url: arg.url,
        })
        .returning();

      await db.insert(hero_social_link).values({
        heroId: hero[0].id,
        socialId: inserted.id,
      });

      insertedLinks.push(inserted);
    }

    return insertedLinks;
  } catch (err) {
    console.error("Insert/Update error:", err);
    throw new Error("Failed to set HeroSection: " + (err as any)?.message!);
  }
};
