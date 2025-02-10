import React from 'react';
import PropTypes from 'prop-types';
import PageComponentsComponent from './PageComponentsComponent';

const ConnectiveTissue = ({
  connectiveTissueContent,
  currentQuestionId,
  currentSurveyQuestionId,
  courseId,
  className,
}) => {
  const renderContent = (content, index) => {
    return (
      <PageComponentsComponent
        key={content.type + index}
        content={content}
        currentQuestionId={currentQuestionId}
        currentSurveyQuestionId={currentSurveyQuestionId}
        courseId={courseId}
        isConnectiveTissue
      />
    );
  };
  return (
    <div className={`${className} my-4 cs`}>
      {
        connectiveTissueContent.map((content, index) => (renderContent(content, index)))
      }
    </div>
  );
};

ConnectiveTissue.defaultProps = {
  currentQuestionId: null,
  currentSurveyQuestionId: null,
  className: '',
};

ConnectiveTissue.propTypes = {
  connectiveTissueContent: PropTypes.instanceOf(Array).isRequired,
  currentQuestionId: PropTypes.string,
  currentSurveyQuestionId: PropTypes.string,
  courseId: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default ConnectiveTissue;
