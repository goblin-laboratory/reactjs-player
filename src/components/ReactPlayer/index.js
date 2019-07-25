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
      console.error(`ReactPlayer: 暂不支持 kernel(${kernel})`);
      return noop;
  }
};

const ReactPlayer = (
  {
    kernel,
    live,

    config = null,
    onKernelError = noop,

    src = '',
    type,
    controls = true,
    poster = '',
    muted = false,
    // autoPlay = true,

    className = '',
    videoProps = null,
    playerProps = null,

    onCanPlay = noop,
    onDurationChange = noop,
    onTimeUpdate = noop,
    onPause = noop,
    onPlay = noop,
    onPlaying = noop,
    onEnded = noop,
    onSeeked = noop,
    onSeeking = noop,
    onCanPlayThrough = noop,
    onEmptied = noop,
    onEncrypted = noop,
    onError = noop,
    onLoadedData = noop,
    onLoadedMetadata = noop,
    onLoadStart = noop,
    onProgress = noop,
    onRateChange = noop,
    onStalled = noop,
    onSuspend = noop,
    onVolumeChange = noop,
    onWaiting = noop,
    onAbort = noop,

    x5playsinline = false,
    onFullscreenChange = noop,

    children = null,
  },
  ref,
) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  const getVideoElement = React.useCallback(() => videoRef && videoRef.current, []);
  const getPlayerElement = React.useCallback(() => playerRef && playerRef.current, []);

  const stateProps = useVideoState(
    {
      src,
      onCanPlay,
      onPause,
      onPlay,
      onPlaying,
      onEnded,
      onSeeked,
      onSeeking,
      onCanPlayThrough,
      onWaiting,
    },
    getVideoElement,
  );
  const timeProps = useVideoTime({ live, src, onDurationChange, onTimeUpdate, onProgress }, getVideoElement);
  const volumeProps = useVideoVolume({ muted, onVolumeChange }, getVideoElement);
  const playbackRateProps = useVideoPlaybackRate({ live, onRateChange }, getVideoElement);
  const piPProps = useVideoPiP({ src }, getVideoElement);
  const fullscreenProps = useVideoFullscreen({ x5playsinline, onFullscreenChange }, getVideoElement, getPlayerElement);

  const kernelMsg = getRenderHooks(kernel)({ src, config, onKernelError }, getVideoElement);

  React.useImperativeHandle(ref, () => ({
    isPlaying: () => !!src && !(stateProps.loading || stateProps.waiting || stateProps.ended || stateProps.paused),
    getDuration: () => timeProps.duration,
    getCurrentTime: () => timeProps.currentTime,
    setCurrentTime: ct => timeProps.changeCurrentTime(ct),
    getBuffered: () => timeProps.buffered,
    getVolume: () => volumeProps.volume,
    setVolume: v => volumeProps.changeVolume(v),
    isMuted: () => volumeProps.muted,
    toggleMute: () => volumeProps.onMutedClick(),
    getPlaybackRate: () => playbackRateProps.playbackRate,
    setPlaybackRate: rate => playbackRateProps.changePlaybackRate(rate),
    isPiP: () => piPProps.pictureInPictureEnabled && piPProps.pip,
    isFullscreen: () => fullscreenProps.fullscreen,
  }));

  return (
    <div className={`${styles.reactPlayer} ${className}`} ref={playerRef} {...playerProps}>
      <video
        className={styles.video}
        ref={videoRef}
        controls={'controls' === controls}
        type={type}
        // webkit-playsinline={props.playsInline}
        // playsInline={props.playsInline}
        // x5-playsinline={props.playsInline}
        // x5-video-player-type="h5"
        // x5-video-player-fullscreen="true"
        // x5-video-orientation="landscape|portrait"
        {...videoProps}
        // useVideoState
        onCanPlay={stateProps.onCanPlay}
        onPause={stateProps.onPause}
        onPlay={stateProps.onPlay}
        onPlaying={stateProps.onPlaying}
        onEnded={stateProps.onEnded}
        onSeeked={stateProps.onSeeked}
        onSeeking={stateProps.onSeeking}
        onCanPlayThrough={stateProps.onCanPlayThrough}
        onWaiting={stateProps.onWaiting}
        // useVideoTime
        onDurationChange={timeProps.onDurationChange}
        onTimeUpdate={timeProps.onTimeUpdate}
        onProgress={timeProps.onProgress}
        // useVideoVolume
        muted={volumeProps.muted}
        onVolumeChange={volumeProps.onVolumeChange}
        // useVideoPlaybackRate
        onRateChange={playbackRateProps.onRateChange}
        // 未处理媒体事件
        onEmptied={onEmptied}
        onEncrypted={onEncrypted}
        onError={onError}
        onLoadedData={onLoadedData}
        onLoadedMetadata={onLoadedMetadata}
        onLoadStart={onLoadStart}
        onStalled={onStalled}
        onSuspend={onSuspend}
        onAbort={onAbort}
      />
      <ReactPlayerContext.Provider
        value={{
          src: src,
          controls: controls,
          poster: poster,
          // useVideoState
          loading: stateProps.loading,
          paused: stateProps.paused,
          ended: stateProps.ended,
          seeking: stateProps.seeking,
          waiting: stateProps.waiting,
          onPauseClick: stateProps.onPauseClick,
          onPlayClick: stateProps.onPlayClick,
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
          x5playsinline,
          ...fullscreenProps,
          kernelMsg: kernelMsg,
        }}
      >
        {true === controls && <ReactPlayerSkinWapper />}
        {children}
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
  // volume: PropTypes.number,
  // autoPlay: PropTypes.bool,

  className: PropTypes.string,
  videoProps: PropTypes.object,
  playerProps: PropTypes.object,

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
  onFullscreenChange: PropTypes.func,

  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

ReactPlayer.defaultProps = {
  config: null,
  onKernelError: noop,

  src: '',
  controls: true,
  poster: '',
  muted: false,
  // autoPlay: true,

  className: '',
  videoProps: null,
  playerProps: null,

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
  onFullscreenChange: noop,

  children: null,
};

export default React.forwardRef(ReactPlayer);
