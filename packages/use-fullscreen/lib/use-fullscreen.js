import React from 'react';

// eslint-disable-next-line no-console
const debug = console.error;

export default ({ onFullscreenChange = () => {} }, getVideoElement, getPlayerElement) => {
  const [fullscreen, setFullscreen] = React.useState(false);
  // const [x5videofullscreen, setX5videofullscreen] = React.useState(false);

  const requestFullscreen = React.useCallback(() => {
    const el = getPlayerElement();
    if (!el) {
      debug('useVideoFullscreen: 全屏异常，unmounted');
      return;
    }
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.msRequestFullscreen) {
      // 兼容 IE11
      el.msRequestFullscreen();
    } else if (el.webkitRequestFullscreen) {
      // 兼容微信 PC 版内置浏览器
      el.webkitRequestFullscreen();
    } else {
      const videoEl = getVideoElement();
      if (videoEl && videoEl.webkitEnterFullScreen) {
        // 兼容 iOS Safari
        videoEl.webkitEnterFullScreen();
      } else {
        // 异常分支，不应该进入
        debug('useVideoFullscreen: 全屏异常，浏览器不支持 requestFullscreen');
      }
    }
  }, [getVideoElement, getPlayerElement]);

  const exitFullscreen = React.useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else {
      // 异常分支，不应该进入
      debug('useVideoFullscreen: 退出全屏异常，浏览器不支持 exitFullscreen');
    }
  }, []);

  const onChange = React.useCallback(() => {
    const el = getPlayerElement();
    const fullscreenElement =
      document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    setFullscreen(!!el && fullscreenElement === el);
  }, [getPlayerElement]);

  React.useEffect(() => {
    document.addEventListener('fullscreenchange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
    };
  }, [onChange]);

  React.useEffect(() => {
    document.addEventListener('webkitfullscreenchange', onChange);
    return () => {
      document.removeEventListener('webkitfullscreenchange', onChange);
    };
  }, [onChange]);

  React.useEffect(() => {
    document.onmsfullscreenchange = onChange;
    return () => {
      document.onmsfullscreenchange = null;
    };
  }, [onChange]);

  // fullscreen 状态变化通知
  React.useEffect(() => {
    onFullscreenChange({ fullscreen });
    return () => {};
  }, [fullscreen, onFullscreenChange]);

  return {
    fullscreen,
    requestFullscreen,
    exitFullscreen,
  };
};
