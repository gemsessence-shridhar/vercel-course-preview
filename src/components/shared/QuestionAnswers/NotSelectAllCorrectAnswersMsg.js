import React from 'react';
import { InfoIcon } from '../vib_icons'
import styles from './style.module.scss';
import AlertMessage from '../AlertMessage';

const NotSelectAllCorrectAnswersMsg = () => {
  const getALertMessage = () => <><InfoIcon />You did not select all correct answers.</>

  return <AlertMessage
    alertType="primary"
    customClass={`${styles['select-all-correct-answer-label-container']}`}
    message={getALertMessage()}
  />
};

export default NotSelectAllCorrectAnswersMsg;
