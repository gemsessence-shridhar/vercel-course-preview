import {
  isEmpty, uniqBy, map
} from 'lodash';
const CARD_REFERENCE = 'PageComponentsComponentsCardReference';

const nodes = (item) => (
  item.edges.map((edge) => edge.node)
);

const getId = (data) => data.system.uid;

let imageVideoAssociatedRecords = [];

const getFormattedInlineText = (mainContentData, typeName) => {
  if (isEmpty(mainContentData.inline_text)) return null;

  return {
    type: typeName,
    text: mainContentData.inline_text.text,
    __typename: 'InlineText',
  };
};
const getFormattedAnswers = (answersConnection) => {
  const answers = nodes(answersConnection);
  if (isEmpty(answers)) return null;
  return answers.map((answer) => ({
    id: getId(answer),
    answer: answer.display_text,
    isCorrectResponse: answer.is_correct_response,
    explanation: answer.explanation,
    __typename: 'Answer',
  }));
};


const getFormattedSurveyAnswers = (surveyAnswersConnection) => {
  const surveyAnswers = nodes(surveyAnswersConnection);

  if (isEmpty(surveyAnswers)) return null;
  return surveyAnswers.map((surveyAnswer) => ({
    id: getId(surveyAnswer),
    title: surveyAnswer.title,
    choiceText: surveyAnswer.choice_text,
    value: surveyAnswer.value,
    explanation: surveyAnswer.explanation,
    __typename: 'SurveyAnswer',
  }));
};

const getFormattedQuestion = (questionData) => {
  const question = nodes(questionData.questionConnection)[0];
  if (isEmpty(question)) {
    return null;
  }

  return {
    id: getId(question),
    question: question.question,
    questionType: question.question_type,
    answers: getFormattedAnswers(question.answersConnection),
    __typename: 'QuestionReference',
  };
};

const getFormattedSurveyQuestion = (surveyQuestionData) => {
  const surveyQuestion = nodes(surveyQuestionData.referenceConnection)[0];
  if (isEmpty(surveyQuestion)) {
    return null;
  }

  return {
    id: getId(surveyQuestion),
    question: surveyQuestion.question,
    surveyQuestionType: surveyQuestion.surveyQuestion_type,
    surveyAnswers: getFormattedSurveyAnswers(surveyQuestion.question_answersConnection),
    __typename: 'SurveyQuestionReference',
  };
};

const getFormattedQuestionReference = (mainContentData, typeName) => {
  if (isEmpty(mainContentData.question_reference)) return null;

  const question = nodes(mainContentData.question_reference.questionConnection)[0];
  return {
    type: typeName,
    question: getFormattedQuestion(mainContentData.question_reference),
    answers: isEmpty(question) ? [] : getFormattedAnswers(question.answersConnection),
    __typename: 'QuestionReference',
  };
};

const getFormattedSurveyQuestionReference = (mainContentData, typeName) => {
  if (isEmpty(mainContentData.survey_question_reference)) return null;

  return {
    type: typeName,
    surveyQuestion: getFormattedSurveyQuestion(mainContentData.survey_question_reference),
    __typename: 'SurveyQuestionReference',
  };
};

const getFormattedTextReference = (mainContentData, typeName) => {
  if (isEmpty(mainContentData.text_reference)) return null;

  const textConnection = nodes(mainContentData.text_reference.textConnection)[0];

  if (isEmpty(textConnection)) return null;
  return {
    type: typeName,
    text: textConnection.text,
    emphasis: isEmpty(textConnection.emphasis) ? '' : textConnection.emphasis.emphasis_selection,
    __typename: 'TextReference',
  };
};

const getFormattedTipReference = (mainContentData, typeName) => {
  if (isEmpty(mainContentData.tip_reference)) return null;

  const textConnection = nodes(mainContentData.tip_reference.tipConnection)[0];

  if (isEmpty(textConnection)) return null;
  return {
    type: typeName,
    text: textConnection.text,
    emphasis: isEmpty(textConnection.emphasis) ? '' : textConnection.emphasis.emphasis_selection,
    __typename: 'TipReference',
  };
};


const getFormattedAuthors = (authorConnection) => {
  const authorNodes = nodes(authorConnection);
  if (isEmpty(authorNodes)) return null;
  return authorNodes.map((authorNode) => ({
    authorName: `${authorNode.first_name} ${authorNode.last_name}`,
  }));
};

