import React from 'react';

export default ({ getVideoElement, src, onMsgChange }) => {
  const [loaded, setLoaded] = React.useState(false);
  // const [prevented, setPrevented] = React.useState(false);
  const getVideo = React.useRef(getVideoElement);
  const ref = React.useRef('');
  const onMsgChangeRef = React.useRef(onMsgChange);

  React.useEffect(() => {
    ref.current = src;
  }, [getVideoElement, src]);

  React.useEffect(() => {
    onMsgChangeRef.current(null);
    const el = getVideo.current();
    if (!el) {
      return;
    }
    el.pause();
    el.src = src;
    try {
      el.load();
    } catch (errMsg) {}
    // if (src) {
    //   el.play()
    //     .then(() => setPrevented(false))
    //     .catch(() => setPrevented(true));
    // } else {
    //   try {
    //     el.load();
    //   } catch (errMsg) {}
    // }
  }, [src]);

  // 手机端自动播放
  const onDocumentClick = React.useCallback(() => {
    const el = getVideo.current();
    if (!el) {
      setLoaded(false);
      return;
    }
    el.src = '';
    el.load();
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, [onDocumentClick]);

  React.useEffect(() => {
    if (loaded) {
      document.removeEventListener('click', onDocumentClick);
    }
  }, [loaded, onDocumentClick]);

  // 页面切换时强制停止播放
  const onUnload = React.useCallback(() => {
    const el = getVideo.current();
    if (!el) {
      return;
    }
    el.pause();
    el.src = '';
    try {
      el.load();
    } catch (errMsg) {}
  }, []);

  React.useEffect(() => {
    global.addEventListener('beforeunload', onUnload);
    global.addEventListener('pagehide', onUnload);
    global.addEventListener('unload', onUnload);
    return () => {
      onUnload({ type: 'useEffect' });
    };
  }, [onUnload]);

  return null;
};
