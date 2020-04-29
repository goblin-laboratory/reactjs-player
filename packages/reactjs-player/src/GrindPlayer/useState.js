import React from 'react';

export default ({ ref, dispatch }) => {
  const onPlayClick = React.useCallback(() => {
    if (ref.current.player) {
      if (ref.current.ended) {
        ref.current.player.invoker('seek', 0);
      }
      ref.current.player.invoker('play2');
    }
    dispatch({ type: 'save', payload: { paused: false } });
  }, [ref, dispatch]);

  const onPauseClick = React.useCallback(() => {
    if (ref.current.player) {
      ref.current.player.invoker('pause');
    }
    dispatch({ type: 'save', payload: { paused: true } });
  }, [ref, dispatch]);

  const onCanPlayThrough = React.useCallback(() => {
    if (ref.current.loading) {
      dispatch({ type: 'save', payload: { loading: false } });
    }
    dispatch({ type: 'save', payload: { waiting: false } });
  }, [ref, dispatch]);

  const onPause = React.useCallback(() => {
    dispatch({ type: 'save', payload: { paused: true } });
  }, [dispatch]);

  const onPlaying = React.useCallback(() => {
    dispatch({ type: 'save', payload: { paused: false, ended: false } });
  }, [dispatch]);

  const onEnded = React.useCallback(() => {
    dispatch({ type: 'save', payload: { ended: true } });
  }, [dispatch]);

  const onSeeked = React.useCallback(() => {
    dispatch({ type: 'save', payload: { seeking: false } });
  }, [dispatch]);

  const onSeeking = React.useCallback(() => {
    dispatch({ type: 'save', payload: { seeking: true } });
  }, [dispatch]);

  const onWaiting = React.useCallback(() => {
    dispatch({ type: 'save', payload: { waiting: true } });
  }, [dispatch]);

  React.useEffect(() => {
    const { player } = ref.current;
    if (!player) {
      return () => {};
    }
    player.addEventListener('canplaythrough', onCanPlayThrough);
    player.addEventListener('pause', onPause);
    player.addEventListener('playing', onPlaying);
    player.addEventListener('ended', onEnded);
    player.addEventListener('seeked', onSeeked);
    player.addEventListener('seeking', onSeeking);
    player.addEventListener('waiting', onWaiting);
    return () => {
      player.removeEventListener('canplaythrough', onCanPlayThrough);
      player.removeEventListener('pause', onPause);
      player.removeEventListener('playing', onPlaying);
      player.removeEventListener('ended', onEnded);
      player.removeEventListener('seeked', onSeeked);
      player.removeEventListener('seeking', onSeeking);
      player.removeEventListener('waiting', onWaiting);
    };
  }, [ref, onCanPlayThrough, onPause, onPlaying, onEnded, onSeeked, onSeeking, onWaiting]);

  return { onPauseClick, onPlayClick };
};
