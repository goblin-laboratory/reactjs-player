import React from 'react';

export default ({
  src,
  loading,
  prevented,
  paused,
  ended,
  waiting,
  seeking,
  kernelMsg,
  controlsHovering,
  sliding,
  rateMenuVisible,
  dispatch,
}) => {
  const ref = React.useRef({});

  const animationFrameCallback = React.useCallback(
    (timestamp) => {
      if (!ref.current.requestID || true === ref.current.hiding) {
        return;
      }
      if (!ref.current.timestamp) {
        ref.current.timestamp = timestamp;
      }
      if (3 * 1000 > timestamp - ref.current.timestamp) {
        ref.current.requestID = global.requestAnimationFrame(animationFrameCallback);
        return;
      }
      dispatch({ type: 'update', payload: { hiding: true } });
      ref.current.hiding = true;
      delete ref.current.requestID;
      delete ref.current.timestamp;
    },
    [dispatch],
  );

  const startAutoHide = React.useCallback(() => {
    if (false !== ref.current.hiding) {
      dispatch({ type: 'update', payload: { hiding: false } });
      ref.current.hiding = false;
    }
    delete ref.current.timestamp;
    if (ref.current.requestID) {
      return;
    }
    ref.current.requestID = global.requestAnimationFrame(animationFrameCallback);
  }, [dispatch, animationFrameCallback]);

  const stopAutoHide = React.useCallback(() => {
    if (true !== ref.current.hiding) {
      dispatch({ type: 'update', payload: { hiding: false } });
      ref.current.hiding = false;
    }
    if (ref.current.requestID) {
      global.cancelAnimationFrame(ref.current.requestID);
    }
    delete ref.current.requestID;
    delete ref.current.timestamp;
  }, [dispatch]);

  React.useEffect(() => {
    if (
      !src ||
      loading ||
      prevented ||
      paused ||
      ended ||
      waiting ||
      seeking ||
      sliding ||
      rateMenuVisible ||
      controlsHovering ||
      kernelMsg
    ) {
      stopAutoHide();
    } else {
      startAutoHide();
    }
  }, [
    src,
    loading,
    prevented,
    paused,
    ended,
    waiting,
    seeking,
    controlsHovering,
    sliding,
    rateMenuVisible,
    kernelMsg,
    startAutoHide,
    stopAutoHide,
  ]);

  return { show: startAutoHide };
};