const getFormattedTestimonialReference = (mainContentData, typeName) => {
  if (isEmpty(mainContentData.testimonial_reference)) return null;

  const testimonialConnection = nodes(mainContentData.testimonial_reference.testimonialConnection)[0];
  if (isEmpty(testimonialConnection)) return null;
  return {
    type: typeName,
    text: testimonialConnection.text,
    authors: getFormattedAuthors(testimonialConnection.authorConnection),
    __typename: 'TestimonialReference',
  };
};

const getFormattedQuoteReference = (mainContentData, typeName) => {
  if (isEmpty(mainContentData.quote_reference)) return null;

  const quoteNode = nodes(mainContentData.quote_reference.quoteConnection)[0];
  if (isEmpty(quoteNode)) return null;
  return {
    type: typeName,
    text: quoteNode.text,
    attribution: quoteNode.attribution,
    __typename: 'QuoteReference',
  };
};

const getResourceUrl = (resourceConnection) => {
  const result = nodes(resourceConnection)[0];
  return result.url;
};

const getFormattedLearningResource = (mainContentData, typeName) => {
  if (isEmpty(mainContentData.learning_resource_reference)) return null;

  const learningResourceNode = nodes(
    mainContentData.learning_resource_reference.learning_resourceConnection,
  )[0];

  if (isEmpty(learningResourceNode)) return null;
  return {
    type: typeName,
    title: isEmpty(learningResourceNode.display_title)
      ? learningResourceNode.title : learningResourceNode.display_title,
    url: getResourceUrl(learningResourceNode.resourceConnection),
    __typename: 'LearningResource',
    isCoursePreview: true,
  };
};



const getAssociatedContent = (contentId) => {
  let result = imageVideoAssociatedRecords
    .find((content) => content.cms_id === contentId);

  if (isEmpty(result)) {
    result = {};
  }
  return result;
};

const getFormattedImageReference = (mainContentData, typeName) => {
  if (isEmpty(mainContentData.image_reference)) return null;

  const imageReference = mainContentData.image_reference;
  const associatedText = imageReference.associated_text;
  const image = nodes(imageReference.imageConnection)[0];
  if (isEmpty(image)) return null;
  const imageConnectionNode = nodes(image.imageConnection)[0];
  if (isEmpty(imageConnectionNode)) return null;
  const showAssociatedText = imageReference.show_associated_text;

  const associatedContentHash = getAssociatedContent(getId(image));

  const showAssociatedContent = associatedContentHash.show_associated_content;
  const associatedContent = associatedContentHash.associated_content && associatedContentHash.associated_content.components;
  const associatedContentPosition = associatedContentHash.associated_content_position && associatedContentHash.associated_content_position.position;
  const associatedContentWidth = associatedContentHash.associated_content_position && associatedContentHash.associated_content_position.width;

  return {
    type: typeName,
    url: imageConnectionNode.url,
    title: imageConnectionNode.title,
    alt: image.accessible_content.alternate_text,
    showAssociatedText,
    showAssociatedContent,
    associatedContent,
    associatedContentPosition,
    associatedContentWidth,
    associatedText: showAssociatedText ? associatedText.text : null,
    associatedTextPosition: showAssociatedText ? associatedText.text_position : null,
    associatedTextWidth: showAssociatedText ? associatedText.text_width : null,
    __typename: 'ImageReference',
  };
};

const getFormattedVideoReference = (mainContentData, typeName, subtitleData) => {
  if (isEmpty(mainContentData.video_reference)) return null;
  const videoReference = mainContentData.video_reference;
  const associatedText = videoReference.associated_text;
  const video = nodes(videoReference.videoConnection)[0];
  if (isEmpty(video)) return null;
  const videoConnectionNode = nodes(video.videoConnection)[0];
  if (isEmpty(videoConnectionNode)) return null;
  const showAssociatedText = videoReference.show_associated_text;
  const associatedContentHash = getAssociatedContent(getId(video));
  const showAssociatedContent = associatedContentHash.show_associated_content;
  const associatedContentPosition = associatedContentHash.associated_content_position && associatedContentHash.associated_content_position.position;

  const associatedContentWidth = associatedContentHash.associated_content_position && associatedContentHash.associated_content_position.width;
  const associatedContent = associatedContentHash.associated_content && associatedContentHash.associated_content.components;
  const subtitleCmsId = map(video.subtitlesConnection?.edges || [], 'node.system.uid')[0]
  return {
    type: typeName,
    video: {
      showAssociatedContent,
      associatedContent,
      associatedContentPosition,
      associatedContentWidth,
      fileUrl: videoConnectionNode.url,
      title: videoConnectionNode.title,
      contentType: videoConnectionNode.content_type,
      subtitleCmsId,
      subtileData: subtitleData.flat().find((obj) => obj.subtitleCmsId === subtitleCmsId)
    },
    showAssociatedText,
    associatedText: showAssociatedText ? associatedText.text : null,
    associatedTextPosition: showAssociatedText ? associatedText.text_position : null,
    associatedTextWidth: showAssociatedText ? associatedText.text_width : null,
    __typename: 'VideoReference',
  };
};

