import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type NewsPiece {
    id: Int!
    title: String!
    description: String!
    img_url: String
    news_type: String!
    fellowship: String!
    created: Date!
  }

  extend type Query {
    newsPieces(fellowship: String): [NewsPiece!]!
  }
`;
