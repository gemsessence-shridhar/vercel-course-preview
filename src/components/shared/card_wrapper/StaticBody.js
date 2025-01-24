import React from 'react';
import PropTypes from 'prop-types';

const StaticBody = ({ children, classes }) => (
  <div className={classes}>{ children }</div>
);


StaticBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  classes: PropTypes.string,
};

StaticBody.defaultProps = {
  classes: '',
};

export default StaticBody;
