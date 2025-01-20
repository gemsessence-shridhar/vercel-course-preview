import React from 'react';

const Track = ({ subtitles }) => (
  <>
    {
      subtitles?.map((subtitle) => (<track data-testid="track" kind="captions" key={subtitle.id} src={subtitle.url} srcLang={subtitle.language} label={subtitle.label} />))
    }
  </>
);

export default Track;
