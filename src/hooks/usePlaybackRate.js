import React from 'react';

export default ({ live, updateState, getVideoElement }) => {
  const ref = React.useRef({ live, getVideoElement });

  const onRateChange = React.useCallback(
    (e) => {
      if (Number.isNaN(e.target.playbackRate)) {
        return;
      }
      updateState({ playbackRate: e.target.playbackRate });
    },
    [updateState],
  );

  const changePlaybackRate = React.useCallback(
    (r) => {
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
    ref.current.live = live;
    if (live) {
      changePlaybackRate(1);
    }
  }, [live, changePlaybackRate]);

  React.useEffect(() => {
    const el = getVideoElement();
    if (!el) {
      return () => {};
    }
    el.addEventListener('ratechange', onRateChange);
    return () => {
      el.removeEventListener('ratechange', onRateChange);
    };
  }, [getVideoElement, onRateChange]);

  return { changePlaybackRate };
};
