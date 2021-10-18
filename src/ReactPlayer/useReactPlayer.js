import React from 'react';
import usePlayerReducer from '../hooks/usePlayerReducer';
import useVideoState from '../hooks/useVideoState';
import useTime from '../hooks/useTime';
import useVolume from '../hooks/useVolume';
import usePlaybackRate from '../hooks/usePlaybackRate';
import usePiP from '../hooks/usePiP';
import useFullscreen from '../hooks/useFullscreen';

export default ({ src, live, onKernelError }) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  const {
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
  } = usePlayerReducer({ src });

  const getVideoElement = React.useCallback(() => videoRef && videoRef.current, []);
  const getPlayerElement = React.useCallback(() => playerRef && playerRef.current, []);

  const onMsgChange = React.useCallback(
    (msg) => {
      // debugger;
      updateState({ kernelMsg: msg });
      if (onKernelError) {
        onKernelError(msg);
      }
    },
    [updateState, onKernelError],
  );

  const { onPauseClick, onPlayClick } = useVideoState({
    src,
    loading,
    prevented,
    paused,
    ended,
    seeking,
    waiting,
    updateState,
    getVideoElement,
  });

  const { changeCurrentTime } = useTime({ src, duration, currentTime, buffered, updateState, getVideoElement });
  const { onMutedClick, changeVolume } = useVolume({ src, muted, volume, updateState, getVideoElement });
  const { changePlaybackRate } = usePlaybackRate({ src, live, playbackRate, updateState, getVideoElement });
  const { requestPictureInPicture, exitPictureInPicture } = usePiP({ src, pip, updateState, getVideoElement });
  const { requestFullscreen, exitFullscreen } = useFullscreen({ updateState, getVideoElement, getPlayerElement });

  return {
    videoRef,
    playerRef,
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
    getVideoElement,
    onPauseClick,
    onPlayClick,
    changeCurrentTime,
    onMutedClick,
    changeVolume,
    changePlaybackRate,
    requestPictureInPicture,
    exitPictureInPicture,
    requestFullscreen,
    exitFullscreen,
    onMsgChange,
  };
};
