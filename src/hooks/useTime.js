import React from 'react';

const initialState = { duration: 0, currentTime: 0, buffered: null };

const reducer = (state, action) => {
  if ('reset' === action.type) {
    return { duration: 0, currentTime: 0, buffered: null };
  }
  return { ...state, ...action.payload };
  // switch (action.type) {
  //   case 'update':
  //     return { ...state, ...action.payload };
  //   case 'reset':
  //     return { duration: 0, currentTime: 0, buffered: null };
  //   default:
  //     throw new Error();
  // }
};

export default (src, getVideoElement) => {
  const [{ duration, currentTime, buffered }, dispatch] = React.useReducer(reducer, initialState);
  // const [duration, setDuration] = React.useState(0);
  // const [currentTime, setCurrentTime] = React.useState(0);
  // const [buffered, setBuffered] = React.useState(null);
  const ref = React.useRef({ src, getVideoElement, temp: null });
  // const updateRef = React.useRef(null);

  React.useEffect(() => {
    ref.current.src = src;
    ref.current.temp = null;
    dispatch({ type: 'reset' });
    // setDuration(0);
    // setCurrentTime(0);
    // setBuffered(null);
    // updateRef.current = null;
    return () => {
      ref.current = { getVideoElement: ref.current.getVideoElement, temp: null };
    };
  }, [src]);

  const onDurationChange = React.useCallback((e) => {
    const v = e.target.duration;
    dispatch({ type: 'update', payload: { duration: Number.isNaN(v) || Number.isFinite(v) || !v ? v : 0 } });
    // setDuration(Number.isNaN(v) || Number.isFinite(v) || !v ? v : 0);
  }, []);

  const update = React.useCallback((timestamp) => {
    if (!ref || !ref.current || !ref.current.temp) {
      return;
    }
    const { timestamp: t, ...payload } = ref.current.temp;
    if (250 > timestamp - t) {
      global.requestAnimationFrame(update);
      return;
    }
    dispatch({ type: 'update', payload });
    ref.current.temp = null;
  }, []);

  const onTimeUpdate = React.useCallback(
    (e) => {
      if (!ref || !ref.current || Number.isNaN(e.target.currentTime)) {
        return;
      }
      if (ref.current.temp) {
        ref.current.temp.currentTime = e.target.currentTime;
      } else {
        ref.current.temp = { currentTime: e.target.currentTime, timestamp: performance.now() };
        global.requestAnimationFrame(update);
      }
    },
    [update],
  );

  const onProgress = React.useCallback(
    (e) => {
      if (!ref || !ref.current) {
        return;
      }
      if (ref.current.temp) {
        ref.current.temp.buffered = e.target.buffered;
      } else {
        ref.current.temp = { buffered: e.target.buffered, timestamp: performance.now() };
        global.requestAnimationFrame(update);
      }
    },
    [update],
  );

  const changeCurrentTime = React.useCallback((t) => {
    const v = parseFloat(t);
    if (Number.isNaN(v)) {
      return;
    }
    const el = ref.current.getVideoElement();
    if (el) {
      el.currentTime = v;
    }
    ref.current.temp = null;
    dispatch({ type: 'update', payload: { currentTime: v } });
    // setCurrentTime(v);
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
      el.removeEventListener('durationchange', onDurationChange);
      el.removeEventListener('timeupdate', onTimeUpdate);
      el.removeEventListener('progress', onProgress);
    };
  }, [onDurationChange, onTimeUpdate, onProgress]);

  return { duration, currentTime, buffered, changeCurrentTime };
};
