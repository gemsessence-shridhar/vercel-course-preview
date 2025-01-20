import React from 'react';
import { isEmpty, map } from 'lodash';
import PropTypes from 'prop-types';
import VibCollapsePanel from '../shared/vib_collapse_panel';
import ContentImage from './shared/contentImage';
import TextReference from './TextReference';
import InlineText from './InlineText';
import QuoteReference from './QuoteReference';
import TestimonialReference from './TestimonialReference';
import TipReference from './TipReference';
import ContentVideo from './shared/contentVideo';
import SurveyQuestionReference from './SurveyQuestionReference';
import QuestionReference from './QuestionReference';
import LearningResource from './LearningResource';
import PageWrapper from '../shared/page_wrapper';

const CardReference = ({
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
}) => {
  let firstQuestion = null;

  let secondaryWidth = '0';
  let secondaryPosition = 'left';
  const mainContent = content.components;
  const hasAnyQuestion = (collection) => collection.find((item) => (item.__typename === 'QuestionReference' && item.question)
    || (item.__typename === 'SurveyQuestionReference' && item.surveyQuestion));

  if (content.showSecondaryContent && !isEmpty(content.secondaryContentPosition)) {
    secondaryWidth = content.secondaryContentPosition.width;
    secondaryPosition = content.secondaryContentPosition.position;

    if (!isEmpty(content.secondaryComponents)) {
      firstQuestion = hasAnyQuestion(content.secondaryComponents);
    }
  }

  if (hasAnyQuestion(mainContent)) {
    firstQuestion = hasAnyQuestion(mainContent);
  }

  if (firstQuestion) {
    if (firstQuestion.question && firstQuestion.question.id !== currentQuestionId) {
      setCurrentQuestionId(firstQuestion.question.id);
      setUserAnswers(map(firstQuestion.question.submittedAnswers, 'id'));
    } else if (firstQuestion.surveyQuestion && firstQuestion.surveyQuestion.id !== currentSurveyQuestionId) {
      setCurrentSurveyQuestionId(firstQuestion.surveyQuestion.id);
      if (firstQuestion.surveyQuestion.submittedAnswer) {
        setUserAnswers([firstQuestion.surveyQuestion.submittedAnswer.id]);
      }
    }
  }

  const getInnerContent = (contentData, keyProp) => {
    if (contentData === null) return '';

    switch (contentData.__typename) {
      case 'TextReference':
        return (
          <TextReference key={keyProp} content={contentData} />
        );
      case 'InlineText':
        return (
          <InlineText key={keyProp} content={contentData} />
        );
      case 'QuoteReference':
        return (
          <QuoteReference key={keyProp} content={contentData} />
        );
      case 'TestimonialReference':
        return (
          <TestimonialReference key={keyProp} content={contentData} />
        );
      case 'TipReference':
        return (
          <TipReference key={keyProp} content={contentData} />
        );
      case 'ImageReference': {
        return (
          <ContentImage
            key={keyProp}
            content={contentData}
            setSelectedAnswers={setSelectedAnswers}
            userAnswers={userAnswers}
            selectedAnswers={selectedAnswers}
            currentQuestionId={currentQuestionId}
            currentSurveyQuestionId={currentSurveyQuestionId}
            courseId={courseId}
          />
        );
      }
      case 'VideoReference': {
        return <ContentVideo key={keyProp} content={contentData} />;
      }
      case 'QuestionReference':
        if (contentData.question && currentQuestionId === contentData.question.id) {
          return (
            <QuestionReference
              key={keyProp}
              content={contentData.question}
              setSelectedAnswers={setSelectedAnswers}
              userAnswers={userAnswers}
              selectedAnswers={selectedAnswers}
            />
          );
        }
        return ('');
      case 'SurveyQuestionReference':
        if (contentData.surveyQuestion && currentSurveyQuestionId === contentData.surveyQuestion.id) {
          return (
            <SurveyQuestionReference
              key={keyProp}
              content={contentData.surveyQuestion}
              setSelectedAnswers={setSelectedAnswers}
              userAnswers={userAnswers}
              selectedAnswers={selectedAnswers}
            />
          );
        }
        return ('');
      case 'LearningResource':
        return (<LearningResource key={keyProp} content={contentData} courseId={courseId} />);
      default: return <div key={keyProp} dangerouslySetInnerHTML={{ __html: contentData.text }} />;
    }
  };

  const getContent = () => (
    <PageWrapper
      secondaryColumnWidth={secondaryWidth.replace('%', '')}
      secondaryColumnPosition={secondaryPosition}
      paddingBottom="0"
    >
      <PageWrapper.PrimaryColumn>
        {content.components.map((item) => getInnerContent(item, Math.random()))}
      </PageWrapper.PrimaryColumn>
      {(content.showSecondaryContent && !isEmpty(content.secondaryComponents)) ? (
        <PageWrapper.SecondaryColumn>
          {content.secondaryComponents.map((item) => getInnerContent(item, Math.random()))}
        </PageWrapper.SecondaryColumn>
      ) : null}
    </PageWrapper>
  );

  return (
    <>
      {content.isexpandable ? (
        <VibCollapsePanel isExpandable={content.isexpandable}>
          <VibCollapsePanel.CollapseTitle>
            {content.title}
          </VibCollapsePanel.CollapseTitle>
          <VibCollapsePanel.CollapseBody>
            {getContent()}
          </VibCollapsePanel.CollapseBody>
        </VibCollapsePanel>
      ) : (
        <VibCollapsePanel isExpandable={content.isexpandable}>
          <VibCollapsePanel.StaticBody>
            {getContent()}
          </VibCollapsePanel.StaticBody>
        </VibCollapsePanel>
      )}
    </>
  );
};

CardReference.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
  courseId: PropTypes.string.isRequired,
};
export default CardReference;
