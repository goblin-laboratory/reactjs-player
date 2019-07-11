import React from 'react';
import flvjs from 'flv.js';

export default ({ src, config, onKernelError }, getVideoElement) => {
  const [flvPlayer, setFlvPlayer] = React.useState(null);
  const [kernelMsg, setKernelMsg] = React.useState(null);

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

  const onError = React.useCallback(
    (type, detail) => {
      const info = { type, detail };
      setKernelMsg(info);
      onKernelError(info);
    },
    [onKernelError],
  );

  React.useEffect(() => {
    if (!flvPlayer) {
      return () => {};
    }
    flvPlayer.on(flvjs.Events.ERROR, onError);
    return () => {
      try {
        flvPlayer.off(flvjs.Events.ERROR);
      } catch (errMsg) {}
    };
  }, [flvPlayer, onError]);

  return kernelMsg;
};
