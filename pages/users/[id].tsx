import Layout from "components/Layout";
import UserCard from "components/UserCard";
import { gql } from "graphql-request";
import type { FellowshipUnion } from "graphql/data-models";
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
`;

type User = {
  id: number;
  name: string;
  bio: string;
  fellowship: Exclude<FellowshipUnion, "all">;
  avatar_url: string;
  projects: Project[];
};

type Project = {
  id: number;
  name: string;
  icon_url: string;
};

export default function UserPage() {
  const { query } = useRouter();
  // TODO: add data query
  const user = {
    ...DUMMY_USER_ROW,
    projects: [DUMMY_PROJECT_ROW],
  };
  // TODO: add loading, error & empty state
  if (!user) {
    return null;
  }

  return (
    <Layout>
      <UserCard user={user} />
    </Layout>
  );
}
