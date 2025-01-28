import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import PageWrapper from '../../shared/page_wrapper';
import TextReference from '../TextReference';
import InlineText from '../InlineText';
import QuoteReference from '../QuoteReference';
import TestimonialReference from '../TestimonialReference';
import TipReference from '../TipReference';
import styles from '../lesson-page.module.scss';
import VideoPlayer from '../../shared/VideoPlayer';
import ContentVideo from './contentVideo';
import ContentImage from './contentImage';
import CardReference from '../CardReference';

const VideoAssociatedContentWrapper = ({ content, videoOptions, subtitleText }) => {
  let secondaryWidth = '0';
  let secondaryPosition = 'left';

  if (content.showAssociatedContent) {
    if (!isEmpty(content.associatedContentWidth)) {
      secondaryWidth = content.associatedContentWidth.replace('%', '');
      secondaryPosition = content.associatedContentPosition;
    }
  }

  const getInnerContent = (contentData, keyProp) => {
    if (contentData === null) return '';

    switch (contentData.__typename) {
      case 'TextReference':
        return (
          <TextReference key={keyProp} content={contentData} />
        );
      case 'InlineText':
        return (
          <InlineText key={keyProp} content={contentData} />
        );
      case 'QuoteReference':
        return (
          <QuoteReference key={keyProp} content={contentData} />
        );
      case 'ImageReference':
        return (
          <ContentImage
            key={keyProp}
            content={contentData}
          />
        );
      case 'TestimonialReference':
        return (
          <TestimonialReference key={keyProp} content={contentData} />
        );
      case 'TipReference':
        return (
          <TipReference key={keyProp} content={contentData} />
        );
      case 'VideoReference':
        return <ContentVideo key={keyProp} content={contentData} />;
      case 'CardReference':
        return (
          <CardReference content={contentData} />
        );
      default: return (
        !isEmpty(contentData.text) ? (
          <div key={keyProp} dangerouslySetInnerHTML={{ __html: contentData.text }} />
        ) : null
      );
    }
  };

  const getAssociatedContent = () => (
    content.showAssociatedContent && !isEmpty(content.associatedContent)
      ? (
        <PageWrapper.SecondaryColumn>
          { content.associatedContent.map((item) => getInnerContent(item, Math.random())) }
        </PageWrapper.SecondaryColumn>
      )
      : null
  );

  return (
    <PageWrapper
      secondarycolumnwidth={secondaryWidth}
      secondarycolumnposition={secondaryPosition}
    >
      <PageWrapper.PrimaryColumn>
        {
          content
            ? (
              <div className={classNames(styles['video-player-container'])}>
                <VideoPlayer
                  {...videoOptions}
                  key={uuidv4()}
                />
              </div>
            )
            : null
        }

        {subtitleText && (
          <div className="mt-4">
            <div
              className="border rounded bg-light text-dark p-3"
              style={{
                maxHeight: '400px',
                overflow: 'auto',
              }}
            >
              <pre className="m-0" style={{ whiteSpace: 'pre-wrap' }}>
                {subtitleText}
              </pre>
            </div>
          </div>
        )}
      </PageWrapper.PrimaryColumn>
      { getAssociatedContent() }
    </PageWrapper>
  );
};

VideoAssociatedContentWrapper.defaultProps = {
  videoOptions: {},
};

VideoAssociatedContentWrapper.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
  videoOptions: PropTypes.shape({
    poster: PropTypes.string.isRequired,
    controls: PropTypes.bool.isRequired,
    sources: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })),
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  }),
  subtitleText: PropTypes.string,
};

export default React.memo(VideoAssociatedContentWrapper);
