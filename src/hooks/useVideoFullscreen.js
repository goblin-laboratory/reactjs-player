import React from 'react';

export default ({ x5playsinline, onX5VideoFullscreenChange }, getVideoElement, getPlayerElement) => {
  const [fullscreen, setFullscreen] = React.useState(false);
  const [x5videofullscreen, setX5videofullscreen] = React.useState(false);

  const requestFullscreen = React.useCallback(
    v => {
      const el = getPlayerElement();
      if (el && el.requestFullscreen) {
        el.requestFullscreen();
        return;
      } else if (x5playsinline) {
        if (x5videofullscreen) {
          setFullscreen(true);
          return;
        }
        const videoEl = getVideoElement();
        if (videoEl && videoEl.play) {
          videoEl.play();
        } else {
          console.error('全屏失败');
        }
      } else {
        console.error('全屏失败');
      }
    },
    [getVideoElement, getPlayerElement, x5playsinline, x5videofullscreen],
  );

  const exitFullscreen = React.useCallback(
    v => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (x5playsinline) {
        setFullscreen(false);
      } else {
        setFullscreen(false);
      }
    },
    [x5playsinline],
  );

  const onFullscreenChange = React.useCallback(
    v => {
      const el = getPlayerElement();
      setFullscreen(!!el && document.fullscreenElement === el);
    },
    [getPlayerElement],
  );

  React.useEffect(() => {
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [onFullscreenChange]);

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
    // alert('onx5videoenterfullscreen');
    setX5videofullscreen(true);
  }, []);

  const onx5videoexitfullscreen = React.useCallback(() => {
    // alert('onx5videoexitfullscreen');
    setX5videofullscreen(false);
  }, []);

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

  React.useEffect(() => {
    if (!x5playsinline) {
      return () => {};
    }
    onX5VideoFullscreenChange({ x5videofullscreen, fullscreen });
    return () => {};
  }, [x5playsinline, x5videofullscreen, fullscreen, onX5VideoFullscreenChange]);

  return {
    fullscreen,
    x5videofullscreen,
    requestFullscreen,
    exitFullscreen,
  };
};
