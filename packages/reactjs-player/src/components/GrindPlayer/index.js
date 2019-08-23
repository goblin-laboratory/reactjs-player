import React from 'react';
import PropTypes from 'prop-types';
import ReactSWF from 'react-swf';
import './GrindPlayer.swf';
import './flashlsOSMF.swf';
import styles from './index.module.less';

const GrindPlayer = ({ live, src, type, grindPlayerSwf, flashlsOSMFSwf }) => {
  if (!src) {
    return <div className={styles.grindPlayer} />;
  }
  const flashVars = {
    src,
    autoPlay: true,
    bufferTime: 0.5,
    streamType: live ? 'live' : 'recorded',
  };
  if ('application/x-mpegURL' === type) {
    flashVars.plugin_hls = flashlsOSMFSwf;
  }
  return (
    <div className={styles.grindPlayer}>
      <ReactSWF
        src={grindPlayerSwf}
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
  live: PropTypes.bool,
  src: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  grindPlayerSwf: PropTypes.string,
  flashlsOSMFSwf: PropTypes.string,
};

GrindPlayer.defaultProps = {
  live: true,
  grindPlayerSwf: 'http://unpkg.com/reactjs-player/dist/GrindPlayer.swf',
  flashlsOSMFSwf: 'http://unpkg.com/reactjs-player/dist/flashlsOSMF.swf',
};

export default GrindPlayer;
