import React from 'react';
import PropTypes from 'prop-types';

const ChevronDown = ({ fillColor }) => (
  <svg data-testid="chevron-down-icon" width="14px" height="8px" viewBox="0 0 14 8" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <title>0561AD40-511B-4A23-812E-5BE5C7A5C518</title>
    <defs>
      <path d="M93.7,18.7 L87.7,24.7 C87.5,24.9 87.3,25 87,25 C86.7,25 86.5,24.9 86.3,24.7 L80.3,18.7 C79.9,18.3 79.9,17.7 80.3,17.3 C80.7,16.9 81.3,16.9 81.7,17.3 L87,22.6 L92.3,17.3 C92.7,16.9 93.3,16.9 93.7,17.3 C94.1,17.7 94.1,18.3 93.7,18.7 Z" id="path-down" />
    </defs>
    <g id="Course-Index" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Course-Index---In-Progress" transform="translate(-1297.000000, -47.000000)">
        <g id="Desktop-/-Top-Nav" transform="translate(0.000000, -8.000000)">
          <g id="Desktop-/-Nav-/-Personal-and-Notification" transform="translate(1217.000000, 38.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-down" />
            </mask>
            <use id="Mask" fill={fillColor} fillRule="nonzero" xlinkHref="#path-down" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

ChevronDown.propTypes = {
  fillColor: PropTypes.string,
};

ChevronDown.defaultProps = {
  fillColor: '#5388b9',
};

export default ChevronDown;
