import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

const ScrollableBody = ({ children, maxHeight }) => (
  <PerfectScrollbar classes="ps-show-always" options={{ suppressScrollX: true }} style={{ maxHeight: `${maxHeight}px`, paddingRight: '10px' }}>
    {children}
  </PerfectScrollbar>
);

ScrollableBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  maxHeight: PropTypes.number,
};

ScrollableBody.defaultProps = {
  maxHeight: '300px',
};

export default ScrollableBody;
