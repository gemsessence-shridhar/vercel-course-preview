import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const LearningResource = ({ content, courseId }) => {
  const handleClick = (event) => event.target.parentNode.submit();

  return (
    <ul className="list-unstyled">
      <li>
        <form data-testid="token-form" action={isEmpty(courseId) ? `${content.url}` : `${content.url}${courseId}`} method={content.isCoursePreview ? 'GET' : 'POST'}>
          <input data-testid="token-input" type="hidden" name="authenticity_token" value={''} />
          <a href="#" onClick={handleClick}>
            {content.title}
          </a>
        </form>
      </li>
    </ul>
  );
};

LearningResource.propTypes = {
  content: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  courseId: PropTypes.string.isRequired,
};
export default LearningResource;
