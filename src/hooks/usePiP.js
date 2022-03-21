import React from 'react';

export default ({ src, pip, updateState, getVideoElement }) => {
  const ref = React.useRef({ src, getVideoElement });

  const requestPictureInPicture = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    const el = ref.current.getVideoElement();
    if (el && el.requestPictureInPicture && ref.current.src) {
      el.requestPictureInPicture();
    }
  }, []);

  const exitPictureInPicture = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    if (document.exitPictureInPicture) {
      document.exitPictureInPicture();
    }
  }, []);

  const onEnterPictureInPicture = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    updateState({ pip: true });
  }, [updateState]);

  const onLeavePictureInPicture = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    updateState({ pip: false });
  }, [updateState]);

  React.useEffect(() => {
    return () => {
      ref.current = null;
    };
  }, []);

  React.useEffect(() => {
    if (!ref.current) {
      return () => {};
    }
    const el = ref.current.getVideoElement();
    if (!el) {
      return () => {};
    }
    el.addEventListener('enterpictureinpicture', onEnterPictureInPicture);
    el.addEventListener('leavepictureinpicture', onLeavePictureInPicture);
    return () => {
      el.removeEventListener('enterpictureinpicture', onEnterPictureInPicture);
      el.removeEventListener('leavepictureinpicture', onLeavePictureInPicture);
    };
  }, [onEnterPictureInPicture, onLeavePictureInPicture]);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.src = src;
    if (pip && !src) {
      exitPictureInPicture();
    }
  }, [src, pip, exitPictureInPicture]);

  return { requestPictureInPicture, exitPictureInPicture };
};
