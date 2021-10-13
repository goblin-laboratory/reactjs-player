import React from 'react';

export default (src, getVideoElement, prevented) => {
  const ref = React.useRef({ src, getVideoElement, loaded: false });

  React.useEffect(() => {
    ref.current.src = src;
    ref.current.prevented = prevented;
  }, [src, prevented]);

  // 手机端自动播放
  const onDocumentClick = React.useCallback(() => {
    const el = ref.current.getVideoElement();
    if (!el) {
      return;
    }
    document.removeEventListener('click', onDocumentClick);
    if (ref.current.prevented) {
      el.play();
      ref.current.loaded = true;
      return;
    }
    if (ref.current.loaded) {
      return;
    }
    ref.current.loaded = true;
    if (!ref.current.src) {
      el.src = '';
      try {
        el.play();
      } catch (e) {}
      el.pause();
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, [onDocumentClick]);
};
