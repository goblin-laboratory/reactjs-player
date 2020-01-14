import React from 'react';

export default (src, getVideoElement) => {
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [buffered, setBuffered] = React.useState(null);
  const ref = React.useRef({ src, getVideoElement });
  const updateRef = React.useRef(null);

  React.useEffect(() => {
    ref.current.src = src;
    setDuration(0);
    setCurrentTime(0);
    setBuffered(null);
    updateRef.current = null;
    return () => {
      updateRef.current = null;
    };
  }, [src]);

  const onDurationChange = React.useCallback(e => {
    const v = e.target.duration;
    setDuration(Number.isNaN(v) || Number.isFinite(v) || !v ? v : 0);
  }, []);

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

  const onTimeUpdate = React.useCallback(
    e => {
      if (updateRef && !Number.isNaN(e.target.currentTime)) {
        if (updateRef.current) {
          updateRef.current.currentTime = e.target.currentTime;
        } else {
          updateRef.current = { currentTime: e.target.currentTime, timestamp: performance.now() };
          global.requestAnimationFrame(update);
        }
      }
    },
    [update],
  );

  const onProgress = React.useCallback(
    e => {
      if (updateRef.current) {
        updateRef.current.buffered = e.target.buffered;
      } else {
        updateRef.current = { buffered: e.target.buffered, timestamp: performance.now() };
        global.requestAnimationFrame(update);
      }
    },
    [update],
  );

  const changeCurrentTime = React.useCallback(t => {
    const v = parseFloat(t);
    if (Number.isNaN(v)) {
      return;
    }
    const el = ref.current.getVideoElement();
    if (el) {
      el.currentTime = v;
    }
    updateRef.current = null;
    setCurrentTime(v);
  }, []);

  React.useEffect(() => {
    const el = ref.current.getVideoElement();
    if (!el) {
      return () => {};
    }
    el.addEventListener('durationchange', onDurationChange);
    el.addEventListener('timeupdate', onTimeUpdate);
    el.addEventListener('progress', onProgress);
    return () => {
      el.removeEventListener('canplay', onDurationChange);
      el.removeEventListener('pause', onTimeUpdate);
      el.removeEventListener('progress', onProgress);
    };
  }, [onDurationChange, onTimeUpdate, onProgress]);

  return { duration, currentTime, buffered, changeCurrentTime };
};
