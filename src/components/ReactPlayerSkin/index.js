import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { Icon, Slider, Dropdown, Menu } from 'antd';
import CurrentTimeSlider from './CurrentTimeSlider';
import styles from './index.module.less';

import { ReactComponent as MutedSvg } from './muted.svg';
import { ReactComponent as UnmutedSvg } from './unmuted.svg';

const ReactPlayerSkin = React.memo(
  ({
    controls,
    loading,
    paused,
    waiting,
    seeking,
    ended,
    duration,
    currentTime,
    buffered,
    muted,
    volume,
    playbackRate,
    fullScreen,

    changeCurrentTime,
    onPauseClick,
    onPlayClick,
    onMutedClick,
    changeVolume,
    onPiPClick,
    requestFullscreen,
    changePlaybackRate,

    playerMsg,
  }) => {
    const [hiding, setHiding] = React.useState(false);
    const [hovering, setHovering] = React.useState(false);
    const [sliding, setSliding] = React.useState(false);
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
      if (hiding || hovering || sliding) {
        return () => {};
      }
      const id = setTimeout(() => setHiding(true), 3000);
      return () => clearTimeout(id);
    }, [hiding, hovering, sliding]);

    React.useEffect(() => {
      if (hiding) {
        setVisible(false);
      }
      return () => {};
    }, [hiding]);

    const onBodyClick = React.useCallback(() => setVisible(false), []);
    React.useEffect(() => {
      document.body.addEventListener('click', onBodyClick);
      return () => document.body.removeEventListener('click', onBodyClick);
    }, [onBodyClick]);

    const onMenuClick = React.useCallback(
      e => {
        changePlaybackRate(parseFloat(e.key, 10));
        setVisible(false);
      },
      [changePlaybackRate],
    );

    if (!controls) {
      return <div className={styles.reactPlayerSkin} />;
    }

    return (
      <div className={styles.reactPlayerSkin} onMouseMove={() => setHiding(false)}>
        {(waiting || seeking) && !loading && (
          <div className={styles.waiting}>
            <Icon type="loading" />
          </div>
        )}
        {ended && (
          <button className={styles.ended} onClick={onPlayClick}>
            <Icon type="play-circle" />
          </button>
        )}
        <div
          className={hiding && !hovering && !sliding ? styles.hiddenControls : styles.controls}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <CurrentTimeSlider
            duration={duration}
            currentTime={currentTime}
            buffered={buffered}
            setSliding={setSliding}
            onChange={changeCurrentTime}
          />
          <div className={styles.bar}>
            <div className={styles.flexItem}>
              {ended && (
                <button type="button" onClick={onPlayClick}>
                  <Icon type="caret-right" />
                </button>
              )}
              {paused && !ended && (
                <button type="button" onClick={onPlayClick}>
                  <Icon type="caret-right" />
                </button>
              )}
              {!paused && !ended && (
                <button type="button" onClick={onPauseClick}>
                  <Icon type="pause" />
                </button>
              )}
              {(muted || 0 === volume) && (
                <button type="button" onClick={onMutedClick}>
                  <Icon component={MutedSvg} />
                </button>
              )}
              {!muted && 0 !== volume && (
                <button type="button" onClick={onMutedClick}>
                  <Icon component={UnmutedSvg} />
                </button>
              )}
              <span className={styles.volumeSlider}>
                <Slider value={volume} onChange={changeVolume} max={1} step={0.1} tipFormatter={v => v * 100} />
              </span>
              <span className={styles.controlText}>
                {numeral(currentTime).format('00:00:00')}
                {0 <= duration ? ` / ${numeral(duration).format('00:00:00')}` : ''}
              </span>
              {0 > duration && (
                <span className={styles.controlText}>
                  <span className={styles.liveDot} />
                  直播
                </span>
              )}
            </div>
            {document.pictureInPictureEnabled && (
              <button type="button" className={styles.textBtn} onClick={onPiPClick}>
                画中画
              </button>
            )}
            {0 <= duration && (
              <Dropdown
                visible={visible}
                overlay={
                  <Menu selectedKeys={[playbackRate.toString()]} onClick={onMenuClick}>
                    <Menu.Item key="0.25">&nbsp;&nbsp;0.25 倍速&nbsp;&nbsp;</Menu.Item>
                    <Menu.Item key="0.5">&nbsp;&nbsp;0.5 倍速&nbsp;&nbsp;</Menu.Item>
                    <Menu.Item key="1">&nbsp;&nbsp;1 倍速&nbsp;&nbsp;</Menu.Item>
                    <Menu.Item key="1.25">&nbsp;&nbsp;1.25 倍速&nbsp;&nbsp;</Menu.Item>
                    <Menu.Item key="1.5">&nbsp;&nbsp;1.5 倍速&nbsp;&nbsp;</Menu.Item>
                    <Menu.Item key="2">&nbsp;&nbsp;2 倍速&nbsp;&nbsp;</Menu.Item>
                    <Menu.Item key="4">&nbsp;&nbsp;4 倍速&nbsp;&nbsp;</Menu.Item>
                  </Menu>
                }
                placement="topRight"
                trigger={['click']}
              >
                <button type="button" className={styles.textBtn} onClick={() => setVisible(true)}>
                  倍速
                </button>
              </Dropdown>
            )}
            {fullScreen && (
              <button type="button" onClick={() => document.exitFullscreen()}>
                <Icon type="fullscreen-exit" />
              </button>
            )}
            {!fullScreen && (
              <button type="button" onClick={requestFullscreen}>
                <Icon type="fullscreen" />
              </button>
            )}
          </div>
        </div>
        {loading && !playerMsg && (
          <div className={styles.loading}>
            <Icon type="loading" />
          </div>
        )}
        {playerMsg && (
          <div className={styles.playerMsg}>
            {playerMsg.type}: {playerMsg.detail}
          </div>
        )}
      </div>
    );
  },
);

ReactPlayerSkin.propTypes = {
  controls: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  ended: PropTypes.bool.isRequired,
  seeking: PropTypes.bool.isRequired,
  waiting: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  buffered: PropTypes.object,
  currentTime: PropTypes.number.isRequired,
  changeCurrentTime: PropTypes.func.isRequired,
  muted: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  playbackRate: PropTypes.number.isRequired,
  changePlaybackRate: PropTypes.func,
  fullScreen: PropTypes.bool.isRequired,
  onPlayClick: PropTypes.func,
  onPauseClick: PropTypes.func,
  onMutedClick: PropTypes.func,
  changeVolume: PropTypes.func,
  onPiPClick: PropTypes.func,
  requestFullscreen: PropTypes.func,
  playerMsg: PropTypes.object,
};

ReactPlayerSkin.defaultProps = {
  buffered: null,
  onPlayClick: () => {},
  onPauseClick: () => {},
  onMutedClick: () => {},
  changeVolume: () => {},
  onPiPClick: () => {},
  requestFullscreen: () => {},
  changePlaybackRate: () => {},
  playerMsg: null,
};

export default ReactPlayerSkin;
