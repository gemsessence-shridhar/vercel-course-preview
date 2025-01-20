import React, {
  useState, useEffect, useCallback, lazy,
} from 'react';
import { Alert } from 'react-bootstrap';

import PropTypes from 'prop-types';
import { isObject } from 'lodash';

import componentLoader from '../../components/componentLoader';

const PageNotFound = lazy(() => componentLoader(() => import('../../components/shared/PageNotFound')));

const AlertMessage = ({
  message,
  alertType,
  customClass,
  autoHide,
  handleAfterHide,
  hideTime,
  messageId,
}) => {
  const [visible, setVisible] = useState(true);

  const hideItself = useCallback(() => {
    setVisible(false);
    handleAfterHide();
  });

  useEffect(() => {
    let setTimeOutFunc = null;
    setVisible(true);
    if (autoHide) {
      setTimeOutFunc = setTimeout(() => {
        hideItself();
      }, hideTime);
    }

    return () => clearTimeout(setTimeOutFunc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageId, message]);

  const filterMessage = (flashMessage) => {
    if (Array.isArray(flashMessage)) {
      return flashMessage.map((item, i) => {
        if (isObject(item)) {
          return (
            <span key={i}>
              {' '}
              {item.message}
              {' '}
              <br />
            </span>
          );
        }
        return (
          <span key={i}>
            {' '}
            {item}
            {' '}
            <br />
          </span>
        );
      });
    }
    return flashMessage;
  };

  if (Array.isArray(message)) {
    const result = message.find((item) => {
      if (!isObject(item)) return null;
      return (item.status_code === 404);
    });

    if (result) return <PageNotFound />;
  }

  return (
    <Alert
      variant={`${alertType}`}
      className={customClass}
      show={visible}
      onClose={hideItself}
    >
      {filterMessage(message)}
    </Alert>
  );
};

AlertMessage.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Object), PropTypes.node])
    .isRequired,
  alertType: PropTypes.string,
  customClass: PropTypes.string,
  autoHide: PropTypes.bool,
  hideTime: PropTypes.number,
  handleAfterHide: PropTypes.func,
  messageId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

AlertMessage.defaultProps = {
  alertType: 'info',
  customClass: '',
  autoHide: false,
  hideTime: 5000,
  handleAfterHide: () => {},
  messageId: null,
};

export default AlertMessage;
