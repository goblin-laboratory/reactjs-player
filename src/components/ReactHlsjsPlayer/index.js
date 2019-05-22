import React from 'react';
import PropTypes from 'prop-types';
import Hls from 'hls.js';
import ReactPlayerSkin from '../ReactPlayerSkin';
import styles from './index.module.less';

import useVideo from '../../hooks/useVideo';

const noop = () => {};

const ReactHlsjsPlayer = props => {
  const { src, debug, live } = props;
  const {
    loading,
    setLoading,
    paused,
    setPaused,
    ended,
    seeking,
    waiting,
    duration,
    buffered,
    currentTime,
    setCurrentTime,
    muted,
    volume,
    rate,
    fullScreen,
    setFullScreen,
    onCanPlay,
    onDurationChange,
    onTimeUpdate,
    onPause,
    onPlay,
    onPlaying,
    onEnded,
    onSeeked,
    onSeeking,
    onCanPlayThrough,
    onEmptied,
    onEncrypted,
    onError,
    onLoadedData,
    onLoadedMetadata,
    onLoadStart,
    onProgress,
    onRateChange,
    onStalled,
    onSuspend,
    onVolumeChange,
    onWaiting,
    onAbort,
  } = useVideo(props);

  const playerRef = React.useRef(null);
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (!src) {
      if (videoRef && videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
        videoRef.current.load();
      }
      return noop;
    }
    if (!videoRef || !videoRef.current) {
      return noop;
    }
    setLoading(true);
    const hls = new Hls({ debug, enableWorker: false });
    hls.loadSource(src);
    hls.attachMedia(videoRef.current);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      if (videoRef && videoRef.current) {
        videoRef.current.play();
      }
    });
    return () => {
      hls.destroy();
    };
  }, [src, debug, live, setLoading]);

  const changeCurrentTime = React.useCallback(
    t => {
      if (videoRef && videoRef.current) {
        videoRef.current.currentTime = t;
      }
      setCurrentTime(t);
    },
    [setCurrentTime],
  );

  const onPauseClick = React.useCallback(
    t => {
      if (videoRef && videoRef.current) {
        videoRef.current.pause();
      }
      setPaused(true);
    },
    [setPaused],
  );

  const onPlayClick = React.useCallback(
    t => {
      if (videoRef && videoRef.current) {
        if (ended) {
          videoRef.current.currentTime = 0;
        }
        videoRef.current.play();
      }
      setPaused(false);
    },
    [setPaused, ended],
  );

  const onMutedClick = React.useCallback(
    e => {
      if (videoRef && videoRef.current) {
        videoRef.current.muted = !muted;
        if (0 === volume && muted) {
          videoRef.current.volume = 1;
        }
      }
    },
    [muted, volume],
  );

  const changeVolume = React.useCallback(v => {
    if (videoRef && videoRef.current) {
      videoRef.current.volume = v;
    }
  }, []);

  const onPiPClick = React.useCallback(v => {
    if (videoRef && videoRef.current) {
      videoRef.current.requestPictureInPicture();
    }
  }, []);

  const requestFullscreen = React.useCallback(v => {
    if (playerRef && playerRef.current) {
      playerRef.current.requestFullscreen();
    }
  }, []);

  const onFullscreenChange = React.useCallback(
    v => {
      if (playerRef && playerRef.current) {
        setFullScreen(document.fullscreenElement === playerRef.current);
      }
    },
    [setFullScreen],
  );

  const changePlaybackRate = React.useCallback(r => {
    if (videoRef && videoRef.current) {
      videoRef.current.playbackRate = r;
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [onFullscreenChange]);

  return (
    <div className={styles.reactPlayer} ref={playerRef}>
      <video
        className={styles.video}
        ref={videoRef}
        muted={muted}
        onDurationChange={onDurationChange}
        onTimeUpdate={onTimeUpdate}
        onProgress={onProgress}
        onCanPlay={onCanPlay}
        onPause={onPause}
        onPlay={onPlay}
        onPlaying={onPlaying}
        onEnded={onEnded}
        onSeeked={onSeeked}
        onSeeking={onSeeking}
        onCanPlayThrough={onCanPlayThrough}
        onWaiting={onWaiting}
        onVolumeChange={onVolumeChange}
        onRateChange={onRateChange}
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
      {!src && <div className={styles.videoMask} />}
      <ReactPlayerSkin
        src={props.src}
        controls={props.controls}
        loading={loading}
        paused={paused}
        ended={ended}
        seeking={seeking}
        waiting={waiting}
        duration={duration}
        buffered={buffered}
        currentTime={currentTime}
        muted={muted}
        volume={volume}
        playbackRate={rate}
        setPlaybackRate={changePlaybackRate}
        fullScreen={fullScreen}
        setCurrentTime={changeCurrentTime}
        onPauseClick={onPauseClick}
        onPlayClick={onPlayClick}
        onMutedClick={onMutedClick}
        onVolumeChange={changeVolume}
        onPiPClick={onPiPClick}
        requestFullscreen={requestFullscreen}
      />
    </div>
  );
};

ReactHlsjsPlayer.propTypes = {
  live: PropTypes.bool,
  src: PropTypes.string,
  type: PropTypes.string,
  debug: PropTypes.bool,
  controls: PropTypes.bool,
  muted: PropTypes.bool,
  autoPlay: PropTypes.bool,
  currentTime: PropTypes.number,
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
  type: '',
  debug: false,
  controls: true,
  muted: false,
  autoPlay: true,
  currentTime: 0,
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
