import React from 'react';

export default ({ src, live, updateState, getVideoElement }) => {
  const ref = React.useRef({ live, getVideoElement });

  const onRateChange = React.useCallback(
    (e) => {
      if (!ref.current) {
        return;
      }
      if (Number.isNaN(e.target.playbackRate)) {
        return;
      }
      updateState({ playbackRate: e.target.playbackRate });
    },
    [updateState],
  );

  const changePlaybackRate = React.useCallback(
    (r) => {
      if (!ref.current) {
        return;
      }
      if (Number.isNaN(r)) {
        return;
      }
      const v = ref.current.live ? 1 : r;
      const el = ref.current.getVideoElement();
      if (!el) {
        return;
      }
      el.playbackRate = v;
      updateState({ playbackRate: v }, true);
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
      return;
    }
    ref.current.live = live;
    if (live) {
      changePlaybackRate(1);
    }
  }, [live, changePlaybackRate]);

  React.useEffect(() => {
    if (!ref.current) {
      return () => {};
    }
    const el = getVideoElement();
    if (!el) {
      return () => {};
    }
    el.addEventListener('ratechange', onRateChange);
    return () => {
      el.removeEventListener('ratechange', onRateChange);
    };
  }, [getVideoElement, onRateChange]);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    const el = ref.current.getVideoElement();
    if (el) {
      el.playbackRate = 1;
    }
  }, [src]);

  return { changePlaybackRate };
};
