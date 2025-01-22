import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './assessment-question.module.scss';


const CircularProgressBar = ({ diameter, borderSize, completePercentage }) => {
  // Size of the enclosing square
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (diameter - borderSize) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${diameter} ${diameter}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = (dashArray - (dashArray * completePercentage) / 100);

  return (
    <svg
      data-testid="circular-progress-bar"
      width={diameter}
      height={diameter}
      viewBox={viewBox}
    >
      <circle
        data-testid="circle-background"
        className={classNames(style['circle-background'])}
        cx={diameter / 2}
        cy={diameter / 2}
        r={radius}
        strokeWidth={`${borderSize}px`}
      />
      <circle
        data-testid="circle-progress"
        className={classNames(style['circle-progress'])}
        cx={diameter / 2}
        cy={diameter / 2}
        r={radius}
        strokeWidth={`${borderSize}px`}
        transform={`rotate(-90 ${diameter / 2} ${diameter / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
    </svg>
  );
};

CircularProgressBar.popTypes = {
  diameter: PropTypes.number.isRequired,
  completePercentage: PropTypes.number.isRequired,
  borderSize: PropTypes.number.isRequired,
};

export default CircularProgressBar;