const formateContentComponent = (mainContentData, cardDetails, subtitleData = []) => {
  let componentHash;

  // {__typename: "PageComponentsComponentsTextReference", text_reference: {…}}
  // 1: {__typename: "PageComponentsComponentsInlineText", inline_text: {…}}
  // 2: {__typename: "PageComponentsComponentsTextReference", text_reference: {…}}
  // 3: {__typename: "PageComponentsComponentsTipReference", tip_reference: {…}}
  // 4: {__typename: "PageComponentsComponentsQuestionReference", question_reference: {…}}
  // 5: {__typename: "PageComponentsComponentsTestimonialReference", testimonial_reference: {…}}
  // 6: {__typename: "PageComponentsComponentsQuestionReference", question_reference: {…}}
  // 7: {__typename: "PageComponentsComponentsInlineText", inline_text: {…}}
  // 8: {__typename: "PageComponentsComponentsTextReference", text_reference: {…}}
  // 9: {__typename: "PageComponentsComponentsTestimonialReference", testimonial_reference: {…}}
  // 10: {__typename: "PageComponentsComponentsTipReference", tip_reference: {…}}
  // 11: {__typename: "PageComponentsComponentsQuoteReference", quote_reference: {…}}
  // 12: {__typename: "PageComponentsComponentsQuoteReference", quote_reference: {…}}
  // 13: {__typename: "PageComponentsComponentsImageReference", image_reference: {…}}
  // 14: {__typename: "PageComponentsComponentsVideoReference", video_reference: {…}}
  // 15: {__typename: "PageComponentsComponentsCardReference", card_reference: {…}}

  const typeName = mainContentData.__typename;
  switch (typeName) {
    case 'PageComponentsComponentsTextReference':
      componentHash = getFormattedTextReference(mainContentData, typeName);
      break;
    case 'PageComponentsComponentsInlineText':
      componentHash = getFormattedInlineText(mainContentData, typeName);
      break;
    case 'PageComponentsComponentsTipReference':
      componentHash = getFormattedTipReference(mainContentData, typeName);
      break;
    case 'PageComponentsComponentsQuestionReference':
      componentHash = getFormattedQuestionReference(mainContentData, typeName);
      break;
    case 'PageComponentsComponentsSurveyQuestionReference':
      componentHash = getFormattedSurveyQuestionReference(mainContentData, typeName);
      break;
    case 'PageComponentsComponentsTestimonialReference':
      componentHash = getFormattedTestimonialReference(mainContentData, typeName);
      break;
    case 'PageComponentsComponentsQuoteReference':
      componentHash = getFormattedQuoteReference(mainContentData, typeName);
      break;
    case 'PageComponentsComponentsImageReference':
      componentHash = getFormattedImageReference(mainContentData, typeName);
      break;
    case 'PageComponentsComponentsVideoReference':
      componentHash = getFormattedVideoReference(mainContentData, typeName, subtitleData);
      break;
    case CARD_REFERENCE:
      componentHash = getFormattedCardReference(mainContentData, typeName, cardDetails);
      break;
    case 'PageComponentsComponentsLearningResourceReference':
      componentHash = getFormattedLearningResource(mainContentData, typeName);
      break;
    default:
  }
  return componentHash;
};


const getFormattedCardComponents = (cardComponents, cardDetails) => {
  const formattedCardComponents = cardComponents.map(
    (cardComponent) => formateContentComponent(cardComponent, cardDetails),
  );

  const result = formattedCardComponents;
  return result.length === 0 ? [] : result;
};

