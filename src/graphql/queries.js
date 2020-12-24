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

export const GET_TICKETS = gql`
  query {
    getTickets {
      id
      subject
      priority
      status
      department
      user {
        id
        first_name
        last_name
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_TICKET = gql`
  query($ticketId: String) {
    getTicket(ticketId: $ticketId) {
      id
      subject
      body
      status
      priority
      user {
        first_name
        last_name
      }
      department
      client {
        osName
        osVersion
        browserName
        browserVersion
      }
      comments {
        user {
          id
          first_name
          last_name
        }
        body
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_DASHBOARD = gql`
  query($userId: String) {
    getDashboardStatus
    getTodos(userId: $userId) {
      id
      body
      completed
    }
    getDepartmentsStatus {
      name
      open
      pending
    }
  }
`;
