import React from 'react';

export default (getVideoElement, m = false) => {
  const [muted, setMuted] = React.useState(m);
  const [volume, setVolume] = React.useState(1);

  const ref = React.useRef({ getVideoElement, muted, volume });

  React.useEffect(() => {
    ref.current.muted = muted;
    ref.current.volume = volume;
  }, [muted, volume]);

  const onVolumeChange = React.useCallback(e => {
    const v = e.target.volume;
    setVolume(v);
    setMuted(0 === v ? true : e.target.muted);
  }, []);

  const onMutedClick = React.useCallback(() => {
    const el = ref.current.getVideoElement();
    if (el) {
      el.muted = !ref.current.muted;
      if (0 === ref.current.volume && ref.current.muted) {
        el.volume = 1;
      }
      // setMuted(el.muted);
    }
  }, []);

  const changeVolume = React.useCallback(v => {
    const el = ref.current.getVideoElement();
    if (el) {
      el.volume = v;
    }
  }, []);

  React.useEffect(() => {
    const el = ref.current.getVideoElement();
    if (!el) {
      return () => {};
    }
    el.addEventListener('volumechange', onVolumeChange);
    return () => {
      el.removeEventListener('volumechange', onVolumeChange);
    };
  }, [onVolumeChange]);

  return { muted, volume, onMutedClick, changeVolume };
};
