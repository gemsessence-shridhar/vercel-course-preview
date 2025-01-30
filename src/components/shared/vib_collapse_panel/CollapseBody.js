import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CollapseBody = ({ children }) => (
  <Card.Body className="px-4 mx-1 py-1">
    {children}
  </Card.Body>
);

CollapseBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CollapseBody;
