import React from 'react';
import PropTypes from 'prop-types';
// import ReactSWF from 'react-swf';
import numeral from 'numeral';
import { Icon, Slider, Dropdown, Menu } from 'antd';
import CurrentTimeSlider from './CurrentTimeSlider';
import styles from './index.module.less';

import { ReactComponent as MutedSvg } from './muted.svg';
import { ReactComponent as UnmutedSvg } from './unmuted.svg';

const ReactPlayerSkin = ({
  controls,
  loading,
  paused,
  waiting,
  seeking,
  ended,
  duration,
  currentTime,
  setCurrentTime,
  buffered,
  muted,
  volume,
  fullScreen,
  onRestartClick,
}) => {
  const [hiding, setHiding] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);
  const [sliding, setSliding] = React.useState(false);

  React.useEffect(() => {
    if (hiding || hovering || sliding) {
      return () => {};
    }
    const id = setTimeout(() => setHiding(true), 3000);
    return () => clearTimeout(id);
  }, [hiding, hovering, sliding]);

  if (!controls) {
    return <div className={styles.reactPlayerSkin} />;
  }

  return (
    <div className={styles.reactPlayerSkin} onMouseMove={() => setHiding(false)}>
      {(waiting || seeking) && (
        <div className={styles.waiting}>
          <Icon type="loading" />
        </div>
      )}
      {ended && (
        <div className={styles.ended}>
          <Icon type="play-circle" />
        </div>
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
          onChange={setCurrentTime}
        />
        <div className={styles.bar}>
          <div className={styles.flexItem}>
            {ended && (
              <button type="button" onClick={onRestartClick}>
                <Icon type="reload" />
              </button>
            )}
            {paused && !ended && (
              <button type="button" onClick={onRestartClick}>
                <Icon type="caret-right" />
              </button>
            )}
            {!paused && !ended && (
              <button type="button" onClick={onRestartClick}>
                <Icon type="pause" />
              </button>
            )}
            {(muted || 0 === volume) && (
              <button type="button" onClick={onRestartClick}>
                <Icon component={UnmutedSvg} />
              </button>
            )}
            {!muted && 0 !== volume && (
              <button type="button" onClick={onRestartClick}>
                <Icon component={MutedSvg} />
              </button>
            )}
            <span className={styles.volumeSlider}>
              <Slider value={volume} onChange={onRestartClick} max={1} step={0.1} />
            </span>
            {0 > duration && (
              <span className={styles.controlText}>
                <span className={styles.liveDot} />
                直播
              </span>
            )}
            {0 <= duration && (
              <span className={styles.controlText}>
                {numeral(currentTime).format('00:00:00')} / {numeral(duration).format('00:00:00')}
              </span>
            )}
          </div>
          <button type="button" className={styles.pipBtn}>
            画中画
          </button>
          {0 <= duration && (
            <Dropdown
              overlay={
                <Menu>
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
              <button type="button" className={styles.pipBtn}>
                倍速
              </button>
            </Dropdown>
          )}
          {fullScreen && (
            <button type="button">
              <Icon type="fullscreen-exit" />
            </button>
          )}
          {!fullScreen && (
            <button type="button">
              <Icon type="fullscreen" />
            </button>
          )}
        </div>
      </div>
      {loading && (
        <div className={styles.loading}>
          <Icon type="loading" />
        </div>
      )}
    </div>
  );
};

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
  setCurrentTime: PropTypes.func.isRequired,
  muted: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  onRestartClick: PropTypes.func,
};

ReactPlayerSkin.defaultProps = {
  buffered: null,
  onRestartClick: () => {},
};

export default ReactPlayerSkin;
