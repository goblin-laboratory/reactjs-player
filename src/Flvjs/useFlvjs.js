import React from 'react';

const getFlvjs = (src) =>
  new Promise((resolve) => {
    if (global.flvjs) {
      resolve(global.flvjs);
      return;
    }
    const script = global.document.createElement('script');
    global.document.body.appendChild(script);
    script.onload = () => resolve(global.flvjs);
    script.onerror = () => resolve(global.flvjs);
    script.async = true;
    script.src = src;
  });

// eslint-disable-next-line no-console
const debug = console.error;

export default ({ getVideoElement, src, config, onMsgChange }) => {
  const ref = React.useRef({});

  const cleanup = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    if (ref.current.player) {
      try {
        ref.current.player.pause();
      } catch (errMsg) {}
      try {
        ref.current.player.unload();
      } catch (errMsg) {}
      try {
        ref.current.player.detachMediaElement();
      } catch (errMsg) {}
      try {
        ref.current.player.destroy();
      } catch (errMsg) {}
      ref.current.player = null;
    }
  }, []);

  const loadSource = React.useCallback(async () => {
    if (!ref.current || !ref.current.src) {
      return;
    }
    const target = ref.current.src;
    await getFlvjs('https://unpkg.com/flv.js/dist/flv.min.js');
    if (!global.flvjs || !ref.current || ref.current.src !== target) {
      debug('useFlvjs: 加载 hls.js 失败或者 src 已经变更');
      return;
    }
    const el = ref.current.getVideoElement();
    if (!el) {
      debug('useFlvjs: video 元素不存在');
      // TOOD: 显示错误
      return;
    }
    const player = global.flvjs.createPlayer({ isLive: true, type: 'flv', url: target }, { ...ref.current.config });
    if (!player) {
      return;
    }
    ref.current.player = player;
    player.attachMediaElement(el);
    player.load();
    player.on(global.flvjs.Events.ERROR, (type, detail) => {
      if (ref.current && ref.current.onMsgChange) {
        ref.current.onMsgChange({ type, detail });
      }
    });
  }, []);

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
