import React from 'react';
import PropTypes from 'prop-types';
import ToggleContext from './ToggleContext';

import { ChevronDown } from '../vib_icons';

const CollapseTitle = ({ children }) => (
  <ToggleContext eventKey="1">
    <span>{children}</span>
    <ChevronDown fillColor="#4A4A4A" />
  </ToggleContext>
);

CollapseTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CollapseTitle;
