import { isEmpty } from 'lodash';
import { nodes } from '@components/shared/utils';

const getFormattedTitle = (node) => (
  isEmpty(node.display_title) ? node.title : node.display_title
);

const getId = (data) => data.system.uid;

const getFormattedAnswers = (answersConnection) => {
  const answers = nodes(answersConnection);
  if (isEmpty(answers)) return null;

  return answers.map((answer) => ({
    id: getId(answer),
    title: answer.answer_option || answer.title,
    weight: answer.answer_weight,
    __typename: 'AssessmentAnswer',
  }));
};

const getFormattedQuestion = (questionData) => {
  const { assessment_question: assessmentQuestion } = questionData;
  if (isEmpty(assessmentQuestion)) {
    return null;
  }

  return {
    id: getId(assessmentQuestion),
    question: assessmentQuestion.question,
    answers: getFormattedAnswers(assessmentQuestion.answersConnection),
    __typename: 'AssessmentQuestion',
  };
};


const getExamQuestionFormattedData = (examCmsData, questionContentCmsData) => {
  return {
    exam: {
      id: getId(examCmsData),
      title: getFormattedTitle(examCmsData),
    },
    questions: questionContentCmsData.map((questionContent) => getFormattedQuestion(questionContent))
  };
};

export default getExamQuestionFormattedData;
