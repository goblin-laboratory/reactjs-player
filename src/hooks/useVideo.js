import React from 'react';

const noop = () => {};

export default (props, getVideoElement, getPlayerElement) => {
  const {
    live,
    src,
    currentTime: currentTimeProp,
    muted: mutedProp,
    volume: volumeProp,
    onCanPlay,
    onDurationChange,
    onTimeUpdate,
    onProgress,
    onPause,
    onPlay,
    onPlaying,
    onEnded,
    onSeeked,
    onSeeking,
    onCanPlayThrough,
    onWaiting,
    onVolumeChange,
    onRateChange,
  } = props;

  const [loading, setLoading] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [ended, setEnded] = React.useState(false);
  const [seeking, setSeeking] = React.useState(false);
  const [waiting, setWaiting] = React.useState(false);
  const [duration, setDuration] = React.useState(live ? -1 : 0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [buffered, setBuffered] = React.useState(null);
  const [muted, setMuted] = React.useState(props.muted);
  const [volume, setVolume] = React.useState(volumeProp);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [fullScreen, setFullScreen] = React.useState(false);

  React.useEffect(() => {
    if (!src) {
      return noop;
    }
    setLoading(true);
    setPaused(false);
    setEnded(false);
    setSeeking(false);
    setWaiting(false);
    setDuration(live ? -1 : 0);
    setCurrentTime(0);
    setBuffered(null);
    return () => {
      setLoading(false);
      setPaused(false);
      setEnded(false);
      setSeeking(false);
      setWaiting(false);
      setDuration(live ? -1 : 0);
      setCurrentTime(0);
      setBuffered(null);
    };
  }, [src, live]);

  const onVideoCanPlay = React.useCallback(
    e => {
      setLoading(false);
      setWaiting(false);
      onCanPlay(e);
    },
    [onCanPlay],
  );

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

  const onVideoPause = React.useCallback(
    e => {
      setPaused(true);
      onPause(e);
    },
    [onPause],
  );

  const onVideoPlay = React.useCallback(
    e => {
      setPaused(false);
      setEnded(false);
      onPlay(e);
    },
    [onPlay],
  );

  const onVideoPlaying = React.useCallback(
    e => {
      setPaused(false);
      setEnded(false);
      onPlaying(e);
    },
    [onPlaying],
  );

  const onVideoEnded = React.useCallback(
    e => {
      setEnded(true);
      onEnded(e);
    },
    [onEnded],
  );

  const onVideoSeeked = React.useCallback(
    e => {
      setSeeking(false);
      onSeeked(e);
    },
    [onSeeked],
  );

  const onVideoSeeking = React.useCallback(
    e => {
      setSeeking(true);
      onSeeking(e);
    },
    [onSeeking],
  );

  const onVideoCanPlayThrough = React.useCallback(
    e => {
      setWaiting(false);
      onCanPlayThrough(e);
    },
    [onCanPlayThrough],
  );

  const onVideoWaiting = React.useCallback(
    e => {
      setWaiting(true);
      onWaiting(e);
    },
    [onWaiting],
  );

  const onVideoVolumeChange = React.useCallback(
    e => {
      const v = e.target.volume;
      const m = 0 === v ? true : e.target.muted;
      setVolume(v);
      setMuted(m);
      onVolumeChange(e);
    },
    [onVolumeChange],
  );

  const onVideoRateChange = React.useCallback(
    e => {
      setPlaybackRate(e.target.playbackRate);
      onRateChange(e);
    },
    [onRateChange],
  );

  React.useEffect(() => {
    setCurrentTime(currentTimeProp);
    return noop;
  }, [currentTimeProp]);

  React.useEffect(() => {
    setMuted(mutedProp);
    return noop;
  }, [mutedProp]);

  React.useEffect(() => {
    setVolume(volumeProp);
    return noop;
  }, [volumeProp]);

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

  const onPauseClick = React.useCallback(
    t => {
      const el = getVideoElement();
      if (el) {
        el.pause();
      }
      setPaused(true);
    },
    [getVideoElement],
  );

  const onPlayClick = React.useCallback(
    t => {
      const el = getVideoElement();
      if (el) {
        if (ended) {
          el.currentTime = 0;
        }
        el.play();
      }
      setPaused(true);
    },
    [getVideoElement, ended],
  );

  const onMutedClick = React.useCallback(
    e => {
      const el = getVideoElement();
      if (el) {
        el.muted = !muted;
        if (0 === volume && muted) {
          el.volume = 1;
        }
      }
    },
    [getVideoElement, muted, volume],
  );

  const changeVolume = React.useCallback(
    v => {
      const el = getVideoElement();
      if (el) {
        el.volume = v;
      }
    },
    [getVideoElement],
  );

  const onPiPClick = React.useCallback(
    v => {
      const el = getVideoElement();
      if (el) {
        el.requestPictureInPicture();
      }
    },
    [getVideoElement],
  );

  const requestFullscreen = React.useCallback(
    v => {
      const el = getPlayerElement();
      if (el) {
        el.requestFullscreen();
      }
    },
    [getPlayerElement],
  );

  const onFullscreenChange = React.useCallback(
    v => {
      const el = getPlayerElement();
      if (el) {
        setFullScreen(document.fullscreenElement === el);
      }
    },
    [getPlayerElement],
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

  React.useEffect(() => {
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [onFullscreenChange]);

  return {
    loading,
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
    fullScreen,
    mediaEvents: {
      onCanPlay: onVideoCanPlay,
      onDurationChange: onVideoDurationChange,
      onTimeUpdate: onVideoTimeUpdate,
      onProgress: onVideoProgress,
      onPause: onVideoPause,
      onPlay: onVideoPlay,
      onPlaying: onVideoPlaying,
      onEnded: onVideoEnded,
      onSeeked: onVideoSeeked,
      onSeeking: onVideoSeeking,
      onCanPlayThrough: onVideoCanPlayThrough,
      onWaiting: onVideoWaiting,
      onVolumeChange: onVideoVolumeChange,
      onRateChange: onVideoRateChange,
      onEmptied: props.onEmptied,
      onEncrypted: props.onEncrypted,
      onError: props.onError,
      onLoadedData: props.onLoadedData,
      onLoadedMetadata: props.onLoadedMetadata,
      onLoadStart: props.onLoadStart,
      onStalled: props.onStalled,
      onSuspend: props.onSuspend,
      onAbort: props.onAbort,
    },
    changeCurrentTime,
    onPauseClick,
    onPlayClick,
    onMutedClick,
    changeVolume,
    onPiPClick,
    requestFullscreen,
    changePlaybackRate,
  };
};
