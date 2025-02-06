import gql from 'graphql-tag';

const GET_EXAM_DATA = gql`
  query GetExam(
    $examCmsId: String!, $locale: String!
  ) {
    exam(uid: $examCmsId, locale: $locale, fallback_locale: true)  {
      title
      display_title
      duration_minutes
      questionsConnection {
        edges {
          node {
            ... on Question {
              system {
                uid
              }
            }
          }
        }
        totalCount
      }
      imageConnection {
        edges {
          node {
            ... on Image {
              title
              show_associated_content_
              accessible_content {
                alternate_text
              }
              associated_content_position {
                position
                width
              }
              imageConnection {
                edges {
                  node {
                    content_type
                    description
                    file_size
                    filename
                    system {
                      uid
                    }
                    title
                    url
                  }
                }
                totalCount
              }
              system {
                uid
              }
            }
          }
        }
      }
    }
  }
`;


const GET_LEVEL_TWO_EXAM_QUESTION_CONTENT = gql`
  query GetExamQuestionPreview($questionCmsId: String!, $locale: String!) {
    question(uid: $questionCmsId, locale: $locale, fallback_locale: true) {
      question_type
      question
      system {
        uid
      }
      answersConnection {
        edges {
          node {
            ... on Answer {
              title
              display_text
              is_correct_response
              explanation
              system {
                uid
              }
            }
          }
        }
      }
    }
  }
`;

export {
  GET_EXAM_DATA,
  GET_LEVEL_TWO_EXAM_QUESTION_CONTENT
}