import { isEmpty, uniq } from 'lodash';
import { pagePreview } from '@graphql/contentstack';

const imageVideoAssociatedRecords = {
  imageIds: [],
  videoIds: [],
};


const findCardReference = (components) => (
  components.filter((obj) => obj.__typename === 'PageComponentsComponentsCardReference' && !isEmpty(obj.card_reference))
);

const findImageReference = (components) => (
  components.filter((obj) => obj.__typename === 'PageComponentsComponentsImageReference' && !isEmpty(obj.image_reference))
);

const findVideoReference = (components) => (
  components.filter((obj) => obj.__typename === 'PageComponentsComponentsVideoReference' && !isEmpty(obj.video_reference))
);

const getCardComponents = (data, contentType) => {
  let componentRef = null;
  let result = [];
  switch (contentType) {
    case 'mainContent':
      componentRef = findCardReference(data.data.pagev4.main_content.components);
      break;
    case 'secondaryContent':
      componentRef = findCardReference(data.data.pagev4.secondary_content.components);
      break;
    case 'topConnectiveTissue':
      componentRef = findCardReference(data.connective_tissue.connective_tissue.components);
      break;
    case 'bottomConnectiveTissue':
      componentRef = findCardReference(data.connective_tissue.connective_tissue.components);
      break;

    default:
  }

  if (!isEmpty(componentRef)) {
    result = componentRef.map((obj) => (
      obj.card_reference.cardConnection.edges[0].node
    ));
  }
  return result;
};

const getComponents = (data, contentType) => {
  let result = [];
  switch (contentType) {
    case 'mainContent':
      result = data.data.pagev4.main_content.components;
      break;
    case 'secondaryContent':
      result = data.data.pagev4.secondary_content.components;
      break;
    case 'topConnectiveTissue':
      result = data.connective_tissue.connective_tissue.components;
      break;
    case 'bottomConnectiveTissue':
      result = data.connective_tissue.connective_tissue.components;
      break;
    default:
  }
  return result;
};


const updateCardAssociatedContentIds = (data, contentType) => {
  const cardConnections = getCardComponents(data, contentType);

  if (isEmpty(cardConnections)) return;

  cardConnections.forEach((cardConnection) => {
    let imageCardRefs = [];
    if (!isEmpty(cardConnection) && !isEmpty(cardConnection.components)) {
      const cardImageRefs1 = findImageReference(cardConnection.components.components);
      imageCardRefs = [...imageCardRefs, ...cardImageRefs1];
    }

    if (!isEmpty(cardConnection) && !isEmpty(cardConnection.secondary_content)) {
      const cardImageRefs2 = findImageReference(cardConnection.secondary_content.components);
      imageCardRefs = [...imageCardRefs, ...cardImageRefs2];
    }

    const imageCmsIds = imageCardRefs.map((obj) => (
      obj.image_reference.imageConnection.edges[0].node.system.uid
    ));

    if (!isEmpty(imageCmsIds)) {
      imageVideoAssociatedRecords.imageIds = [
        ...imageVideoAssociatedRecords.imageIds,
        ...imageCmsIds,
      ];
    }

    let videoCardRefs = [];
    if (!isEmpty(cardConnection) && !isEmpty(cardConnection.components)) {
      const cardVideoRefs1 = findVideoReference(cardConnection.components.components);
      videoCardRefs = [...videoCardRefs, ...cardVideoRefs1];
    }
    if (!isEmpty(cardConnection) && !isEmpty(cardConnection.secondary_content)) {
      const cardVideoRefs2 = findVideoReference(cardConnection.secondary_content.components);
      videoCardRefs = [...videoCardRefs, ...cardVideoRefs2];
    }

    const videoCmsIds = videoCardRefs.map((obj) => (
      obj.video_reference.videoConnection.edges[0].node.system.uid
    ));

    if (!isEmpty(videoCmsIds)) {
      imageVideoAssociatedRecords.videoIds = [
        ...imageVideoAssociatedRecords.videoIds,
        ...videoCmsIds,
      ];
    }
  });
};

