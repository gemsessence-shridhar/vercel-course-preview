/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import VibCheckboxRadioButton from '../vib_checkbox_and_radio_button';

import styles from './style.module.scss';
import useSuperScript from '../hooks/useSuperScript';

const ExamAnswer = ({
  answer: { id: answerId, answer, isCorrectResponse },
  toggleCheckbox,
  enableMultiSelect,
  selectedAnswerIds,
  disabled,
  isCoursePreviewView
}) => {
  useSuperScript();
  const answerContainerClasses = classNames(
    'answer-container media mb-2',
    styles['feedback-container-bg-color'],
  );

  return (
    <div className={answerContainerClasses}>
      <VibCheckboxRadioButton
        value={answerId}
        optionId={answerId}
        toggleCheckbox={toggleCheckbox}
        isChecked={selectedAnswerIds.includes(answerId)}
        questionId={answerId}
        disableAnswerOptions={disabled}
        isMultiSelect={enableMultiSelect}
        label={answer}
        labelClasses={styles['text-label']}
        isCorrectResponse={isCorrectResponse}
        isCoursePreviewView={isCoursePreviewView}
      />
    </div>
  );
};

ExamAnswer.defaultProps = {
  isCoursePreviewView: false,
};

ExamAnswer.propTypes = {
  answer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    isCorrectResponse: PropTypes.bool,
  }).isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  enableMultiSelect: PropTypes.bool.isRequired,
  selectedAnswerIds: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  isCoursePreviewView: PropTypes.bool,
};

export default ExamAnswer;
