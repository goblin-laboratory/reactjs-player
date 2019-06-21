import React from 'react';
import flvjs from 'flv.js';

export default ({ src, config }, getVideoElement) => {
  const [flvPlayer, setFlvPlayer] = React.useState(null);
  const [playerMsg, setPlayerMsg] = React.useState(null);

  React.useEffect(() => {
    const el = getVideoElement();
    if (!el || !src) {
      setFlvPlayer(null);
      return () => {};
    }
    setFlvPlayer(flvjs.createPlayer({ isLive: true, type: 'flv', url: src }, { ...config }));
    return () => {
      setFlvPlayer(null);
    };
  }, [getVideoElement, src, config]);

  React.useEffect(() => {
    if (!flvPlayer) {
      return () => {};
    }
    const el = getVideoElement();
    if (el) {
      flvPlayer.attachMediaElement(el);
      flvPlayer.load();
      flvPlayer.play();
    }
    return () => {
      try {
        flvPlayer.pause();
      } catch (errMsg) {}
      try {
        flvPlayer.unload();
      } catch (errMsg) {}
      try {
        flvPlayer.detachMediaElement();
      } catch (errMsg) {}
      try {
        flvPlayer.destroy();
      } catch (errMsg) {}
    };
  }, [getVideoElement, flvPlayer]);

  const onPlayerError = React.useCallback((type, detail) => {
    setPlayerMsg({ type, detail });
  }, []);

  React.useEffect(() => {
    if (!flvPlayer) {
      return () => {};
    }
    flvPlayer.on(flvjs.Events.ERROR, onPlayerError);
    return () => {
      try {
        flvPlayer.off(flvjs.Events.ERROR);
      } catch (errMsg) {}
    };
  }, [flvPlayer, onPlayerError]);

  return playerMsg;
};
