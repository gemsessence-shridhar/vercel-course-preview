import React from 'react';
import PropTypes from 'prop-types';

const PrimaryColumn = ({ children }) => (
  <div className="primary" data-testid="primary-column">
    {children}
  </div>
);

PrimaryColumn.propTypes = {
  children: PropTypes.node,
};

PrimaryColumn.defaultProps = {
  children: null,
};

export default PrimaryColumn;
