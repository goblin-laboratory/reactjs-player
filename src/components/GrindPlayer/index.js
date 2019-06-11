import React from 'react';
import PropTypes from 'prop-types';
import ReactSWF from 'react-swf';
import styles from './index.module.less';

const GrindPlayer = props => {
  if (!props.src) {
    return null;
  }
  const flashVars = {
    src: props.src,
    autoPlay: true,
    bufferTime: 0.5,
    streamType: 'live',
  };
  if ('application/x-mpegURL' === props.type) {
    flashVars.plugin_hls = './flashlsOSMF.swf';
    flashVars.streamType = 'recorded';
  }
  return (
    <div className={styles.grindPlayer}>
      <ReactSWF
        src="./GrindPlayer.swf"
        width="100%"
        height="100%"
        wmode="opaque"
        allowFullScreen
        allowScriptAccess="always"
        bgcolor="#000000"
        flashVars={flashVars}
      />
    </div>
  );
};

GrindPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default GrindPlayer;
