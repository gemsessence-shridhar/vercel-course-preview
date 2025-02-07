import { isEmpty } from 'lodash';
import { nodes } from '@components/shared/utils';

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

export {
  getFormattedQuestion,
};
