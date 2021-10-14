import React from 'react';

export default ({ src, loading, prevented, ended, updateState, getVideoElement }) => {
  const ref = React.useRef({ getVideoElement, loading, prevented, ended });

  const onPlayClick = React.useCallback(() => {
    const el = ref.current.getVideoElement();
    if (el) {
      if (ref.current.ended) {
        el.currentTime = 0;
      }
      const promise = el.play();
      if (!promise || !promise.then) {
        return;
      }
      // debugger;
      // TODO: src 改变了
      promise.then(() => updateState({ prevented: false })).catch(() => updateState({ prevented: true }));
    }
    updateState({ paused: false }, true);
  }, [updateState]);

  const onPauseClick = React.useCallback(() => {
    const el = ref.current.getVideoElement();
    if (el) {
      el.pause();
    }
    updateState({ paused: true }, true);
  }, [updateState]);

  const onCanPlay = React.useCallback(() => {
    if (ref.current.loading) {
      updateState({ loading: false });
      onPlayClick();
    }
    updateState({ waiting: false });
    // setWaiting(false);
  }, [updateState, onPlayClick]);

  const onPause = React.useCallback(() => {
    // setPaused(true);
    updateState({ paused: true });
  }, [updateState]);

  const onPlay = React.useCallback(() => {
    // setPaused(false);
    // setEnded(false);
    updateState({ paused: false, ended: false });
  }, [updateState]);

  const onPlaying = React.useCallback(() => {
    // setPaused(false);
    // setEnded(false);
    updateState({ paused: false, ended: false });
  }, [updateState]);

  const onEnded = React.useCallback(() => {
    // setEnded(true);
    updateState({ ended: true });
  }, [updateState]);

  const onSeeked = React.useCallback(() => {
    // setSeeking(false);
    updateState({ seeking: false });
  }, [updateState]);

  const onSeeking = React.useCallback(() => {
    // setSeeking(true);
    updateState({ seeking: true });
  }, [updateState]);

  const onCanPlayThrough = React.useCallback(() => {
    // setWaiting(false);
    updateState({ waiting: false });
  }, [updateState]);

  const onWaiting = React.useCallback(() => {
    // setWaiting(true);
    updateState({ waiting: true });
  }, [updateState]);

  const onDocumentClick = React.useCallback(() => {
    const el = ref.current.getVideoElement();
    if (!el) {
      return;
    }
    document.removeEventListener('click', onDocumentClick);
    if (ref.current.prevented) {
      el.play();
      ref.current.loaded = true;
      return;
    }
    if (ref.current.loaded) {
      return;
    }
    ref.current.loaded = true;
    if (!ref.current.src) {
      el.src = '';
      try {
        el.play();
      } catch (e) {}
      el.pause();
    }
  }, []);

  // DONE: src 改变后 reset
  // React.useEffect(() => {
  //   setLoading(!!src);
  //   setPaused(false);
  //   setEnded(false);
  //   setSeeking(false);
  //   setWaiting(false);
  // }, [src]);
  React.useEffect(() => {
    ref.current.src = src;
    if (src) {
      updateState({ loading: true }, true);
    }
  }, [src, updateState]);

  React.useEffect(() => {
    ref.current.loading = loading;
    ref.current.prevented = prevented;
    ref.current.ended = ended;
  }, [loading, prevented, ended]);

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
    document.addEventListener('click', onDocumentClick);
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
      document.removeEventListener('click', onDocumentClick);
    };
  }, [
    onCanPlay,
    onPause,
    onPlay,
    onPlaying,
    onEnded,
    onSeeked,
    onSeeking,
    onCanPlayThrough,
    onWaiting,
    onDocumentClick,
  ]);

  return { onPauseClick, onPlayClick };
};
