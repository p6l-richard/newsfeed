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
`

type QueryData = {
  project: Project;
}

type QueryVars = {
  id: number;
}

type Project = {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  users: User[];
}

type User = {
  id: number;
  name: string;
  avatar_url: string;
}

export default function ProjectPage() {
  const project = {
    ...DUMMY_PROJECT_ROW,
    users: [DUMMY_USER_ROW],
  };
  }

  return (
    <Layout>
      <ProjectCard project={project} />
    </Layout>
  )
}