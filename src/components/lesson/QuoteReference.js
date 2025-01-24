import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import styles from './lesson-page.module.scss';
import { QuoteIcon } from '../shared/vib_icons';

const QuoteReference = ({ content }) => (
  <Row className={classNames(styles['quote-reference'], 'mt-4 p-4 flex-nowrap justify-content-center')}>
    <span className={styles['quote-icon']}>
      <QuoteIcon />
    </span>
    <div>
      <Col
        lg={12}
        className="p-0 text-break"
        data-testid="quote-content"
        dangerouslySetInnerHTML={{ __html: content.text }}
      />
      {content.attribution
        ? (
          <Col
            lg={12}
            className={classNames(styles['attribution-name'], 'p-0 text-break')}
          >
            <span data-testid="content-attribution" className={styles['name-separation']}>
              {content.attribution}
            </span>
          </Col>
        ) : null}
    </div>
  </Row>
);

QuoteReference.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
};
export default QuoteReference;
