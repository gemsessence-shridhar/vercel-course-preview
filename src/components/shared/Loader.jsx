import React from 'react';
import PropTypes from 'prop-types';
// import loader from '../assets/images/loader.gif';
import '../../scss/loader.scss';
// Need to fix this loader
const Loader = ({ height, overlap, wrapperClassName, topWrapperClassName }) => (
  <div className={`${topWrapperClassName} ${overlap ? 'loader-overlap' : ''}`}>
    <div className={wrapperClassName} style={{ height }}>
      <img className="loader" src={''} alt="Loading..." />
    </div>
  </div>
);

Loader.propTypes = {
  height: PropTypes.string,
  overlap: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  topWrapperClassName: PropTypes.string,
};

Loader.defaultProps = {
  height: '100px',
  overlap: false,
  wrapperClassName: '',
  topWrapperClassName: '',
};

export default Loader;
