import React from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';
import qualityLevels from 'videojs-contrib-quality-levels';
import hlsQualitySelector from 'videojs-hls-quality-selector';

import 'video.js/dist/video-js.css';
import './video-player.css';
import Track from './track';
import { getVideoDomManipulationInfo, getSelectedQualityLabel } from './VideoPlayerUtility';

class VideoPlayer extends React.Component {
  componentDidMount = () => {
    videojs.registerPlugin('qualityLevels', qualityLevels);
    videojs.registerPlugin('hlsQualitySelector', hlsQualitySelector);
    // instantiate Video.js
    this.player = videojs(this.videoNode, {
      ...this.props,
      html5: {
        hls: {
          overrideNative: true,
        },
        nativeAudioTracks: false,
        nativeVideoTracks: false,
        nativeTextTracks: false,
      },
      plugins: {
        qualityLevels: {},
        hlsQualitySelector: {},
      },
    }, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
    this.player.fluid(true);
    this.player.responsive(true);
    this.player.userActive(true);
    this.player.src(...this.props.sources);


    const selectedQualityLevels = this.player.qualityLevels();

    selectedQualityLevels.on('change', () => {
      getSelectedQualityLabel(selectedQualityLevels[selectedQualityLevels.selectedIndex], this.player);
    });

    const videoInstance = this.player.id();
    if (videoInstance) {
      setTimeout(() => {
        getVideoDomManipulationInfo(this.player);
      }, 1000);
    }
  }

  // destroy player on unmount
  componentWillUnmount = () => {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    const { subtitles } = this.props;

    return (
      <div className="w-100">
        <div data-vjs-player>
          <video
            ref={(node) => this.videoNode = node}
            className="customize-video-player video-js vjs-big-play-centered"
          >
            <Track subtitles={subtitles} />
          </video>
        </div>
      </div>
    );
  }
}

VideoPlayer.defaultTypes = {
  subtitles: [],
};

VideoPlayer.propTypes = {
  subtitles: PropTypes.array,
};

export default VideoPlayer;
