import type { FellowshipUnion } from "graphql/db";
import { DUMMY_PROJECT_ROW, DUMMY_USER_ROW } from "graphql/dummy-data";
import { useRouter } from "next/router";

const USER_QUERY = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      name
      bio
      fellowship
      avatar_url
      projects {
        id
        name
        icon_url
      }
    }
  }
`

type QueryData = {
  user: User;
}

type QueryVars = {
  id: number;
}

type User = {
  id: number;
  name: string;
  bio: string;
  fellowship: Exclude<FellowshipUnion, "all">;
  avatar_url: string;
  projects: Project[];
}

type Project = {
  id: number;
  name: string;
  icon_url: string;
}

export default function UserPage() {
  const user = {
    ...DUMMY_USER_ROW,
    projects: [DUMMY_PROJECT_ROW],
  };
  }

  return (
    <Layout>
      <UserCard user={user} />
    </Layout>
  )
}
