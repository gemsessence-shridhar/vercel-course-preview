import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import styles from '../lesson-page.module.scss';
import PageWrapper from '../../shared/page_wrapper';
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
