import React from 'react';

const initialState = {
  loading: false,
  prevented: false,
  paused: false,
  ended: false,
  seeking: false,
  waiting: false,
  duration: 0,
  currentTime: 0,
  buffered: null,
  muted: false,
  volume: 1,
  playbackRate: 1,
  enabled: !!document.pictureInPictureEnabled,
  pictureInPictureEnabled: !!document.pictureInPictureEnabled,
  pip: false,
  fullscreen: false,
  kernelMsg: null,
};

const reducer = (state, action) => {
  if ('reset' === action.type) {
    return { ...initialState, ...action.payload };
  }
  return { ...state, ...action.payload };
};

export default ({ src }) => {
  const [
    {
      loading,
      prevented,
      paused,
      ended,
      seeking,
      waiting,
      duration,
      currentTime,
      buffered,
      muted,
      volume,
      playbackRate,
      pictureInPictureEnabled,
      pip,
      fullscreen,
      kernelMsg,
    },
    dispatch,
  ] = React.useReducer(reducer, initialState);
  const ref = React.useRef({ src });

  const clearUpdateTimeout = React.useCallback(() => {
    if (ref.current && ref.current.timeout) {
      global.clearTimeout(ref.current.timeout);
      delete ref.current.timeout;
    }
  }, []);

  const timeoutCallback = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    delete ref.current.timeout;
    if (!ref.current.payload) {
      return;
    }
    dispatch({ type: 'update', payload: ref.current.payload });
    delete ref.current.payload;
  }, [dispatch]);

  const updateState = React.useCallback(
    (payload, sync = false) => {
      if (!ref.current) {
        return;
      }
      ref.current.payload = { ...ref.current.payload, ...payload };
      if (sync) {
        timeoutCallback();
        return;
      }
      if (ref.current.timeout) {
        return;
      }
      ref.current.timeout = global.setTimeout(timeoutCallback, 100);
    },
    [timeoutCallback],
  );

  React.useEffect(() => {
    return () => {
      clearUpdateTimeout();
      ref.current = null;
    };
  }, [clearUpdateTimeout]);

  React.useEffect(() => {
    clearUpdateTimeout();
    dispatch({ type: 'reset' });
  }, [src, clearUpdateTimeout]);

  return {
    loading,
    prevented,
    paused,
    ended,
    seeking,
    waiting,
    duration,
    currentTime,
    buffered,
    muted,
    volume,
    playbackRate,
    pictureInPictureEnabled,
    pip,
    fullscreen,
    kernelMsg,
    updateState,
  };
};
