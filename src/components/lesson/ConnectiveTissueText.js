import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import styles from './lesson-page.module.scss';

const ConnectiveTissueText = ({ content }) => (
  <Row>
    <Col lg={12}>
      <div className={styles.connective_tissue_text} dangerouslySetInnerHTML={{ __html: content.text }} />
    </Col>
  </Row>
);

ConnectiveTissueText.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
};
export default ConnectiveTissueText;
