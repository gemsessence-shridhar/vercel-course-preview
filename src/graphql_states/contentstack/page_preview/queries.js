import gql from 'graphql-tag';
import {
  pageComponentFragment,
  pageCardComponentFragment,
  pageOtherComponentFragment,
  pageCardOtherComponentFragment,
} from './fragments';


const GET_PAGE_PREVIEW_WITH_MAIN_CONTENT = gql`
  query GetPagePreview(
    $pageCmsId:String!,$locale:String!
  ) {
    pagev4(uid:$pageCmsId,locale:$locale,fallback_locale: true){
      system{
        uid
      }
      hide_title
      title
      display_title
      main_content{
        components{
          ...PageComponentsFragment
        }
      }
      secondary_content_position{
        position
        width
      }
      show_secondary_content
    }
  }
  ${pageComponentFragment}
`;

const GET_PAGE_PREVIEW_WITH_MAIN_CONTENT_CARD = gql`
  query GetPagePreview(
    $pageCmsId:String!,$locale:String!
  ) {
    pagev4(uid:$pageCmsId,locale:$locale,fallback_locale: true){
      system{
        uid
      }
      main_content{
        components{
          ...PageCardComponentFragment
        }
      }
    }
  }
  ${pageCardComponentFragment}
`;

const GET_PAGE_PREVIEW_OTHER_CONTENT_FOR_MAIN_CONTENT = gql`
  query GetPagePreviewOtherMainContent($pageCmsId: String!, $locale: String!) {
    pagev4(uid: $pageCmsId, locale: $locale, fallback_locale: true) {
      main_content {
        components {
          ...PageOtherComponentFragment
          ...PageCardOtherComponentFragment
        }
      }
    }
  }
  ${pageOtherComponentFragment}
  ${pageCardOtherComponentFragment}
`;


const GET_PAGE_PREVIEW_OTHER_CONTENT_FOR_SECONDARY_CONTENT = gql`
  query GetPagePreviewOtherSecondaryContent($pageCmsId: String!, $locale: String!) {
    pagev4(uid: $pageCmsId, locale: $locale, fallback_locale: true) {
      secondary_content {
        components {
          ...PageOtherComponentFragment
          ...PageCardOtherComponentFragment
        }
      }
    }
  }
  ${pageOtherComponentFragment}
  ${pageCardOtherComponentFragment}
`;


const GET_PAGE_PREVIEW_SECONDARY_CONTENT = gql`
  query GetPagePreviewSecondaryContent(
    $pageCmsId: String!, $locale: String!
  ) {
    pagev4(uid: $pageCmsId, locale: $locale, fallback_locale: true) {
      system {
        uid
      }
      title
      display_title
      secondary_content {
        components {
          ...PageComponentsFragment
          ...PageCardComponentFragment
        }
      }
    }
  }
  ${pageComponentFragment}
  ${pageCardComponentFragment}
`;

const GET_LEVEL_TWO_COURSE_WITH_BASIC_INFO = gql`
  query GetCourseWithBasicInfo (
    $courseCmsId: String!, $locale: String!
  ) {
    level_2_course(uid: $courseCmsId, locale: $locale, fallback_locale: true) {
      title
      metadata {
        display_title
      }
      system {
        uid
      }
    }
  }
`;

const GET_LEVEL_THREE_COURSE_WITH_BASIC_INFO = gql`
  query GetCourseWithBasicInfo (
    $courseCmsId: String!, $locale: String!
  ) {
    level_3_course(uid: $courseCmsId, locale: $locale, fallback_locale: true) {
      title
      metadata {
        display_title
      }
      system {
        uid
      }
    }
  }
`;

const GET_LEVEL_TWO_COLLECTION_WITH_BASIC_INFO = gql`
  query GetCourseWithBasicInfo (
    $levelTwoCollectionCmsId: String!, $locale: String!
  ) {
    level_2(uid: $levelTwoCollectionCmsId, locale: $locale, fallback_locale: true) {
      title
      metadata {
        display_title
      }
      system {
        uid
      }
      lessonsConnection {
        totalCount
        edges {
          node {
            ... on Level1 {
              title
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

const GET_LEVEL_ONE_COLLECTION_WITH_BASIC_INFO = gql`
  query GetCourseWithBasicInfo (
    $levelOneCollectionCmsId: String!, $locale: String!
  ) {
    level_1(uid: $levelOneCollectionCmsId, locale: $locale, fallback_locale: true) {
      title
      metadata {
        display_title
      }
      system {
        uid
      }
    }
  }
