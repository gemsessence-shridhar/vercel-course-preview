import React from 'react';
import PropTypes from 'prop-types';
import styles from './lesson-page.module.scss';
import classNames from 'classnames';
import SurveyQuestionAnswersBlock from './SurveyQuestionAnswersBlock';
import useSuperScript from '../shared/hooks/useSuperScript';

const SurveyQuestionReference = ({
  content,
}) => {
  useSuperScript();

  return (
    <>
      <div className={styles['question-answer-container']}>
        <h4 data-testid="survey-question" className={classNames("text-dark", styles['question-heading'])}>
          {content.question}
        </h4>
        {content.surveyAnswers.map((answer) => (
          <SurveyQuestionAnswersBlock
            key={answer.id}
            answer={answer}
            toggleCheckbox={() => {}}
            isChecked={true}
            disableAnswerOptions={true}
          />
        ))}
      </div>
    </>
  );
};

SurveyQuestionReference.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
};
export default SurveyQuestionReference;
