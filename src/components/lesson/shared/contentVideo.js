import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import PageWrapper from '../../shared/page_wrapper';
import VideoAssociatedContentWrapper from './VideoAssociatedContentWrapper';

const ContentVideo = ({ content }) => {
  let secondaryWidth = '0';
  let secondaryPosition = 'left';

  if (content.showAssociatedText) {
    if (!isEmpty(content.associatedTextWidth)) {
      secondaryWidth = content.associatedTextWidth.replace('%', '');
      secondaryPosition = content.associatedTextPosition;
    }
  }
  const videoBlock = content.video;
  const subtitleText = videoBlock?.subtileData?.subtitleText;
  const videoJsOptions = () => (
    {
      poster: videoBlock.thumbnailUrl,
      controls: true,
      sources: [{
        src: videoBlock.fileUrl,
        type: videoBlock.contentType,
      }],
    }
  );

  return (
    <PageWrapper
      secondarycolumnwidth={secondaryWidth}
      secondarycolumnposition={secondaryPosition}
    >
      <PageWrapper.PrimaryColumn>
        <VideoAssociatedContentWrapper
          content={content.video}
          videoOptions={videoJsOptions()}
          subtitleText={subtitleText}
        />
      </PageWrapper.PrimaryColumn>
      {
        content.showAssociatedText
          ? (
            <PageWrapper.SecondaryColumn>
              <div dangerouslySetInnerHTML={{ __html: content.associatedText }} />
            </PageWrapper.SecondaryColumn>
          )
          : null
      }
    </PageWrapper>
  );
};

ContentVideo.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
};

export default React.memo(ContentVideo);
