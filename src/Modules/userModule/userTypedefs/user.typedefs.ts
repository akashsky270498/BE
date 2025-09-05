import { gql } from 'graphql-tag';

export const userTypeDef = gql`
  type User {
    id: ID!
    fullName: String!
    email: String!
    username: String!
    avatar: String
    bio: String
    website: String
    isPrivate: Boolean
    followers: [ID]
    followings: [ID]
    posts: [ID]
    saved: [ID]
  }

  type Metadata {
    page: Int
    limit: Int
    total: Int
    totalPages: Int
  }

  type UserResponse {
    success: Boolean!
    statusCode: Int!
    message: String!
    data: [User]
    errors: [String]
    meta: Metadata
  }

  type Query {
    users: UserResponse
  }
`;
