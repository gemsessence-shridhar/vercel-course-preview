import React from 'react';
import { isEmpty } from 'lodash';
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
  currentQuestionId,
  currentSurveyQuestionId,
  courseId,
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
      currentQuestionId = firstQuestion.question.id
    } else if (firstQuestion.surveyQuestion && firstQuestion.surveyQuestion.id !== currentSurveyQuestionId) {
      currentSurveyQuestionId = firstQuestion.surveyQuestion.id
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
      secondarycolumnwidth={secondaryWidth.replace('%', '')}
      secondarycolumnposition={secondaryPosition}
      paddingbottom="0"
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
