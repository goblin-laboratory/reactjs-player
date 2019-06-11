import React from 'react';
import flvjs from 'flv.js';

// const parseErrorType = type => {
//   switch (type) {
//     case flvjs.Events.ErrorTypes:
//       return '网络错误';
//     case flvjs.Events.MEDIA_ERROR:
//       return '媒体错误';
//     default:
//       return '未知错误';
//   }
// };

// const parseErrorDetail = detail => {
//   switch (detail) {
//     case flvjs.ErrorDetails.NETWORK_EXCEPTION:
//       return '异常';
//     case flvjs.ErrorDetails.NETWORK_STATUS_CODE_INVALID:
//       return 'NETWORK_STATUS_CODE_INVALID';
//     case flvjs.ErrorDetails.NETWORK_TIMEOUT:
//       return '超时';
//     case flvjs.ErrorDetails.NETWORK_UNRECOVERABLE_EARLY_EOF:
//       return 'NETWORK_UNRECOVERABLE_EARLY_EOF';
//     case flvjs.ErrorDetails.MEDIA_MSE_ERROR:
//       return '解码异常';
//     case flvjs.ErrorDetails.MEDIA_FORMAT_ERROR:
//       return '媒体流参数异常';
//     case flvjs.ErrorDetails.MEDIA_FORMAT_UNSUPPORTED:
//       return '编码格式不支持';
//     case flvjs.ErrorDetails.MEDIA_CODEC_UNSUPPORTED:
//       return '音频或视频编码格式不支持';
//     default:
//       return '网络异常';
//   }
// };

// const noop = () => {};
export default ({ src, config }, getVideoElement) => {
  const [flvPlayer, setFlvPlayer] = React.useState(null);
  const [playerMsg, setPlayerMsg] = React.useState(null);

  React.useEffect(() => {
    const el = getVideoElement();
    if (!el || !src) {
      setFlvPlayer(null);
      return () => {};
    }
    setFlvPlayer(flvjs.createPlayer({ isLive: true, type: 'flv', url: src }, { ...config }));
    return () => {
      setFlvPlayer(null);
    };
  }, [getVideoElement, src, config]);

  React.useEffect(() => {
    if (!flvPlayer) {
      return () => {};
    }
    const el = getVideoElement();
    if (el) {
      flvPlayer.attachMediaElement(el);
      flvPlayer.load();
      flvPlayer.play();
    }
    return () => {
      try {
        flvPlayer.pause();
      } catch (errMsg) {}
      try {
        flvPlayer.unload();
      } catch (errMsg) {}
      try {
        flvPlayer.detachMediaElement();
      } catch (errMsg) {}
      try {
        flvPlayer.destroy();
      } catch (errMsg) {}
    };
  }, [getVideoElement, flvPlayer]);

  const onPlayerError = React.useCallback((type, detail) => {
    setPlayerMsg({ type, detail });
  }, []);

  React.useEffect(() => {
    if (!flvPlayer) {
      return () => {};
    }
    flvPlayer.on(flvjs.Events.ERROR, onPlayerError);
    return () => {
      try {
        flvPlayer.off(flvjs.Events.ERROR);
      } catch (errMsg) {}
    };
  }, [flvPlayer, onPlayerError]);

  return playerMsg;
};
