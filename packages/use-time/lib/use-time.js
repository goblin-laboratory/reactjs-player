import React from 'react';

export default (props, getVideoElement) => {
  const { src, onDurationChange, onTimeUpdate, onProgress } = props;

  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [buffered, setBuffered] = React.useState(null);
  const updateRef = React.useRef(null);

  React.useEffect(() => {
    setDuration(0);
    setCurrentTime(0);
    setBuffered(null);

    if (updateRef && updateRef.current) {
      updateRef.current = null;
    }
  }, [src]);

  const onVideoDurationChange = React.useCallback(
    e => {
      setDuration(e.target.duration);
      onDurationChange(e);
    },
    [onDurationChange],
  );

  const update = React.useCallback(timestamp => {
    if (!updateRef || !updateRef.current) {
      return;
    }
    if (200 > timestamp - updateRef.current.timestamp) {
      global.requestAnimationFrame(update);
      return;
    }
    // eslint-disable-next-line no-undefined
    if (updateRef.current && undefined !== updateRef.current.currentTime) {
      setCurrentTime(updateRef.current.currentTime);
    }
    // eslint-disable-next-line no-undefined
    if (updateRef.current && undefined !== updateRef.current.buffered) {
      setBuffered(updateRef.current.buffered);
    }
    updateRef.current = null;
  }, []);

  const onVideoTimeUpdate = React.useCallback(
    e => {
      if (updateRef) {
        // debugger;
        if (updateRef.current) {
          updateRef.current.currentTime = e.target.currentTime;
        } else {
          updateRef.current = { currentTime: e.target.currentTime, timestamp: performance.now() };
          global.requestAnimationFrame(update);
        }
      }
      onTimeUpdate(e);
    },
    [onTimeUpdate, update],
  );

  const onVideoProgress = React.useCallback(
    e => {
      if (updateRef) {
        if (updateRef.current) {
          updateRef.current.buffered = e.target.buffered;
        } else {
          updateRef.current = { buffered: e.target.buffered, timestamp: performance.now() };
          global.requestAnimationFrame(update);
          // global.requestIdleCallback(update, { timeout: 200 });
        }
      }
      // setBuffered(e.target.buffered);
      onProgress(e);
    },
    [onProgress, update],
  );

  const changeCurrentTime = React.useCallback(
    t => {
      const v = parseFloat(t);
      if (Number.isNaN(v)) {
        return;
      }
      const el = getVideoElement();
      if (el) {
        el.currentTime = v;
      }
      updateRef.current = null;
      setCurrentTime(v);
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
