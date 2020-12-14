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

export const DELETE_USER = gql`
  mutation($id: String) {
    deleteUser(id: $id)
  }
`;

export const EDIT_USER = gql`
  mutation(
    $id: String
    $first_name: String
    $last_name: String
    $role: RoleEnum
    $gender: Boolean
    $birthday: String
    $mobile: String
  ) {
    editUser(
      user: {
        id: $id
        first_name: $first_name
        last_name: $last_name
        role: $role
        gender: $gender
        birthday: $birthday
        mobile: $mobile
      }
    ) {
      code
      success
    }
  }
`;

export const CREATE_TICKET = gql`
  mutation(
    $userId: String
    $subject: String
    $department: String
    $priority: PriorityEnum
    $body: String
    $status: StatusEnum
  ) {
    createTicket(
      userId: $userId
      subject: $subject
      department: $department
      priority: $priority
      status: $status
      body: $body
    ) {
      code
      success
    }
  }
`;
