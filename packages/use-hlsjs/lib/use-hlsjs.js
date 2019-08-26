import React from 'react';
import Hls from 'hls.js';

const getElement = (getEl, timeout = 3000) => {
  return new Promise(resolve => {
    const el = getEl();
    if (el) {
      resolve(el);
      return;
    }
    setTimeout(() => {
      resolve(getEl());
    }, timeout);
  });
};

// eslint-disable-next-line no-console
const debug = console.error;

const destroyHls = hls => {
  if (!hls) {
    return;
  }
  try {
    hls.destroy();
  } catch (err) {
    // debugger;
  }
};

const load = (el, src, config, onHlsError, timeout = 3 * 1000) => {
  return new Promise((resolve, reject) => {
    // TODO: https://github.com/video-dev/hls.js/pull/2174
    const hls = new Hls({ enableWorker: false, ...config });

    hls.loadSource(src);
    hls.attachMedia(el);

    let interval = 0;
    const off = () => {
      if (interval) {
        clearTimeout(interval);
      }
      interval = 0;
      // eslint-disable-next-line no-use-before-define
      hls.off(Hls.Events.MANIFEST_PARSED, onParsed);
      // eslint-disable-next-line no-use-before-define
      hls.off(Hls.Events.ERROR, onError);
    };

    const onParsed = () => {
      off();
      el.play();
      resolve(hls);
    };

    const onError = (e, info) => {
      onHlsError(e, info);
      if (info && info.fatal) {
        off();
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ hls, message: 'hls error' });
      }
    };

    const onTimeout = () => {
      interval = 0;
      off();
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ hls, message: 'hls timeout' });
    };

    hls.on(Hls.Events.MANIFEST_PARSED, onParsed);
    hls.on(Hls.Events.ERROR, onError);
    interval = setTimeout(onTimeout, timeout);
  }).catch(errMsg => {
    destroyHls(errMsg && errMsg.hls);
    return null;
  });
};

export default ({ src, config, onKernelError }, getVideoElement) => {
  const [hlsPlayer, setHlsPlayer] = React.useState(null);
  const [kernelMsg, setKernelMsg] = React.useState(null);

  const ref = React.useRef('');

  const onHlsError = React.useCallback(
    (e, info) => {
      if (info && info.fatal) {
        const msg = { type: info.type, detail: info.details };
        setKernelMsg(msg);
        onKernelError(msg);
      }
    },
    [onKernelError],
  );

  React.useEffect(() => {
    const play = async () => {
      if (!src) {
        setHlsPlayer(null);
        return;
      }
      const el = await getElement(getVideoElement);
      if (ref.current !== src) {
        return;
      }
      if (!el) {
        ref.current = '';
        setHlsPlayer(null);
        // TODO: 提示用户
        debug('useHlsjs: 获取 video 元素失败');
        return;
      }
      const hls = await load(el, src, config, onHlsError);
      if (ref.current !== src) {
        destroyHls(hls);
        return;
      }
      if (!hls) {
        ref.current = '';
        setHlsPlayer(null);
        return;
      }
      setHlsPlayer(hls);
    };

    ref.current = src;
    play();
  }, [getVideoElement, src, config, onHlsError]);

  React.useEffect(() => {
    return () => setKernelMsg(null);
  }, [src]);

  React.useEffect(() => {
    if (hlsPlayer) {
      hlsPlayer.on(Hls.Events.ERROR, onHlsError);
    }
    return () => destroyHls(hlsPlayer);
  }, [hlsPlayer, onHlsError]);

  return kernelMsg;
};
