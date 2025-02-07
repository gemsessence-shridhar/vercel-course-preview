import gql from 'graphql-tag';

const GET_ASSESSMENT_EXAM_DATA = gql`
  query($uid: String!, $locale: String!) {
    assessment_exam(uid: $uid, locale: $locale, fallback_locale: true) {
      title
      display_title
      system {
        uid
      }
      questionsConnection {
        edges {
          node {
            ... on AssessmentQuestion {
              title
              display_title
              question
              activity_points {
                activity_points
              }
              system {
                uid
              }
            }
          }
        }
        totalCount
      }
    }
  }
`;


const GET_ASSESSMENT_EXAM_QUESTION_DATA = gql`
  query($uid: String!, $locale: String!) {
    assessment_question(uid: $uid, locale: $locale, fallback_locale: true) {
      question
      system {
        uid
      }
      answersConnection {
        edges {
          node {
            ... on AssessmentAnswer {
              title
              system {
                uid
              }
              answer_option
              answer_weight
            }
          }
        }
      }
    }
  }
`;

export {
  GET_ASSESSMENT_EXAM_DATA,
  GET_ASSESSMENT_EXAM_QUESTION_DATA
}