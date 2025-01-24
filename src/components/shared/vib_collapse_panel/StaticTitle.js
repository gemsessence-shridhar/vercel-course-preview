import React from 'react';
import { Card } from 'react-bootstrap';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const StaticTitle = ({ children }) => (
  <Card.Header className={classNames('border-0 bg-transparent justify-content-between d-flex align-items-center px-4 mx-1')}>
    {children}
  </Card.Header>
);

StaticTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StaticTitle;
