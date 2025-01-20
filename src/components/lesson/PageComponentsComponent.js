import React from 'react';
import TextReference from './TextReference';
import ConnectiveTissueText from './ConnectiveTissueText';
import InlineText from './InlineText';
import QuoteReference from './QuoteReference';
import QuestionReference from './QuestionReference';
import TipReference from './TipReference';
import TestimonialReference from './TestimonialReference';
import SurveyQuestionReference from './SurveyQuestionReference';
import ContentImage from './shared/contentImage';
import ContentVideo from './shared/contentVideo';
import CardReference from './CardReference';
import LearningResource from './LearningResource';
import useSuperScript from '../shared/hooks/useSuperScript';


const PageComponentsComponent = ({
  content,
  setSelectedAnswers,
  userAnswers,
  selectedAnswers,
  currentQuestionId,
  currentSurveyQuestionId,
  courseId,
  isConnectiveTissue,
  setCurrentQuestionId,
  setUserAnswers,
  setCurrentSurveyQuestionId,
  isOldSubmittedQuestionAnswerChanged,
}) => {
  useSuperScript();

  switch (content.type) {
    case 'PageComponentsComponentsTextReference':
      return (isConnectiveTissue ? <ConnectiveTissueText content={content} /> : <TextReference content={content} />);
    case 'PageComponentsComponentsQuestionReference':
      if (content.question && currentQuestionId === content.question.id) {
        return (
          <QuestionReference
            content={content.question}
            setSelectedAnswers={setSelectedAnswers}
            userAnswers={userAnswers}
            selectedAnswers={selectedAnswers}
            isOldSubmittedQuestionAnswerChanged={isOldSubmittedQuestionAnswerChanged}
          />
        );
      }
      return ('');
    case 'PageComponentsComponentsSurveyQuestionReference':
      if (content.surveyQuestion && currentSurveyQuestionId === content.surveyQuestion.id) {
        return (
          <SurveyQuestionReference
            content={content.surveyQuestion}
            setSelectedAnswers={setSelectedAnswers}
            userAnswers={userAnswers}
            selectedAnswers={selectedAnswers}
          />
        );
      }
      return ('');
    case 'PageComponentsComponentsInlineText':
      return (isConnectiveTissue ? <ConnectiveTissueText content={content} /> : <InlineText content={content} />);
    case 'PageComponentsComponentsQuoteReference':
      return (
        <QuoteReference content={content} />
      );
    case 'PageComponentsComponentsTestimonialReference':
      return (
        <TestimonialReference content={content} />
      );
    case 'PageComponentsComponentsTipReference':
      return (
        <TipReference content={content} />
      );
    case 'PageComponentsComponentsImageReference':
      return (
        <ContentImage
          content={content}
          setSelectedAnswers={setSelectedAnswers}
          userAnswers={userAnswers}
          selectedAnswers={selectedAnswers}
          currentQuestionId={currentQuestionId}
          currentSurveyQuestionId={currentSurveyQuestionId}
          courseId={courseId}
        />
      );
    case 'PageComponentsComponentsVideoReference':
      return (
        <ContentVideo content={content} />
      );
    case 'PageComponentsComponentsCardReference':
      return (
        <CardReference
          content={content}
          setSelectedAnswers={setSelectedAnswers}
          userAnswers={userAnswers}
          selectedAnswers={selectedAnswers}
          currentQuestionId={currentQuestionId}
          currentSurveyQuestionId={currentSurveyQuestionId}
          courseId={courseId}
          setCurrentQuestionId={setCurrentQuestionId}
          setUserAnswers={setUserAnswers}
          setCurrentSurveyQuestionId={setCurrentSurveyQuestionId}
        />
      );
    case 'PageComponentsComponentsLearningResourceReference':
      return (
        <LearningResource content={content} courseId={courseId} />
      );
    default:
      return '';
  }
};

PageComponentsComponent.defaultProps = {
  isConnectiveTissue: false,
};

export default PageComponentsComponent;
