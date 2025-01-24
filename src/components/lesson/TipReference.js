import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import styled, { css } from 'styled-components';

const StyledTipReference = styled.div`
  border-radius: .25rem;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
  ${(props) => props.type === 'Success' && css`
    color: #72BE1D;
    background-color: rgba(114, 190, 29, 7%);
  `}
  ${(props) => props.type === 'Info' && css`
    color: #4EA9FB;
    background-color: rgba(78, 169, 251, 7%);
  `}
  ${(props) => props.type === 'Warning' && css`
    color: #D88708;
    background-color: rgba(216, 135, 8, 7%);
  `}
  ${(props) => props.type === 'Description' && css`
    color: #4E1E8F;
    background-color: rgba(78, 30, 143, 7%);
  `}
  ${(props) => props.type === 'Error' && css`
    color: #D20000;
    background-color: rgb(210, 0, 0, 7%);
  `}
`;

const TipReference = ({ content }) => (
  <Row>
    <Col lg={12}>
      <StyledTipReference
        type={content.emphasis}
        dangerouslySetInnerHTML={{ __html: content.text }}
      />
    </Col>
  </Row>
);

TipReference.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
};
export default TipReference;
