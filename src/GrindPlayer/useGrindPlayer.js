import React from 'react';
import GrindPlayer from './GrindPlayer';

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
  pictureInPictureEnabled: false,
  pip: false,
  fullscreen: false,
  playbackRate: 1,
  javascriptCallbackFunction: 'onJSBridge',
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
      pictureInPictureEnabled,
      pip,
      fullscreen,
      playbackRate,
      javascriptCallbackFunction,
      kernelMsg,
    },
    dispatch,
  ] = React.useReducer(reducer, initialState);

  const id = React.useMemo(() => GrindPlayer.getPlayerId(), []);
  const ref = React.useRef({});

  React.useEffect(() => {
    const player = GrindPlayer.getGrindPlayer(id, javascriptCallbackFunction);
    ref.current.player = player;
    return () => {
      player.destroy();
      ref.current = null;
    };
  }, [id, javascriptCallbackFunction]);

  React.useEffect(() => {
    ref.current.loading = loading;
    ref.current.ended = ended;
    ref.current.muted = muted;
    ref.current.volume = volume;
  }, [loading, ended, muted, volume]);

  React.useEffect(() => {
    dispatch({ type: 'reset', payload: { loading: !!src } });
  }, [src]);

  return {
    ref,
    dispatch,
    id,
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
    pictureInPictureEnabled,
    pip,
    fullscreen,
    playbackRate,
    javascriptCallbackFunction,
    kernelMsg,
  };
};
