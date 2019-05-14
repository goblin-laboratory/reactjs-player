import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayerSkin from '../ReactPlayerSkin';
import styles from './index.module.less';

const ReactPlayer = ({ streamType, src, type, autoPlay, controls, muted, currentTime }) => {
  const [loading, setLoading] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [ended, setEnded] = React.useState(false);
  const [seeking, setSeeking] = React.useState(false);
  const [waiting, setWaiting] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentTimeState, setCurrentTimeState] = React.useState(0);
  const [buffered, setBuffered] = React.useState(null);
  const [mutedState, setMutedState] = React.useState(muted);
  const [volumeState, setVolumeState] = React.useState(100);

  React.useEffect(() => {
    debugger;
  }, [src, type, autoPlay]);

  return (
    <div className={styles.reactPlayer}>
      <ReactPlayerSkin
        streamType={streamType}
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
      />
    </div>
  );
};

ReactPlayer.propTypes = {
  streamType: PropTypes.oneOf(['live', 'record']),
  src: PropTypes.string,
  type: PropTypes.string,
  controls: PropTypes.bool,
  muted: PropTypes.bool,
  autoPlay: PropTypes.bool,
  currentTime: PropTypes.number,
};

ReactPlayer.defaultProps = {
  streamType: 'live',
  src: '',
  type: '',
  controls: true,
  muted: true,
  autoPlay: true,
  currentTime: 0,
};

export default ReactPlayer;
