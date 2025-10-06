import db from "../../../../db/index.ts";
import {
  hero_tech_stack,
  techStack,
  heroSection,
} from "../../../../drizzle/schema.ts";

export const setTechStack = async (
  _: any,
  args: {
    techStack: {
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

    for (const arg of args.techStack) {
      const [inserted] = await db
        .insert(techStack)
        .values({
          icon: arg.icon,
          title: arg.title,
          section: arg.section || "hero_section",
          desc: arg.desc,
          url: arg.url,
        })
        .returning();

      await db.insert(hero_tech_stack).values({
        heroId: hero[0].id,
        techId: inserted.id,
      });

      insertedLinks.push(inserted);
    }

    return insertedLinks;
  } catch (err) {
    console.error("Insert/Update error:", err);
    throw new Error("Failed to set HeroSection: " + (err as any)?.message!);
  }
};
