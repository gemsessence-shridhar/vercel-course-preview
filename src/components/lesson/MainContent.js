import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import PageWrapper from '../shared/page_wrapper';
import PageComponentsComponent from './PageComponentsComponent';

const MainContent = ({
  mainContent,
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
    <PageWrapper.PrimaryColumn>
      {
        mainContent.map((content, index) => (
          !isEmpty(content) ? renderContent(content, index) : null))
      }
    </PageWrapper.PrimaryColumn>
  );
};

MainContent.defaultProps = {
  currentQuestionId: null,
  currentSurveyQuestionId: '',
};

MainContent.propTypes = {
  mainContent: PropTypes.instanceOf(Array).isRequired,
  currentQuestionId: PropTypes.string,
  currentSurveyQuestionId: PropTypes.string,
  courseId: PropTypes.string.isRequired,
};
export default MainContent;
