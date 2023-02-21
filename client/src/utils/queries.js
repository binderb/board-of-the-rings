import { gql } from '@apollo/client';

export const QUERY_QUESTIONS = gql`
query getQuestions {
    questions {
      quizQ
      answers {
        option
        isCorrect
      }
    }
  }
  `;
  
  export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      displayName
      wins
    }
  }
`;