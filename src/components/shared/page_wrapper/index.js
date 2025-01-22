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
    ${(props) => props.secondarycolumnwidth !== '0' && css`
      flex-basis: ${100 - props.secondarycolumnwidth}%;
      flex-grow: 1;
      flex-shrink: 0;
      max-width: ${100 - props.secondarycolumnwidth}%;
    `};
    ${(props) => props.secondarycolumnposition && css`
      order: ${props.secondarycolumnposition === 'right' ? 1 : 2}
    `};
    padding: 0 15px;
  };
  .secondary{
    ${(props) => props.secondarycolumnwidth !== '0' && css`
      flex-basis: ${props.secondarycolumnwidth}%;
      flex-grow: 1;
      flex-shrink: 0;
      word-break: break-word;
      max-width: ${props.secondarycolumnwidth}%;
    `};
    ${(props) => props.secondarycolumnposition && css`
      order: ${props.secondarycolumnposition === 'right' ? 2 : 1}
    `};
    padding: 0 15px;
  }`;


const PageWrapper = ({
  secondarycolumnwidth,
  secondarycolumnposition,
  children,
  paddingbottom,
}) => (
  <StyledPageWrapper
    secondarycolumnwidth={secondarycolumnwidth}
    secondarycolumnposition={secondarycolumnposition}
    paddingbottom={paddingbottom}
  >
    {children}
  </StyledPageWrapper>
);

PageWrapper.PrimaryColumn = PrimaryColumn;
PageWrapper.SecondaryColumn = SecondaryColumn;

PageWrapper.propTypes = {
  secondarycolumnwidth: PropTypes.string,
  secondarycolumnposition: PropTypes.string,
  children: PropTypes.node,
  paddingbottom: PropTypes.string,
};

PageWrapper.defaultProps = {
  secondarycolumnwidth: '',
  secondarycolumnposition: '',
  children: null,
  paddingbottom: '1',
};

export default PageWrapper;