`;

const GET_PAGE_CONNECTIVE_TISSUE_BASIC_INFO = gql`
  query GetPageConnectiveTissueBasicInfo (
    $pageCmsId: String!, $locale: String!
  ) {
    pagev4(uid: $pageCmsId, locale: $locale, fallback_locale: true) {
      top_connective_tissueConnection {
        edges {
          node {
            ... on ConnectiveTissue {
              title
              system {
                uid
              }
            }
          }
        }
      }
      bottom_connective_tissueConnection {
        edges {
          node {
            ... on ConnectiveTissue {
              title
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

const GET_CONNECTIVE_TISSUE = gql`
query GetConnectiveTissue(
  $connectiveTissueCmsId: String!, $locale: String!
) {
  connective_tissue(uid: $connectiveTissueCmsId, locale: $locale, fallback_locale: true) {
    connective_tissue {
      components {
        ...PageComponentsFragment
        ...PageCardComponentFragment
      }
    }
  }
}
${pageComponentFragment}
${pageCardComponentFragment}
`;

const GET_CARD_DETAILS = gql`
query GetCardDetails(
  $cardCmsIds: [String!], $locale: String!
) {
  all_card(where: {uid_in: $cardCmsIds}, locale: $locale, fallback_locale: true) {
    total
    items {
      system {
        uid
      }
      show_secondary_content_
      secondary_content_position {
        position
        width
      }
    }
  }
}
`;

const GET_IMAGE_DATA = gql`
query GetImage(
  $imagesReferenceCmsIds: [String!], $locale: String!
) {
  all_image(where: {uid_in: $imagesReferenceCmsIds}, locale: $locale, fallback_locale: true)  {
    items {
      show_associated_content_
      associated_content {
        components{
          ...PageComponentsFragment
        }
      }
      associated_content_position {
        position
        width
      }
      system {
        uid
      }
    }
  }
}
${pageComponentFragment}
`;

const GET_IMAGE = gql`
query GetImage(
  $imagesReferenceCmsId: String!, $locale: String!
) {
  image(uid: $imagesReferenceCmsId, locale: $locale, fallback_locale: true)  {
    associated_content {
      components{
        ...PageComponentsFragment
      }
    }
  }
}
${pageComponentFragment}
`;

const GET_OTHER_CONTENT_FOR_IMAGE_DATA = gql`
query GetOtherContentForImage(
  $imagesReferenceCmsIds: [String!], $locale: String!
) {
  all_image(where: {uid_in: $imagesReferenceCmsIds}, locale: $locale, fallback_locale: true)  {
    items {
      show_associated_content_
      associated_content {
        components{
          ...PageOtherComponentFragment
          ...PageCardOtherComponentFragment
        }
      }
      system {
        uid
      }
    }
  }
}
${pageOtherComponentFragment}
${pageCardOtherComponentFragment}
`;

const GET_VIDEO_DATA = gql`
query GetVIDEO(
  $videosReferenceCmsIds: [String!], $locale: String!
) {
  all_video(where: {uid_in: $videosReferenceCmsIds}, locale: $locale, fallback_locale: true)  {
    items {
      show_associated_content_
      associated_content {
        components{
          ...PageComponentsFragment
        }
      }
      associated_content_position {
        position
        width
      }
      system {
        uid
      }
    }
  }
}
${pageComponentFragment}
`;

const GET_CARD_REFERENCE_FOR_IMAGE_DATA = gql`
query GetImage(
  $imagesReferenceCmsIds: [String!], $locale: String!
) {
  all_image(where: {uid_in: $imagesReferenceCmsIds}, locale: $locale, fallback_locale: true)  {
    items {
      show_associated_content_
      associated_content {
        components{
          ...PageCardComponentFragment
        }
      }
      system {
        uid
      }
    }
  }
}
${pageCardComponentFragment}
`;

const GET_CARD_REFERENCE_FOR_VIDEO_DATA = gql`
query GetVideo(
  $videosReferenceCmsIds: [String!], $locale: String!
) {
  all_video(where: {uid_in: $videosReferenceCmsIds}, locale: $locale, fallback_locale: true)  {
    items {
      show_associated_content_
      associated_content {
        components{
          ...PageCardComponentFragment
        }
      }
      system {
        uid
      }
    }
  }
}
${pageCardComponentFragment}
`;

const GET_OTHER_CONTENT_FOR_VIDEO_DATA = gql`
query GetOtherContetnForVIDEO(
  $videosReferenceCmsIds: [String!], $locale: String!
) {
  all_video(where: {uid_in: $videosReferenceCmsIds}, locale: $locale, fallback_locale: true)  {
    items {
      show_associated_content_
      associated_content {
        components{
          ...PageOtherComponentFragment
          ...PageCardOtherComponentFragment
        }
      }
      system {
        uid
      }
    }
  }
}
${pageOtherComponentFragment}
${pageCardOtherComponentFragment}
`;

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
            title
            question_type
            question
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

const GET_LEVEL_TWO_COURSE_WITH_TWO = gql`
  query level_2_course (
    $courseCmsId: String!, $locale: String!
  ) {
    level_2_course(uid: $courseCmsId, locale: $locale, fallback_locale: true) {
      enrichment_topicsConnection {
        edges {
          node {
            ... on Level2 {
              title
              __typename
              metadata {
                display_title
              }
              system {
                uid
              }
            }
          }
        }
      }
      topicsConnection {
        edges {
          node {
            ... on Level2 {
              title
              __typename
              metadata {
                display_title
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


const GET_LEVEL_THREE_COLLECTION_WITH_TWO = gql`
  query level_3 (
    $levelThreeCollectionCmsId: String!, $locale: String!
  ) {
    level_3(uid: $levelThreeCollectionCmsId, locale: $locale, fallback_locale: true) {
      sub_topicsConnection {
        edges {
          node {
            ... on Level2 {
              system {
                uid
              }
              title
              metadata {
                display_title
              }
            }
          }
        }
      }
      system {
        uid
      }
    }
  }
`;

const GET_LEVEL_THREE_COURSE_WITH_THREE = gql`
  query level_3_course (
    $courseCmsId: String!, $locale: String!
  ) {
    level_3_course(uid: $courseCmsId, locale: $locale, fallback_locale: true) {
      system {
        uid
      }
      topicsConnection(limit: 40) {
        edges {
          node {
            ... on Level3 {
              sub_topicsConnection(limit: 40) {
                edges {
                  node {
                    ... on Level2 {
                      system {
                        uid
                      }
                    }
                  }
                }
              }
              system {
                uid
              }
            }
          }
        }
      }
      enrichment_topicsConnection(limit: 40) {
        edges {
          node {
            ... on Level3 {
              title
              system {
                uid
              }
              sub_topicsConnection(limit: 40) {
                edges {
                  node {
                    ... on Level2 {
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

const GET_LEVEL_TWO_COLLECTION_WITH_PAGES = gql`
  query level_2 (
    $levelTwoCollectionCmsId: String!, $locale: String!
  ) {
    level_2(uid: $levelTwoCollectionCmsId, locale: $locale, fallback_locale: true) {
      system {
        uid
      }
      examConnection {
        edges {
          node {
            ... on Exam {
              system {
                uid
              }
            }
          }
        }
      }
      lessonsConnection(limit: 40) {
        edges {
          node {
            ... on Level1 {
              system {
                uid
              }
              pagesConnection(limit: 60) {
                edges {
                  node {
                    ... on Pagev4 {
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

const GET_VIDEO_SUBTITLE = gql`
query GetSubtitle(
  $subtitleCmsId: String!, $locale: String!
) {
  subtitles(uid: $subtitleCmsId, locale: $locale, fallback_locale: false)  {
    title
    system {
      locale
    }
    fileConnection {
      edges {
        node {
          url
          title
        }
      }
    }
  }
}
`;

export {
  GET_PAGE_PREVIEW_WITH_MAIN_CONTENT,
  GET_PAGE_PREVIEW_WITH_MAIN_CONTENT_CARD,
  GET_PAGE_PREVIEW_SECONDARY_CONTENT,
  GET_LEVEL_TWO_COURSE_WITH_BASIC_INFO,
  GET_LEVEL_THREE_COURSE_WITH_BASIC_INFO,
  GET_LEVEL_TWO_COLLECTION_WITH_BASIC_INFO,
  GET_LEVEL_ONE_COLLECTION_WITH_BASIC_INFO,
  GET_PAGE_PREVIEW_OTHER_CONTENT_FOR_MAIN_CONTENT,
  GET_PAGE_PREVIEW_OTHER_CONTENT_FOR_SECONDARY_CONTENT,
  GET_PAGE_CONNECTIVE_TISSUE_BASIC_INFO,
  GET_CONNECTIVE_TISSUE,
  GET_CARD_DETAILS,
  GET_IMAGE_DATA,
  GET_IMAGE,
  GET_VIDEO_DATA,
  GET_OTHER_CONTENT_FOR_IMAGE_DATA,
  GET_OTHER_CONTENT_FOR_VIDEO_DATA,
  GET_CARD_REFERENCE_FOR_IMAGE_DATA,
  GET_CARD_REFERENCE_FOR_VIDEO_DATA,
  GET_EXAM_DATA,
  GET_LEVEL_TWO_COURSE_WITH_TWO,
  GET_LEVEL_THREE_COLLECTION_WITH_TWO,
  GET_LEVEL_THREE_COURSE_WITH_THREE,
  GET_LEVEL_TWO_COLLECTION_WITH_PAGES,
  GET_VIDEO_SUBTITLE,
};
