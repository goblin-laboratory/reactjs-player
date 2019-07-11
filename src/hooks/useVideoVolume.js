import React from 'react';

export default (props, getVideoElement) => {
  const { muted: mutedProp, volume: volumeProp, onVolumeChange } = props;

  const [muted, setMuted] = React.useState(mutedProp);
  const [volume, setVolume] = React.useState(volumeProp);

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

  return {
    muted,
    volume,
    onMutedClick,
    changeVolume,
    // 媒体事件
    onVolumeChange: onVideoVolumeChange,
  };
};
