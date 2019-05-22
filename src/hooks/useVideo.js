import React from 'react';

export default props => {
  const {
    live,
    src,
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
  const [volume, setVolume] = React.useState(1);
  const [rate, setRate] = React.useState(1);
  const [fullScreen, setFullScreen] = React.useState(false);

  React.useEffect(() => {
    setLoading(false);
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
      setRate(e.target.playbackRate);
      onRateChange(e);
    },
    [onRateChange],
  );

  return {
    loading,
    setLoading,
    paused,
    setPaused,
    ended,
    setEnded,
    seeking,
    setSeeking,
    waiting,
    setWaiting,
    duration,
    setDuration,
    currentTime,
    setCurrentTime,
    buffered,
    setBuffered,
    muted,
    setMuted,
    volume,
    setVolume,
    rate,
    setRate,
    fullScreen,
    setFullScreen,
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
  };
};
