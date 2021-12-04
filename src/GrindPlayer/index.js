import React from 'react';
import PropTypes from 'prop-types';
import ReactSWF from 'react-swf';
import './GrindPlayer.swf';
import './flashlsOSMF.swf';
import PlayerContext from '../PlayerContext';
import useGrindPlayer from './useGrindPlayer';
import useState from './useState';
import useTime from './useTime';
import useVolume from './useVolume';
import styles from './index.module.less';

const GrindPlayer = ({ live, src, type, grindPlayerSwf, flashlsOSMFSwf }) => {
  const { ref, dispatch, id, javascriptCallbackFunction, ...state } = useGrindPlayer({ src });

  const stateProps = useState({ ref, dispatch });
  const timeProps = useTime({ ref, dispatch });
  const volumeProps = useVolume({ ref, dispatch });

  return (
    <div className={styles.grindPlayer}>
      {src && (
        <ReactSWF
          id={id}
          src={grindPlayerSwf}
          width="100%"
          height="100%"
          wmode="opaque"
          allowFullScreen
          allowScriptAccess="always"
          bgcolor="#000000"
          flashVars={{
            src,
            autoPlay: true,
            bufferTime: 0.5,
            streamType: live ? 'live' : 'recorded',
            plugin_hls: 'application/x-mpegURL' === type ? flashlsOSMFSwf : undefined,
            javascriptCallbackFunction,
          }}
        />
      )}
      <PlayerContext.Provider
        value={{
          live,
          src,
          ...state,
          ...stateProps,
          ...timeProps,
          ...volumeProps,
        }}
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

export default React.memo(GrindPlayer);
