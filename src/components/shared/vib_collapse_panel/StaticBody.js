import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const StaticBody = ({ children }) => (
  <>
    <Card.Body className="px-4 mx-1 py-1">
      {children}
    </Card.Body>
  </>
);

StaticBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StaticBody;
