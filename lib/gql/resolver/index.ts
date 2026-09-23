import { setHeroSection } from "./mutations/setHeroSection.ts";
import { heroQuery } from "./query/hero.ts";
import { setResume } from "./mutations/setResume.ts";
import { setLinks } from "./mutations/SetLinks.ts";
import { setTechStack } from "./mutations/setTechStack.ts";
import { setAboutSection } from "./mutations/setAbouSection.ts";
import { setExperianceSection } from "./mutations/setExperianceSection.ts";
import { setProject } from "./mutations/setProject.ts";
import { aboutQuery } from './query/about.ts';
import { experianceQuery } from "./query/experiances.ts";
import { contactQuery } from "./query/contact.ts";
import { technicalSkillsQuery } from "./query/technicalSkils.ts";
import { projectsQuery } from "./query/projects.ts";
import { footerLinks } from './query/footerLinks.ts';
import { documentsQuery } from "./query/documents.ts";
import login from "./mutations/login.ts";
import { me } from "./query/me.ts";
import { deleteExperience } from "./mutations/deleteExperience.ts";
import { deleteProject } from "./mutations/deleteProject.ts";
import { setContactSection } from "./mutations/setContactSection.ts";
import { deleteContactSection } from "./mutations/deleteContactSection.ts";
import { setTechnicalSkillsSection } from "./mutations/setTechnicalSkillsSection.ts";
import { deleteTechnicalSkillsSection } from "./mutations/deleteTechnicalSkillsSection.ts";

const resolvers: any = {
  Query: {
    hero: heroQuery,
    about: aboutQuery,
    experience: experianceQuery,
    contact: contactQuery,
    technicalSkills: technicalSkillsQuery,
    projects: projectsQuery,
    footerLinks,
    documents: documentsQuery,
    getMe: me,
  },
  Mutation: { 
    login,
    setHeroSection,
    setResume,
    setLinks,
    setTechStack,
    setAboutSection, 
    setExperianceSection,
    setProject,
    deleteExperience,
    deleteProject,
    setContactSection,
    deleteContactSection,
    setTechnicalSkillsSection,
    deleteTechnicalSkillsSection,
  },
};

export default resolvers;
