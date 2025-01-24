import React from 'react';
import PropTypes from 'prop-types';
import PageWrapper from '../shared/page_wrapper';
import PageComponentsComponent from './PageComponentsComponent';

const SecondaryContent = ({
  secondaryContent,
  setSelectedAnswers,
  userAnswers,
  selectedAnswers,
  currentQuestionId,
  currentSurveyQuestionId,
  courseId,
  setCurrentQuestionId,
  setUserAnswers,
  setCurrentSurveyQuestionId,
}) => {
  const renderContent = (content, index) => (
    <PageComponentsComponent
      key={content.type + index}
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
  setSelectedAnswers: PropTypes.func.isRequired,
  userAnswers: PropTypes.instanceOf(Array).isRequired,
  selectedAnswers: PropTypes.instanceOf(Array).isRequired,
  currentQuestionId: PropTypes.string,
  currentSurveyQuestionId: PropTypes.string,
  courseId: PropTypes.string.isRequired,
};
export default SecondaryContent;
