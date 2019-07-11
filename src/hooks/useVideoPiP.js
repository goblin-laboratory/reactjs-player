import React from 'react';

const noop = () => {};

export default ({ src }, getVideoElement) => {
  const [enabled, setEnabled] = React.useState(false);
  const [pip, setPiP] = React.useState(false);

  React.useEffect(() => {
    setEnabled(!!document.pictureInPictureEnabled);
  }, []);

  const requestPictureInPicture = React.useCallback(
    v => {
      const el = getVideoElement();
      if (el && el.requestPictureInPicture) {
        el.requestPictureInPicture();
      }
    },
    [getVideoElement],
  );

  const exitPictureInPicture = React.useCallback(e => {
    if (document.exitPictureInPicture) {
      document.exitPictureInPicture();
    }
  }, []);

  React.useEffect(() => {
    if (pip && !src) {
      exitPictureInPicture();
    }
  }, [src, pip, exitPictureInPicture]);

  const onenterpictureinpicture = React.useCallback(e => {
    setPiP(true);
  }, []);

  const onleavepictureinpicture = React.useCallback(e => {
    setPiP(false);
  }, []);

  React.useEffect(() => {
    const el = getVideoElement();
    if (!el) {
      return noop;
    }
    el.addEventListener('enterpictureinpicture', onenterpictureinpicture);
    el.addEventListener('leavepictureinpicture', onleavepictureinpicture);
    return () => {
      el.removeEventListener('enterpictureinpicture', onenterpictureinpicture);
      el.removeEventListener('leavepictureinpicture', onleavepictureinpicture);
    };
  }, [getVideoElement, onenterpictureinpicture, onleavepictureinpicture]);

  return {
    pictureInPictureEnabled: enabled,
    pip,
    requestPictureInPicture,
    exitPictureInPicture,
  };
};
