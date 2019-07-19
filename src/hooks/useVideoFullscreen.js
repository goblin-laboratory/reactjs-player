import React from 'react';

const debug = console.error;

export default ({ x5playsinline, onFullscreenChange = () => {} }, getVideoElement, getPlayerElement) => {
  const [fullscreen, setFullscreen] = React.useState(false);
  const [x5videofullscreen, setX5videofullscreen] = React.useState(false);

  const requestFullscreen = React.useCallback(
    v => {
      if (x5playsinline) {
        if (x5videofullscreen) {
          setFullscreen(true);
        } else {
          // 异常分支
          debug('useVideoFullscreen: 全屏异常，未进入同层播放的情况下触发了全屏');
          const videoEl = getVideoElement();
          if (videoEl && videoEl.play) {
            videoEl.play();
          }
        }
        return;
      }
      const el = getPlayerElement();
      if (!el) {
        debug('useVideoFullscreen: 全屏异常，unmounted');
        return;
      }
      // const requestFullscreen = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.msRequestFullscreen) {
        // 兼容 IE11
        el.msRequestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        // 兼容微信 PC 版内置浏览器
        el.webkitRequestFullscreen();
      } else {
        // 异常分支，不应该进入
        debug('useVideoFullscreen: 全屏异常，浏览器不支持 requestFullscreen');
      }
    },
    [getVideoElement, getPlayerElement, x5playsinline, x5videofullscreen],
  );

  const exitFullscreen = React.useCallback(
    v => {
      if (x5playsinline) {
        setFullscreen(false);
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else {
        // 异常分支，不应该进入
        debug('useVideoFullscreen: 退出全屏异常，浏览器不支持 exitFullscreen');
      }
    },
    [x5playsinline],
  );

  const onChange = React.useCallback(
    v => {
      const el = getPlayerElement();
      const fullscreenElement =
        document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
      setFullscreen(!!el && fullscreenElement === el);
    },
    [getPlayerElement],
  );

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

  const onResize = React.useCallback(() => {
    const el = getVideoElement();
    if (el) {
      el.style.width = `${global.innerWidth}px`;
      el.style.height = `${global.innerHeight}px`;
    }
  }, [getVideoElement]);

  React.useEffect(() => {
    if (!x5playsinline) {
      return () => {};
    }
    global.addEventListener('resize', onResize);
    return () => {
      global.removeEventListener('resize', onResize);
    };
  }, [x5playsinline, onResize]);

  const onx5videoenterfullscreen = React.useCallback(() => {
    setX5videofullscreen(true);
  }, []);

  // 退出同层播放时应该同时退出全屏状态
  const onx5videoexitfullscreen = React.useCallback(() => {
    setFullscreen(false);
    setX5videofullscreen(false);
  }, []);

  // 同层播放事件订阅处理
  React.useEffect(() => {
    if (!x5playsinline) {
      return () => {};
    }
    const el = getVideoElement();
    if (!el) {
      return () => {};
    }
    el.addEventListener('x5videoenterfullscreen', onx5videoenterfullscreen);
    el.addEventListener('x5videoexitfullscreen', onx5videoexitfullscreen);
    return () => {
      el.removeEventListener('x5videoenterfullscreen', onx5videoenterfullscreen);
      el.removeEventListener('x5videoexitfullscreen', onx5videoexitfullscreen);
    };
  }, [x5playsinline, getVideoElement, onx5videoenterfullscreen, onx5videoexitfullscreen]);

  // fullscreen 或 x5videofullscreen 状态变化通知
  React.useEffect(() => {
    onFullscreenChange({ x5videofullscreen, fullscreen });
    return () => {};
  }, [x5videofullscreen, fullscreen, onFullscreenChange]);

  return {
    fullscreen,
    x5videofullscreen,
    requestFullscreen,
    exitFullscreen,
  };
};
