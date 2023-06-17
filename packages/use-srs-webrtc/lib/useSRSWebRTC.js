import React from 'react';
import SRSPlayer from './SRSPlayer';
// import SrsRtcPlayerAsync from './SrsRtcPlayerAsync';

export default ({ getVideoElement, src, config, onPlayClick, onMsgChange }) => {
  const ref = React.useRef({});

  const cleanup = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    if (ref.current.getVideoElement) {
      const el = ref.current.getVideoElement();
      if (el) {
        el.srcObject = null;
      }
    }
    if (ref.current.player) {
      try {
        ref.current.player.destroy();
      } catch (errMsg) {}
      ref.current.player = null;
    }
  }, []);

  const loadSource = React.useCallback(() => {
    if (!ref.current || !ref.current.src) {
      return;
    }
    const target = ref.current.src;
    const el = ref.current.getVideoElement();
    if (!el) {
      return;
    }
    const player = new SRSPlayer(target, { ...ref.current.config });
    if (!player) {
      return;
    }
    ref.current.player = player;
    const stream = player.subscribe();
    el.pause();
    el.srcObject = stream;
    el.load();
    // NOTE: iOS 微信浏览器中测试自动播放，与其他终端不一样，其他终端会加载数据并触发 canplay 事件，iOS 中并不会触发任何数据加载
    onPlayClick();
  }, [onPlayClick]);

  React.useEffect(() => {
    return () => {
      cleanup();
      ref.current = null;
    };
  }, [cleanup]);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.getVideoElement = getVideoElement;
    ref.current.config = config;
    ref.current.onMsgChange = onMsgChange;
  }, [getVideoElement, config, onMsgChange]);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    cleanup();
    ref.current.onMsgChange(null);
    ref.current.src = src;
    if (src) {
      loadSource();
    }
  }, [loadSource, cleanup, src]);

  return null;
};
