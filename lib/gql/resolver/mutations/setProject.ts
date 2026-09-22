import { eq } from "drizzle-orm";
import db from "../../../../db/index.ts";
import { projects, project_tech_stack } from "../../../../drizzle/schema.ts";

export const setProject = async (
  _: any,
  { project }: { project: any },
  context: any
) => {
  if (context.user.type !== "me") {
    throw new Error("You are not authorized to perform this action");
  }

  const { id, title, section, desc, img, projectTools, techStackIds, order } = project;

  try {
    let projectId = id;

    if (id) {
      // Fetch the existing project to check if image changed
      const [existingProject] = await db
        .select()
        .from(projects)
        .where(eq(projects.id, Number(id)));

      if (existingProject && existingProject.img !== img) {
        // Delete the old image from S3
        const { deleteImageFromS3 } = await import("../../../../lib/s3.ts");
        await deleteImageFromS3(existingProject.img);
        
        // Also remove from documents library
        const { documents } = await import("../../../../drizzle/schema.ts");
        await db.delete(documents).where(eq(documents.fileUrl, existingProject.img));
      }

      // Update existing project
      await db
        .update(projects)
        .set({
          title,
          section: section || "Projects",
          desc,
          img,
          projectTools: projectTools || [],
          order: order || 0,
        })
        .where(eq(projects.id, Number(id)));

      // Delete old tech stack links
      await db.delete(project_tech_stack).where(eq(project_tech_stack.projectId, Number(id)));
    } else {
      // Insert new project
      const [newProject] = await db
        .insert(projects)
        .values({
          title,
          section: section || "Projects",
          desc,
          img,
          projectTools: projectTools || [],
          order: order || 0,
        })
        .returning();
      
      projectId = newProject.id;
    }

    // Insert new tech stack links
    if (techStackIds && techStackIds.length > 0) {
      const techStackLinks = techStackIds.map((techId: string, index: number) => ({
        projectId: Number(projectId),
        techId: Number(techId),
        order: index + 1,
      }));

      await db.insert(project_tech_stack).values(techStackLinks);
    }

    // Return something matching ProjectsSectionInput
    return {
      id: projectId,
      title,
      section: section || "Projects",
      desc,
      img,
      projectTools: projectTools || [],
      techStack: [] // Can be omitted since frontend refetches
    };
  } catch (error: any) {
    console.error("Error setting project:", error);
    throw new Error(error.message || "Failed to set project");
  }
};
