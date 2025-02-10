import React from 'react';
import PropTypes from 'prop-types';
import styles from './lesson-page.module.scss';
import LessonAnswersBlock from './LessonAnswersBlock';
import classNames from 'classnames';
import NotSelectAllCorrectAnswersMsg from '../shared/QuestionAnswers/NotSelectAllCorrectAnswersMsg';
import CardWrapper from '../shared/card_wrapper';
import useSuperScript from '../shared/hooks/useSuperScript';

const QuestionReference = ({
  content,
}) => {
  useSuperScript();

  const { questionType } = content;
  const isMultiChoiceQuestion = questionType === 'multipleChoice';

  const isAllSelectedAnswerIsNotCorrect = () => {
    if (isMultiChoiceQuestion) {
      const correctAnswers = content.answers.filter((obj) => obj.isCorrectResponse).length;
      return correctAnswers !== content.answers.length;
    }
  };

  return (
    <>
      <div className={styles['question-answer-container']}>
      <h4 data-testid="question-heading" className={classNames("text-dark", styles['question-heading'])}>
        {content.question}
      </h4>
        {content.answers.map((answer) => (
          <LessonAnswersBlock
            key={answer.id}
            answer={answer}
            showFeedback={true}
            toggleCheckbox={() => {}}
            selectedAnswerIds={[]}
            enableMultiSelect={isMultiChoiceQuestion}
            isChecked={true}
            disableAnswerOptions={true}
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
};
export default QuestionReference;
