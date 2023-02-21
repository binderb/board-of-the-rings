import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DELETE_USER($userId: ID!) {
    deleteUser(userId: $userId) {
      message
    }
  }
`;

export const DISPLAY_NAME = gql`
  mutation DISPLAY_NAME($displayName: String!) {
    updateDisplayName(displayName: $displayName) {
      token
      user {
        username
        email
        _id
      }
    }
  }
`;
