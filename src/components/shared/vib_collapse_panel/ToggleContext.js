import React from 'react';
import { AccordionButton } from 'react-bootstrap';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const ToggleContext = ({ children, eventKey, callback }) => {
  const isCurrentEventKey = eventKey === eventKey;

  return (
    <AccordionButton
      eventKey={eventKey}
      onClick={() => callback && callback(eventKey)}
      className={classNames('border-0 bg-transparent justify-content-between d-flex align-items-center px-4 mx-1 card-header text-left', isCurrentEventKey ? 'collapse-open' : 'collapse-close')}
    >
      {children}
    </AccordionButton>
  );
};

ToggleContext.propTypes = {
  callback: PropTypes.func,
  children: PropTypes.node.isRequired,
  eventKey: PropTypes.string.isRequired,
};

ToggleContext.defaultProps = {
  callback: null,
};

export default ToggleContext;