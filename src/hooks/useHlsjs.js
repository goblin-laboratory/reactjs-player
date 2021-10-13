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

const destroyPlayer = (player) => {
  if (player) {
    try {
      player.destroy();
    } catch (errMsg) {}
  }
};

export default ({ getVideoElement, src, config, onMsgChange }) => {
  const [player, setPlayer] = React.useState(null);
  const getVideo = React.useRef(getVideoElement);
  const ref = React.useRef('');
  const configRef = React.useRef(null);
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
      await getHls('https://unpkg.com/hls.js/dist/hls.min.js');
      if (!global.Hls || ref.current !== src) {
        debug('useHlsjs: 加载 hls.js 失败或者 src 已经变更');
        return;
      }
      setPlayer(new global.Hls({ enableWorker: false, ...configRef.current }));
    };

    setPlayer(null);
    onMsgChangeRef.current(null);
    if (src) {
      play();
    }
  }, [src]);

  React.useEffect(() => {
    const cleanup = () => destroyPlayer(player);
    if (!player || !ref.current) {
      return cleanup;
    }
    const currentSrc = ref.current;
    const el = getVideo.current();
    if (!el) {
      return cleanup;
    }
    player.attachMedia(el);
    player.once(global.Hls.Events.MEDIA_ATTACHED, () => {
      if (currentSrc === ref.current) {
        player.loadSource(ref.current);
      }
    });
    // player.once(global.Hls.Events.MANIFEST_PARSED, () => {
    //   if (currentSrc === ref.current) {
    //     el.play();
    //   }
    // });
    player.on(global.Hls.Events.ERROR, (e, info) => {
      if (onMsgChangeRef && onMsgChangeRef.current && info && info.fatal) {
        onMsgChangeRef.current({ type: info.type, detail: info.details });
      }
    });
    return cleanup;
  }, [player]);

  return null;
};
