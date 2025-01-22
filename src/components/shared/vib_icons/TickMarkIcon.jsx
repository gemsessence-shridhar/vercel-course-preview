import React from 'react';
import PropTypes from 'prop-types';

const TickMarkIcon = ({ fillColor }) => (
  <svg data-testid="tick-mark-icon" width="29px" height="29px" viewBox="0 0 29 29" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <title>Group 9</title>
    <g id="Wires-/-Lesson" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Learn-Front-Line-Seller-Course-Index" transform="translate(-213.000000, -708.000000)" fillRule="nonzero">
        <g id="Group-5" transform="translate(193.000000, 689.000000)">
          <g id="Group-9" transform="translate(20.000000, 19.000000)">
            <path d="M14.5,0 C6.5043793,0 0,6.5043793 0,14.5 C0,22.4956207 6.5043793,29 14.5,29 C22.4956207,29 29,22.4956207 29,14.5 C29,6.5043793 22.4956207,0 14.5,0 Z" id="Path" fill={fillColor} />
            <path d="M21.6506722,11.0084871 L13.9062304,18.6551278 C13.6738906,18.88454 13.3689037,19 13.0639168,19 C12.7589299,19 12.453943,18.88454 12.2216032,18.6551278 L8.34949142,14.8318075 C7.88350286,14.3719062 7.88350286,13.6283092 8.34949142,13.1684079 C8.81526177,12.7082911 9.56813,12.7082911 10.0341186,13.1684079 L13.0639168,16.1600284 L19.9660451,9.34508756 C20.4318154,8.88497081 21.1846836,8.88497081 21.6506722,9.34508756 C22.1164426,9.80498887 22.1164426,10.5483704 21.6506722,11.0084871 Z" id="Path" fill="#FAFAFA" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

TickMarkIcon.defaultProps = {
  fillColor: "#000000",
};

TickMarkIcon.propTypes = {
  fillColor: PropTypes.string,
};

export default TickMarkIcon;
