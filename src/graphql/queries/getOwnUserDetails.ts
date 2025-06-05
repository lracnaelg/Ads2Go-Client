import { gql } from '@apollo/client';

export const GET_OWN_USER_DETAILS = gql`
  query GetOwnUserDetails {
    getOwnUserDetails {
      id
      firstName
      lastName
      email
      role
      isEmailVerified
    }
  }
`;
