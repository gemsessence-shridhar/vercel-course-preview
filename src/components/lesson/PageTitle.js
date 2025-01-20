import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const StyledHeading = styled.h5`
  color: #21154A;
  font-family: "Open Sans";
  font-size: 34px;
  font-weight: 300;
  letter-spacing: -1.61px;
  line-height: 49px;
`;

const PageTitle = ({ title }) => {
  if (isEmpty(title)) { return null; }
  return (
    <StyledHeading>{title}</StyledHeading>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
