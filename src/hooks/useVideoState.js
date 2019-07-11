import React from 'react';

export default (props, getVideoElement) => {
  const {
    src,
    onCanPlay,
    onPause,
    onPlay,
    onPlaying,
    onEnded,
    onSeeked,
    onSeeking,
    onCanPlayThrough,
    onWaiting,
  } = props;

  const [loading, setLoading] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [ended, setEnded] = React.useState(false);
  const [seeking, setSeeking] = React.useState(false);
  const [waiting, setWaiting] = React.useState(false);

  React.useEffect(() => {
    setLoading(!!src);
    setPaused(false);
    setEnded(false);
    setSeeking(false);
    setWaiting(false);
  }, [src]);

  const onVideoCanPlay = React.useCallback(
    e => {
      setLoading(false);
      setWaiting(false);
      onCanPlay(e);
    },
    [onCanPlay],
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

  return {
    loading,
    paused,
    ended,
    seeking,
    waiting,
    onPauseClick,
    onPlayClick,
    // 媒体事件
    onCanPlay: onVideoCanPlay,
    onPause: onVideoPause,
    onPlay: onVideoPlay,
    onPlaying: onVideoPlaying,
    onEnded: onVideoEnded,
    onSeeked: onVideoSeeked,
    onSeeking: onVideoSeeking,
    onCanPlayThrough: onVideoCanPlayThrough,
    onWaiting: onVideoWaiting,
  };
};