const updateAssociatedContentOtherThanCardIds = (data, contentType) => {
  const components = getComponents(data, contentType);

  if (isEmpty(components)) return;
  const imagesReferences = findImageReference(components);

  if (!isEmpty(imagesReferences)) {
    const imagesReferenceCmsIds = imagesReferences.map((imagesReference) => imagesReference.image_reference.imageConnection.edges[0].node.system.uid);

    if (!isEmpty(imagesReferenceCmsIds)) {
      imageVideoAssociatedRecords.imageIds = [
        ...imageVideoAssociatedRecords.imageIds,
        ...imagesReferenceCmsIds,
      ];
    }
  }

  const videoReferences = findVideoReference(components);
  if (!isEmpty(videoReferences)) {
    if (!isEmpty(videoReferences)) {
      const videosReferenceCmsIds = videoReferences.map((videosReference) => videosReference.video_reference.videoConnection.edges[0].node.system.uid);

      if (!isEmpty(videosReferenceCmsIds)) {
        imageVideoAssociatedRecords.videoIds = [
          ...imageVideoAssociatedRecords.videoIds,
          ...videosReferenceCmsIds,
        ];
      }
    }
  }
};

const updateAssociatedContentIds = (data, contentType) => {
  updateCardAssociatedContentIds(data, contentType);
  updateAssociatedContentOtherThanCardIds(data, contentType);
};

const fetchGraphQLData = async (client, query, variables = {}, fetchPolicy = 'no-cache') => {
  const response = await client.query({
    query,
    variables,
    fetchPolicy,
  });

  return response;
};

