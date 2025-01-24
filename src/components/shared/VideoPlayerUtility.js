const createVideoContentProperty = (targetClassNames) => {
  const divElement = document.createElement('div');
  divElement.classList.add(`${targetClassNames}`);
  return divElement;
};

const isElementObjectType = (element) => typeof element === 'object';

const isElementUpdatable = (elementToAppend) => (
  (elementToAppend !== null && isElementObjectType(elementToAppend))
);

const prependElement = (targetDomElement, elementsToAppend) => {
  if (isElementUpdatable(elementsToAppend)) {
    const childNode = targetDomElement !== null ? targetDomElement.firstChild : null;
    targetDomElement.insertBefore(elementsToAppend, childNode);
  }
};

const appendElement = (targetDomElement, elementToAppend) => {
  if (isElementUpdatable(elementToAppend)) {
    targetDomElement.appendChild(elementToAppend);
  }
};


const appendInTargetDom = (targetDomElement, elementsToAppend) => {
  elementsToAppend.forEach((el) => appendElement(targetDomElement, el));
  // appendElement(targetDomElement, ...elementsToAppend);
};
const getVideoDomManipulationInfo = (player) => {
  const parentDiv = player.el();

  const customControlBarContainer = document.createElement('div');
  customControlBarContainer.className = 'custom-control-bar vjs-control-bar';

  const playerTracker = player.controlBar.progressControl.el();

  const playerTrackContainer = createVideoContentProperty('player-tracker-container');
  prependElement(playerTrackContainer, playerTracker);
  prependElement(customControlBarContainer, playerTrackContainer);

  /* -----------code for volume panel---------------*/
  const volumeContainer = createVideoContentProperty('volume-container');

  const vjsVolumePanel = player.controlBar.volumePanel.el();

  prependElement(volumeContainer, vjsVolumePanel);
  appendElement(customControlBarContainer, volumeContainer);

  /* -----------code for play control panel---------------*/
  const playControl = createVideoContentProperty('play-control-panel');

  const vjsCurrentTime = player.controlBar.currentTimeDisplay.el();
  prependElement(playControl, vjsCurrentTime);

  const vjsPlayControl = player.controlBar.playToggle.el();

  const vjsDuration = player.controlBar.durationDisplay.el();
  appendInTargetDom(playControl, [vjsPlayControl, vjsDuration]);

  appendElement(customControlBarContainer, playControl);

  /* -----------code for other controls panel---------------*/
  const otherControlsContainer = createVideoContentProperty('other-controls-container');

  let vjsCaptionContainer = '';
  if (player.controlBar.subsCapsButton) {
    vjsCaptionContainer = player.controlBar.subsCapsButton.el();
  }
  prependElement(otherControlsContainer, vjsCaptionContainer);

  let vjsQualitySelector = '';

  if (player.hlsQualitySelector._qualityButton) {
    vjsQualitySelector = player.hlsQualitySelector._qualityButton.el();
  }

  let pictureInPictureSelector = '';
  if (player.controlBar.pictureInPictureToggle) {
    pictureInPictureSelector = player.controlBar.pictureInPictureToggle.el();
  }

  let fullScreenSelector = '';
  if (player.controlBar.fullscreenToggle) {
    fullScreenSelector = player.controlBar.fullscreenToggle.el();
  }

  appendInTargetDom(otherControlsContainer, [vjsQualitySelector, pictureInPictureSelector, fullScreenSelector]);

  appendElement(customControlBarContainer, otherControlsContainer);

  if (player.controlBar.el()) {
    const controlBar = player.controlBar.el();
    if (parentDiv && parentDiv.contains(controlBar)) {
        parentDiv.removeChild(controlBar);
    }
  }

  if (parentDiv) {
    appendElement(parentDiv, customControlBarContainer);
  }
};

const getQuality = (currentQuality) => {
  let qualityLabel = '';
  if (currentQuality.height >= 1024) {
    qualityLabel = 'HD';
  } else {
    qualityLabel = 'SD';
  }
  return qualityLabel;
};

const getSelectedQualityLabel = (quality, parentControlBar) => {
  const qualityButton = parentControlBar.hlsQualitySelector._qualityButton.el();
  const qualitySpn = qualityButton.getElementsByClassName('vjs-icon-placeholder')[0];

  qualitySpn.classList.add('updated-quality');
  qualitySpn.setAttribute('data-content', getQuality(quality));
};

export { getVideoDomManipulationInfo, getSelectedQualityLabel };
