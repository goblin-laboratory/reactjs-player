import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.less';

const PictureInPicture = ({ pictureInPictureEnabled, pip, exitPictureInPicture, requestPictureInPicture }) => {
  if (!pictureInPictureEnabled) {
    return null;
  }
  return (
    <button type="button" className={styles.textBtn} onClick={pip ? exitPictureInPicture : requestPictureInPicture}>
      画中画
    </button>
  );
};

PictureInPicture.propTypes = {
  pictureInPictureEnabled: PropTypes.bool.isRequired,
  pip: PropTypes.bool.isRequired,
  exitPictureInPicture: PropTypes.func.isRequired,
  requestPictureInPicture: PropTypes.func.isRequired,
};

export default React.memo(
  PictureInPicture,
  (p, n) =>
    p.pictureInPictureEnabled === n.pictureInPictureEnabled &&
    p.pip === n.pip &&
    p.exitPictureInPicture === n.exitPictureInPicture &&
    p.requestPictureInPicture === n.requestPictureInPicture,
);
