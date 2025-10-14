import { project_tech_stack, projects, techStack } from "../../../../drizzle/schema.ts";
import db from "../../../../db/index.ts";
import { eq, inArray } from "drizzle-orm";

type ProjectWithTechStack = typeof projects.$inferSelect & {
  techStack: (typeof techStack.$inferSelect & { order?: number })[];
};

export const projectsQuery = async (): Promise<ProjectWithTechStack[]> => {
  // 1️⃣ Projects data আনো
  const getProjects = await db.select().from(projects);

  if (!getProjects || !getProjects.length) {
    throw new Error("❌ No project data found!");
  }

  // 2️⃣ প্রতিটা project এর সাথে techStack যোগ করো
  const projectsWithTechStack: ProjectWithTechStack[] = await Promise.all(
    getProjects.map(async (project) => {
      const tech_links = await db
        .select()
        .from(project_tech_stack)
        .where(eq(project_tech_stack.projectId, project.id));

      let techStackArr: (typeof techStack.$inferSelect & { order?: number })[] = [];
      if (tech_links.length) {
        const techStackIds = tech_links.map((l) => l.techId);
        const techs = await db.select().from(techStack).where(inArray(techStack.id, techStackIds));

        // map করে order যোগ করো
        techStackArr = techs.map((t) => {
          const link = tech_links.find((l) => l.techId === t.id);
          return { ...t, order: link?.order };
        });
      }

      return {
        ...project,
        techStack: techStackArr,
      };
    })
  );
 
  return projectsWithTechStack;
};
