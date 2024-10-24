import { gql } from "@apollo/client";

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          fullName
          id
          language
          description
          forksCount
          reviewCount
          ratingAverage
          stargazersCount
          ownerAvatarUrl
        }
      }
    }
  }
`;
