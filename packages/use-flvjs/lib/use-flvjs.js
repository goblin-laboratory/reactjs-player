import React from 'react';

const getFlvjs = src =>
  new Promise(resolve => {
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

const destroyPlayer = player => {
  if (!player) {
    return;
  }
  try {
    player.pause();
  } catch (errMsg) {}
  try {
    player.unload();
  } catch (errMsg) {}
  try {
    player.detachMediaElement();
  } catch (errMsg) {}
  try {
    player.destroy();
  } catch (errMsg) {}
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
      await getFlvjs('https://unpkg.com/flv.js/dist/flv.min.js');
      if (!global.flvjs || ref.current !== src) {
        debug('useFlvjs: 加载 flv.js 失败或者 src 已经变更');
        return;
      }
      setPlayer(global.flvjs.createPlayer({ isLive: true, type: 'flv', url: src }, configRef.current));
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
    player.attachMediaElement(el);
    player.load();
    player.play();
    player.on(global.flvjs.Events.ERROR, (type, detail) => {
      if (onKernelErrorRef && onKernelErrorRef.current) {
        const msg = { type, detail };
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
