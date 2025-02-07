import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';

const AnswerList = ({
  answers,
  questionId,
  answersStyle,
}) => {
  return (
    answers.map((answer) => (
      <Answer
        key={answer.id}
        answer={answer}
        optionId={answer.id}
        questionId={questionId}
        answersStyle={answersStyle}
      />
    ))
  );
};

AnswerList.defaultProps = {
  answers: [],
};

AnswerList.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string,
    weight: PropTypes.number.isRequired,
  })),
  questionId: PropTypes.string.isRequired,
  answersStyle: PropTypes.string,
};
export default AnswerList;
