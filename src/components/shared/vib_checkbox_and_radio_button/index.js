import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CheckIcon from '@mui/icons-material/Check';
import PropTypes from 'prop-types';

import styles from './option-style.module.scss';

const VibCheckboxRadioButton = ({
  value,
  label,
  labelClasses,
  optionId,
  toggleCheckbox,
  isChecked,
  disableAnswerOptions,
  isMultiSelect,
  classes,
  showIncorrectOption,
  showCorrectOption,
  isCorrectResponse,
  isCoursePreviewView
}) => {
  const getClassName = () => {
    let overlayClassName = '';
    if (showIncorrectOption) {
      overlayClassName = styles['checkbox-overlay-red'];
    } else if (showCorrectOption) {
      overlayClassName = styles['checkbox-overlay-green'];
    }
    return overlayClassName;
  };
  return (
    <>
      <label className={classNames(styles['checkbox-container'], getClassName(), 'mb-0')}>
        <input
          type="checkbox"
          className={classNames(styles['answer-checkbox'])}
          value={value}
          id={`answer-checkbox-${optionId}`}
          onChange={toggleCheckbox}
          checked={isChecked}
          disabled={disableAnswerOptions}
          name={`answer-checkbox-${optionId}`}
          data-testid={`answer-checkbox-${optionId}-test`}
        />
        {isMultiSelect ? (
          <span
            data-testid="multi-select"
            className={classNames(styles['checkbox-overlay'], isMultiSelect ? styles['multi-select-answer'] : '', classes)}
          >
            <FontAwesomeIcon icon={faCheck} className={styles['check-mark-icon']} />
          </span>
        ) : (
          <span
            data-testid="single-select"
            className={classNames(styles['checkbox-overlay'], classes)}
          />
        )}
        {isCorrectResponse && isCoursePreviewView ? (
          <div className={classNames(styles['correct-check-mark-icon'], 'd-flex pl-2')}>
            <FontAwesomeIcon icon={faCheck} />
            <span className="px-1">
              -
            </span>
          </div>
        ) : null}
      </label>
      <label
        className={classNames(styles['option-label'], labelClasses, 'text-dark')}
        htmlFor={`answer-checkbox-${optionId}`}
        data-testid="option-text"
      >
        { label }
      </label>
    </>
  );
};

VibCheckboxRadioButton.propTypes = {
  optionId: PropTypes.string,
  disableAnswerOptions: PropTypes.bool,
  isMultiSelect: PropTypes.bool,
  classes: PropTypes.string,
  showIncorrectOption: PropTypes.bool,
  showCorrectOption: PropTypes.bool,
  isChecked: PropTypes.bool,
  label: PropTypes.string,
  labelClasses: PropTypes.string,
  value: PropTypes.string.isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  isCorrectResponse: PropTypes.bool,
  isCoursePreviewView: PropTypes.bool,
};

VibCheckboxRadioButton.defaultProps = {
  optionId: '',
  disableAnswerOptions: false,
  isMultiSelect: false,
  classes: '',
  showIncorrectOption: false,
  showCorrectOption: false,
  isChecked: false,
  label: '',
  labelClasses: '',
  isCorrectResponse: false,
  isCoursePreviewView: false,
};

export default VibCheckboxRadioButton;
