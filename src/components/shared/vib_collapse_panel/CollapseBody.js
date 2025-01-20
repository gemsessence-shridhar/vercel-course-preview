import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CollapseBody = ({ children }) => (
  <Accordion.Collapse eventKey="1" data-testid="collapse-body">
    <Card.Body className="px-4 mx-1 py-1">
      {children}
    </Card.Body>
  </Accordion.Collapse>
);

CollapseBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CollapseBody;
