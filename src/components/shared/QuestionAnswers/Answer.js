import React from 'react';
import PropTypes from 'prop-types';

import VibCheckboxRadioButton from '../vib_checkbox_and_radio_button';
import classNames from 'classnames';
import styles from './style.module.scss';

const Answer = ({
  answer,
  optionId,
  questionId,
  answersStyle,
}) => {
  return (
    <>
      <div
        className={classNames(styles['feedback-container-bg-color'],
          answersStyle,
          'answer-container media mb-2')}
      >
        { 
          <>
            <VibCheckboxRadioButton
              value={optionId}
              optionId={optionId}
              questionId={questionId}
              isChecked={false}
              toggleCheckbox={() => {}}
            />
          </>
        }
        <div className={classNames(styles.options, 'media-body text-dark')}>
          <label htmlFor={`answer-checkbox-${optionId}`}>
            { `${answer.weight} - ${answer.title}` }
          </label>
        </div>
      </div>
    </>
  );
};

Answer.defaultProps = {
  questionId: '',
  answersStyle: '',
};

Answer.propTypes = {
  answer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    weight: PropTypes.number,
    feedback: PropTypes.string,
  }).isRequired,
  questionId: PropTypes.string,
  answersStyle: PropTypes.string,
  optionId: PropTypes.string.isRequired,
};
export default Answer;
