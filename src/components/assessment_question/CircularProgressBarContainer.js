import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './assessment-question.module.scss';
import CircularProgressBar from './CircularProgressBar';

const CircularProgressBarContainer = ({ percentage }) => (
  <div>
    <div className={classNames(styles['outer-circle'])}>
      <CircularProgressBar
        borderSize="3"
        diameter="30"
        completePercentage={percentage}
      />
    </div>
  </div>
);

CircularProgressBarContainer.propTypes = {
  percentage: PropTypes.number.isRequired,
};
export default CircularProgressBarContainer;
