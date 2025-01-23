import React from 'react';
import { find, isEmpty, map } from 'lodash';
import PropTypes from 'prop-types';
import styles from './lesson-page.module.scss';
import LessonAnswersBlock from './LessonAnswersBlock';
import NotSelectAllCorrectAnswersMsg from '../shared/QuestionAnswers/NotSelectAllCorrectAnswersMsg';
import CardWrapper from '../shared/card_wrapper';
import useSuperScript from '../shared/hooks/useSuperScript';
// import { FormattedMessage } from 'react-intl';

const QuestionReference = ({
  content,
  setSelectedAnswers,
  userAnswers,
  selectedAnswers
}) => {
  useSuperScript();

  const { questionType } = content;
  const isMultiChoiceQuestion = questionType === 'multipleChoice';

  const handleSelectAnswer = (event) => {
    const targetElement = event.target;
    const answer = find(content.answers, { id: targetElement.value });
    const alreadySelectedAnswers = !isEmpty(selectedAnswers) ? selectedAnswers : [];

    if (isMultiChoiceQuestion) {
      if (targetElement.checked) {
        setSelectedAnswers([...selectedAnswers, answer.id]);
      } else {
        const filteredAnswers = alreadySelectedAnswers.filter((ansId) => ansId !== answer.id);
        setSelectedAnswers(filteredAnswers);
      }
    } else {
      setSelectedAnswers([answer.id]);
    }
  };

  const isAllSelectedAnswerIsNotCorrect = () => {
    if (isMultiChoiceQuestion) {
      if (userAnswers.length === 0) {
        return false;
      }
      const correctAnswers = map(content.answers.filter((obj) => obj.isCorrectResponse == true), 'id');
      const selectedCorrectAnswerLength = userAnswers.filter((obj) => correctAnswers.includes(obj)).length;

      if (selectedCorrectAnswerLength === 0) {
        return false;
      } else if (selectedCorrectAnswerLength === correctAnswers.length) {
        const selectedInCorrectAnswerLength = userAnswers.filter((obj) => !correctAnswers.includes(obj)).length;
        return (selectedInCorrectAnswerLength > 0);
      }
      return true;
    }
  };

  const showFeedback = userAnswers.length !== 0;
  return (
    <>
      <div className={styles['question-answer-container']}>
        <h4 data-testid="question-heading" className={styles['question-heading']}>
          {content.question}
        </h4>
        {content.answers.map((answer) => (
          <LessonAnswersBlock
            key={answer.id}
            answer={answer}
            showFeedback={showFeedback}
            toggleCheckbox={handleSelectAnswer}
            selectedAnswerIds={selectedAnswers}
            enableMultiSelect={isMultiChoiceQuestion}
            isChecked={userAnswers.includes(answer.id) || selectedAnswers.includes(answer.id)}
            userAnswers={userAnswers}
            disableAnswerOptions={showFeedback}
          />
        ))}
        {isAllSelectedAnswerIsNotCorrect() ? <NotSelectAllCorrectAnswersMsg /> : null}
      </div>
      {
        isMultiChoiceQuestion && showFeedback && content.explanation
          ? (
            <div className="mt-4">
              <CardWrapper
                boxShadow="0 2px 37px 8px #EDE9E7"
                borderRadius="5px"
                classes="d-flex align-items-center"
              >
                <CardWrapper.Body>
                  <span
                    className="ml-2 d-block pt-2"
                    dangerouslySetInnerHTML={{ __html: content.explanation }}
                  />
                </CardWrapper.Body>
              </CardWrapper>
            </div>
          )
          : null
      }
    </>
  );
};

QuestionReference.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
  setSelectedAnswers: PropTypes.func.isRequired,
  userAnswers: PropTypes.instanceOf(Array).isRequired,
  selectedAnswers: PropTypes.instanceOf(Array).isRequired,
};
export default QuestionReference;
