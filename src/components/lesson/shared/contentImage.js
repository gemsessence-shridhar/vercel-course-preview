import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import styles from '../lesson-page.module.scss';
import PageWrapper from '../../shared/page_wrapper';
import TextReference from '../TextReference';
import InlineText from '../InlineText';
import QuoteReference from '../QuoteReference';
import TestimonialReference from '../TestimonialReference';
import TipReference from '../TipReference';
import ContentVideo from './contentVideo';
import SurveyQuestionReference from '../SurveyQuestionReference';
import QuestionReference from '../QuestionReference';
import LearningResource from '../LearningResource';
import ImageAssociatedContentWrapper from './ImageAssociatedContentWrapper';

const ContentImage = ({
  content,
  setSelectedAnswers,
  userAnswers,
  selectedAnswers,
  currentQuestionId,
  currentSurveyQuestionId,
  courseId,
}) => {
  let secondaryWidth = '0';
  let secondaryPosition = 'left';

  if (content.showAssociatedText) {
    if (!isEmpty(content.associatedTextWidth)) {
      secondaryWidth = content.associatedTextWidth.replace('%', '');
      secondaryPosition = content.associatedTextPosition;
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
      case 'VideoReference':
        return <ContentVideo key={keyProp} content={contentData} />;
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

  return (
    <PageWrapper
      secondarycolumnwidth={secondaryWidth}
      secondarycolumnposition={secondaryPosition}
    >
      <PageWrapper.PrimaryColumn>
        <div className={classNames(styles['lesson-page-content-container'], 'mt-2')}>
          <div className={styles['lesson-page-img-wrapper']}>
            <ImageAssociatedContentWrapper
              content={content}
              setSelectedAnswers={setSelectedAnswers}
              userAnswers={userAnswers}
              selectedAnswers={selectedAnswers}
              currentQuestionId={currentQuestionId}
              currentSurveyQuestionId={currentSurveyQuestionId}
              courseId={courseId}
            />
          </div>
        </div>
      </PageWrapper.PrimaryColumn>
      {
        content.showAssociatedText
          ? (
            <PageWrapper.SecondaryColumn>
              <div dangerouslySetInnerHTML={{ __html: content.associatedText }} />
            </PageWrapper.SecondaryColumn>
          )
          : null
      }
    </PageWrapper>
  );
};

ContentImage.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
};

export default ContentImage;
