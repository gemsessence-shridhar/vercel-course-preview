import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import Feedback from '../shared/QuestionAnswers/Feedback';
import styles from './styles.module.scss';
import VibCheckboxRadioButton from '../shared/vib_checkbox_and_radio_button';

const LessonAnswersBlock = ({
  answer: {
    id: answerId, answer, isCorrectResponse, explanation,
  },
  toggleCheckbox,
  enableMultiSelect,
  disableAnswerOptions,
  userAnswers,
  isChecked,
  showFeedback,
}) => {
  const isCorrectAnswerSelected = () => (
    isChecked
    && !isEmpty(userAnswers)
    && isCorrectResponse
  );

  const isIncorrectAnswerSelected = () => (
    isChecked
    && !isEmpty(userAnswers)
    && !isCorrectResponse
  );

  const getContainerClassForSelectedAnswerOnly = () => {
    if (isCorrectAnswerSelected()) {
      return 'correct-answer-selected-container';
    }
    if (isIncorrectAnswerSelected()) {
      return 'incorrect-answer-selected-container';
    }
  };

  const getCheckedCheckboxClassName = () => {
    if (!isEmpty(userAnswers) && isChecked) {
      return 'checked-checkbox-container';
    }
    return '';
  };

  const getAnswerContainerClass = () => {
    let answerContainerClassName = '';
    if (isIncorrectAnswerSelected()) {
      answerContainerClassName = 'feedback-container-red-bg-color';
    } else if (isCorrectAnswerSelected()) {
      answerContainerClassName = 'feedback-container-green-bg-color';
    }
    return answerContainerClassName;
  };

  return (
    <>
      <div
        className={classNames(styles['feedback-container-bg-color'],
          styles[getAnswerContainerClass()],
          styles[getContainerClassForSelectedAnswerOnly()],
          styles[getCheckedCheckboxClassName()],
          'answer-container media mb-2 d-flex')}
      >
        <VibCheckboxRadioButton
          value={answerId}
          optionId={answerId}
          toggleCheckbox={toggleCheckbox}
          isChecked={isChecked}
          questionId={answerId}
          disableAnswerOptions={disableAnswerOptions}
          isMultiSelect={enableMultiSelect}
          showIncorrectOption={isIncorrectAnswerSelected()}
          showCorrectOption={isCorrectAnswerSelected()}
          label={answer}
          labelClasses={styles['text-label']}
        />
      </div>
      {
        showFeedback && isChecked
          ? (
            <Feedback
              feedback={explanation}
              isCorrectAnswerSelectedOrShowFeedbackOnCorrectAnswer={isCorrectResponse}
              isMultiSelect={enableMultiSelect}
            />
          )
          : null
      }
    </>
  );
};

LessonAnswersBlock.propTypes = {
  answer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    isCorrectResponse: PropTypes.bool.isRequired,
    explanation: PropTypes.string.isRequired,
  }).isRequired,
  disableAnswerOptions: PropTypes.bool.isRequired,
  isChecked: PropTypes.bool.isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  enableMultiSelect: PropTypes.bool.isRequired,
  userAnswers: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default LessonAnswersBlock;
