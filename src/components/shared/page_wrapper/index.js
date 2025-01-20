import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import PrimaryColumn from './PrimaryColumn';
import SecondaryColumn from './SecondaryColumn';

const StyledPageWrapper = styled.div`
  ${(props) => css`
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: ${props.paddingBottom}em;
  position: relative;
  margin: 0 -15px;
  & > *:not(.primary), & > *:not(.secondary){
    width: 100%;
    order: 3;
    max-width: 100% !important;
  }
  `};
  .primary{
    ${(props) => props.secondaryColumnWidth !== '0' && css`
      flex-basis: ${100 - props.secondaryColumnWidth}%;
      flex-grow: 1;
      flex-shrink: 0;
      max-width: ${100 - props.secondaryColumnWidth}%;
    `};
    ${(props) => props.secondaryColumnPosition && css`
      order: ${props.secondaryColumnPosition === 'right' ? 1 : 2}
    `};
    padding: 0 15px;
  };
  .secondary{
    ${(props) => props.secondaryColumnWidth !== '0' && css`
      flex-basis: ${props.secondaryColumnWidth}%;
      flex-grow: 1;
      flex-shrink: 0;
      word-break: break-word;
      max-width: ${props.secondaryColumnWidth}%;
    `};
    ${(props) => props.secondaryColumnPosition && css`
      order: ${props.secondaryColumnPosition === 'right' ? 2 : 1}
    `};
    padding: 0 15px;
  }`;

const PageWrapper = ({
  secondaryColumnWidth,
  secondaryColumnPosition,
  children,
  paddingBottom,
}) => (
  <StyledPageWrapper
    secondaryColumnWidth={secondaryColumnWidth}
    secondaryColumnPosition={secondaryColumnPosition}
    paddingBottom={paddingBottom}
  >
    {children}
  </StyledPageWrapper>
);

PageWrapper.PrimaryColumn = PrimaryColumn;
PageWrapper.SecondaryColumn = SecondaryColumn;

PageWrapper.propTypes = {
  secondaryColumnWidth: PropTypes.string,
  secondaryColumnPosition: PropTypes.string,
  children: PropTypes.node,
  paddingBottom: PropTypes.string,
};

PageWrapper.defaultProps = {
  secondaryColumnWidth: '',
  secondaryColumnPosition: '',
  children: null,
  paddingBottom: '1',
};

export default PageWrapper;
