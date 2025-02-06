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
    answer: answer.display_text,
    isCorrectResponse: answer.is_correct_response,
    explanation: answer.explanation,
    __typename: 'Answer',
  }));
};

const getFormattedQuestionType = (multipleChoice) => {
  let questionType = null;
  switch (multipleChoice) {
    case 'Single Answer':
      questionType = 'singleChoice';
      break;
    case 'Multiple Answers':
      questionType = 'multipleChoice';
      break;
    default: questionType = null;
  }
  return questionType;
};

const getFormattedQuestion = (questionData) => {

  const { question } = questionData;
  if (isEmpty(question)) {
    return null;
  }

  return {
    id: getId(question),
    question: question.question,
    questionType: getFormattedQuestionType(question.question_type),
    answers: getFormattedAnswers(question.answersConnection),
    __typename: 'Question',
  };
};

const getExamImageHash = (exam) => {
  let imageHash = null;
  const examImage = nodes(exam.imageConnection)[0];
  if (!isEmpty(examImage)) {
    const imageNode = examImage.imageConnection.edges[0].node;
    if (!isEmpty(imageNode)) {
      imageHash = {
        id: getId(imageNode),
        url: imageNode.url,
        title: imageNode.title,
      };
    }
  }

  return imageHash;
};

const getExamQuestionFormattedData = (examCmsData, questionContentCmsData) => {
  const { exam } = examCmsData;

  return {
    exam: {
      id: getId(exam),
      title: getFormattedTitle(exam),
      duration: exam.duration_minutes,
      image: getExamImageHash(exam),
    },
    question: getFormattedQuestion(questionContentCmsData),
  };
};

export {
  getExamQuestionFormattedData,
  getFormattedQuestion,
};
