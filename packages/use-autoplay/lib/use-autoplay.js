import React from 'react';

export default (src, getVideoElement) => {
  const ref = React.useRef({ src, getVideoElement, loaded: false });

  React.useEffect(() => {
    ref.current.src = src;
  }, [src]);

  // 手机端自动播放
  const onDocumentClick = React.useCallback(() => {
    const el = ref.current.getVideoElement();
    if (!el) {
      return;
    }
    document.removeEventListener('click', onDocumentClick);
    if (ref.current.loaded) {
      return;
    }
    ref.current.loaded = true;
    if (ref.current.src) {
      console.log(`onDocumentClick: ${ref.current.src}`);
      if (0 === el.currentTime) {
        el.src = ref.current.src;
        el.play();
      }
      // el.src = ref.current.src;
      // el.load();
    } else {
      console.log(`onDocumentClick: play empty src`);
      el.src = '';
      el.play().catch(() => {});
      el.pause();
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, [onDocumentClick]);
};
