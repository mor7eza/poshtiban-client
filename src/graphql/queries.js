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

export const GET_USER = gql`
  query($id: String) {
    getUser(id: $id) {
      id
      first_name
      last_name
      email
      role
      gender
      birthday
      mobile
      createdAt
    }
  }
`;
