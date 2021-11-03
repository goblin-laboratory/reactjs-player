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

const destroyPlayer = (player) => {
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

export default ({ getVideoElement, src, config, onMsgChange }) => {
  const [player, setPlayer] = React.useState(null);

  const getVideo = React.useRef(getVideoElement);
  const ref = React.useRef(src);
  const configRef = React.useRef(config);
  const onMsgChangeRef = React.useRef(onMsgChange);

  React.useEffect(() => {
    ref.current = src;
    configRef.current = config;
    return () => {
      ref.current = '';
    };
  }, [src, config]);

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
    onMsgChangeRef.current(null);
    if (src) {
      play();
    }
  }, [src]);

  React.useEffect(() => {
    const cleanup = () => destroyPlayer(player);
    if (!player) {
      return cleanup;
    }
    const el = getVideo.current();
    if (!el) {
      return cleanup;
    }
    player.attachMediaElement(el);
    player.load();
    // player.play();
    player.on(global.flvjs.Events.ERROR, (type, detail) => {
      if (onMsgChangeRef && onMsgChangeRef.current) {
        onMsgChangeRef.current({ type, detail });
      }
    });
    return cleanup;
  }, [player]);

  return null;
};
