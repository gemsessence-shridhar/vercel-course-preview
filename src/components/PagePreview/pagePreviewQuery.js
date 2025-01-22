import { isEmpty, uniq } from 'lodash';
import { pagePreview } from '../../graphql_states/contentstack';

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

const getPageQueryData = async (pageCmsId, locale, client) => {
  const mainContentResCard = await client.query({
    query: pagePreview.queries.GET_PAGE_PREVIEW_WITH_MAIN_CONTENT_CARD,
    variables: { pageCmsId, locale: locale}, fetchPolicy: 'no-cache' },
  );
  let mainContentRes = await client.query({
    query: pagePreview.queries.GET_PAGE_PREVIEW_WITH_MAIN_CONTENT,
    variables: { pageCmsId, locale: locale}, fetchPolicy: 'no-cache' },
  );

  const secondaryContentRes = await client.query({
    query: pagePreview.queries.GET_PAGE_PREVIEW_SECONDARY_CONTENT,
    variables: { pageCmsId, locale }, fetchPolicy: 'no-cache' },
  );

  const otherMainContentRes = await client.query({
    query: pagePreview.queries.GET_PAGE_PREVIEW_OTHER_CONTENT_FOR_MAIN_CONTENT,
    variables: { pageCmsId, locale }, fetchPolicy: 'no-cache' },
  );

  const otherSecondaryContentRes = await client.query({
    query: pagePreview.queries.GET_PAGE_PREVIEW_OTHER_CONTENT_FOR_SECONDARY_CONTENT,
    variables: { pageCmsId, locale }, fetchPolicy: 'no-cache' },
  );

  const pageConnectiveTissueBasicInfo = await client.query({
    query: pagePreview.queries.GET_PAGE_CONNECTIVE_TISSUE_BASIC_INFO,
    variables: { pageCmsId, locale }, fetchPolicy: 'no-cache' },
  );

  async function fetchGraphQLData(query, variables) {
    try {
      const response = await client.query({
        query,
        variables,
        fetchPolicy: 'no-cache',
      });
  
      // Extract data and error from the response
      const { data, error } = response;
      const loading = false; // Since we're using `client.query`, we manage loading manually
  
      return { data, error, loading };
    } catch (err) {
      // Handle any errors in the query execution
      console.error("Query failed:", err);
      return { data: null, error: err, loading: false };
    }
  }

  const isContentLoading = () => (
    mainContentRes.loading
    || mainContentResCard.loading
    || secondaryContentRes.loading
    || otherMainContentRes.loading
    || otherSecondaryContentRes.loading
    || pageConnectiveTissueBasicInfo.loading
    || topConnectiveTissueLoading
    || bottomConnectiveTissueLoading

    || cardVideoAssociatedContentLoading
    || otherCardVideoAssociatedContentLoading
    || cardImageAssociatedContentLoading
    || otherCardImageAssociatedContentLoading

    || videoAssociatedContentLoading
    || otherVideoAssociatedContentLoading
    || imageAssociatedContentLoading
    || otherImageAssociatedContentLoading
  );

  const getErrorInContent = () => (
    mainContentRes.error
    || mainContentResCard.error
    || secondaryContentRes.error
    || otherMainContentRes.error
    || otherSecondaryContentRes.error
    || pageConnectiveTissueBasicInfo.error
    || bottomConnectiveTissueError
    || topConnectiveTissueError

    || cardVideoAssociatedContentError
    || otherCardVideoAssociatedContentError
    || cardImageAssociatedContentError
    || otherCardImageAssociatedContentError

    || videoAssociatedContentError
    || otherVideoAssociatedContentError
    || imageAssociatedContentError
    || otherImageAssociatedContentError
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
  let mainContentVideoData = undefined;
  let otherMainContentVideoData = undefined;
  let topConnectiveTissueData = undefined;
  let bottomConnectiveTissueData = undefined;
  let secondaryContentVideoData = undefined;
  let secondaryContentImageData = undefined;
  let mainContentImageData = undefined;
  let otherSecondaryContentVideoData = undefined;
  let otherSecondaryContentImageData = undefined;
  let otherMainContentImageData = undefined;
  let cardVideoAssociatedContentData = undefined;
  let otherCardVideoAssociatedContentData = undefined;
  let cardImageAssociatedContentData = undefined;
  let otherCardImageAssociatedContentData = undefined;
  let videoAssociatedContentData = undefined;
  let otherVideoAssociatedContentData = undefined;
  let imageAssociatedContentData = undefined;
  let otherImageAssociatedContentData = undefined;

  let bottomConnectiveTissueError = undefined;          
  let topConnectiveTissueError = undefined;
  let cardVideoAssociatedContentError = undefined;
  let otherCardVideoAssociatedContentError = undefined;
  let cardImageAssociatedContentError = undefined;
  let otherCardImageAssociatedContentError = undefined;
  let videoAssociatedContentError = undefined;
  let otherVideoAssociatedContentError = undefined;
  let imageAssociatedContentError = undefined;
  let otherImageAssociatedContentError = undefined;

  if (isMainContentResSuccess && mainContentResCardSuccess) {
    const videosReference = findVideoReference(mainContentRes.data.pagev4.main_content.components);

    const videosReferenceCard = findVideoReference(mainContentResCard.data.pagev4.main_content.components);

    const videosReferenceCmsIds = videosReference.map((obj) => obj.video_reference.videoConnection.edges[0].node.system.uid);

    const videosReferenceCardCmsIds = videosReferenceCard.map((obj) => obj.video_reference.videoConnection.edges[0].node.system.uid);

    const { data: mainContentData, error: mainContentError, loading: mainContentLoading } = await fetchGraphQLData(pagePreview.queries.GET_VIDEO_DATA, {
      videosReferenceCmsIds: [...videosReferenceCmsIds, ...videosReferenceCardCmsIds],
      locale,
    });

    if (mainContentData) {
        mainContentVideoData = mainContentData;
    }

    const { data: otherContentData, error: otherContentError, loading: otherContentLoading } = await fetchGraphQLData(pagePreview.queries.GET_OTHER_CONTENT_FOR_VIDEO_DATA, {
      videosReferenceCmsIds: [...videosReferenceCmsIds, ...videosReferenceCardCmsIds],
      locale,
    });

 
    if (otherContentData) {
      otherMainContentVideoData = otherContentData;
    }
  }

  if (!secondaryContentRes.loading && isEmpty(secondaryContentRes.error) && !isEmpty(secondaryContentRes.data)) {
    const videosReference = findVideoReference(secondaryContentRes.data.pagev4.secondary_content.components);
    const videosReferenceCmsIds = videosReference.map((obj) => obj.video_reference.videoConnection.edges[0].node.system.uid);
    
    const { data: secondaryContentData, error: secondaryContentError, loading: secondaryContentLoading } = await fetchGraphQLData(pagePreview.queries.GET_VIDEO_DATA, { videosReferenceCmsIds, locale });

    if (secondaryContentData) {
      secondaryContentVideoData = secondaryContentData;
    }

    const { data: otherContentData, error: otherSecondaryContentVideoError, loading: otherSecondaryContentVideoLoading } = await fetchGraphQLData(pagePreview.queries.GET_OTHER_CONTENT_FOR_VIDEO_DATA, { videosReferenceCmsIds, locale });

    if (otherContentData) {
      otherSecondaryContentVideoData = otherContentData;
    }
  }

  
  if (!pageConnectiveTissueBasicInfo.loading && isEmpty(pageConnectiveTissueBasicInfo.error)) {
    const topConnectiveTissueConnection = pageConnectiveTissueBasicInfo.data.pagev4.top_connective_tissueConnection.edges;
    if (!isEmpty(topConnectiveTissueConnection) && !topConnectiveTissueData) {
      
      const topConnectiveTissueCmsId = topConnectiveTissueConnection[0].node.system.uid;
      var topConnectiveTissueLoading = true;
      const { data: topConnectiveTissue, error: topConnectiveTissueError, loading: connectiveLoading } = await fetchGraphQLData(pagePreview.queries.GET_CONNECTIVE_TISSUE, { connectiveTissueCmsId: topConnectiveTissueCmsId, locale } );
      
      if (topConnectiveTissue) {
        topConnectiveTissueData = topConnectiveTissue;
        topConnectiveTissueLoading = connectiveLoading
      }
    }
    
    if (topConnectiveTissueData) {
      updateAssociatedContentIds(topConnectiveTissueData, 'topConnectiveTissue');
    }
    
    var bottomConnectiveTissueLoading = true;
    const bottomConnectiveTissueConnection = pageConnectiveTissueBasicInfo.data.pagev4.bottom_connective_tissueConnection.edges;
    if (!isEmpty(bottomConnectiveTissueConnection) && !bottomConnectiveTissueData) {
      const bottomConnectiveTissueCmsId = bottomConnectiveTissueConnection[0].node.system.uid;
      const { data: bottomConnectiveTissue, error: bottomConnectiveTissueError, loading: bottomLoading } = await fetchGraphQLData(pagePreview.queries.GET_CONNECTIVE_TISSUE, { connectiveTissueCmsId: bottomConnectiveTissueCmsId, locale });

      if (bottomConnectiveTissue) {
        bottomConnectiveTissueData = bottomConnectiveTissue;
        bottomConnectiveTissueLoading = bottomLoading;
      }
    }
    if (bottomConnectiveTissueData) {
      updateAssociatedContentIds(bottomConnectiveTissueData, 'bottomConnectiveTissue');
    }
  }


  var cardVideoAssociatedContentLoading = undefined;
  var otherCardVideoAssociatedContentLoading = undefined; 
  var cardImageAssociatedContentLoading = undefined;
  var otherCardImageAssociatedContentLoading = undefined;
  var videoAssociatedContentLoading = undefined;
  var otherVideoAssociatedContentLoading = undefined;
  var imageAssociatedContentLoading = undefined;
  var otherImageAssociatedContentLoading = undefined;
    
  if (!isContentLoading() && !getErrorInContent()) {

    const { data: videoData, error: bottomConnectiveTissueError, loading: videoLoading } = await fetchGraphQLData(pagePreview.queries.GET_VIDEO_DATA, { videosReferenceCmsIds: uniq(imageVideoAssociatedRecords.videoIds), locale } );

    if (videoData) {
      cardVideoAssociatedContentData = videoData;
    }

    const { data: cardVideoAssociatedContent, error: otherCardVideoAssociatedContentError, loading: otherCardVideoAssociatedContentLoading } = await fetchGraphQLData(pagePreview.queries.GET_OTHER_CONTENT_FOR_VIDEO_DATA, { videosReferenceCmsIds: uniq(imageVideoAssociatedRecords.videoIds), locale } );

    if (cardVideoAssociatedContent) {
      otherCardVideoAssociatedContentData = cardVideoAssociatedContent;
    }

    const { data: cardImageAssociatedContent, error: cardImageAssociatedContentError, loading: cardImageAssociatedContentLoading } = await fetchGraphQLData(pagePreview.queries.GET_IMAGE_DATA,{ imagesReferenceCmsIds: uniq(imageVideoAssociatedRecords.imageIds), locale } );

    if (cardImageAssociatedContent) {
      cardImageAssociatedContentData = cardImageAssociatedContent;
    }

    const { data: otherCardImageAssociatedContent, error: otherCardImageAssociatedContentError, loading: otherCardImageAssociatedContentLoading } = await fetchGraphQLData(pagePreview.queries.GET_OTHER_CONTENT_FOR_IMAGE_DATA,{ imagesReferenceCmsIds: uniq(imageVideoAssociatedRecords.imageIds), locale } );

    if (otherCardImageAssociatedContent) {
      otherCardImageAssociatedContentData = otherCardImageAssociatedContent;
    }

    const { data: videoAssociatedContent, error: videoAssociatedContentError, loading: videoAssociatedContentLoading } = await fetchGraphQLData(pagePreview.queries.GET_VIDEO_DATA, { videosReferenceCmsIds: uniq(imageVideoAssociatedRecords.videoIds), locale } );

    if (videoAssociatedContent) {
      videoAssociatedContentData = videoAssociatedContent;
    }

    const { data: otherVideoAssociatedContent, error: otherVideoAssociatedContentError, loading: otherVideoAssociatedContentLoading } = await fetchGraphQLData(pagePreview.queries.GET_OTHER_CONTENT_FOR_VIDEO_DATA, { videosReferenceCmsIds: uniq(imageVideoAssociatedRecords.videoIds), locale } );

    if (otherVideoAssociatedContent) {
      otherVideoAssociatedContentData = otherVideoAssociatedContent;
    }

    const { data: imageAssociatedContent, error: imageAssociatedContentError, loading: imageAssociatedContentLoading } = await fetchGraphQLData(pagePreview.queries.GET_OTHER_CONTENT_FOR_VIDEO_DATA, { imagesReferenceCmsIds: uniq(imageVideoAssociatedRecords.imageIds), locale } );

    if (imageAssociatedContent) {
      imageAssociatedContentData = imageAssociatedContent;
    }

    const { data: otherImageAssociatedContent, error: otherImageAssociatedContentError, loading: otherImageAssociatedContentLoading } = await fetchGraphQLData(pagePreview.queries.GET_OTHER_CONTENT_FOR_VIDEO_DATA, { imagesReferenceCmsIds: uniq(imageVideoAssociatedRecords.imageIds), locale } );

    if (otherImageAssociatedContent) {
      otherImageAssociatedContentData = otherImageAssociatedContent;
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
    isTopConnectiveTissue: (
      pageConnectiveTissueBasicInfo.data
      && !isEmpty(pageConnectiveTissueBasicInfo.data.pagev4.top_connective_tissueConnection.edges)
    ),
    isBottomConnectiveTissue: (
      pageConnectiveTissueBasicInfo.data
      && !isEmpty(
        pageConnectiveTissueBasicInfo.data.pagev4.bottom_connective_tissueConnection.edges,
      )
    ),

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

    imageVideoAssociatedRecords,

    videoAssociatedContentData,
    otherVideoAssociatedContentData,
    imageAssociatedContentData,
    otherImageAssociatedContentData,
    error: getErrorInContent(),
  };
};

const getCourseQuery = (courseType) => {
  let query = null;
  switch (courseType) {
    case 'l2':
      query = pagePreview.queries.GET_LEVEL_TWO_COURSE_WITH_BASIC_INFO;
      break;
    case 'l3':
      query = pagePreview.queries.GET_LEVEL_THREE_COURSE_WITH_BASIC_INFO;
      break;
    default:
  }

  return query;
};

const useCourseQueries = (
  courseType,
  courseCmsId,
  levelTwoCollectionCmsId,
  levelOneCollectionCmsId,
  locale,
) => {
  const courseRes = client.query({
    query: getCourseQuery(courseType),
    variables: { courseCmsId, locale }, fetchPolicy: 'no-cache' },
  );

  const levelTwoCollectionRes = client.query({
    query: pagePreview.queries.GET_LEVEL_TWO_COLLECTION_WITH_BASIC_INFO,
    variables: { levelTwoCollectionCmsId, locale }, fetchPolicy: 'no-cache' },
  );

  const levelOneCollectionRes = client.query({
    query: pagePreview.queries.GET_LEVEL_ONE_COLLECTION_WITH_BASIC_INFO,
    variables: { levelOneCollectionCmsId, locale }, fetchPolicy: 'no-cache' },
  );

  return {
    loading: courseRes.loading || levelTwoCollectionRes.loading || levelOneCollectionRes.loading,
    courseData: courseRes.data,
    levelTwoCollectionData: levelTwoCollectionRes.data,
    levelOneCollectionData: levelOneCollectionRes.data,
    error: courseRes.error || levelTwoCollectionRes.error || levelOneCollectionRes.error,
  };
};

export {
  getPageQueryData,
  useCourseQueries,
};