const isShowSecondaryContent = (card) => ((!isEmpty(card) && card.show_secondary_content_) ? card.show_secondary_content_ : false);

const getCardSecondaryContentPosition = (card) => ({
  width: card.secondary_content_position ? card.secondary_content_position.width : null,
  position: card.secondary_content_position ? card.secondary_content_position.position : null,
});

const getFormattedCardReference = (mainContentData, typeName, cardDetails) => {
  if (isEmpty(mainContentData.card_reference)) return null;

  const quoteNode = nodes(mainContentData.card_reference.cardConnection)[0];
  if (isEmpty(quoteNode)) return null;
  const nodeId = getId(quoteNode);
  const matchedCard = cardDetails.find((c) => c.system.uid === nodeId);

  return {
    type: typeName,
    title: isEmpty(quoteNode.display_title) ? quoteNode.title : quoteNode.display_title,
    isexpandable: quoteNode.isexpandable,
    showSecondaryContent: isShowSecondaryContent(matchedCard),
    secondaryContentPosition: getCardSecondaryContentPosition(matchedCard),
    secondaryComponents: (isShowSecondaryContent(matchedCard) && (quoteNode.secondary_content)) ? getFormattedCardComponents(quoteNode.secondary_content.components, ) : [],
    id: nodeId,
    components: getFormattedCardComponents(quoteNode.components.components, cardDetails),
  };
};

const formateLearningResource = (contents) => {
  const learningResources = contents.filter(
    (content) => content.__typename === 'LearningResource',
  );
  if (isEmpty(learningResources)) return contents;

  const otherResource = contents.filter(
    (content) => content.__typename !== 'LearningResource',
  );

  let learningResourceHash = {
    type: 'PageComponentsComponentsLearningResourceReference',
    __typename: 'LearningResource',
    data: [],
  };

  const learningResourcesData = learningResources.map((learningResource) => {
    const resultHash = {};
    resultHash.title = learningResource.title;
    resultHash.url = learningResource.url;
    return resultHash;
  });

  learningResourceHash = {
    ...learningResourceHash,
    data: [...learningResourcesData],
  };

  otherResource.push(learningResourceHash);

  return otherResource;
};

const formateAllLearningResourceComponent = (contents) => {
  const cardResources = contents.filter(
    (content) => content.type === CARD_REFERENCE,
  );
  const otherResources = contents.filter(
    (content) => content.type !== CARD_REFERENCE,
  );

  const formattedCardResources = cardResources.map((cardResource) => ({
    ...cardResource,
    components: formateLearningResource(cardResource.components),
  }));
  const otherFormattedResources = formateLearningResource(otherResources);

  const result = formattedCardResources.concat(otherFormattedResources);
  return result;
};

const getSecondaryContentPosition = (secondaryContentPositionData) => ({
  width: secondaryContentPositionData.width,
  position: secondaryContentPositionData.position,
});

const getFormattedMainSecondaryContent = (data, cardDetails, subtitleData) => {
  if ((data === null) || (isEmpty(data) && isEmpty(data.components))) return [];
  return data.components.map(
    (mainContentData) => formateContentComponent(mainContentData, cardDetails, subtitleData),
  );
};

const getFormattedConnectiveTissue = (
  pageConnectiveTissue,
  data,
  cardDetails,
) => {
  if (isEmpty(pageConnectiveTissue)) {
    return null;
  }
  return {
    id: getId(pageConnectiveTissue[0].node),
    content: data.connective_tissue.connective_tissue.components.map(
      (connectiveTissueData) => formateContentComponent(
        connectiveTissueData, cardDetails,
      ),
    ),
  };
};

const removeNullWithObject = (collection, otherCollection) => (
  collection.map((content, index) => (content === null ? otherCollection[index] : content))
);

const removeNullContents = (collection, otherCollection) => {
  const finalContent = removeNullWithObject(collection, otherCollection);
  const filteredCollection = finalContent.filter((el) => el != null);
  return (filteredCollection.map((content) => {
    if (content.type === CARD_REFERENCE) {
      const cardComponent = otherCollection.find((_collection) => _collection && _collection.id === content.id);
      content.components = cardComponent && removeNullWithObject(content.components, cardComponent.components);
    }
    return (content);
  }));
};

