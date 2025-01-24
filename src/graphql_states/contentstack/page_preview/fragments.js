import gql from 'graphql-tag';


const pageLearningResourceComponentFragment = gql`
  fragment PageLearningResourceComponentFragment on PageComponentsComponents {
    ... on PageComponentsComponentsLearningResourceReference {
      __typename
      learning_resource_reference {
        learning_resourceConnection {
          edges {
            node {
              ... on LearningResource {
                title
                display_title
                resourceConnection {
                  edges {
                    node {
                      url
                      system {
                        uid
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const pageVideoFragment = gql`
  fragment PageVideoFragment on Video {
    system {
      uid
    }
    subtitlesConnection {
      edges {
        node {
          ... on Subtitles {
            system {
              uid
            }
          }
        }
      }
    }
    videoConnection {
      edges {
        node {
          url
          title
          content_type
          system {
            uid
          }
        }
      }
    }
  }
`

const pageComponentFragment = gql`
  fragment PageComponentsFragment on PageComponentsComponents {
    ... on PageComponentsComponentsTextReference {
      __typename
      text_reference {
        textConnection {
          edges {
            node {
              ... on Text {
                text
                emphasis {
                  emphasis_selection
                }
              }
            }
          }
        }
      }
    }
    ... on PageComponentsComponentsQuoteReference {
      __typename
      quote_reference {
        quoteConnection {
          edges {
            node {
              ... on Quote {
                text
                attribution
              }
            }
          }
        }
      }
    }
    ... on PageComponentsComponentsTestimonialReference {
      __typename
      testimonial_reference {
        testimonialConnection {
          edges {
            node {
              ... on Testimonial {
                text
                authorConnection {
                  edges {
                    node {
                      ... on Author {
                        first_name
                        last_name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    ... on PageComponentsComponentsTipReference {
      __typename
      tip_reference {
        tipConnection {
          edges {
            node {
              ... on Tip {
                text
                emphasis {
                  emphasis_selection
                }
              }
            }
          }
        }
      }
    }
    ... on PageComponentsComponentsInlineText {
      __typename
      inline_text {
        text
      }
    }
    ... on PageComponentsComponentsSurveyQuestionReference {
      __typename
      survey_question_reference {
        referenceConnection {
          edges {
            node {
              ... on SurveyQuestion {
                title
                question
                system {
                  uid
                }
                question_answersConnection {
                  edges {
                    node {
                      ... on SurveyAnswer {
                        title
                        choice_text
                        explanation
                        value
                        system {
                          uid
                          version
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    ... on PageComponentsComponentsQuestionReference {
      __typename
      question_reference {
        questionConnection {
          totalCount
          edges {
            node {
              ... on Question {
                title
                question
                question_type
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
          }
        }
      }
    }
    ... on PageComponentsComponentsImageReference {
      __typename
      image_reference {
        imageConnection {
          edges {
            node {
              ... on Image {
                system {
                  uid
                }
                accessible_content {
                  alternate_text
                }
                imageConnection {
                  edges {
                    node {
                      url
                      title
                    }
                  }
                }
              }
            }
          }
        }
        show_associated_text
        associated_text {
          text
          text_position
          text_width
        }
      }
    }
    ... on PageComponentsComponentsVideoReference {
      __typename
      video_reference {
        videoConnection {
          edges {
            node {
              ... PageVideoFragment
            }
          }
        }
        show_associated_text
        associated_text {
          text
          text_position
          text_width
        }
      }
    }
  }
  ${pageVideoFragment}
`;

const pageCardComponentFragment = gql`
  fragment PageCardComponentFragment on PageComponentsComponentsCardReference {
    ... on PageComponentsComponentsCardReference {
      __typename
      card_reference {
        cardConnection {
          edges {
            node {
              ... on Card {
                title
                display_title
                isexpandable
                system {
                  uid
                }
                secondary_content {
                  components {
                    ...PageComponentsFragment
                  }
                }
                components {
                  components {
                    ...PageComponentsFragment
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${pageComponentFragment}
`;

const pageOtherComponentFragment = gql`
  fragment PageOtherComponentFragment on PageComponentsComponents {
    ...PageLearningResourceComponentFragment
  }
  ${pageLearningResourceComponentFragment}
`;


const pageCardOtherComponentFragment = gql`
  fragment PageCardOtherComponentFragment on PageComponentsComponentsCardReference {
    ... on PageComponentsComponentsCardReference {
      __typename
      card_reference {
        cardConnection {
          edges {
            node {
              ... on Card {
                title
                display_title
                isexpandable
                system {
                  uid
                }
                components {
                  components {
                    ...PageOtherComponentFragment
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${pageOtherComponentFragment}
`;

export {
  pageComponentFragment,
  pageCardComponentFragment,
  pageOtherComponentFragment,
  pageCardOtherComponentFragment,
};
