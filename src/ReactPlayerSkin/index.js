import React from 'react';
import PropTypes from 'prop-types';
// import numeral from 'numeral';
// import { Slider, Dropdown, Menu } from 'antd';
// import Icon, {
//   LoadingOutlined,
//   PlayCircleOutlined,
//   CaretRightOutlined,
//   PauseOutlined,
//   FullscreenExitOutlined,
//   FullscreenOutlined,
// } from '@ant-design/icons';

import TimeSlider from '../TimeSlider';
import PlayButton from './PlayButton';
import Volume from './Volume';
import Time from './Time';
import FullscreenButton from './FullscreenButton';
import PlayRate from './PlayRate';
import PlayState from './PlayState';
import TopState from './TopState';

import useAutoHide from './useAutoHide';
import 'antd/lib/tooltip/style/index.css';
import 'antd/lib/slider/style/index.css';
import 'antd/lib/dropdown/style/index.css';
import styles from './index.module.less';

import bgImg from './bg.png';

const ReactPlayerSkin = ({
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
  const [sliding, setSliding] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const { onMouseEnter, onMouseLeave, show, hiding } = useAutoHide({
    src,
    loading,
    prevented,
    paused,
    ended,
    waiting,
    seeking,
    sliding,
    visible,
    kernelMsg,
  });

  return (
    <div className={styles.reactPlayerSkin}>
      {src && prevented && <div className={styles.preventedTip}>视频播放被阻止</div>}
      <button
        type="button"
        className={src ? styles.hiddenVideoMask : styles.videoMask}
        onMouseMove={show}
        onClick={show}
      />
      <PlayState
        src={src}
        loading={loading}
        prevented={prevented}
        paused={paused}
        ended={ended}
        waiting={waiting}
        seeking={seeking}
        currentTime={currentTime}
        duration={duration}
        kernelMsg={kernelMsg}
        onPlayClick={onPlayClick}
      />
      <div
        className={styles.controls}
        style={{ backgroundImage: `url(${bgImg})`, transform: hiding ? 'translate(0, 48px)' : 'translate(0, 0)' }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {false === live && (
          <TimeSlider
            duration={duration}
            currentTime={currentTime}
            buffered={buffered}
            sliding={sliding}
            setSliding={setSliding}
            onChange={changeCurrentTime}
          />
        )}
        <div className={styles.bar}>
          {/* <img src=""> */}
          <div className={styles.flexItem}>
            <PlayButton
              prevented={prevented}
              paused={paused}
              ended={ended}
              onPauseClick={onPauseClick}
              onPlayClick={onPlayClick}
            />
            <Volume muted={muted} volume={volume} onMutedClick={onMutedClick} changeVolume={changeVolume} />
            <Time live={live} currentTime={currentTime} duration={duration} />
          </div>
          {pictureInPictureEnabled && (
            <button
              type="button"
              className={styles.textBtn}
              onClick={pip ? exitPictureInPicture : requestPictureInPicture}
            >
              画中画
            </button>
          )}
          {false === live && (
            <PlayRate
              playbackRate={playbackRate}
              changePlaybackRate={changePlaybackRate}
              visible={visible}
              setVisible={setVisible}
            />
          )}
          <FullscreenButton
            fullscreen={fullscreen}
            requestFullscreen={requestFullscreen}
            exitFullscreen={exitFullscreen}
          />
        </div>
      </div>
      <TopState src={src} loading={loading} currentTime={currentTime} duration={duration} kernelMsg={kernelMsg} />
    </div>
  );
};

ReactPlayerSkin.propTypes = {
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

ReactPlayerSkin.defaultProps = {
  live: false,
  src: '',
  buffered: null,
  kernelMsg: null,
};

export default React.memo(
  ReactPlayerSkin,
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
