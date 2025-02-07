"use client"
import React from 'react';
import Question from '../shared/QuestionAnswers/Question';
import AnswerList from '../shared/QuestionAnswers/AnswerList';

const QuestionAnswers = ({
  questionData,
  answersStyle,
  questionsStyle,
}) => {
  return(
  <>
    <Question questionText={questionData.question} questionsStyle={questionsStyle} />
    <AnswerList
      answersStyle={answersStyle}
      answers={questionData.answers}
      questionId={questionData.id}
    />
  </>
)};

export default QuestionAnswers;
