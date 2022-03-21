import React from 'react';

export default ({ src, updateState, getVideoElement }) => {
  const ref = React.useRef({ src, getVideoElement, timestamp: 0, payload: null });
  // const updateRef = React.useRef(null);

  const onDurationChange = React.useCallback(
    (e) => {
      if (!ref.current) {
        return;
      }
      const v = e.target.duration;
      // TODO: 同步更新
      updateState({ duration: Number.isNaN(v) || Number.isFinite(v) || !v ? v : 0 });
    },
    [updateState],
  );

  const update = React.useCallback(
    (timestamp) => {
      if (!ref.current || !ref.current.payload) {
        return;
      }
      if (ref.current.timestamp && !Number.isNaN(ref.current.timestamp) && 200 > timestamp - ref.current.timestamp) {
        global.requestAnimationFrame(update);
        return;
      }
      updateState(ref.current.payload);
      ref.current.timestamp = timestamp;
      delete ref.current.payload;
    },
    [updateState],
  );

  const onTimeUpdate = React.useCallback(
    (e) => {
      if (!ref.current || Number.isNaN(e.target.currentTime)) {
        return;
      }
      if (ref.current.payload) {
        ref.current.payload.currentTime = e.target.currentTime;
      } else {
        ref.current.payload = { currentTime: e.target.currentTime };
        global.requestAnimationFrame(update);
      }
    },
    [update],
  );

  const onProgress = React.useCallback(
    (e) => {
      if (!ref.current || !(e.target.buffered instanceof TimeRanges)) {
        return;
      }
      if (ref.current.payload) {
        ref.current.payload.buffered = e.target.buffered;
      } else {
        ref.current.payload = { buffered: e.target.buffered };
        global.requestAnimationFrame(update);
      }
    },
    [update],
  );

  const changeCurrentTime = React.useCallback(
    (t) => {
      if (!ref.current) {
        return;
      }
      const v = parseFloat(t);
      if (Number.isNaN(v)) {
        return;
      }
      const el = ref.current.getVideoElement();
      if (el) {
        el.currentTime = v;
      }
      delete ref.current.payload;
      updateState({ currentTime: v });
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
    ref.current.src = src;
    ref.current.timestamp = 0;
    ref.current.payload = null;
  }, [src]);

  React.useEffect(() => {
    if (!ref.current) {
      return () => {};
    }
    const el = ref.current.getVideoElement();
    if (!el) {
      return () => {};
    }
    el.addEventListener('durationchange', onDurationChange);
    el.addEventListener('timeupdate', onTimeUpdate);
    el.addEventListener('progress', onProgress);
    return () => {
      el.removeEventListener('durationchange', onDurationChange);
      el.removeEventListener('timeupdate', onTimeUpdate);
      el.removeEventListener('progress', onProgress);
    };
  }, [onDurationChange, onTimeUpdate, onProgress]);

  return { changeCurrentTime };
};
