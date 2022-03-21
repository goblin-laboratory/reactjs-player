import React from 'react';
import ReactjsPlayer from 'reactjs-player';

const FouceLive = () => {
  const { getVideoElement, changeCurrentTime } = React.useContext(ReactjsPlayer.PlayerContext);
  React.useEffect(() => {
    const id = global.setInterval(() => {
      if (!getVideoElement) {
        return;
      }
      const el = getVideoElement();
      if (!el || el.paused || !el.buffered) {
        return;
      }
      const end = el.buffered.end(el.buffered.length - 1);
      if (2 < end - el.currentTime) {
        changeCurrentTime(end - 0.5);
      }
    }, 10 * 1000);
    return () => {
      global.clearInterval(id);
    };
  }, [getVideoElement, changeCurrentTime]);

  return null;
};

export default React.memo(FouceLive, () => true);
