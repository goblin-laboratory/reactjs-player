import React from 'react';

export default (props, getVideoElement) => {
  const { live, src, currentTime: currentTimeProp, onDurationChange, onTimeUpdate, onProgress } = props;

  const [duration, setDuration] = React.useState(live ? -1 : 0);
  const [currentTime, setCurrentTime] = React.useState(currentTimeProp);
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
      const el = getVideoElement();
      if (el) {
        el.currentTime = t;
      }
      setCurrentTime(t);
    },
    [getVideoElement],
  );

  React.useEffect(() => {
    if (!live) {
      return;
    }
    if (duration > currentTimeProp) {
      changeCurrentTime(currentTimeProp);
    }
  }, [live, currentTimeProp, duration, changeCurrentTime]);

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
