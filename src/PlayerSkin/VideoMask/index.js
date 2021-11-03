import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.less';

const VideoMask = ({ src, showControls }) => {
  return (
    <button
      type="button"
      className={styles.videoMask}
      style={src ? { opacity: 0, background: 'transparent' } : {}}
      onMouseMove={showControls}
      onClick={showControls}
    />
  );
};

VideoMask.propTypes = {
  src: PropTypes.string,
  showControls: PropTypes.func.isRequired,
};

VideoMask.defaultProps = {
  src: '',
};

export default React.memo(VideoMask, (p, n) => p.src === n.src && p.showControls === n.showControls);
