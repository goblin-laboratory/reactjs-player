import React from 'react';
import PropTypes from 'prop-types';
import ReactSWF from 'react-swf';
import './GrindPlayer.swf';
import './flashlsOSMF.swf';
import styles from './index.module.less';

const GrindPlayer = props => {
  if (!props.src) {
    return <div className={styles.grindPlayer} />;
  }
  const flashVars = {
    src: props.src,
    autoPlay: true,
    bufferTime: 0.5,
    streamType: 'live',
  };
  if ('application/x-mpegURL' === props.type) {
    flashVars.plugin_hls = props.flashlsOSMFSwf;
    flashVars.streamType = 'recorded';
  }
  return (
    <div className={styles.grindPlayer}>
      <ReactSWF
        src={props.grindPlayerSwf}
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
  grindPlayerSwf: PropTypes.string.isRequired,
  flashlsOSMFSwf: PropTypes.string.isRequired,
};

export default GrindPlayer;
