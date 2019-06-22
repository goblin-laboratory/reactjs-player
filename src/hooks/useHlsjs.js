import React from 'react';
import Hls from 'hls.js';

export default ({ src, config, onKernelError }, getVideoElement) => {
  const [hlsPlayer, setHlsPlayer] = React.useState(null);
  const [playerMsg, setPlayerMsg] = React.useState(null);

  React.useEffect(() => {
    const el = getVideoElement();
    if (!el || !src) {
      setHlsPlayer(null);
      return () => {};
    }
    const hls = new Hls(Object.assign({ debug: false, enableWorker: false }, config));
    hls.loadSource(src);
    setHlsPlayer(hls);
    return () => {
      setHlsPlayer(null);
    };
  }, [getVideoElement, src, config]);

  React.useEffect(() => {
    if (!hlsPlayer) {
      return () => {};
    }
    const el = getVideoElement();
    if (el) {
      hlsPlayer.attachMedia(el);
      hlsPlayer.on(Hls.Events.MANIFEST_PARSED, () => el.play());
    }
    return () => {
      try {
        hlsPlayer.destroy();
      } catch (errMsg) {}
    };
  }, [getVideoElement, hlsPlayer]);

  const onError = React.useCallback(
    (e, info) => {
      if (info && info.fatal) {
        const msg = { type: info.type, detail: info.details };
        setPlayerMsg(msg);
        onKernelError(msg);
      }
    },
    [onKernelError],
  );

  React.useEffect(() => {
    if (!hlsPlayer) {
      setPlayerMsg(null);
      return () => {};
    }
    hlsPlayer.on(Hls.Events.ERROR, onError);
    return () => {
      try {
        hlsPlayer.off(Hls.Events.ERROR);
      } catch (errMsg) {}
      setPlayerMsg(null);
    };
  }, [hlsPlayer, onError]);

  return playerMsg;
};