const getDisplayTitle = (pageData) => ((pageData.hide_title === true) ? null : pageData.display_title);

const getFormattedImageAssociatedContents = (contentData, otherContentData, cardDetails, subtitleData) => {
  const newContentData = isEmpty(contentData) ? [] : contentData;
  const newOtherContentData = isEmpty(otherContentData) ? [] : otherContentData;
  const items = isEmpty(newContentData.all_image) ? [] : newContentData.all_image.items;
  const otherContentItems = isEmpty(newOtherContentData.all_image)
    ? [] : newOtherContentData.all_image.items;

  return (
    items.map((obj) => {
      if (!obj.show_associated_content_) {
        return ({
          show_associated_content: obj.show_associated_content_,
          cms_id: obj.system.uid,
          associated_content: { components: [] },
          associated_content_position: obj.associated_content_position,
        });
      }

      const otherContentImageObjectData = otherContentItems
        .find((object) => object.system.uid === obj.system.uid);

      let formattedOtherContentImage = [];
      let imageObject = [];

      if (otherContentImageObjectData && !isEmpty(otherContentImageObjectData.associated_content)) {
        formattedOtherContentImage = getFormattedMainSecondaryContent(
          otherContentImageObjectData.associated_content,
          cardDetails,
          subtitleData,
        );
      }

      if (!isEmpty(obj.associated_content)) {
        imageObject = getFormattedMainSecondaryContent(obj.associated_content, cardDetails, subtitleData);
      }

      return ({
        show_associated_content: obj.show_associated_content_,
        cms_id: obj.system.uid,
        associated_content: {
          components: removeNullContents(formattedOtherContentImage, imageObject),
        },
        associated_content_position: obj.associated_content_position,
      });
    })
  );
};

const getFormattedVideoAssociatedContents = (contentData, otherContentData, cardDetails, subtitleData) => {
  const newContentData = isEmpty(contentData) ? [] : contentData;
  const newOtherContentData = isEmpty(otherContentData) ? [] : otherContentData;
  const items = isEmpty(newContentData.all_video) ? [] : newContentData.all_video.items;
  const otherContentItems = isEmpty(newOtherContentData.all_video)
    ? [] : newOtherContentData.all_video.items;

  return (
    items.map((obj) => {
      if (!obj.show_associated_content_) {
        return ({
          show_associated_content: obj.show_associated_content_,
          cms_id: obj.system.uid,
          associated_content: { components: [] },
          associated_content_position: obj.associated_content_position,
        });
      }

      let formattedOtherContentVideo = [];
      let videoObject = [];

      const otherContentVideoObjectData = otherContentItems
        .find((object) => object.system.uid === obj.system.uid);

      if (otherContentVideoObjectData && !isEmpty(otherContentVideoObjectData.associated_content)) {
        formattedOtherContentVideo = getFormattedMainSecondaryContent(
          otherContentVideoObjectData.associated_content, cardDetails, subtitleData
        );
      }

      if (!isEmpty(obj.associated_content)) {
        videoObject = getFormattedMainSecondaryContent(obj.associated_content, cardDetails, subtitleData);
      }

      return ({
        show_associated_content: obj.show_associated_content_,
        cms_id: obj.system.uid,
        associated_content: {
          components: removeNullContents(formattedOtherContentVideo, videoObject),
        },
        associated_content_position: obj.associated_content_position,
      });
    })
  );
};

const updateImageVideoAssociatedRecords = (
  cardVideoAssociatedContentData,
  cardImageAssociatedContentData,
) => {
  let totalData = [];
  if (!isEmpty(cardVideoAssociatedContentData)) {
    totalData = [...cardVideoAssociatedContentData];
  }

  if (!isEmpty(cardImageAssociatedContentData)) {
    totalData = [...totalData, ...cardImageAssociatedContentData];
  }

  imageVideoAssociatedRecords = [...imageVideoAssociatedRecords, ...uniqBy(totalData, 'cms_id')];
};

