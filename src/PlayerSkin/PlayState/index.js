import React from 'react';
import PropTypes from 'prop-types';
import { LoadingOutlined, PlayCircleOutlined } from '@ant-design/icons';

import styles from './index.module.less';

const PlayState = ({ src, prevented, loading, paused, ended, seeking, waiting, kernelMsg, onPlayClick }) => {
  if (!src || loading || kernelMsg) {
    return null;
  }

  if (waiting || seeking) {
    return (
      <div className={styles.loading}>
        <LoadingOutlined />
      </div>
    );
  }
  if (prevented || paused || ended) {
    return (
      <button type="button" className={styles.play} onClick={onPlayClick}>
        <PlayCircleOutlined />
      </button>
    );
  }
  return null;
};

PlayState.propTypes = {
  src: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  prevented: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  ended: PropTypes.bool.isRequired,
  seeking: PropTypes.bool.isRequired,
  waiting: PropTypes.bool.isRequired,
  kernelMsg: PropTypes.object,
  onPlayClick: PropTypes.func.isRequired,
};

PlayState.defaultProps = {
  kernelMsg: null,
};

export default React.memo(
  PlayState,
  (p, n) =>
    p.src === n.src &&
    p.loading === n.loading &&
    p.prevented === n.prevented &&
    p.paused === n.paused &&
    p.ended === n.ended &&
    p.seeking === n.seeking &&
    p.waiting === n.waiting &&
    p.kernelMsg === n.kernelMsg &&
    p.onPlayClick === n.onPlayClick,
);
