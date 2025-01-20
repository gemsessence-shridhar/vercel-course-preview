import React from 'react';
import PropTypes from 'prop-types';
import ScrollableTitle from './ScrollableTitle';
import ScrollableBody from './ScrollableBody';

const Scrollable = ({ children }) => (
  <div>
    {children}
  </div>
);
Scrollable.Title = ScrollableTitle;
Scrollable.Body = ScrollableBody;

Scrollable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Scrollable;
