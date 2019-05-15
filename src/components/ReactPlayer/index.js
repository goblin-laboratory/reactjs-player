import React from 'react';
import PropTypes from 'prop-types';
import Hls from 'hls.js';
import ReactPlayerSkin from '../ReactPlayerSkin';
import styles from './index.module.less';

const noop = () => {};

const ReactPlayer = ({
  streamType,
  src,
  type,
  debug,
  // autoPlay,
  controls,
  muted,
  currentTime,
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
}) => {
  const [loading, setLoading] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [ended, setEnded] = React.useState(false);
  const [seeking, setSeeking] = React.useState(false);
  const [waiting, setWaiting] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentTimeState, setCurrentTimeState] = React.useState(0);
  const [buffered, setBuffered] = React.useState(null);
  const [mutedState, setMutedState] = React.useState(muted);
  const [volumeState, setVolumeState] = React.useState(1);
  const [rate, setRate] = React.useState(1);

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
  }, [src, type, debug]);

  const onVideoCanPlay = React.useCallback(
    e => {
      setLoading(false);
      setWaiting(false);
      onCanPlay(e);
    },
    [onCanPlay],
  );

  const onVideoDurationChange = React.useCallback(
    e => {
      setDuration(e.target.duration);
      onDurationChange(e);
    },
    [onDurationChange],
  );

  const onVideoTimeUpdate = React.useCallback(
    e => {
      setCurrentTimeState(e.target.currentTime);
      onTimeUpdate(e);
    },
    [onTimeUpdate],
  );

  const onVideoProgress = React.useCallback(
    e => {
      setBuffered(e.target.buffered);
      onProgress(e);
    },
    [onProgress],
  );

  const onVideoPause = React.useCallback(
    e => {
      setPaused(true);
      onPause(e);
    },
    [onPause],
  );

  const onVideoPlay = React.useCallback(
    e => {
      setPaused(false);
      setEnded(false);
      onPlay(e);
    },
    [onPlay],
  );

  const onVideoPlaying = React.useCallback(
    e => {
      setPaused(false);
      setEnded(false);
      onPlaying(e);
    },
    [onPlaying],
  );

  const onVideoEnded = React.useCallback(
    e => {
      setEnded(true);
      onEnded(e);
    },
    [onEnded],
  );

  const onVideoSeeked = React.useCallback(
    e => {
      setSeeking(false);
      onSeeked(e);
    },
    [onSeeked],
  );

  const onVideoSeeking = React.useCallback(
    e => {
      setSeeking(true);
      onSeeking(e);
    },
    [onSeeking],
  );

  const onVideoCanPlayThrough = React.useCallback(
    e => {
      setWaiting(false);
      onCanPlayThrough(e);
    },
    [onCanPlayThrough],
  );

  const onVideoWaiting = React.useCallback(
    e => {
      setWaiting(true);
      onWaiting(e);
    },
    [onWaiting],
  );

  const onVideoVolumeChange = React.useCallback(
    e => {
      setVolumeState(e.target.volume);
      setMutedState(e.target.muted);
      onVolumeChange(e);
    },
    [onVolumeChange],
  );

  const onVideoRateChange = React.useCallback(
    e => {
      setRate(e.target.playbackRate);
      onRateChange(e);
    },
    [onRateChange],
  );

  return (
    <div className={styles.reactPlayer}>
      <video
        className={styles.video}
        ref={videoRef}
        onDurationChange={onVideoDurationChange}
        onTimeUpdate={onVideoTimeUpdate}
        onProgress={onVideoProgress}
        onCanPlay={onVideoCanPlay}
        onPause={onVideoPause}
        onPlay={onVideoPlay}
        onPlaying={onVideoPlaying}
        onEnded={onVideoEnded}
        onSeeked={onVideoSeeked}
        onSeeking={onVideoSeeking}
        onCanPlayThrough={onVideoCanPlayThrough}
        onWaiting={onVideoWaiting}
        onVolumeChange={onVideoVolumeChange}
        onRateChange={onVideoRateChange}
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
      <ReactPlayerSkin
        // streamType={streamType}
        controls={controls}
        loading={loading}
        paused={paused}
        ended={ended}
        seeking={seeking}
        waiting={waiting}
        duration={duration}
        buffered={buffered}
        currentTime={currentTimeState}
        setCurrentTime={setCurrentTimeState}
        muted={mutedState}
        volume={volumeState}
        playbackRate={rate}
      />
    </div>
  );
};

ReactPlayer.propTypes = {
  streamType: PropTypes.oneOf(['live', 'record']),
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

ReactPlayer.defaultProps = {
  streamType: 'live',
  src: '',
  type: '',
  debug: false,
  controls: true,
  muted: true,
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

export default ReactPlayer;
