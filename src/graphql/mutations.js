import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation($email: String, $password: String) {
    login(email: $email, password: $password) {
      ... on AuthToken {
        token
      }
      ... on ErrorResponse {
        errCode
        errDesc
      }
    }
  }
`;

export const REGISTER = gql`
  mutation($first_name: String, $last_name: String, $email: String, $password: String, $confirm_password: String) {
    register(
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: $password
      confirm_password: $confirm_password
    ) {
      ... on AuthToken {
        token
      }
      ... on ErrorResponse {
        errCode
        errDesc
        fields
      }
    }
  }
`;
