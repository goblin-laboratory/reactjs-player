import React from 'react';

export default ({ src, pip, updateState, getVideoElement }) => {
  const ref = React.useRef({ src, getVideoElement });

  const requestPictureInPicture = React.useCallback(() => {
    const el = ref.current.getVideoElement();
    if (el && el.requestPictureInPicture && ref.current.src) {
      el.requestPictureInPicture();
    }
  }, []);

  const exitPictureInPicture = React.useCallback(() => {
    if (document.exitPictureInPicture) {
      document.exitPictureInPicture();
    }
  }, []);

  const onEnterPictureInPicture = React.useCallback(() => {
    // setPiP(true);
    updateState({ pip: true });
  }, [updateState]);

  const onLeavePictureInPicture = React.useCallback(() => {
    // setPiP(false);
    updateState({ pip: false });
  }, [updateState]);

  React.useEffect(() => {
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
    ref.current.src = src;
    if (pip && !src) {
      exitPictureInPicture();
    }
  }, [src, pip, exitPictureInPicture]);

  return { requestPictureInPicture, exitPictureInPicture };
};
