import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loading = () => (
  <>
    <FontAwesomeIcon data-testid="loading-spinner" icon={faSpinner} spin className="mr-1" />
  </>
);

export default Loading;
