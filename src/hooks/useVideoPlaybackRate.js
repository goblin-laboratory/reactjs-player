import React from 'react';

export default (props, getVideoElement) => {
  const { live, onRateChange } = props;

  const [playbackRate, setPlaybackRate] = React.useState(1);

  React.useEffect(() => {
    if (live) {
      // debugger;
      setPlaybackRate(1);
    }
  }, [live]);

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
      }
    },
    [getVideoElement],
  );

  return {
    playbackRate,
    changePlaybackRate,
    // 媒体事件
    onRateChange: onVideoRateChange,
  };
};
