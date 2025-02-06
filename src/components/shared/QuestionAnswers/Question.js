import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useSuperScript from '../hooks/useSuperScript';

const Question = ({ questionText, questionsStyle }) => {
  useSuperScript();

  return (
    <>
      <p data-testid="question-text" className={classNames(questionsStyle, 'h4 font-weight-bold text-center mb-3')}>
        { questionText }
      </p>
    </>
  );
};

Question.propTypes = {
  questionText: PropTypes.string.isRequired,
};

export default Question;
