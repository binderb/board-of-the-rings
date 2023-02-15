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
`