import React from 'react';

export default ({ src }, getVideoElement) => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const el = getVideoElement();
    if (!el) {
      return;
    }
    el.pause();
    el.src = src;
    try {
      el.load();
    } catch (errMsg) {
      // debugger;
    }
    if (src) {
      el.play();
    }
  }, [getVideoElement, src]);

  const onDocumentClick = React.useCallback(() => {
    const el = getVideoElement();
    if (!el) {
      setLoaded(false);
      return;
    }
    el.src = '';
    el.load();
    setLoaded(true);
  }, [getVideoElement]);

  React.useEffect(() => {
    document.addEventListener('click', onDocumentClick);
    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, [onDocumentClick]);

  React.useEffect(() => {
    if (loaded) {
      document.removeEventListener('click', onDocumentClick);
    }
  }, [loaded, onDocumentClick]);

  const onUnload = React.useCallback(() => {
    const el = getVideoElement();
    if (!el) {
      return;
    }
    el.pause();
    el.src = '';
    try {
      el.load();
    } catch (errMsg) {
      // debugger;
    }
  }, [getVideoElement]);

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
