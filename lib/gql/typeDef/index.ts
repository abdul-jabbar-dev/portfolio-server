import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts"; 

const typeDefs = gql`
  type HeroSection {
    id: ID!
    title: String!
    description: String!
    image: String!
    resume: String
    socialLinks: [SocialLink]
    techStack: [TechStack]
  }
  type AboutSection {
    id: ID
    title: String!
    desc: String!
    img: String!
    link: String
    linkTitle: String
    descPosition: String
  } 

  type TechStack {
    id: ID
    title: String!
    section: String
    desc: String
    url: String!
    icon: String!
  }
  input TechStackInput {
   
    title: String!
    section: String
    desc: String
    url: String!
    icon: String!
  }

  type SocialLink {
    id: ID!
    title: String!
    section: String!
    desc: String
    icon: String!
    url: String!
  }

  input SocialLinkInput {
    icon: String!
    title: String!
    desc: String
    url: String!
  }

  type ContactSection {
    id: ID
    icon: String!
    title: String!
    desc: String!
    link: String
    order: Int!
  }
  type ExperienceSection {
    id: ID
    companyName: String!
    desc: String!
    location: String!
    jobPosition: String!
    startDate: String!
    endDate: String! 
    companyLink: String
    order: Int!
  }
  input AboutSectionInput {
  title: String!
  shortDesc: String!
  desc: String!
  link: String
  linkTitle: String
}

input ExperienceSectionInput {
  companyName: String!
  desc: String
  location: String!
  jobPosition: String!
  startDate: String!
  endDate: String
  companyLink: String
  order: Int!
  techStackIds: [ID!]
}
  type Query {
    hero: HeroSection
    about: AboutSection
    contact: [ContactSection]
    experience: [ExperienceSection]
  }

  type Mutation {
    setHeroSection(
      title: String!
      description: String!
      image: String!
    ): HeroSection
    setResume(resume: String!): HeroSection
    setLinks(links: [SocialLinkInput!]!): [SocialLink]!
    setTechStack(techStack: [TechStackInput!]!): [TechStack]!
    setAboutSection(aboutSection: AboutSectionInput!): AboutSection
    setExperianceSection(experianceSection: ExperienceSectionInput!): ExperienceSection
  }
`;

export default typeDefs;
