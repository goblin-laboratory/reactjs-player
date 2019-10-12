import React from 'react';

const getHls = src =>
  new Promise(resolve => {
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

const destroyPlayer = player => {
  if (player) {
    try {
      player.destroy();
    } catch (errMsg) {}
  }
};

export default ({ src, config, onKernelError }, getVideoEl) => {
  const [player, setPlayer] = React.useState(null);
  const [kernelMsg, setKernelMsg] = React.useState(null);

  const ref = React.useRef('');
  const configRef = React.useRef(null);
  const onKernelErrorRef = React.useRef(null);
  const getVideoElRef = React.useRef(null);

  React.useEffect(() => {
    // TODO: 使用 React.useReducer
    ref.current = src;
    configRef.current = config;
    onKernelErrorRef.current = onKernelError;
    getVideoElRef.current = getVideoEl;
  }, [src, config, onKernelError, getVideoEl]);

  React.useEffect(() => {
    const play = async () => {
      await getHls('https://unpkg.com/hls.js/dist/hls.min.js');
      if (!global.Hls || ref.current !== src) {
        debug('useHlsjs: 加载 hls.js 失败或者 src 已经变更');
        return;
      }
      setPlayer(new global.Hls({ enableWorker: false, ...configRef.current }));
    };

    setPlayer(null);
    if (src) {
      play();
    }
  }, [src]);

  React.useEffect(() => {
    return () => setKernelMsg(null);
  }, [src]);

  React.useEffect(() => {
    if (!player) {
      return;
    }
    const el = getVideoElRef.current();
    if (!el) {
      return;
    }
    const currentSrc = ref.current;
    player.attachMedia(el);
    player.once(global.Hls.Events.MEDIA_ATTACHED, () => {
      if (ref && ref.current && currentSrc === ref.current) {
        player.loadSource(ref.current);
      }
    });
    player.once(global.Hls.Events.MANIFEST_PARSED, () => {
      if (ref && ref.current && currentSrc === ref.current) {
        el.play();
      }
    });
    player.on(global.Hls.Events.ERROR, (e, info) => {
      if (info && info.fatal) {
        const msg = { type: info.type, detail: info.details };
        setKernelMsg(msg);
        if (onKernelErrorRef && onKernelErrorRef.current) {
          onKernelErrorRef.current(msg);
        }
      }
    });
  }, [player]);

  React.useEffect(() => {
    return () => {
      destroyPlayer(player);
    };
  }, [player]);

  return kernelMsg;
};
