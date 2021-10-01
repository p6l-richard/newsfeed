import { ApolloServer, gql } from "apollo-server-micro";
import * as newsPieces from "feature-newsfeed/server/graphql/resolvers";
import { typeDefs as NewsPiece } from "feature-newsfeed/server/graphql/schema";
import * as resolvers from "./resolvers";

const typeDefs = gql`
  scalar Date

  type Project {
    id: Int!
    name: String!
    description: String!
    icon_url: String!
    users: [User!]!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
    projects: [Project!]!
  }

  type Query {
    project(id: Int!): Project!
    user(id: Int!): User!
  }
`;

export const server = new ApolloServer({
  typeDefs: [typeDefs, NewsPiece],
  resolvers: {
    ...resolvers,
    Query: { ...resolvers.Query, ...newsPieces.Query },
  },
});
