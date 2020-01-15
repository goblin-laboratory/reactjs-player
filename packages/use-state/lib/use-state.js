import React from 'react';

export default (src, getVideoElement) => {
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
        .catch(errMsg => {
          const debug = console.error;
          debug(`onPlayClick: ${errMsg}`);
          setPrevented(true);
        });
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

  const onCanPlay = React.useCallback(() => {
    if (ref.current.loading) {
      setLoading(false);
      onPlayClick();
    }
    setWaiting(false);
  }, [onPlayClick]);

  const onPause = React.useCallback(() => {
    setPaused(true);
  }, []);

  const onPlay = React.useCallback(() => {
    setPaused(false);
    setEnded(false);
  }, []);

  const onPlaying = React.useCallback(() => {
    setPaused(false);
    setEnded(false);
  }, []);

  const onEnded = React.useCallback(() => {
    setEnded(true);
  }, []);

  const onSeeked = React.useCallback(() => {
    setSeeking(false);
  }, []);

  const onSeeking = React.useCallback(() => {
    setSeeking(true);
  }, []);

  const onCanPlayThrough = React.useCallback(() => {
    setWaiting(false);
  }, []);

  const onWaiting = React.useCallback(() => {
    setWaiting(true);
  }, []);

  React.useEffect(() => {
    const el = ref.current.getVideoElement();
    if (!el) {
      return () => {};
    }
    el.addEventListener('canplay', onCanPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('play', onPlay);
    el.addEventListener('playing', onPlaying);
    el.addEventListener('ended', onEnded);
    el.addEventListener('seeked', onSeeked);
    el.addEventListener('seeking', onSeeking);
    el.addEventListener('canplaythrough', onCanPlayThrough);
    el.addEventListener('waiting', onWaiting);
    return () => {
      el.removeEventListener('canplay', onCanPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('play', onPlay);
      el.removeEventListener('playing', onPlaying);
      el.removeEventListener('ended', onEnded);
      el.removeEventListener('seeked', onSeeked);
      el.removeEventListener('seeking', onSeeking);
      el.removeEventListener('canplaythrough', onCanPlayThrough);
      el.removeEventListener('waiting', onWaiting);
    };
  }, [onCanPlay, onPause, onPlay, onPlaying, onEnded, onSeeked, onSeeking, onCanPlayThrough, onWaiting]);

  return { loading, prevented, paused, ended, seeking, waiting, onPauseClick, onPlayClick };
};
