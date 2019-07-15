import React from 'react';

export default (props, getVideoElement) => {
  const { live, onRateChange } = props;

  const [playbackRate, setPlaybackRate] = React.useState(1);

  const onVideoRateChange = React.useCallback(
    e => {
      setPlaybackRate(e.target.playbackRate);
      onRateChange(e);
    },
    [onRateChange],
  );

  const changePlaybackRate = React.useCallback(
    r => {
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

  return {
    playbackRate,
    changePlaybackRate,
    // 媒体事件
    onRateChange: onVideoRateChange,
  };
};
