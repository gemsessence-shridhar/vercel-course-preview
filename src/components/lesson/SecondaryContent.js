import React from 'react';
import PropTypes from 'prop-types';
import PageWrapper from '../shared/page_wrapper';
import PageComponentsComponent from './PageComponentsComponent';

const SecondaryContent = ({
  secondaryContent,
  currentQuestionId,
  currentSurveyQuestionId,
  courseId,
}) => {
  const renderContent = (content, index) => (
    <PageComponentsComponent
      key={content.type + index}
      content={content}
      currentQuestionId={currentQuestionId}
      currentSurveyQuestionId={currentSurveyQuestionId}
      courseId={courseId}
    />
  );
  return (
    <PageWrapper.SecondaryColumn>
      {
        secondaryContent.map((content, index) => (renderContent(content, index)))
      }
    </PageWrapper.SecondaryColumn>
  );
};

SecondaryContent.defaultProps = {
  currentQuestionId: null,
  currentSurveyQuestionId: null,
};

SecondaryContent.propTypes = {
  secondaryContent: PropTypes.instanceOf(Array).isRequired,
  currentQuestionId: PropTypes.string,
  currentSurveyQuestionId: PropTypes.string,
  courseId: PropTypes.string.isRequired,
};
export default SecondaryContent;
