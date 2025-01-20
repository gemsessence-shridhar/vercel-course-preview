import React from 'react';
import { find } from 'lodash';
import PropTypes from 'prop-types';
import styles from './lesson-page.module.scss';
import SurveyQuestionAnswersBlock from './SurveyQuestionAnswersBlock';
import useSuperScript from '../shared/hooks/useSuperScript';

const SurveyQuestionReference = ({
  content,
  setSelectedAnswers,
  userAnswers,
  selectedAnswers,
}) => {
  useSuperScript();

  const handleSelectAnswer = (event) => {
    const targetElement = event.target;
    const answer = find(content.surveyAnswers, { id: targetElement.value });
    setSelectedAnswers([answer.id]);
  };

  return (
    <>
      <div className={styles['question-answer-container']}>
        <h4 data-testid="survey-question" className={styles['question-heading']}>
          {content.question}
        </h4>
        {content.surveyAnswers.map((answer) => (
          <SurveyQuestionAnswersBlock
            key={answer.id}
            answer={answer}
            toggleCheckbox={handleSelectAnswer}
            isChecked={userAnswers.includes(answer.id) || selectedAnswers.includes(answer.id)}
            disableAnswerOptions={userAnswers.length !== 0}
          />
        ))}
      </div>
    </>
  );
};

SurveyQuestionReference.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
  setSelectedAnswers: PropTypes.func.isRequired,
  userAnswers: PropTypes.instanceOf(Array).isRequired,
  selectedAnswers: PropTypes.instanceOf(Array).isRequired,
};
export default SurveyQuestionReference;
