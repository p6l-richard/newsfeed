import type { ProjectRow, UserRow } from "./db";

export const DUMMY_PROJECT_ROW: Omit<ProjectRow, "created_ts" | "updated_ts"> =
  {
    id: 1,
    name: "dummyName",
    description: "dummyProject",
    icon_url: "some_url",
  };

export const DUMMY_USER_ROW: Omit<UserRow, "created_ts" | "updated_ts"> = {
  id: 1,
  name: "dummyUser",
  avatar_url: "some_other_url",
  bio: "dummyBio",
  fellowship: "founders",
};
