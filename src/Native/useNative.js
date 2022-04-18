import React from 'react';

export default ({ getVideoElement, src, onMsgChange }) => {
  const ref = React.useRef({});

  const onError = React.useCallback((e) => {
    if (!ref.current || !ref.current.onMsgChange) {
      return;
    }
    const msg = { type: 'Error', detail: 'Unknown exception' };
    if (e.target && e.target.error && e.target.error.code) {
      msg.detail = `Code ${e.target.error.code}`;
    }
    ref.current.onMsgChange(msg);
  }, []);

  const cleanup = React.useCallback(() => {
    if (!ref.current || !ref.current.el) {
      return;
    }
    ref.current.el.removeEventListener('error', onError);
    ref.current.el.pause();
    ref.current.el.src = '';
    try {
      ref.current.el.load();
    } catch (errMsg) {}
    delete ref.current.el;
  }, [onError]);

  const loadSource = React.useCallback(async () => {
    if (!ref.current || !ref.current.src) {
      return;
    }
    ref.current.el = ref.current.getVideoElement();
    if (!ref.current.el) {
      return;
    }
    ref.current.el.pause();
    ref.current.el.src = ref.current.src;
    ref.current.el.load();
    ref.current.el.addEventListener('error', onError);
  }, [onError]);

  React.useEffect(() => {
    return () => {
      cleanup();
      ref.current = null;
    };
  }, [cleanup]);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.getVideoElement = getVideoElement;
    ref.current.onMsgChange = onMsgChange;
  }, [getVideoElement, onMsgChange]);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    cleanup();
    ref.current.onMsgChange(null);
    ref.current.src = src;
    if (src) {
      loadSource();
    }
  }, [loadSource, cleanup, src]);

  React.useEffect(() => {
    global.addEventListener('beforeunload', cleanup);
    global.addEventListener('pagehide', cleanup);
    global.addEventListener('unload', cleanup);
  }, [cleanup]);

  return null;
};
