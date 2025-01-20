import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import VibCheckboxRadioButton from '../shared/vib_checkbox_and_radio_button';

import styles from './styles.module.scss';

const SurveyQuestionAnswersBlock = ({
  answer: { id: answerId, choiceText },
  toggleCheckbox,
  enableMultiSelect,
  isChecked,
  disableAnswerOptions,
}) => {
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
        isChecked={isChecked}
        questionId={answerId}
        disableAnswerOptions={disableAnswerOptions}
        isMultiSelect={enableMultiSelect}
        label={choiceText}
        labelClasses={styles['text-label']}
      />
    </div>
  );
};

SurveyQuestionAnswersBlock.defaultProps = {
  enableMultiSelect: false,
};

SurveyQuestionAnswersBlock.propTypes = {
  answer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    choiceText: PropTypes.string.isRequired,
  }).isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  enableMultiSelect: PropTypes.bool,
  isChecked: PropTypes.bool.isRequired,
  disableAnswerOptions: PropTypes.bool.isRequired,
};

export default SurveyQuestionAnswersBlock;
