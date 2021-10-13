import React from 'react';

export default ({ ref, dispatch }) => {
  const onVolumeChange = React.useCallback((e) => dispatch({ type: 'update', payload: e }), [dispatch]);

  const onMutedClick = React.useCallback(() => {
    if (!ref.current || !ref.current.player) {
      return;
    }
    const { muted } = ref.current;
    ref.current.player.invoker('setMuted', !muted);
    if (0 === ref.current.volume && muted) {
      ref.current.player.invoker('setVolume', 1.0);
    }
  }, [ref]);

  const changeVolume = React.useCallback(
    (v) => {
      if (ref.current && ref.current.player) {
        ref.current.player.invoker('setVolume', v);
      }
    },
    [ref],
  );

  React.useEffect(() => {
    if (!ref.current || !ref.current.player) {
      return () => {};
    }
    const { player } = ref.current;
    player.addEventListener('volumechange', onVolumeChange);
    return () => {
      player.removeEventListener('volumechange', onVolumeChange);
    };
  }, [ref, onVolumeChange]);

  return { onMutedClick, changeVolume };
};
