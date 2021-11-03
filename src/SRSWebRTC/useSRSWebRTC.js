import React from 'react';
import SRSPlayer from './SRSPlayer';
// import SrsRtcPlayerAsync from './SrsRtcPlayerAsync';

export default ({ getVideoElement, src, config, onMsgChange }) => {
  const ref = React.useRef(null);
  const onMsgChangeRef = React.useRef(onMsgChange);

  React.useEffect(() => {
    ref.current = config;
  }, [config]);

  React.useEffect(() => {
    onMsgChangeRef.current(null);
    const el = getVideoElement();
    if (!src || !el) {
      return () => {};
    }
    const player = new SRSPlayer(src, { ...ref.current });
    const stream = player.subscribe();
    el.pause();
    el.srcObject = stream;
    el.load();
    return () => {
      el.srcObject = null;
      player.destroy();
    };
  }, [src, getVideoElement]);

  return null;
};
