/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';

import useVideoState from '@reactjs-player/use-state';
import useTime from '@reactjs-player/use-time';
import useVolume from '@reactjs-player/use-volume';
import usePlaybackRate from '@reactjs-player/use-playback-rate';
import usePiP from '@reactjs-player/use-pip';
import useFullscreen from '@reactjs-player/use-fullscreen';

import useHlsjs from '@reactjs-player/use-hlsjs';
import useFlvjs from '@reactjs-player/use-flvjs';
import useNative from '@reactjs-player/use-native';

import ReactPlayerSkinWapper from '../ReactPlayerSkinWapper';
import ReactPlayerContext from '../ReactPlayerContext';
import styles from './index.module.less';

const noop = () => {};

const getHooks = (kernel, getCustomHooks) => {
  switch (kernel) {
    case 'native':
      return useNative;
    case 'hlsjs':
      return useHlsjs;
    case 'flvjs':
      return useFlvjs;
    default:
      if (getCustomHooks) {
        return getCustomHooks(kernel);
      }
      console.error(`ReactPlayer: 暂不支持 kernel(${kernel})`);
      return noop;
  }
};

const ReactPlayer = (
  {
    kernel,
    getCustomHooks = noop,

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
  const timeProps = useTime({ src, onDurationChange, onTimeUpdate, onProgress }, getVideoElement);
  const volumeProps = useVolume({ muted, onVolumeChange }, getVideoElement);
  const playbackRateProps = usePlaybackRate({ live, onRateChange }, getVideoElement);
  const piPProps = usePiP({ src }, getVideoElement);
  const fullscreenProps = useFullscreen({ x5playsinline, onFullscreenChange }, getVideoElement, getPlayerElement);

  const kernelMsg = getHooks(kernel, getCustomHooks)({ src, config, onKernelError }, getVideoElement);

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
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={`${styles.reactPlayer} ${className}`} ref={playerRef} {...playerProps}>
      <video
        className={styles.video}
        ref={videoRef}
        controls={'controls' === controls}
        type={type}
        // eslint-disable-next-line react/jsx-props-no-spreading
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
        // useTime
        onDurationChange={timeProps.onDurationChange}
        onTimeUpdate={timeProps.onTimeUpdate}
        onProgress={timeProps.onProgress}
        // useVolume
        muted={volumeProps.muted}
        onVolumeChange={volumeProps.onVolumeChange}
        // usePlaybackRate
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
          getVideoElement,
          live,
          src,
          controls,
          poster,
          // useVideoState
          loading: stateProps.loading,
          paused: stateProps.paused,
          ended: stateProps.ended,
          seeking: stateProps.seeking,
          waiting: stateProps.waiting,
          onPauseClick: stateProps.onPauseClick,
          onPlayClick: stateProps.onPlayClick,
          // useTime
          duration: timeProps.duration,
          currentTime: timeProps.currentTime,
          buffered: timeProps.buffered,
          changeCurrentTime: timeProps.changeCurrentTime,
          // useVolume
          muted: volumeProps.muted,
          volume: volumeProps.volume,
          onMutedClick: volumeProps.onMutedClick,
          changeVolume: volumeProps.changeVolume,
          // usePlaybackRate
          playbackRate: playbackRateProps.playbackRate,
          changePlaybackRate: playbackRateProps.changePlaybackRate,
          ...piPProps,
          x5playsinline,
          ...fullscreenProps,
          kernelMsg,
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
  getCustomHooks: PropTypes.func,
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
  getCustomHooks: noop,

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
