import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

const InlineText = ({ content }) => (
  <Row>
    <Col
      lg={12}
      dangerouslySetInnerHTML={{ __html: content.text }}
    />
  </Row>
);

InlineText.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
};
export default InlineText;
