import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import 'react-perfect-scrollbar/dist/css/styles.css';

import StaticBody from './StaticBody';
import Scrollable from './Scrollable';

const StyledWrapper = styled.div`
    width: 100%;
    background-color: #FFFFFF;
    box-shadow: 0 2px 20px 8px #EDE9E7;
    position: relative;
    overflow: hidden;
    padding: 7px 6px 0px 10px;
    &::before{
      content: '';
      position: absolute;
      ${(props) => props.borderDirection === 'left' && css`
        top: 0;
        bottom: 0;
        left: 0;
        width: ${props.borderWidth}px;
      `}

      ${(props) => props.borderDirection === 'top' && css`
        top: 0;
        left: 0;
        right: 0;
        height: 6px;
      `}

      ${(props) => props.borderColor && css`
        background: ${props.borderColor};
      `}
    };
    ${(props) => props.boxShadow && css`
      box-shadow: ${props.boxShadow};
    `}
    
    ${(props) => props.borderRadius && css`
      border-radius: ${props.borderRadius};
    `}
  `;

const CardWrapper = ({
  children,
  borderRadius,
  backgroundColor,
  borderDirection,
  borderColor,
  boxShadow,
  borderWidth,
}) => (
  <StyledWrapper
    borderRadius={borderRadius}
    backgroundColor={backgroundColor}
    borderDirection={borderDirection}
    borderColor={borderColor}
    boxShadow={boxShadow}
    borderWidth={borderWidth}
    data-testid="wrapper-component"
  >
    {children}
  </StyledWrapper>
);

CardWrapper.Body = StaticBody;
CardWrapper.Scrollable = Scrollable;


CardWrapper.propTypes = {
  borderRadius: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderDirection: PropTypes.string,
  borderColor: PropTypes.string,
  boxShadow: PropTypes.string,
  borderWidth: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
CardWrapper.defaultProps = {
  borderRadius: '',
  backgroundColor: '',
  borderDirection: 'left',
  borderColor: '',
  boxShadow: '0 2px 4px 0 rgba(40,41,61,0.04), 0 8px 16px 0 rgba(96,97,112,0.16)',
  borderWidth: 6,
};

export default CardWrapper;