const getPageFormattedData = (pageMainContentCmsData, pageSecondaryContentCmsData, otherMainContentData, otherSecondaryContentData, pageConnectiveTissueBasicInfoData, bottomConnectiveTissueData, topConnectiveTissueData, mainContentImageData, secondaryContentImageData, secondaryContentVideoData, mainContentVideoData, otherMainContentImageData, otherSecondaryContentImageData, otherSecondaryContentVideoData, otherMainContentVideoData, cardDetails, cardVideoAssociatedContentData, otherCardVideoAssociatedContentData, cardImageAssociatedContentData, otherCardImageAssociatedContentData, videoAssociatedContentData, otherVideoAssociatedContentData, imageAssociatedContentData, otherImageAssociatedContentData, subtitleData) => {
  const pageData = pageMainContentCmsData.pagev4;
  const secondaryPageData = pageSecondaryContentCmsData.pagev4;
  const showSecondaryContent = pageData.show_secondary_content;

  const cardImageAssociatedContent = getFormattedImageAssociatedContents(cardImageAssociatedContentData, otherCardImageAssociatedContentData, cardDetails, subtitleData);

  const cardVideoAssociatedContent = getFormattedVideoAssociatedContents(cardVideoAssociatedContentData, otherCardVideoAssociatedContentData, cardDetails, subtitleData);

  const imageAssociatedContent = getFormattedImageAssociatedContents(imageAssociatedContentData, otherImageAssociatedContentData, cardDetails, subtitleData);

  const videoAssociatedContent = getFormattedVideoAssociatedContents(videoAssociatedContentData, otherVideoAssociatedContentData, cardDetails, subtitleData);

  updateImageVideoAssociatedRecords(cardVideoAssociatedContent, cardImageAssociatedContent);
  updateImageVideoAssociatedRecords(videoAssociatedContent, imageAssociatedContent);

  const otherMainContent = getFormattedMainSecondaryContent(otherMainContentData.pagev4.main_content, cardDetails, subtitleData);
  const otherSecondaryContent = showSecondaryContent ? getFormattedMainSecondaryContent(otherSecondaryContentData.pagev4.secondary_content, cardDetails, subtitleData) : [];

  const formattedSecondaryContent = showSecondaryContent ? getFormattedMainSecondaryContent(
    secondaryPageData.secondary_content, cardDetails, subtitleData,
  ) : [];
  const topConnectiveTissue = getFormattedConnectiveTissue(pageConnectiveTissueBasicInfoData.pagev4.top_connective_tissueConnection.edges, topConnectiveTissueData, cardDetails);

  const bottomConnectiveTissue = getFormattedConnectiveTissue(pageConnectiveTissueBasicInfoData.pagev4.bottom_connective_tissueConnection.edges, bottomConnectiveTissueData, cardDetails);

  const formattedData = {
    page: {
      id: getId(pageData),
      title: pageData.title,
      displayTitle: getDisplayTitle(pageData),
      pageContent: {
        showSecondaryContent,
        secondaryContentPosition: getSecondaryContentPosition(pageData.secondary_content_position),
        mainContent: removeNullContents(getFormattedMainSecondaryContent(pageData.main_content, cardDetails, subtitleData), otherMainContent, subtitleData),
        secondaryContent: removeNullContents(formattedSecondaryContent, otherSecondaryContent),
        bottomConnectiveTissue,
        topConnectiveTissue,
      },
    },
  };

  return formattedData;
};

const getTitle = (data) => (
  isEmpty(data.metadata.display_title)
    ? data.title
    : data.metadata.display_title
);

const getLevelOneCollectionCount = (levelTwoData) => levelTwoData.lessonsConnection.totalCount;

const getCourseTitle = (courseType, courseData) => {
  let courseTitle = '';
  switch (courseType) {
    case 'l2':
      courseTitle = getTitle(courseData.level_2_course);
      break;
    case 'l3':
      courseTitle = getTitle(courseData.level_3_course);
      break;
    case 'l4':
      courseTitle = getTitle(courseData.level_4_course);
      break;
    default:
  }
  return courseTitle;
};

const getPageHeadingFormattedData = (
  courseType, contentType, courseData, level2CollectionData, level1CollectionData,
) => ({
  courseTitle: getCourseTitle(courseType, courseData),
  topic: {
    levelTwoCollectionProgress: {
      contentType,
    },
    title: getTitle(level2CollectionData.level_2),
    levelOneCollectionCount: getLevelOneCollectionCount(level2CollectionData.level_2),
  },
  lessonTitle: getTitle(level1CollectionData.level_1),
});


export {
  getPageFormattedData,
  getPageHeadingFormattedData,
  formateAllLearningResourceComponent,
  formateContentComponent,
};
