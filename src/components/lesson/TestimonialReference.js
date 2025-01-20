import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { join, isEmpty } from 'lodash';

const TestimonialReference = ({ content }) => (
  <Row>
    <Col
      lg={12}
      dangerouslySetInnerHTML={{ __html: content.text }}
    />
    <Col
      lg={12}
    >
      {!isEmpty(content.authors) ? join(content.authors.map((author) => author.authorName), ', ') : null}
    </Col>
  </Row>
);

TestimonialReference.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
};
export default TestimonialReference;
