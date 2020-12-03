import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    getUsers {
      id
      first_name
      last_name
      email
      role
    }
  }
`;
