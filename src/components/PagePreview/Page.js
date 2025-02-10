"use client";
import React from 'react';
import PropTypes from 'prop-types';
import {
  find,
  isEmpty,

} from 'lodash';

import PageWrapper from '../shared/page_wrapper';
import MainContent from '../lesson/MainContent';
import SecondaryContent from '../lesson/SecondaryContent';
import ConnectiveTissue from '../lesson/ConnectiveTissue';
import PageTitle from '../lesson/PageTitle';

const Page = ({
  pageData,
}) => {
  const { displayTitle } = pageData;
  const {
    showSecondaryContent,
    secondaryContentPosition,
    mainContent, secondaryContent,
    topConnectiveTissue,
    bottomConnectiveTissue,
  } = pageData.pageContent;

  const secondaryWidth = showSecondaryContent ? secondaryContentPosition.width : "0";
  const secondaryPosition = showSecondaryContent ? secondaryContentPosition.position : "left";

  const getQuestion = (collection) => {
    return find(
      collection.filter(Boolean),
      (item) =>
        (item.type === "PageComponentsComponentsQuestionReference" && item.question) ||
        (item.type === "PageComponentsComponentsSurveyQuestionReference" && item.surveyQuestion)
    );
  };
  const mainContentQuestion = getQuestion(mainContent);
  const secondaryContentQuestion = showSecondaryContent ? getQuestion(secondaryContent) : null;
  const firstQuestion = mainContentQuestion || secondaryContentQuestion;


  let currentQuestionId = null;
  let currentSurveyQuestionId = null;

  if (firstQuestion) {
    if (firstQuestion.question) {
      const { question } = firstQuestion;
      if (question.id !== currentQuestionId) {
        const explanation = question.answers?.find((ans) => ans.explanation !== "")?.explanation;
        if (explanation) {
          question.explanation = explanation;
        }

        switch (question.questionType) {
          case "Multiple Answers":
            question.questionType = "multipleChoice";
            break;
          case "Single Answer":
            question.questionType = "singleChoice";
            break;
          default:
            console.log(`Invalid question_type: ${question.questionType}.`);
        }

        currentQuestionId = question.id;
      }
    } else if (firstQuestion.surveyQuestion && firstQuestion.surveyQuestion.id !== currentSurveyQuestionId) {
      currentSurveyQuestionId = firstQuestion.surveyQuestion.id;
    }
  }

  return (
    <>
      {!isEmpty(displayTitle) && <PageTitle title={displayTitle} />}

      {topConnectiveTissue && (
        <ConnectiveTissue
          connectiveTissueContent={topConnectiveTissue.content}
          currentQuestionId={currentQuestionId}
          currentSurveyQuestionId={currentSurveyQuestionId}
          className="cs-top"
        />
      )}

      <PageWrapper secondarycolumnwidth={secondaryWidth.replace("%", "")} secondarycolumnposition={secondaryPosition}>
        <MainContent mainContent={mainContent} currentQuestionId={currentQuestionId} currentSurveyQuestionId={currentSurveyQuestionId} />

        {showSecondaryContent && (
          <SecondaryContent secondaryContent={secondaryContent} currentQuestionId={currentQuestionId} currentSurveyQuestionId={currentSurveyQuestionId} />
        )}
      </PageWrapper>

      {bottomConnectiveTissue && (
        <ConnectiveTissue
          connectiveTissueContent={bottomConnectiveTissue.content}
          currentQuestionId={currentQuestionId}
          currentSurveyQuestionId={currentSurveyQuestionId}
          className="cs-bottom"
        />
      )}
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
