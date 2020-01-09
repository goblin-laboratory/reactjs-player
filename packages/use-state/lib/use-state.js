import React from 'react';

export default (
  {
    src,
    onCanPlay = () => {},
    onPause = () => {},
    onPlay = () => {},
    onPlaying = () => {},
    onEnded = () => {},
    onSeeked = () => {},
    onSeeking = () => {},
    onCanPlayThrough = () => {},
    onWaiting = () => {},
  },
  getVideoElement,
) => {
  const [loading, setLoading] = React.useState(false);
  const [prevented, setPrevented] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [ended, setEnded] = React.useState(false);
  const [seeking, setSeeking] = React.useState(false);
  const [waiting, setWaiting] = React.useState(false);

  const ref = React.useRef({ getVideoElement, loading, prevented, ended });

  React.useEffect(() => {
    setLoading(!!src);
    setPaused(false);
    setEnded(false);
    setSeeking(false);
    setWaiting(false);
  }, [src]);

  React.useEffect(() => {
    ref.current.loading = loading;
    ref.current.prevented = prevented;
    ref.current.ended = ended;
  }, [loading, prevented, ended]);

  const onPlayClick = React.useCallback(() => {
    const el = ref.current.getVideoElement();
    if (el) {
      if (ref.current.ended) {
        el.currentTime = 0;
      }
      el.play()
        .then(() => setPrevented(false))
        .catch(() => setPrevented(true));
    }
    setPaused(false);
  }, []);

  const onPauseClick = React.useCallback(() => {
    const el = ref.current.getVideoElement();
    if (el) {
      el.pause();
    }
    setPaused(true);
  }, []);

  const onVideoCanPlay = React.useCallback(
    e => {
      if (ref.current.loading) {
        setLoading(false);
        onPlayClick();
      } else {
        setWaiting(false);
      }
      setLoading(false);
      onPlayClick(true);
      onCanPlay(e);
    },
    [onCanPlay, onPlayClick],
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

  return {
    loading,
    prevented,
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
