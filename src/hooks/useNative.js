import React from 'react';

export default ({ getVideoElement, src, onMsgChange }) => {
  const ref = React.useRef({ getVideoElement, src: '', onMsgChange, loaded: false });

  React.useEffect(() => {
    ref.current.src = src;
    ref.current.getVideoElement = getVideoElement;
  }, [src, getVideoElement]);

  React.useEffect(() => {
    ref.current.onMsgChange(null);
    const el = ref.current.getVideoElement();
    if (!el) {
      return;
    }
    el.pause();
    el.src = src;
    // el.play().catch(() => {});
    el.load();
  }, [src]);

  // 页面切换时强制停止播放
  const onUnload = React.useCallback(() => {
    const el = ref.current.getVideoElement();
    if (!el) {
      return;
    }
    el.pause();
    el.src = '';
    try {
      el.load();
    } catch (errMsg) {}
  }, []);

  React.useEffect(() => {
    global.addEventListener('beforeunload', onUnload);
    global.addEventListener('pagehide', onUnload);
    global.addEventListener('unload', onUnload);
    return () => {
      onUnload({ type: 'useEffect' });
    };
  }, [onUnload]);

  return null;
};
