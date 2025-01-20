"use client";
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  find,
  isEmpty,
  map,
  get,
} from 'lodash';

import PageWrapper from '../shared/page_wrapper';
import MainContent from '../lesson/MainContent';
import SecondaryContent from '../lesson/SecondaryContent';
import ConnectiveTissue from '../lesson/ConnectiveTissue';
import VibButton from '../shared/vib_button';
import PageTitle from '../lesson/PageTitle';

const Page = ({
  pageData,
  nextPageUrl,
  previousPageUrl,
}) => {
  const { displayTitle } = pageData;
  let secondaryWidth = '0';
  let secondaryPosition = 'left';
  let firstQuestion = null;
  const {
    showSecondaryContent,
    secondaryContentPosition,
    mainContent, secondaryContent,
    topConnectiveTissue,
    bottomConnectiveTissue,
  } = pageData.pageContent;
  const getQuestion = (collection) => {
    const filteredCollection = collection.filter((el) => el != null);

    return find(filteredCollection, (item) => (item.type === 'PageComponentsComponentsQuestionReference' && item.question)
    || (item.type === 'PageComponentsComponentsSurveyQuestionReference' && item.surveyQuestion));
  };

  if (showSecondaryContent) {
    secondaryWidth = secondaryContentPosition.width;
    secondaryPosition = secondaryContentPosition.position;
    firstQuestion = getQuestion(secondaryContent);
  }

  const mainContentQuestion = getQuestion(mainContent);
  if (!isEmpty(mainContentQuestion)) { firstQuestion = mainContentQuestion; }

  let questionReference = getQuestion(pageData.pageContent.mainContent);
  if (isEmpty(questionReference)) {
    questionReference = getQuestion(pageData.pageContent.secondaryContent);
  }

  let answersIds = [];
  const answers = get(firstQuestion, 'question.answers');
  if (answers) {
    answersIds = answers.map((answer) => answer.id);
  }

  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [currentSurveyQuestionId, setCurrentSurveyQuestionId] = useState(null);
  const [userAnswers, setUserAnswers] = useState(answersIds);
  const [selectedAnswers, setSelectedAnswers] = useState(answersIds);

  if (firstQuestion) {
    if (firstQuestion.question && firstQuestion.question.id !== currentQuestionId) {
      if (firstQuestion.question.answers) {
        firstQuestion.question.explanation = firstQuestion.question.answers.find((ans) => ans.explanation !== '')?.explanation;
      }
      switch (firstQuestion.question.questionType) {
        case 'Multiple Answers':
          firstQuestion.question.questionType = 'multipleChoice';
          break;
        case 'Single Answer':
          firstQuestion.question.questionType = 'singleChoice';
          break;
        default:
          console.log(`Invalid, question_type: ${firstQuestion.question.questionType}.`);
      }
      setCurrentQuestionId(firstQuestion.question.id);
      if (!isEmpty(firstQuestion.question.submittedAnswers)) {
        setUserAnswers(map(firstQuestion.question.submittedAnswers, 'id'));
      }
    } else if (
      firstQuestion.surveyQuestion && firstQuestion.surveyQuestion.id !== currentSurveyQuestionId
    ) {
      setCurrentSurveyQuestionId(firstQuestion.surveyQuestion.id);
      if (firstQuestion.surveyQuestion.submittedAnswer) {
        setUserAnswers([firstQuestion.surveyQuestion.submittedAnswer.id]);
      }
    }
  }

  return (
    <>
      {!isEmpty(displayTitle) ? <PageTitle title={displayTitle} /> : null}
      {
        topConnectiveTissue
          ? (
            <ConnectiveTissue
              connectiveTissueContent={topConnectiveTissue.content}
              setSelectedAnswers={setSelectedAnswers}
              userAnswers={userAnswers}
              selectedAnswers={selectedAnswers}
              currentQuestionId={currentQuestionId}
              currentSurveyQuestionId={currentSurveyQuestionId}
              setCurrentQuestionId={setCurrentQuestionId}
              setUserAnswers={setUserAnswers}
              setCurrentSurveyQuestionId={setCurrentSurveyQuestionId}
              className="cs-top"
            />
          )
          : null
      }
      <PageWrapper
        secondarycolumnwidth={secondaryWidth.replace('%', '')}
        secondarycolumnposition={secondaryPosition}
      >
        <MainContent
          mainContent={mainContent}
          setSelectedAnswers={setSelectedAnswers}
          userAnswers={userAnswers}
          selectedAnswers={selectedAnswers}
          currentQuestionId={currentQuestionId}
          currentSurveyQuestionId={currentSurveyQuestionId}
          setCurrentQuestionId={setCurrentQuestionId}
          setUserAnswers={setUserAnswers}
          setCurrentSurveyQuestionId={setCurrentSurveyQuestionId}
        />
        {
          showSecondaryContent
            ? (
              <SecondaryContent
                secondaryContent={secondaryContent}
                setSelectedAnswers={setSelectedAnswers}
                userAnswers={userAnswers}
                selectedAnswers={selectedAnswers}
                currentQuestionId={currentQuestionId}
                currentSurveyQuestionId={currentSurveyQuestionId}
                setCurrentQuestionId={setCurrentQuestionId}
                setUserAnswers={setUserAnswers}
                setCurrentSurveyQuestionId={setCurrentSurveyQuestionId}
              />
            )
            : null
          }
      </PageWrapper>
      {
        bottomConnectiveTissue
          ? (
            <ConnectiveTissue
              connectiveTissueContent={bottomConnectiveTissue.content}
              setSelectedAnswers={setSelectedAnswers}
              userAnswers={userAnswers}
              selectedAnswers={selectedAnswers}
              currentQuestionId={currentQuestionId}
              currentSurveyQuestionId={currentSurveyQuestionId}
              className="cs-bottom"
            />
          )
          : null
      }
      <div className="d-flex justify-content-between align-items-center">
        {
          isEmpty(previousPageUrl) ? null : (
            <div className="d-flex align-items-start">
              <VibButton
                handleSubmit={() => { window.location.href = previousPageUrl; }}
                variant="secondary"
              >
                Back
              </VibButton>
            </div>
          )
        }

        {
          isEmpty(nextPageUrl) ? null : (
            <div className="d-flex align-items-start">
              <VibButton
                handleSubmit={() => { window.location.href = nextPageUrl; }}
                isDisabled={isEmpty(nextPageUrl)}
                variant="secondary"
              >
                Continue
              </VibButton>
            </div>
          )
        }
      </div>
    </>
  );
};

Page.propTypes = {
  nextPageUrl: PropTypes.string.isRequired,
  previousPageUrl: PropTypes.string.isRequired,
  pageData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    pageContent: PropTypes.shape({
      mainContent: PropTypes.arrayOf(
        PropTypes.instanceOf(Object).isRequired,
      ).isRequired,
      secondaryContent: PropTypes.shape({
        mainContent: PropTypes.arrayOf(
          PropTypes.instanceOf(Object).isRequired,
        ).isRequired,
      }),
      secondaryContentPosition: PropTypes.shape({
        position: PropTypes.string.isRequired,
        width: PropTypes.string.isRequired,
      }),
      showSecondaryContent: PropTypes.bool.isRequired,
    }),
  }).isRequired,
};

export default Page;
