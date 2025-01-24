import React from 'react';
import PropTypes from 'prop-types';
import PageComponentsComponent from './PageComponentsComponent';

const ConnectiveTissue = ({
  connectiveTissueContent,
  setSelectedAnswers,
  userAnswers,
  selectedAnswers,
  currentQuestionId,
  currentSurveyQuestionId,
  courseId,
  className,
  setCurrentQuestionId,
  setUserAnswers,
  setCurrentSurveyQuestionId,
}) => {
  const renderContent = (content, index) => {
    return (
      <PageComponentsComponent
        key={content.type + index}
        content={content}
        setSelectedAnswers={setSelectedAnswers}
        userAnswers={userAnswers}
        selectedAnswers={selectedAnswers}
        currentQuestionId={currentQuestionId}
        currentSurveyQuestionId={currentSurveyQuestionId}
        courseId={courseId}
        isConnectiveTissue
        setCurrentQuestionId={setCurrentQuestionId}
        setUserAnswers={setUserAnswers}
        setCurrentSurveyQuestionId={setCurrentSurveyQuestionId}
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
  setSelectedAnswers: PropTypes.func.isRequired,
  userAnswers: PropTypes.instanceOf(Array).isRequired,
  selectedAnswers: PropTypes.instanceOf(Array).isRequired,
  currentQuestionId: PropTypes.string,
  currentSurveyQuestionId: PropTypes.string,
  courseId: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default ConnectiveTissue;
