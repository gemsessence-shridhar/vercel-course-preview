"use client"
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';
import { isEmpty } from 'lodash';

import Question from '../shared/QuestionAnswers/Question';
import ExamAnswer from '../shared/QuestionAnswers/ExamAnswer';
import useSuperScript from '../shared/hooks/useSuperScript';
import { nodes } from '@components/shared/utils';

import ImageAssociatedContentWrapper from '../lesson/shared/ImageAssociatedContentWrapper';
import { formateContentComponent } from '../PagePreview/pageCmsDataFormatter';


const QuestionAnswer = ({
  question,
  questionType,
  answers,
  imageConnection,
  associatedContent
}) => {
  useSuperScript();
  const mainConnection = nodes(imageConnection)[0];
  let imageContent = null;
  const image = mainConnection ? nodes(mainConnection.imageConnection)[0] : null;

  const isExamHasImage = !isEmpty(image);
  if (isExamHasImage) {
    const associatedContentPosition = mainConnection.associated_content_position;
    imageContent = {
      url: image.url,
      title: image.title,
      alt: mainConnection.accessible_content.alternate_text,
      showAssociatedContent: mainConnection.show_associated_content_,
      associatedContentWidth: !isEmpty(associatedContentPosition) ? mainConnection.associated_content_position.width : null,
      associatedContentPosition: !isEmpty(associatedContentPosition) ? mainConnection.associated_content_position.position : null,
      associatedContent: associatedContent && associatedContent.associated_content.components.map(
        (mainContentData) => formateContentComponent(mainContentData, {}),
      ),
    };
  }
  const isMultiChoiceQuestion = questionType === 'multipleChoice';

  const questionContainerClasses = classNames(
    'pt-2',
    isExamHasImage ? 'pl-0' : 'px-5',
  );

  return (
    <>
      <div className={questionContainerClasses}>
        <Row className="mx-0">
          {isExamHasImage ? (
            <Col lg={7} className="p-0">
              <h5 data-testid="exam-image-title" className="font-weight-bold">{image.title}</h5>
              <ImageAssociatedContentWrapper
                content={imageContent}
              />
            </Col>
          ) : null}

          <Col lg={isExamHasImage ? 5 : 12} className="mt-4">
            <Question questionText={question} />
            {
              answers.map((answer) => (
                <ExamAnswer
                  key={answer.id}
                  answer={answer}
                  toggleCheckbox={() => {}}
                  selectedAnswerIds={[]}
                  disabled
                  enableMultiSelect={isMultiChoiceQuestion}
                  isCoursePreviewView
                />
              ))
            }
          </Col>
        </Row>
      </div>
    </>
  );
};

export default QuestionAnswer;
