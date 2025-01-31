import { getPageData } from '@components/PagePreview/dataFetch';
import createApolloClient from '@/apollo_client';
import { level1Preview } from '@graphql/contentstack';

const nodes = (item) => item.edges.map((edge) => edge.node);

const getPageCmsIds = (l1_page_cms_ids_data) => {
  const pagesConnection = nodes(l1_page_cms_ids_data.level_1.pagesConnection);

  return pagesConnection.map((pageConnection) => ({
    page_cms_id: pageConnection.system.uid,
    display_title: pageConnection.display_title,
  }));
};

export const fetchPageData = async (locale, l1CmsId) => {
  const client = createApolloClient();

  const l1_page_cms_ids_query = await client.query({
    query: level1Preview.queries.GET_L1_PAGE_CMS_IDS,
    variables: { l1CmsId, locale },
    fetchPolicy: 'no-cache',
  });

  const pagesInfo = getPageCmsIds(l1_page_cms_ids_query.data);

  const pagesDataHash = Object.fromEntries(
    await Promise.all(
      pagesInfo.map(async ({ page_cms_id, display_title }) => [
        page_cms_id,
        {
          page_cms_id,
          display_title,
          page_data: await getPageData(locale, page_cms_id),
        },
      ])
    )
  );

  return pagesDataHash;
};
