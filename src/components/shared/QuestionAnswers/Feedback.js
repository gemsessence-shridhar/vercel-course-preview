import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useTranslations} from 'next-intl';
import LaunchIcon from '@mui/icons-material/Launch';
import styles from './style.module.scss';

const Feedback = ({
  feedback,
  isCorrectAnswerSelectedOrShowFeedbackOnCorrectAnswer,
  lessons,
  showOnlyIncorrectFeedback,
  isMultiSelect,
}) => {
  const t = useTranslations();
  const getFeedbackLabel = () => {
    if (showOnlyIncorrectFeedback && !isCorrectAnswerSelectedOrShowFeedbackOnCorrectAnswer) {
      return t("answers.feedback.label.incorrect");
    }
    return isCorrectAnswerSelectedOrShowFeedbackOnCorrectAnswer
      ? t("answers.feedback.label.correct")
      : t("answers.feedback.label.incorrect");
  };

  const getFeedbackLabelClass = () => (
    isCorrectAnswerSelectedOrShowFeedbackOnCorrectAnswer
      ? 'correct-feedback-label'
      : 'incorrect-feedback-label'
  );

  const unlockedLesson = () => (
    <p className={styles['lesson-unlocked-text']}>
      Lesson not unlocked
    </p>
  );

  const lockedLesson = () => (
    <p className={styles['lesson-question-text']}>
      See the lesson this question comes from
      <LaunchIcon className="ml-1" />
    </p>
  );

  const renderLessonText = (lesson) => {
    if (lesson.status === 'open') {
      return (unlockedLesson());
    }
    return (lockedLesson());
  };

  return (
    <div className={classNames(styles['feedback-container'], 'mb-3')}>
      <span className={classNames(styles[getFeedbackLabelClass()])}>
        {' '}
        { getFeedbackLabel() }
        {' '}
      </span>
      {
        !isMultiSelect
          ? (
            <span
              className={classNames("text-dark", styles['feedback-text'])}
              dangerouslySetInnerHTML={{ __html: feedback }}
            />
          )
          : null
      }

      {
        lessons?.map((lesson) => (
          renderLessonText(lesson)
        ))
      }
    </div>
  );
};

Feedback.defaultProps = {
  lessons: [],
  showOnlyIncorrectFeedback: false,
};

Feedback.propTypes = {
  feedback: PropTypes.string.isRequired,
  isCorrectAnswerSelectedOrShowFeedbackOnCorrectAnswer: PropTypes.bool.isRequired,
  showOnlyIncorrectFeedback: PropTypes.bool,
  lessons: PropTypes.array,
  isMultiSelect: PropTypes.bool.isRequired,
};
export default Feedback;
