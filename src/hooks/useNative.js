import React from 'react';

export default ({ src }, getVideoElement) => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const el = getVideoElement();
    if (!el || !src) {
      return () => {};
    }
    el.src = src;
    el.load();
    el.play();
    return () => {
      el.pause();
      el.src = '';
      try {
        el.load();
      } catch (errMsg) {}
    };
  }, [getVideoElement, src]);

  const onDocumentClick = React.useCallback(() => {
    const el = getVideoElement();
    if (!el) {
      setLoaded(false);
      return () => {};
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
    return () => {};
  }, [loaded, onDocumentClick]);

  return null;
};
