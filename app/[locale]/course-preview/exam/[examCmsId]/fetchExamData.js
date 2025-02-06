import createApolloClient from '@/apollo_client';
import { examPreview, pagePreview } from '@graphql/contentstack';
import { nodes } from '@components/shared/utils';
import { getFormattedQuestion } from '@components/ExamPreview/QuestionCmsDataFormatter';

const client = createApolloClient();

const fetchExamDetails = async (locale, examCmsId) => {
  const { data } = await client.query({
    query: examPreview.queries.GET_EXAM_DATA,
    variables: { examCmsId, locale },
    fetchPolicy: 'no-cache',
  });

  return data?.exam || {};
};

const fetchAssociatedContent = async (imageData, locale) => {
  if (!imageData?.show_associated_content_) return null;

  const { data } = await client.query({
    query: pagePreview.queries.GET_IMAGE,
    variables: { imagesReferenceCmsId: imageData.system.uid, locale },
    fetchPolicy: 'network-only',
  });

  return data?.image || null;
};

const fetchQuestionsData = async (questionCmsIds, locale) => {
  const results = await Promise.allSettled(
    questionCmsIds.map((questionCmsId) =>
      client
        .query({
          query: examPreview.queries.GET_LEVEL_TWO_EXAM_QUESTION_CONTENT,
          variables: { questionCmsId, locale },
          fetchPolicy: 'no-cache',
        })
        .then((res) => res.data)
    )
  );

  return results
    .map((result) => getFormattedQuestion(result.value));
};

export const fetchExamData = async (locale, examCmsId) => {
  const exam = await fetchExamDetails(locale, examCmsId);
  
  if (!exam) return { displayTitle: '', questionsAnswersData: [], associatedContent: null };

  const { questionsConnection = [], imageConnection = [] } = exam;
  const questionCmsIds = nodes(questionsConnection).map((q) => q.system.uid);
  const imageData = nodes(imageConnection)?.[0] || null;

  const associatedContent = await fetchAssociatedContent(imageData, locale);
  const questionsAnswersData = await fetchQuestionsData(questionCmsIds, locale);

  return {
    displayTitle: exam.display_title || exam.title,
    questionsAnswersData,
    associatedContent,
    imageConnection,
  };
};
