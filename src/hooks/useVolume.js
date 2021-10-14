import React from 'react';

export default ({ muted, volume, updateState, getVideoElement }) => {
  const ref = React.useRef({ muted, volume, getVideoElement });

  const onVolumeChange = React.useCallback(
    (e) => {
      const v = e.target.volume;
      // setVolume(v);
      // setMuted(0 === v ? true : e.target.muted);
      updateState({ volume: v, muted: 0 === v ? true : e.target.muted });
    },
    [updateState],
  );

  const onMutedClick = React.useCallback(() => {
    const el = ref.current.getVideoElement();
    if (el) {
      const payload = { muted: !ref.current.muted };
      el.muted = payload.muted;
      if (0 === ref.current.volume && ref.current.muted) {
        payload.volume = 1;
        el.volume = payload.volume;
      }
      updateState(payload, true);
    }
  }, [updateState]);

  const changeVolume = React.useCallback(
    (v) => {
      const el = ref.current.getVideoElement();
      const payload = { volume: v };
      if (el) {
        el.volume = v;
      }
      if (0 !== v && ref.current.muted) {
        payload.muted = false;
      }
      updateState(payload, true);
    },
    [updateState],
  );

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

  React.useEffect(() => {
    ref.current.muted = muted;
    ref.current.volume = volume;
  }, [muted, volume]);

  return { onMutedClick, changeVolume };
};
