import { gql } from '@apollo/client';

export const REPO_UNIC = gql`
  fragment RepoData on Repository {
    id
    fullName
    description
    language 
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    url
  }
`