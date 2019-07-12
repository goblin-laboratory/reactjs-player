import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayerSkinWapper from '../ReactPlayerSkinWapper';
import ReactPlayerContext from '../ReactPlayerContext';
import styles from './index.module.less';

// import useVideo from '../../hooks/useVideo';
import useVideoState from '../../hooks/useVideoState';
import useVideoTime from '../../hooks/useVideoTime';
import useVideoVolume from '../../hooks/useVideoVolume';
import useVideoPlaybackRate from '../../hooks/useVideoPlaybackRate';
import useVideoPiP from '../../hooks/useVideoPiP';
import useVideoFullscreen from '../../hooks/useVideoFullscreen';

import useHlsjs from '../../hooks/useHlsjs';
import useFlvjs from '../../hooks/useFlvjs';
import useNative from '../../hooks/useNative';

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

const ReactPlayer = (props, ref) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  const getVideoElement = React.useCallback(() => videoRef && videoRef.current, []);
  const getPlayerElement = React.useCallback(() => playerRef && playerRef.current, []);

  const videoProps = useVideoState(props, getVideoElement);
  const timeProps = useVideoTime(props, getVideoElement);
  const volumeProps = useVideoVolume(props, getVideoElement);
  const playbackRateProps = useVideoPlaybackRate(props, getVideoElement);
  const piPProps = useVideoPiP(props, getVideoElement);
  const fullscreenProps = useVideoFullscreen(props, getVideoElement, getPlayerElement);

  const kernelMsg = getRenderHooks(props.kernel)(props, getVideoElement);

  const videoStyles = {};
  if (fullscreenProps.x5videofullscreen) {
    videoStyles.objectPosition = fullscreenProps.fullscreen ? 'center center' : props.objectPosition;
  }

  React.useImperativeHandle(ref, () => ({
    isPlaying: () => props.src && !(videoProps.loading || videoProps.waiting || videoProps.ended || videoProps.paused),
    isFullscreen: () => fullscreenProps.fullscreen,
    getCurrentTime: () => timeProps.currentTime,
    setCurrentTime: ct => timeProps.changeCurrentTime(ct),
    getBuffered: () => timeProps.buffered,
    getPlaybackRate: () => playbackRateProps.playbackRate,
    setPlaybackRate: rate => playbackRateProps.changePlaybackRate(rate),
    isPiP: () => piPProps.pictureInPictureEnabled && piPProps.pip,
  }));

  return (
    <div className={styles.reactPlayer} ref={playerRef}>
      <video
        className={styles.video}
        ref={videoRef}
        loop={props.loop}
        controls={'controls' === props.controls}
        webkit-playsinline={props.playsInline}
        playsInline={props.playsInline}
        x5-playsinline={props.playsInline}
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        x5-video-orientation="landscape|portrait"
        style={videoStyles}
        // useVideoState
        onCanPlay={videoProps.onCanPlay}
        onPause={videoProps.onPause}
        onPlay={videoProps.onPlay}
        onPlaying={videoProps.onPlaying}
        onEnded={videoProps.onEnded}
        onSeeked={videoProps.onSeeked}
        onSeeking={videoProps.onSeeking}
        onCanPlayThrough={videoProps.onCanPlayThrough}
        onWaiting={videoProps.onWaiting}
        // useVideoTime
        onDurationChange={timeProps.onDurationChange}
        onTimeUpdate={timeProps.onTimeUpdate}
        onProgress={timeProps.onProgress}
        // useVideoVolume
        muted={volumeProps.muted}
        onVolumeChange={volumeProps.onVolumeChange}
        // useVideoPlaybackRate
        onRateChange={playbackRateProps.onVolumeChange}
        // 未处理媒体事件
        onEmptied={props.onEmptied}
        onEncrypted={props.onEncrypted}
        onError={props.onError}
        onLoadedData={props.onLoadedData}
        onLoadedMetadata={props.onLoadedMetadata}
        onLoadStart={props.onLoadStart}
        onStalled={props.onStalled}
        onSuspend={props.onSuspend}
        onAbort={props.onAbort}
      />
      <ReactPlayerContext.Provider
        value={{
          src: props.src,
          controls: props.controls,
          poster: props.poster,
          // useVideoState
          loading: videoProps.loading,
          paused: videoProps.paused,
          ended: videoProps.ended,
          seeking: videoProps.seeking,
          waiting: videoProps.waiting,
          onPauseClick: videoProps.onPauseClick,
          onPlayClick: videoProps.onPlayClick,
          // useVideoTime
          duration: timeProps.duration,
          currentTime: timeProps.currentTime,
          buffered: timeProps.buffered,
          changeCurrentTime: timeProps.changeCurrentTime,
          // useVideoVolume
          muted: volumeProps.muted,
          volume: volumeProps.volume,
          onMutedClick: volumeProps.onMutedClick,
          changeVolume: volumeProps.changeVolume,
          // useVideoPlaybackRate
          playbackRate: playbackRateProps.playbackRate,
          changePlaybackRate: playbackRateProps.changePlaybackRate,
          ...piPProps,
          ...fullscreenProps,
          kernelMsg: kernelMsg,
        }}
      >
        {true === props.controls && <ReactPlayerSkinWapper />}
        {props.children}
      </ReactPlayerContext.Provider>
    </div>
  );
};

ReactPlayer.propTypes = {
  kernel: PropTypes.oneOf(['hlsjs', 'flvjs', 'native']).isRequired,
  live: PropTypes.bool.isRequired,
  config: PropTypes.object,
  onKernelError: PropTypes.func,

  src: PropTypes.string,
  type: PropTypes.string.isRequired,
  controls: PropTypes.oneOf([false, true, 'controls']),
  poster: PropTypes.string,
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

  x5playsinline: PropTypes.bool,
  objectPosition: PropTypes.string,
  onX5VideoFullscreenChange: PropTypes.func,

  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

ReactPlayer.defaultProps = {
  config: null,
  onKernelError: noop,

  src: '',
  controls: true,
  poster: '',
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

  x5playsinline: false,
  onX5VideoFullscreenChange: noop,
  objectPosition: 'center center',
  children: null,
};

export default React.forwardRef(ReactPlayer);
