import React from 'react';

export default (src, getVideoElement) => {
  const [enabled] = React.useState(!!document.pictureInPictureEnabled);
  const [pip, setPiP] = React.useState(false);

  const ref = React.useRef({ src, getVideoElement });

  // React.useEffect(() => {
  //   setEnabled(!!document.pictureInPictureEnabled);
  // }, []);

  React.useEffect(() => {
    ref.current.src = src;
  }, [src]);

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

  React.useEffect(() => {
    if (pip && !src) {
      exitPictureInPicture();
    }
  }, [src, pip, exitPictureInPicture]);

  const onEnterPictureInPicture = React.useCallback(() => {
    setPiP(true);
  }, []);

  const onLeavePictureInPicture = React.useCallback(() => {
    setPiP(false);
  }, []);

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

  return { pictureInPictureEnabled: enabled, pip, requestPictureInPicture, exitPictureInPicture };
};
