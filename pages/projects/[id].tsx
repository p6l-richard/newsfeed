import Layout from "components/Layout";
import ProjectCard from "components/ProjectCard";
import { gql } from "graphql-request";
import { DUMMY_PROJECT_ROW, DUMMY_USER_ROW } from "graphql/dummy-data";
import { useRouter } from "next/router";

const PROJECT_QUERY = gql`
  query project($id: Int!) {
    project(id: $id) {
      id
      name
      description
      icon_url
      users {
        id
        name
        avatar_url
      }
    }
  }
`;

type Project = {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  users: User[];
};

type User = {
  id: number;
  name: string;
  avatar_url: string;
};

export default function ProjectPage() {
  const { query } = useRouter();
  // TODO: add data query
  const project = {
    ...DUMMY_PROJECT_ROW,
    users: [DUMMY_USER_ROW],
  };
  // TODO: add loading, error & empty state
  if (!project) {
    return null;
  }

  return (
    <Layout>
      <ProjectCard project={project} />
    </Layout>
  );
}
