import db from "../../../../db/index.ts";
import { projects, project_tech_stack, documents } from "../../../../drizzle/schema.ts";
import { eq } from "drizzle-orm";
import { deleteImageFromS3 } from "../../../../lib/s3.ts";

export const deleteProject = async (
  _: any,
  args: { id: string },
  context: any
) => {
  if (context.user?.type !== "me") {
    throw new Error("Unauthorized! You must be logged in.");
  }

  try {
    const projectId = Number(args.id);

    // Get the project to delete its image
    const [existingProject] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId));

    if (existingProject) {
      if (existingProject.img) {
        await deleteImageFromS3(existingProject.img).catch(err => console.error("Failed to delete S3 image", err));
        await db.delete(documents).where(eq(documents.fileUrl, existingProject.img)).catch(() => {});
      }
      
      // Delete project tech stack relations first
      await db.delete(project_tech_stack).where(eq(project_tech_stack.projectId, projectId));
      
      // Delete the project
      await db.delete(projects).where(eq(projects.id, projectId));
    }
    
    return true;
  } catch (err) {
    console.error("Delete project error:", err);
    throw new Error("Failed to delete project");
  }
};
