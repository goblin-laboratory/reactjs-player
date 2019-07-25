import React from 'react';

export default (props, getVideoElement) => {
  const { live, src, onDurationChange, onTimeUpdate, onProgress } = props;

  const [duration, setDuration] = React.useState(live ? -1 : 0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [buffered, setBuffered] = React.useState(null);

  React.useEffect(() => {
    setDuration(live ? -1 : 0);
    setCurrentTime(0);
    setBuffered(null);
  }, [src, live]);

  const onVideoDurationChange = React.useCallback(
    e => {
      if (!live) {
        setDuration(e.target.duration);
      }
      onDurationChange(e);
    },
    [live, onDurationChange],
  );

  const onVideoTimeUpdate = React.useCallback(
    e => {
      setCurrentTime(e.target.currentTime);
      onTimeUpdate(e);
    },
    [onTimeUpdate],
  );

  const onVideoProgress = React.useCallback(
    e => {
      setBuffered(e.target.buffered);
      onProgress(e);
    },
    [onProgress],
  );

  const changeCurrentTime = React.useCallback(
    t => {
      // TOOD: currentTime 非法值校验
      const el = getVideoElement();
      if (el) {
        el.currentTime = t;
      }
      setCurrentTime(t);
    },
    [getVideoElement],
  );

  return {
    duration,
    currentTime,
    buffered,
    changeCurrentTime,
    // 媒体事件
    onDurationChange: onVideoDurationChange,
    onTimeUpdate: onVideoTimeUpdate,
    onProgress: onVideoProgress,
  };
};
