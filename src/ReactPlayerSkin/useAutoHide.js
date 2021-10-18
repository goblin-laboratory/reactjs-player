import React from 'react';

export default ({ src, loading, prevented, paused, ended, waiting, seeking, sliding, visible, kernelMsg }) => {
  const [hovering, setHovering] = React.useState(false);
  const [hiding, setHiding] = React.useState(false);
  const ref = React.useRef({});

  const onMouseEnter = React.useCallback(() => {
    if (global.matchMedia) {
      const matched = global.matchMedia('(hover: none), (pointer: coarse)');
      if (matched && matched.matches) {
        return;
      }
    }
    setHovering(true);
  }, []);

  const onMouseLeave = React.useCallback(() => {
    setHovering(false);
  }, []);

  const animationFrameCallback = React.useCallback((timestamp) => {
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
    setHiding(true);
    ref.current.hiding = true;
    delete ref.current.requestID;
    delete ref.current.timestamp;
  }, []);

  const startAutoHide = React.useCallback(() => {
    if (false !== ref.current.hiding) {
      setHiding(false);
      ref.current.hiding = false;
    }
    delete ref.current.timestamp;
    if (ref.current.requestID) {
      return;
    }
    ref.current.requestID = global.requestAnimationFrame(animationFrameCallback);
  }, [animationFrameCallback]);

  const stopAutoHide = React.useCallback(() => {
    if (true !== ref.current.hiding) {
      setHiding(false);
      ref.current.hiding = false;
    }
    if (ref.current.requestID) {
      global.cancelAnimationFrame(ref.current.requestID);
    }
    delete ref.current.requestID;
    delete ref.current.timestamp;
  }, []);

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
      visible ||
      hovering ||
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
    sliding,
    visible,
    hovering,
    kernelMsg,
    startAutoHide,
    stopAutoHide,
  ]);

  return { onMouseEnter, onMouseLeave, show: startAutoHide, hiding };
};
