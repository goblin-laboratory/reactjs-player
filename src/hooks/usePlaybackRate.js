import React from 'react';

export default (live, getVideoElement) => {
  const [playbackRate, setPlaybackRate] = React.useState(1);

  const onRateChange = React.useCallback((e) => {
    setPlaybackRate(e.target.playbackRate);
  }, []);

  const changePlaybackRate = React.useCallback(
    (r) => {
      const el = getVideoElement();
      if (el) {
        el.playbackRate = r;
        setPlaybackRate(r);
      }
    },
    [getVideoElement],
  );

  React.useEffect(() => {
    if (live) {
      setPlaybackRate(1);
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

  return { playbackRate, changePlaybackRate };
};
