import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import PageWrapper from '../../shared/page_wrapper';
import VideoAssociatedContentWrapper from './VideoAssociatedContentWrapper';
import Loader from '../../shared/Loader';
import AlertMessage from '../../shared/AlertMessage';
import { useVideoSubTitles } from '../../shared/hooks/useVideoSubtitles';

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
  const {
    subtitles,
    loading,
  } = useVideoSubTitles(videoBlock.subtitleCmsId)

  if (loading) return <Loader />;


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
      secondaryColumnWidth={secondaryWidth}
      secondaryColumnPosition={secondaryPosition}
    >
      <PageWrapper.PrimaryColumn>
        <VideoAssociatedContentWrapper
          content={content.video}
          videoOptions={videoJsOptions()}
          subtitles={subtitles}
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
