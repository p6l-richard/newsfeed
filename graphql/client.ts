import { GraphQLClient } from "graphql-request";

export const apiClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GQL_ENDPOINT,
  {
    headers: {},
  }
);
