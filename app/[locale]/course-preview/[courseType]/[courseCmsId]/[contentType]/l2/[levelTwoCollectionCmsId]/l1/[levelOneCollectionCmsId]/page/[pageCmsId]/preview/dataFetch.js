import { pagePreview } from '@graphql/contentstack';
import createApolloClient from "@/apollo_client";
import { getPageQueryData } from '@components/PagePreview/pagePreviewQuery';
import { getPageFormattedData } from '@components/PagePreview/pageCmsDataFormatter';
import { getUidOfCardReferenceFrom, getMainContentDataComponents } from './utils';

export const getPageData = async (locale, pageCmsId) => {
  const client = createApolloClient();
  let formattedData = {};

  const {
    mainContentData,
    mainContentResCardData,
    secondaryContentData,
    otherMainContentData,
    otherSecondaryContentData,
    pageConnectiveTissueBasicInfoData,
    topConnectiveTissueData,
    bottomConnectiveTissueData,
    secondaryContentVideoData,
    secondaryContentImageData,
    mainContentImageData,
    mainContentVideoData,
    otherSecondaryContentVideoData,
    otherSecondaryContentImageData,
    otherMainContentImageData,
    otherMainContentVideoData,

    cardVideoAssociatedContentData,
    otherCardVideoAssociatedContentData,
    cardImageAssociatedContentData,
    otherCardImageAssociatedContentData,

    videoAssociatedContentData,
    otherVideoAssociatedContentData,
    imageAssociatedContentData,
    otherImageAssociatedContentData,
  } = await getPageQueryData(pageCmsId, locale, client);

  if (
    mainContentData &&
    mainContentResCardData &&
    secondaryContentData &&
    otherMainContentData &&
    otherSecondaryContentData &&
    pageConnectiveTissueBasicInfoData &&
    mainContentVideoData &&
    otherMainContentVideoData
  ) {
    let mainContentResData = Object.assign({}, mainContentData);
    const components = mainContentData.pagev4.main_content.components;
    const mainContentDataComponents = getMainContentDataComponents(components, mainContentResCardData);

    let { main_content } = mainContentResData.pagev4;
    main_content = { ...main_content, ...{ components: mainContentDataComponents } };
    const pagev4 = { ...mainContentResData.pagev4, ...{ main_content: main_content } };
    mainContentResData = { pagev4: pagev4 };

    const uids = getUidOfCardReferenceFrom(
      mainContentResData,
      secondaryContentData,
      otherMainContentData,
      otherSecondaryContentData,
      bottomConnectiveTissueData,
      topConnectiveTissueData
    );

    const cardData = await client.query({
      query: pagePreview.queries.GET_CARD_DETAILS,
      variables: { cardCmsIds: uids, locale },
      fetchPolicy: 'no-cache',
    });

    if (cardData) {
      formattedData = getPageFormattedData(
        mainContentResData,
        secondaryContentData,
        otherMainContentData,
        otherSecondaryContentData,
        pageConnectiveTissueBasicInfoData,
        bottomConnectiveTissueData,
        topConnectiveTissueData,
        mainContentImageData,
        secondaryContentImageData,
        secondaryContentVideoData,
        mainContentVideoData,
        otherMainContentImageData,
        otherSecondaryContentImageData,
        otherSecondaryContentVideoData,
        otherMainContentVideoData,
        cardData.data.all_card.items,
        cardVideoAssociatedContentData,
        otherCardVideoAssociatedContentData,
        cardImageAssociatedContentData,
        otherCardImageAssociatedContentData,
        videoAssociatedContentData,
        otherVideoAssociatedContentData,
        imageAssociatedContentData,
        otherImageAssociatedContentData
      );
    }
    return formattedData;
  }
};