const getPageQueryData = async (pageCmsId, locale, client) => {

  const queries = {
    mainContentResCard: pagePreview.queries.GET_PAGE_PREVIEW_WITH_MAIN_CONTENT_CARD,
    mainContentRes: pagePreview.queries.GET_PAGE_PREVIEW_WITH_MAIN_CONTENT,
    secondaryContentRes: pagePreview.queries.GET_PAGE_PREVIEW_SECONDARY_CONTENT,
    otherMainContentRes: pagePreview.queries.GET_PAGE_PREVIEW_OTHER_CONTENT_FOR_MAIN_CONTENT,
    otherSecondaryContentRes: pagePreview.queries.GET_PAGE_PREVIEW_OTHER_CONTENT_FOR_SECONDARY_CONTENT,
    pageConnectiveTissueBasicInfo: pagePreview.queries.GET_PAGE_CONNECTIVE_TISSUE_BASIC_INFO,
  };

  const results = {};
  await Promise.all(
    Object.entries(queries).map(async ([key, query]) => {
      results[key] = await fetchGraphQLData(client, query, { pageCmsId, locale });
    })
  );
  const { mainContentRes, mainContentResCard, secondaryContentRes, otherMainContentRes, otherSecondaryContentRes, pageConnectiveTissueBasicInfo} = results;

  const isContentLoading = () => (
    mainContentRes.loading
    || mainContentResCard.loading
    || secondaryContentRes.loading
    || otherMainContentRes.loading
    || otherSecondaryContentRes.loading
    || pageConnectiveTissueBasicInfo.loading
  );

  const getErrorInContent = () => (
    mainContentRes.error
    || mainContentResCard.error
    || secondaryContentRes.error
    || otherMainContentRes.error
    || otherSecondaryContentRes.error
    || pageConnectiveTissueBasicInfo.error
  );

  if (!mainContentRes.loading && isEmpty(mainContentRes.error) && !isEmpty(mainContentRes.data)) {
    updateAssociatedContentIds(mainContentRes, 'mainContent');
  }

  if (!mainContentResCard.loading && isEmpty(mainContentResCard.error) && !isEmpty(mainContentResCard.data)) {
    updateAssociatedContentIds(mainContentResCard, 'mainContent');
  }

  if (!secondaryContentRes.loading && isEmpty(secondaryContentRes.error) && !isEmpty(secondaryContentRes.data)) {
    updateAssociatedContentIds(secondaryContentRes, 'secondaryContent');
  }

  const isMainContentResSuccess = !mainContentRes.loading && isEmpty(mainContentRes.error) && !isEmpty(mainContentRes.data)

  const mainContentResCardSuccess = !mainContentResCard.loading && isEmpty(mainContentResCard.error) && !isEmpty(mainContentResCard.data)


  const contentData = {
    mainContentVideoData: null,
    otherMainContentVideoData: null,
    secondaryContentVideoData: null,
    otherSecondaryContentVideoData: null,

    secondaryContentImageData: null,
    otherSecondaryContentImageData: null,
    mainContentImageData: null,
    otherMainContentImageData: null,

    topConnectiveTissueData: null,
    bottomConnectiveTissueData: null,

    cardVideoAssociatedContentData: null,
    otherCardVideoAssociatedContentData: null,

    cardImageAssociatedContentData: null,
    otherCardImageAssociatedContentData: null,

    videoAssociatedContentData: null,
    otherVideoAssociatedContentData: null,

    imageAssociatedContentData: null,
    otherImageAssociatedContentData: null,
  };

  if (isMainContentResSuccess && mainContentResCardSuccess) {
    const videosReference = findVideoReference(mainContentRes.data.pagev4.main_content.components);

    const videosReferenceCard = findVideoReference(mainContentResCard.data.pagev4.main_content.components);

    const videosReferenceCmsIds = [
      ...videosReference.map((obj) => obj.video_reference.videoConnection.edges[0].node.system.uid),
      ...videosReferenceCard.map((obj) => obj.video_reference.videoConnection.edges[0].node.system.uid),
    ];

    const [mainContentVideoDataQuery, otherMainContentVideoDataQuery] = await Promise.all([
      fetchGraphQLData(client, pagePreview.queries.GET_VIDEO_DATA,  {
        videosReferenceCmsIds,
        locale,
      }),
      fetchGraphQLData(client, pagePreview.queries.GET_OTHER_CONTENT_FOR_VIDEO_DATA,  {
        videosReferenceCmsIds,
        locale,
      }),
    ]);
    if (mainContentVideoDataQuery.data) {
      contentData.mainContentVideoData = mainContentVideoDataQuery.data;
    }
  
    if (otherMainContentVideoDataQuery.data) {
      contentData.otherMainContentVideoData = otherMainContentVideoDataQuery.data;
    }
  }

  if (!secondaryContentRes.loading && isEmpty(secondaryContentRes.error) && !isEmpty(secondaryContentRes.data)) {
    const videosReference = findVideoReference(secondaryContentRes.data.pagev4.secondary_content.components);
    const videosReferenceCmsIds = videosReference.map((obj) => obj.video_reference.videoConnection.edges[0].node.system.uid);

    const [secondaryContentVideoQuery, otherSecondaryContentVideoDataQuery] = await Promise.all([
      fetchGraphQLData(client, pagePreview.queries.GET_VIDEO_DATA,  {
        videosReferenceCmsIds,
        locale,
      }),
      fetchGraphQLData(client, pagePreview.queries.GET_OTHER_CONTENT_FOR_VIDEO_DATA,  {
        videosReferenceCmsIds,
        locale,
      }),
    ]);

    if (secondaryContentVideoQuery.data) {
      contentData.secondaryContentVideoData = secondaryContentVideoQuery.data;
    }

    if (otherSecondaryContentVideoDataQuery.data) {
      contentData.otherSecondaryContentVideoData = otherSecondaryContentVideoDataQuery.data;
    }
  }

  if (!pageConnectiveTissueBasicInfo.loading && isEmpty(pageConnectiveTissueBasicInfo.error)) {
    const topConnectiveTissueConnection = pageConnectiveTissueBasicInfo.data.pagev4.top_connective_tissueConnection.edges;
    if (!isEmpty(topConnectiveTissueConnection)) {
      const connectiveTissueCmsId = topConnectiveTissueConnection[0].node.system.uid;

      const [topConnectiveTissueDataQuery] = fetchGraphQLData(client, pagePreview.queries.GET_CONNECTIVE_TISSUE,  {
        connectiveTissueCmsId,
        locale,
      })

      if (topConnectiveTissueDataQuery.data) {
        contentData.topConnectiveTissueData = topConnectiveTissueDataQuery.data;
        updateAssociatedContentIds(topConnectiveTissueDataQuery.data, 'topConnectiveTissue');
      }
    }
    
    const bottomConnectiveTissueConnection = pageConnectiveTissueBasicInfo.data.pagev4.bottom_connective_tissueConnection.edges;
    if (!isEmpty(bottomConnectiveTissueConnection)) {
      const connectiveTissueCmsId = bottomConnectiveTissueConnection[0].node.system.uid;

      const [bottomConnectiveTissueDataQuery] =  fetchGraphQLData(client, pagePreview.queries.GET_CONNECTIVE_TISSUE,  {
        connectiveTissueCmsId,
        locale,
      })

      if (bottomConnectiveTissueDataQuery.data) {
        contentData.bottomConnectiveTissueData = bottomConnectiveTissueDataQuery.data;
        updateAssociatedContentIds(bottomConnectiveTissueDataQuery.data, 'bottomConnectiveTissue');
      }
    }
  }

  if (!isContentLoading() && !getErrorInContent()) {
    const cardVideoAssociatedContentDataQuery = fetchGraphQLData(client, pagePreview.queries.GET_VIDEO_DATA,  { videosReferenceCmsIds: uniq(imageVideoAssociatedRecords.videoIds), locale })

    if (cardVideoAssociatedContentDataQuery.data) {
      contentData.cardVideoAssociatedContentData = cardVideoAssociatedContentDataQuery.data;
    }

    const otherCardVideoAssociatedContentDataQuery = fetchGraphQLData(client, pagePreview.queries.GET_OTHER_CONTENT_FOR_VIDEO_DATA,  { videosReferenceCmsIds: uniq(imageVideoAssociatedRecords.videoIds), locale })

    if (otherCardVideoAssociatedContentDataQuery.data) {
      contentData.otherCardVideoAssociatedContentData = otherCardVideoAssociatedContentDataQuery.data;
    }

    const cardImageAssociatedContentQuery = fetchGraphQLData(
      client,
      pagePreview.queries.GET_IMAGE_DATA,
      { imagesReferenceCmsIds: uniq(imageVideoAssociatedRecords.imageIds), locale }
    );
    
    if (cardImageAssociatedContentQuery.data) {
      contentData.cardImageAssociatedContentData = cardImageAssociatedContentQuery.data;
    }

    const otherCardImageAssociatedContentQuery = fetchGraphQLData(
      client,
      pagePreview.queries.GET_OTHER_CONTENT_FOR_IMAGE_DATA,
      { imagesReferenceCmsIds: uniq(imageVideoAssociatedRecords.imageIds), locale }
    );
    
    if (otherCardImageAssociatedContentQuery.data) {
      contentData.otherCardImageAssociatedContentData = otherCardImageAssociatedContentQuery.data;
    }

    const videoAssociatedContentQuery = fetchGraphQLData(
      client,
      pagePreview.queries.GET_VIDEO_DATA,
      { videosReferenceCmsIds: uniq(imageVideoAssociatedRecords.videoIds), locale }
    );
    
    if (videoAssociatedContentQuery.data) {
      contentData.videoAssociatedContentData = videoAssociatedContentQuery.data;
    }

    const otherVideoAssociatedContentQuery = fetchGraphQLData(
      client,
      pagePreview.queries.GET_OTHER_CONTENT_FOR_VIDEO_DATA,
      { videosReferenceCmsIds: uniq(imageVideoAssociatedRecords.videoIds), locale }
    );
    
    if (otherVideoAssociatedContentQuery.data) {
      contentData.otherVideoAssociatedContentData = otherVideoAssociatedContentQuery.data;
    }

    const imageAssociatedContentQuery = fetchGraphQLData(
      client,
      pagePreview.queries.GET_OTHER_CONTENT_FOR_VIDEO_DATA,
      { imagesReferenceCmsIds: uniq(imageVideoAssociatedRecords.imageIds), locale }
    );
    
    if (imageAssociatedContentQuery.data) {
      contentData.imageAssociatedContentData = imageAssociatedContentQuery.data;
    }
    
    const otherImageAssociatedContentQuery = fetchGraphQLData(
      client,
      pagePreview.queries.GET_OTHER_CONTENT_FOR_VIDEO_DATA,
      { imagesReferenceCmsIds: uniq(imageVideoAssociatedRecords.imageIds), locale }
    );
    
    if (otherImageAssociatedContentQuery.data) {
      contentData.otherImageAssociatedContentData = otherImageAssociatedContentQuery.data;
    }

  }
  return {
    loading: false,
    mainContentData: mainContentRes.data,
    mainContentResCardData: mainContentResCard.data,
    secondaryContentData: secondaryContentRes.data,
    otherMainContentData: otherMainContentRes.data,
    otherSecondaryContentData: otherSecondaryContentRes.data,
    pageConnectiveTissueBasicInfoData: pageConnectiveTissueBasicInfo.data,
    isTopConnectiveTissue: pageConnectiveTissueBasicInfo.data
      && !isEmpty(pageConnectiveTissueBasicInfo.data.pagev4.top_connective_tissueConnection.edges),
  
    isBottomConnectiveTissue: pageConnectiveTissueBasicInfo.data
      && !isEmpty(pageConnectiveTissueBasicInfo.data.pagev4.bottom_connective_tissueConnection.edges),
    ...contentData,
    imageVideoAssociatedRecords,
    error: getErrorInContent(),
  };
};

export {
  getPageQueryData
};
