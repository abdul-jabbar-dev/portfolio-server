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
  type SocialLink {
    id: ID!
    title: String!
    section: String!
    desc: String
    icon: String!
    url: String!
    iconStr: String
  }

  input SocialLinkInput {
    icon: String!
    title: String!
    desc: String
    url: String!
    iconStr: String
  }

  type ContactSection {
    id: ID
    icon: String!
    iconStr: String
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

  # main tech stack type
  type TechStack {
    id: ID
    title: String!
    section: String
    desc: String
    url: String!
    icon: String!
    iconStr: String
  }
  input TechStackInput {
    title: String!
    section: String
    desc: String
    url: String!
    icon: String!
    iconStr: String
  }

  type TechnicalSkillsSection {
    id: ID
    icon: String
    iconStr: String
    fieldName: String!
    desc: String!
    link: String
    order: Int!
    techStack: [TechStack!]
  }

  # 🧩 Extend TechStack only for additional fields
  extend type TechStack {
    skillsPercentage: Int!
    order: Int!
  }

  input TechnicalSkillsSectionInput {
    icon: String!
    iconStr: String
    fieldName: String!
    desc: String!
    link: String
    order: Int!
  }
  type ProjectTechStack {
    title: String!
    section: String
    desc: String
    url: String!
    icon: String!
    iconStr: String
    order: Int
  }
  type ProjectsSectionInput {
    id: ID
    title: String!
    section: String
    desc: String!
    img: String!
    projectTools: [String!]
    techStack: [ProjectTechStack!]
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
    techStackIds: [ID]
  }

  type User {
    id: ID!
    type: String!
    email: String!
    token: String
    metadata: String
    createdAt: String!
    updatedAt: String!
    otp: String
    otpExpiresAt: String
  }

  type NotMe {
    user: User!
    name: String!
    phone: String!
    permissions: [String!]!
    viewAccess: [String]
    status: String!
  }

  type Me {
    user: User!
    passwordHash: String!
  }


  type UserResLogin{
    id: ID!
    type: String
    email: String
    token: String
    metadata: String
    name:String
    phone:String
    permissions:[String]
    status:String  
}
  type LoginResponse {
    token: String!
    user: UserResLogin
  }
 
  type Query {
    getMe: UserResLogin
    hero: HeroSection
    about: AboutSection
    contact: [ContactSection]
    experience: [ExperienceSection]
    technicalSkills: [TechnicalSkillsSection]
    projects: [ProjectsSectionInput]
    footerLinks: [TechStack]
  }

  type Mutation {
    login(type: String!, credential: String!): LoginResponse!

    setHeroSection(
      title: String!
      description: String!
      image: String!
    ): HeroSection
    setResume(resume: String!): HeroSection
    setLinks(links: [SocialLinkInput!]!): [SocialLink]!
    setTechStack(techStack: [TechStackInput!]!): [TechStack]!
    setAboutSection(aboutSection: AboutSectionInput!): AboutSection
    setExperianceSection(
      experianceSection: ExperienceSectionInput!
    ): ExperienceSection
  }
`;

export default typeDefs;
