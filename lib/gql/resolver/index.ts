import { ResolversProps } from "https://deno.land/x/oak_graphql@0.6.4/mod.ts";
import { setHeroSection } from "./mutations/setHeroSection.ts";
import { heroQuery } from "./query/hero.ts";
import { setResume } from "./mutations/setResume.ts";
import { setLinks } from "./mutations/SetLinks.ts";
import { setTechStack } from "./mutations/setTechStack.ts";
import { setAboutSection } from "./mutations/setAbouSection.ts";
import { setExperianceSection } from "./mutations/setExperianceSection.ts";
import { aboutQuery } from './query/about.ts';
import { experianceQuery } from "./query/experiances.ts";
import { contactQuery } from "./query/contact.ts";
import { technicalSkillsQuery } from "./query/technicalSkils.ts";
import { projectsQuery } from "./query/projects.ts";
import { footerLinks } from './query/footerLinks.ts';
import login from "./mutations/login.ts";
import { me } from "./query/me.ts";
const resolvers: ResolversProps = {
  Query: {
    hero: heroQuery,
    about: aboutQuery,
    experience: experianceQuery,
    contact: contactQuery,
    technicalSkills: technicalSkillsQuery,
    projects: projectsQuery,
    footerLinks,
    getMe: me,
  },
  Mutation: { 
    login,
    setHeroSection,
    setResume,
    setLinks,
    setTechStack,
    //about section
    setAboutSection, 
    // experience section
    setExperianceSection,
  },
};

export default resolvers;
