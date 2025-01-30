import gql from 'graphql-tag';

const GET_L1_PAGE_CMS_IDS = gql`
  query GetL1PageCmsIds(
    $l1CmsId: String!, $locale: String!
  ) {
		level_1(uid: $l1CmsId, locale: $locale) {
			pagesConnection {
				edges {
					node {
						... on Pagev4 {
							system {
								uid
							}
							display_title
						}
					}
				}
				totalCount
			}
			system {
				uid
			}
		}
  }
`;

export {
  GET_L1_PAGE_CMS_IDS,
}