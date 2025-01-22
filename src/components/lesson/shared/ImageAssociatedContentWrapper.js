import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Image } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import styled from 'styled-components';

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
import CardReference from '../CardReference';

const ImageAssociatedContentWrapper = ({
  content,
  setSelectedAnswers,
  userAnswers,
  selectedAnswers,
  currentQuestionId,
  currentSurveyQuestionId,
  courseId,
}) => {
  const [isPortraitImage, setIsPortraitImage] = useState(false);
  let secondaryWidth = '0';
  let secondaryPosition = 'left';

  useEffect(() => {
    if (content.url) {
      const img = document.createElement('img');
      img.src = content.url;
      img.onload = () => {
        const { height, width } = img;
        /*
          * Note:
          * This logic is used to display certain images at their original height.
          * We treat the image as "portrait" (taller than it is wide) if either:
          * 1. The height is greater than the width (typical portrait orientation).
          * 2. The width is only slightly greater than the height (difference less than 600px),
          *    ensuring that images with a near-square aspect ratio are also displayed at their original height.
          * Related Card: https://spi-engineering.atlassian.net/browse/VIB-9816
        */

        if (height > width || width - height < 600) {
          setIsPortraitImage(true);
        }
      };
    }
  }, [content.url])
  

  if (content.showAssociatedContent) {
    if (!isEmpty(content.associatedContentWidth)) {
      secondaryWidth = content.associatedContentWidth.replace('%', '');
      secondaryPosition = content.associatedContentPosition;
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
      case 'CardReference':
        return (
          <CardReference
            content={content}
            setSelectedAnswers={setSelectedAnswers}
            userAnswers={userAnswers}
            selectedAnswers={selectedAnswers}
            currentQuestionId={currentQuestionId}
            currentSurveyQuestionId={currentSurveyQuestionId}
            courseId={courseId}
          />
        );
      case 'LearningResource':
        return (<LearningResource key={keyProp} content={contentData} courseId={courseId} />);
      default: return <div key={keyProp} dangerouslySetInnerHTML={{ __html: contentData.text }} />;
    }
  };

  const getAssociatedContent = () => (
    content.showAssociatedContent && !isEmpty(content.associatedContent)
      ? (
        <PageWrapper.SecondaryColumn>
          { content.associatedContent.map((item) => getInnerContent(item, Math.random())) }
        </PageWrapper.SecondaryColumn>
      )
      : null
  );

  return (
    <PageWrapper
      secondarycolumnwidth={secondaryWidth}
      secondarycolumnposition={secondaryPosition}
    >
      <PageWrapper.PrimaryColumn>
        <span>
        <Image
            src={content.url}
            alt={content.alt || content.title}
            className={classNames('mt-2')}
            style={{
              maxWidth: '100%',
              borderRadius: '5px',
              margin: 'auto',
              display: 'block',
              ...(isPortraitImage && { maxHeight: '600px' }),
            }}
          />
        </span>
      </PageWrapper.PrimaryColumn>
      { getAssociatedContent() }
    </PageWrapper>
  );
};

ImageAssociatedContentWrapper.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
};

export default ImageAssociatedContentWrapper;
