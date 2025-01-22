import React from 'react';
import {
  TickMarkIcon,
  BullsEyeIcon,
  LockIcon,
} from './vib_icons';
import CircularProgressBarContainer from '../assessment_question/CircularProgressBarContainer';

const getItemSvgSrc = ({
  itemData, classes, circularProgressBar = false, iconHeight = '25px', iconWidth = '25px', circularProgressBarPercentage, tickMarkIconColor,
}) => {
  let itemSvg = <LockIcon />;
  switch (itemData.status) {
    case 'confidenceQuestionInProgress':
    case 'inProgress':
      if (circularProgressBar) {
        itemSvg = <CircularProgressBarContainer percentage={circularProgressBarPercentage} />;
      } else {
        itemSvg = <BullsEyeIcon />;
      }
      break;
    case 'completed':
      itemSvg = <TickMarkIcon fillColor={tickMarkIconColor} />;
      break;
    case 'open':
      itemSvg = <LockIcon />;
      break;
    case 'locked':
      itemSvg = <LockIcon />;
      break;
    default:
      throw new Error(`invalid item status: ${itemData.status}`);
  }
  return itemSvg;
};

const getItemClassName = (itemData) => {
  let itemClass;
  switch (itemData.status) {
    case 'open':
      itemClass = 'locked-item-link';
      break;
    case 'locked':
      itemClass = 'locked-item-link';
      break;
    case 'inProgress':
      itemClass = 'current-item';
      break;
    case 'confidenceQuestionInProgress':
      itemClass = 'current-item';
      break;
    case 'completed':
      itemClass = 'completed-item';
      break;
    default:
      throw new Error(`invalid item status: ${itemData.status}`);
  }
  return itemClass;
};

export { getItemSvgSrc, getItemClassName };
