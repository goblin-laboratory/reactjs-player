import React from 'react';

export default ({ ref, dispatch }) => {
  const onDurationChange = React.useCallback(
    e => {
      const v = e.duration;
      dispatch({ type: 'update', payload: { duration: Number.isNaN(v) || Number.isFinite(v) || !v ? v : 0 } });
    },
    [dispatch],
  );

  const onTimeUpdate = React.useCallback(
    e => {
      if (Number.isNaN(e.currentTime)) {
        return;
      }
      dispatch({ type: 'update', payload: { currentTime: e.currentTime } });
    },
    [dispatch],
  );

  const onProgress = React.useCallback(e => dispatch({ type: 'update', payload: { buffered: e.buffered } }), [
    dispatch,
  ]);

  const changeCurrentTime = React.useCallback(
    t => {
      const v = parseFloat(t);
      if (Number.isNaN(v) || !ref.current || !ref.current.player) {
        return;
      }
      ref.current.player.invoker('seek', v);
      dispatch({ type: 'update', payload: { currentTime: v } });
    },
    [ref, dispatch],
  );

  React.useEffect(() => {
    const { player } = ref.current;
    if (!player) {
      return () => {};
    }
    player.addEventListener('durationchange', onDurationChange);
    player.addEventListener('timeupdate', onTimeUpdate);
    player.addEventListener('progress', onProgress);
    return () => {
      player.removeEventListener('durationchange', onDurationChange);
      player.removeEventListener('timeupdate', onTimeUpdate);
      player.removeEventListener('progress', onProgress);
    };
  }, [ref, onDurationChange, onTimeUpdate, onProgress]);

  return { changeCurrentTime };
};
