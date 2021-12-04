import React from 'react';
import PropTypes from 'prop-types';

import PreventedTip from './PreventedTip';
import VideoMask from './VideoMask';
import PlayState from './PlayState';
import TopState from './TopState';

import Controls from './Controls';
import ControlBar from './ControlBar';
import TimeSlider from './TimeSlider';
import PlayButton from './Controls/PlayButton';
import Volume from './Volume';
import PlayTime from './PlayTime';
import PlayRate from './Controls/PlayRate';
import FullscreenButton from './Controls/FullscreenButton';
import PictureInPicture from './Controls/PictureInPicture';

import usePlayerSkin from './usePlayerSkin';
import useAutoHide from './useAutoHide';
import 'antd/lib/tooltip/style/index.css';
import 'antd/lib/slider/style/index.css';
import 'antd/lib/dropdown/style/index.css';
import styles from './index.module.less';

const PlayerSkin = ({
  live,
  src,
  prevented,
  loading,
  paused,
  ended,
  seeking,
  waiting,
  onPlayClick,
  onPauseClick,
  duration,
  buffered,
  currentTime,
  changeCurrentTime,
  muted,
  volume,
  changeVolume,
  onMutedClick,
  playbackRate,
  changePlaybackRate,
  pictureInPictureEnabled,
  pip,
  requestPictureInPicture,
  exitPictureInPicture,
  fullscreen,
  requestFullscreen,
  exitFullscreen,
  kernelMsg,
}) => {
  const { dispatch, controlsHovering, hiding, sliding, value, tooltip, rateMenuVisible } = usePlayerSkin();

  const { show } = useAutoHide({
    src,
    loading,
    prevented,
    paused,
    ended,
    waiting,
    seeking,
    kernelMsg,
    dispatch,
    controlsHovering,
    sliding,
    rateMenuVisible,
  });

  return (
    <div className={styles.playerSkin}>
      <PreventedTip src={src} prevented={prevented} />
      <VideoMask src={src} showControls={show} />
      <PlayState
        src={src}
        loading={loading}
        prevented={prevented}
        paused={paused}
        ended={ended}
        waiting={waiting}
        seeking={seeking}
        kernelMsg={kernelMsg}
        onPlayClick={onPlayClick}
      />
      <Controls hiding={hiding} dispatch={dispatch}>
        {false === live && (
          <TimeSlider
            currentTime={currentTime}
            duration={duration}
            buffered={buffered}
            onChange={changeCurrentTime}
            sliding={sliding}
            value={value}
            tooltip={tooltip}
            dispatch={dispatch}
          />
        )}
        <ControlBar
          extra={
            <>
              <PictureInPicture
                pictureInPictureEnabled={pictureInPictureEnabled}
                pip={pip}
                requestPictureInPicture={requestPictureInPicture}
                exitPictureInPicture={exitPictureInPicture}
              />
              <PlayRate
                live={live}
                playbackRate={playbackRate}
                changePlaybackRate={changePlaybackRate}
                dispatch={dispatch}
                visible={rateMenuVisible}
              />
              <FullscreenButton
                fullscreen={fullscreen}
                requestFullscreen={requestFullscreen}
                exitFullscreen={exitFullscreen}
              />
            </>
          }
        >
          <PlayButton
            prevented={prevented}
            paused={paused}
            ended={ended}
            onPauseClick={onPauseClick}
            onPlayClick={onPlayClick}
          />
          <Volume muted={muted} volume={volume} onMutedClick={onMutedClick} changeVolume={changeVolume} />
          <PlayTime live={live} currentTime={currentTime} duration={duration} />
        </ControlBar>
      </Controls>
      <TopState src={src} loading={loading} kernelMsg={kernelMsg} />
    </div>
  );
};

PlayerSkin.propTypes = {
  live: PropTypes.bool,
  src: PropTypes.string,
  // controls: PropTypes.bool.isRequired,
  // state
  loading: PropTypes.bool.isRequired,
  prevented: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  ended: PropTypes.bool.isRequired,
  seeking: PropTypes.bool.isRequired,
  waiting: PropTypes.bool.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
  // time
  duration: PropTypes.number.isRequired,
  buffered: PropTypes.object,
  currentTime: PropTypes.number.isRequired,
  changeCurrentTime: PropTypes.func.isRequired,
  // volume
  muted: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  changeVolume: PropTypes.func.isRequired,
  onMutedClick: PropTypes.func.isRequired,
  // playbackRate
  playbackRate: PropTypes.number.isRequired,
  changePlaybackRate: PropTypes.func.isRequired,
  // pip
  pictureInPictureEnabled: PropTypes.bool.isRequired,
  pip: PropTypes.bool.isRequired,
  requestPictureInPicture: PropTypes.func.isRequired,
  exitPictureInPicture: PropTypes.func.isRequired,
  // fullscreen
  fullscreen: PropTypes.bool.isRequired,
  requestFullscreen: PropTypes.func.isRequired,
  exitFullscreen: PropTypes.func.isRequired,
  // kernel
  kernelMsg: PropTypes.object,
};

PlayerSkin.defaultProps = {
  live: false,
  src: '',
  buffered: null,
  kernelMsg: null,
};

export default React.memo(
  PlayerSkin,
  (p, n) =>
    p.live === n.live &&
    p.src === n.src &&
    // p.controls === n.controls &&
    p.loading === n.loading &&
    p.prevented === n.prevented &&
    p.paused === n.paused &&
    p.seeking === n.seeking &&
    p.waiting === n.waiting &&
    p.duration === n.duration &&
    p.currentTime === n.currentTime &&
    p.buffered === n.buffered &&
    p.muted === n.muted &&
    p.volume === n.volume &&
    p.playbackRate === n.playbackRate &&
    p.pictureInPictureEnabled === n.pictureInPictureEnabled &&
    p.pip === n.pip &&
    p.fullscreen === n.fullscreen &&
    p.kernelMsg === n.kernelMsg &&
    p.getVideoElement === n.getVideoElement &&
    p.onPauseClick === n.onPauseClick &&
    p.onPlayClick === n.onPlayClick &&
    p.changeCurrentTime === n.changeCurrentTime &&
    p.onMutedClick === n.onMutedClick &&
    p.changeVolume === n.changeVolume &&
    p.changePlaybackRate === n.changePlaybackRate &&
    p.requestPictureInPicture === n.requestPictureInPicture &&
    p.exitPictureInPicture === n.exitPictureInPicture &&
    p.requestFullscreen === n.requestFullscreen &&
    p.exitFullscreen === n.exitFullscreen,
);
