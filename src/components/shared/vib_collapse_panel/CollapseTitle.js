import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from '../vib_icons';

const CollapseTitle = ({ children }) => (
  <div className="d-flex justify-content-between align-items-center px-4 mx-1 card-header">
    <span>{children}</span>
    <ChevronDown fillColor="#4A4A4A" />
  </div>
);

CollapseTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CollapseTitle;
