import React from 'react';
import PropTypes from 'prop-types';
// import ReactSWF from 'react-swf';
import { Icon } from 'antd';
import Slider from './Slider';
import styles from './index.module.less';

const ReactPlayerSkin = ({
  streamType,
  controls,
  loading,
  waiting,
  seeking,
  ended,
  duration,
  currentTime,
  setCurrentTime,
  buffered,
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
      <div className={styles.controls} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
        <Slider
          duration={duration}
          currentTime={currentTime}
          buffered={buffered}
          setSliding={setSliding}
          onChange={setCurrentTime}
        />
        <div style={{ display: hiding && !hovering && !sliding ? 'none' : 'block' }}>控制栏</div>
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
  streamType: PropTypes.oneOf(['live', 'record']),
  controls: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  ended: PropTypes.bool.isRequired,
  seeking: PropTypes.bool.isRequired,
  waiting: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  buffered: PropTypes.object.isRequired,
  currentTime: PropTypes.number.isRequired,
  setCurrentTime: PropTypes.func.isRequired,
  muted: PropTypes.bool.isRequired,
  volume: PropTypes.bool.isRequired,
};

ReactPlayerSkin.defaultProps = {
  streamType: 'live',
};

export default ReactPlayerSkin;
