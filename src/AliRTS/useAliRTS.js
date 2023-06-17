import React from 'react';

const getAliRTS = (src) =>
  new Promise((resolve) => {
    if (global.AliRTS) {
      resolve(global.AliRTS);
      return;
    }
    const script = global.document.createElement('script');
    global.document.body.appendChild(script);
    script.onload = () => resolve(global.AliRTS);
    script.onerror = () => resolve(global.AliRTS);
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
      await getAliRTS('https://unpkg.com/aliyun-rts-sdk');
      if (!global.AliRTS || ref.current !== src) {
        debug('useAliRTS: 加载 AliRTS 失败或者 src 已经变更');
        return;
      }
      setPlayer(global.AliRTS.createClient());
    };
    setPlayer(null);
    onMsgChangeRef.current(null);
    if (src) {
      play();
    }
  }, [src]);

  React.useEffect(() => {
    const cleanup = () => destroyPlayer(player);
    const currentSrc = ref.current;
    const el = getVideo.current();
    if (!el) {
      return cleanup;
    }

    player
      .subscribe(currentSrc)
      .then((remoteStream) => {
        if (currentSrc === ref.current) {
          remoteStream.play(el);
        }
      })
      .catch((errMsg) => {
        // 订阅失败
        // player.unsubscribe();
        if (onMsgChangeRef && onMsgChangeRef.current && errMsg && errMsg.errorCode) {
          onMsgChangeRef.current({ type: errMsg.errorCode, detail: errMsg.message });
        }
      });
    return cleanup;
  }, [player]);

  return null;
};
