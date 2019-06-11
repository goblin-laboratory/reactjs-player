import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayerSkin from '../ReactPlayerSkin';
import styles from './index.module.less';

import useVideo from '../../hooks/useVideo.1';
import useHlsjs from '../../hooks/useHlsjs';
// import useVideo from '../../hooks/useVideo';

const noop = () => {};

const ReactHlsjsPlayer = props => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  const getVideoElement = React.useCallback(() => videoRef && videoRef.current, []);
  const getPlayerElement = React.useCallback(() => playerRef && playerRef.current, []);

  const { muted, mediaEvents, ...videoProps } = useVideo(props, getVideoElement, getPlayerElement);
  useHlsjs(props, getVideoElement);

  return (
    <div className={styles.reactPlayer} ref={playerRef}>
      <video className={styles.video} ref={videoRef} muted={muted} loop={props.loop} {...mediaEvents} />
      <div className={props.src ? styles.hiddenVideoMask : styles.videoMask} />
      <ReactPlayerSkin src={props.src} controls={props.controls} muted={muted} {...videoProps} />
    </div>
  );
};

ReactHlsjsPlayer.propTypes = {
  live: PropTypes.bool,
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
};

ReactHlsjsPlayer.defaultProps = {
  live: false,
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
};

export default ReactHlsjsPlayer;
