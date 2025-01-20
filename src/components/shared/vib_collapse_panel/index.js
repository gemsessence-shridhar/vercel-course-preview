import React from 'react';
import styled from 'styled-components';
import { Accordion, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import CollapseTitle from './CollapseTitle';
import CollapseBody from './CollapseBody';
import StaticTitle from './StaticTitle';
import StaticBody from './StaticBody';

const StyledAccordionContainer = styled.div`
  font-family: "Open Sans";
`;

const StyledCard = styled(Card)`
  border-radius: 12px !important;
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px 0 rgba(40,41,61,0.04), 0 8px 16px 0 rgba(96,97,112,0.16);
  margin-bottom: 1.5em;
  padding: 8px 0;
  .card-header{
    color: #2C2E2F;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.5px;
    line-height: 30px;
    outline: 0;
    & svg{
      flex: 0 0 14px;
    }
    &.collapse-open svg {
      transform: rotate(180deg);
      transition: 0.15s all;
    }
    &.collapse-close svg {
      transform: rotate(0deg);
      transition: 0.15s all;
    }
  }
`;

const VibCollapsePanel = ({ children, isExpandable }) => (
  <StyledAccordionContainer className="mb-2">
    {isExpandable ? (
      <Accordion defaultActiveKey={null}>
        <StyledCard className="border-0">
          {children}
        </StyledCard>
      </Accordion>
    ) : (
      <StyledCard className="border-0">
        {children}
      </StyledCard>
    )}
  </StyledAccordionContainer>
);

VibCollapsePanel.CollapseTitle = CollapseTitle;
VibCollapsePanel.CollapseBody = CollapseBody;
VibCollapsePanel.StaticTitle = StaticTitle;
VibCollapsePanel.StaticBody = StaticBody;

VibCollapsePanel.propTypes = {
  children: PropTypes.node.isRequired,
  isExpandable: PropTypes.bool.isRequired,
};

export default VibCollapsePanel;
