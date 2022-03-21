import React from 'react';

export default ({ src, prevented, muted, volume, updateState, getVideoElement }) => {
  const ref = React.useRef({ prevented, muted, volume, getVideoElement });

  const onVolumeChange = React.useCallback(
    (e) => {
      if (!ref.current) {
        return;
      }
      const payload = { volume: e.target.volume, muted: e.target.muted };
      if (false === payload.muted && ref.current.prevented) {
        payload.prevented = false;
      }
      if (0 === payload.volume) {
        payload.muted = true;
      }
      updateState(payload);
    },
    [updateState],
  );

  const onMutedClick = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
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
      if (!ref.current) {
        return;
      }
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
    return () => {
      ref.current = null;
    };
  }, []);

  React.useEffect(() => {
    if (!ref.current) {
      return () => {};
    }
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
    if (!ref.current) {
      return;
    }
    ref.current.prevented = prevented;
    ref.current.muted = muted;
    ref.current.volume = volume;
  }, [prevented, muted, volume]);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    const el = ref.current.getVideoElement();
    if (el) {
      el.muted = false;
      el.volume = 1;
    }
  }, [src]);

  return { onMutedClick, changeVolume };
};
