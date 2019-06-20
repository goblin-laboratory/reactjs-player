import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayerSkin from '../ReactPlayerSkin';
import styles from './index.module.less';

import useVideo from '../../hooks/useVideo';
import useHlsjs from '../../hooks/useHlsjs';
import useFlvjs from '../../hooks/useFlvjs';
import useNative from '../../hooks/useNative';
import useVideoFullscreen from '../../hooks/useVideoFullscreen';

const noop = () => {};

const getRenderHooks = kernel => {
  switch (kernel) {
    case 'native':
      return useNative;
    case 'hlsjs':
      return useHlsjs;
    case 'flvjs':
      return useFlvjs;
    default:
      return noop;
  }
};

const ReactPlayer = props => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  const getVideoElement = React.useCallback(() => videoRef && videoRef.current, []);
  const getPlayerElement = React.useCallback(() => playerRef && playerRef.current, []);

  const { muted, mediaEvents, ...videoProps } = useVideo(props, getVideoElement, getPlayerElement);
  const playerMsg = getRenderHooks(props.kernel)(props, getVideoElement);
  const fullscreenProps = useVideoFullscreen(props, getVideoElement, getPlayerElement);

  const videoStyles = {};
  if (fullscreenProps.x5videofullscreen) {
    videoStyles.objectPosition = fullscreenProps.fullscreen ? 'center center' : props.objectPosition;
  }
  return (
    <div className={styles.reactPlayer} ref={playerRef}>
      <video
        className={styles.video}
        ref={videoRef}
        muted={muted}
        loop={props.loop}
        {...mediaEvents}
        webkit-playsinline={true}
        playsInline={true}
        x5-playsinline={true}
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        x5-video-orientation="landscape|portrait"
        style={videoStyles}
      />
      <div className={props.src ? styles.hiddenVideoMask : styles.videoMask} />
      <ReactPlayerSkin
        src={props.src}
        controls={props.controls}
        muted={muted}
        {...videoProps}
        {...fullscreenProps}
        playerMsg={playerMsg}
      />
    </div>
  );
};

ReactPlayer.propTypes = {
  kernel: PropTypes.string,
  live: PropTypes.bool,
  x5playsinline: PropTypes.bool,
  src: PropTypes.string,
  type: PropTypes.string,
  config: PropTypes.object,
  controls: PropTypes.bool,
  muted: PropTypes.bool,
  volume: PropTypes.number,
  autoPlay: PropTypes.bool,
  currentTime: PropTypes.number,
  loop: PropTypes.bool,
  onCanPlay: PropTypes.func,
  onDurationChange: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onPlaying: PropTypes.func,
  onEnded: PropTypes.func,
  onSeeked: PropTypes.func,
  onSeeking: PropTypes.func,
  onCanPlayThrough: PropTypes.func,
  onEmptied: PropTypes.func,
  onEncrypted: PropTypes.func,
  onError: PropTypes.func,
  onLoadedData: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
  onLoadStart: PropTypes.func,
  onProgress: PropTypes.func,
  onRateChange: PropTypes.func,
  onStalled: PropTypes.func,
  onSuspend: PropTypes.func,
  onVolumeChange: PropTypes.func,
  onWaiting: PropTypes.func,
  onAbort: PropTypes.func,
  objectPosition: PropTypes.string,
  onX5VideoFullscreenChange: PropTypes.func,
};

ReactPlayer.defaultProps = {
  kernel: 'hlsjs',
  live: false,
  x5playsinline: false,
  src: '',
  type: 'application/x-mpegURL',
  config: { debug: false, enableWorker: false },
  controls: true,
  muted: false,
  volume: 1,
  autoPlay: true,
  currentTime: 0,
  loop: false,
  onCanPlay: noop,
  onDurationChange: noop,
  onTimeUpdate: noop,
  onPause: noop,
  onPlay: noop,
  onPlaying: noop,
  onEnded: noop,
  onSeeked: noop,
  onSeeking: noop,
  onCanPlayThrough: noop,
  onEmptied: noop,
  onEncrypted: noop,
  onError: noop,
  onLoadedData: noop,
  onLoadedMetadata: noop,
  onLoadStart: noop,
  onProgress: noop,
  onRateChange: noop,
  onStalled: noop,
  onSuspend: noop,
  onVolumeChange: noop,
  onWaiting: noop,
  onAbort: noop,
  onX5VideoFullscreenChange: noop,
  objectPosition: 'center center',
};

export default ReactPlayer;
