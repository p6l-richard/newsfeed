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

  type NewsPieceResponse {
    data: [NewsPiece!]
    nextCursor: Int
    previousCursor: Int
  }
  extend type Query {
    newsPieces(fellowship: String = "all", cursor: Int = 0): NewsPieceResponse!
  }
`;
