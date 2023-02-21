import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $displayName: String!, $password: String!) {
    addUser(username: $username, email: $email, displayName: $displayName, password: $password) {
      token
      user {
        _id
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
      }
    }
  }
`;

export const REMOVE_USER = gql`
  mutation REMOVE_USER($id: ID!) {
    removeUser(_id: $id) {
      _id
    }
  }
`;

export const UPDATE_MY_WINS = gql`
  mutation UPDATE_MY_WINS {
    updateMyWins {
      wins
    }
  }
`;

export const UPDATE_USERNAME = gql`
mutation UPDATE_USERNAME($username: String!) {
  updateUsername(username: $username) {
    user {
      username
    }
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

