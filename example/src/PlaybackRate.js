import React from 'react';
import ReactjsPlayer from 'reactjs-player';
import log from 'loglevel';

const PlaybackRate = () => {
  const { playbackRate } = React.useContext(ReactjsPlayer.PlayerContext);
  const changeRate = React.useCallback((rate) => {
    log.info(`Current playback rate is ${rate}.`);
  }, []);

  React.useEffect(() => {
    changeRate(playbackRate);
  }, [playbackRate, changeRate]);

  return null;
};

export default React.memo(PlaybackRate, () => true);
