import createApolloClient from '@/apollo_client';
import { assessmentExamPreview } from '@graphql/contentstack';
import { nodes } from '@components/shared/utils';
import getExamQuestionFormattedData from '@components/AssessmentExamPreview/QuestionCmsDataFormatter';

const client = createApolloClient();

const fetchAssessmentExamDetails = async (locale, assessmentExamCmsId) => {
  const { data } = await client.query({
    query: assessmentExamPreview.queries.GET_ASSESSMENT_EXAM_DATA,
    variables: { uid: assessmentExamCmsId, locale },
    fetchPolicy: 'no-cache',
  });

  return data?.assessment_exam || {};
};

const fetchAssessmentQuestionsData = async (assessmentQuesCmsIds, locale) => {
  const results = await Promise.allSettled(
    assessmentQuesCmsIds.map((questionCmsId) =>
      client
        .query({
          query: assessmentExamPreview.queries.GET_ASSESSMENT_EXAM_QUESTION_DATA,
          variables: { uid: questionCmsId, locale },
          fetchPolicy: 'no-cache',
        })
        .then((res) => res.data)
    )
  );
  return results
    .map((result) => result.value);
};

export const fetchAssessmentExamData = async (locale, assessmentExamCmsId) => {
  const assessmentExamData = await fetchAssessmentExamDetails(locale, assessmentExamCmsId);
  
  const assessmentQuesCmsIds = nodes(assessmentExamData.questionsConnection).map((q) => q.system.uid);
  

  const questionsAnswersData = await fetchAssessmentQuestionsData(assessmentQuesCmsIds, locale);

  return getExamQuestionFormattedData(assessmentExamData, questionsAnswersData);
};
