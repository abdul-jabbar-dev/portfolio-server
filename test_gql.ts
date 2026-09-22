import { GraphQLClient } from "npm:graphql-request";

const client = new GraphQLClient('http://localhost:8000/gql');

async function test() {
  try {
    const res = await client.request(`
      mutation SetTechnicalSkillsSection($input: TechnicalSkillsSectionInput!) {
        setTechnicalSkillsSection(technicalSkillsSection: $input) {
          id
          fieldName
        }
      }
    `, {
      input: {
        fieldName: "Test Field",
        desc: "Test Desc",
        order: 1,
        icon: "MdWeb",
        iconStr: "MdWeb",
        techStack: []
      }
    });
    console.log("Success:", JSON.stringify(res, null, 2));
  } catch(e) {
    console.error("Error:", e.response ? JSON.stringify(e.response.errors, null, 2) : e.message);
  }
}
test();
