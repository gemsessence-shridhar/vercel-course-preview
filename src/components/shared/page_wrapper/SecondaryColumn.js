import React from 'react';
import PropTypes from 'prop-types';

const SecondaryColumn = ({ children }) => (
  <div className="secondary" data-testid="secondary-column">
    {children}
  </div>
);

SecondaryColumn.propTypes = {
  children: PropTypes.node,
};

SecondaryColumn.defaultProps = {
  children: null,
};

export default SecondaryColumn;
