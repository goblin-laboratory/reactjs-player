import React from 'react';

export default ({ src, loading, prevented, ended, updateState, getVideoElement }) => {
  const ref = React.useRef({ getVideoElement, loading, prevented, ended });

  const onPlayClick = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    const el = ref.current.getVideoElement();
    if (el) {
      if (ref.current.ended) {
        el.currentTime = 0;
      }
      const p = el.play();
      if (!p || !p.then) {
        return;
      }
      p
        // .then(() => updateState({ loading: false }))
        .catch((e) => {
          if (!ref.current || 'NotAllowedError' !== e.name) {
            return Promise.resolve();
          }
          updateState({ prevented: true });
          el.muted = true;
          // NOTE: 桌面环境下静音可以播放，但是移动环境下静音不可以播放，需要分开处理
          return el.play();
        })
        .catch((e) => {
          if (!ref.current || 'NotAllowedError' !== e.name) {
            return Promise.resolve();
          }
          // NOTE: 恢复静音状态，用户点击调用播放就可以了
          el.muted = false;
          return Promise.resolve();
        });
    }
    updateState({ paused: false }, true);
  }, [updateState]);

  const onPauseClick = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    const el = ref.current.getVideoElement();
    if (el) {
      el.pause();
    }
    updateState({ paused: true }, true);
  }, [updateState]);

  const onCanPlay = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    updateState({ loading: false, waiting: false });
    if (ref.current.loading) {
      onPlayClick();
    }
  }, [updateState, onPlayClick]);

  const onPause = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    updateState({ paused: true });
  }, [updateState]);

  const onPlay = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    updateState({ paused: false, ended: false });
  }, [updateState]);

  const onPlaying = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    updateState({ paused: false, ended: false });
  }, [updateState]);

  const onEnded = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    updateState({ ended: true });
  }, [updateState]);

  const onSeeked = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    updateState({ seeking: false });
  }, [updateState]);

  const onSeeking = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    updateState({ seeking: true });
  }, [updateState]);

  const onCanPlayThrough = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    updateState({ waiting: false });
  }, [updateState]);

  const onWaiting = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    updateState({ waiting: true });
  }, [updateState]);

  const onDocumentClick = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    const el = ref.current.getVideoElement();
    if (!el) {
      return;
    }
    // NOTE: addEventListener 使用了 once ，理论上是不需要 remove 的，这里做个保护
    document.removeEventListener('click', onDocumentClick);
    // NOTE: 自动播放已被阻止，桌面端取消静音就可以了，移动端需要再次调用 play
    if (ref.current.prevented) {
      if (el.muted) {
        el.muted = false;
      } else {
        el.play();
      }
      updateState({ prevented: false });
      return;
    }
    // NOTE: 未出现播放阻止的两种情况，一是已经在正常播放了，此时不要处理了，二是页面还未调用播放
    if (ref.current.src) {
      // NOTE: 未出现播放
      return;
    }
    // NOTE: 页面发生点击的时候调用一下 video play，后续的自动播放可以成功
    el.src = '';
    try {
      const p = el.play();
      if (p) {
        p.catch((e) => {
          // eslint-disable-next-line no-console
          console.log('useAutoplay[onDocumentClick]: load empty src for autoPlay, %o', e);
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('useAutoplay[onDocumentClick]: load empty src for autoPlay, %o', e);
    }
    // el.pause();
  }, [updateState]);

  React.useEffect(() => {
    return () => {
      ref.current = null;
    };
  }, []);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.src = src;
    if (src) {
      updateState({ loading: true }, true);
    }
  }, [src, updateState]);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.loading = loading;
    ref.current.prevented = prevented;
    ref.current.ended = ended;
  }, [loading, prevented, ended]);

  React.useEffect(() => {
    if (!ref.current || !ref.current.getVideoElement) {
      return () => {};
    }
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
    document.addEventListener('click', onDocumentClick, { once: true });
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
