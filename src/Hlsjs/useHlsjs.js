import React from 'react';

const getHls = (src) =>
  new Promise((resolve) => {
    if (global.Hls) {
      resolve(global.Hls);
      return;
    }
    const script = global.document.createElement('script');
    global.document.body.appendChild(script);
    script.onload = () => resolve(global.Hls);
    script.onerror = () => resolve(global.Hls);
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
    await getHls('https://unpkg.com/hls.js/dist/hls.min.js');
    if (!global.Hls || !ref.current || ref.current.src !== target) {
      debug('useHlsjs: 加载 hls.js 失败或者 src 已经变更');
      return;
    }
    const el = ref.current.getVideoElement();
    if (!el) {
      debug('useHlsjs: video 元素不存在');
      // TOOD: 显示错误
      return;
    }
    const player = new global.Hls({ debug: false, ...ref.current.config });
    if (!player) {
      return;
    }
    ref.current.player = player;
    player.attachMedia(el);
    player.once(global.Hls.Events.MEDIA_ATTACHED, () => {
      if (ref.current && ref.current.src === target) {
        player.loadSource(target);
      }
    });
    player.on(global.Hls.Events.ERROR, (e, info) => {
      if (ref.current && ref.current.onMsgChange && info && info.fatal) {
        ref.current.onMsgChange({ type: info.type, detail: info.details });
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
