import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import styles from './index.module.less';

const Time = ({ live, duration, currentTime }) => {
  return (
    <span className={styles.controlText}>
      {numeral(Math.round(currentTime)).format('00:00:00')}
      {live ? (
        <span className={styles.controlText}>
          <span className={styles.liveDot} />
          直播
        </span>
      ) : (
        ` / ${numeral(Math.round(duration)).format('00:00:00')}`
      )}
    </span>
  );
};

Time.propTypes = {
  live: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
};

export default React.memo(
  Time,
  (p, n) => p.live === n.live && p.duration === n.duration && p.currentTime === n.currentTime,
);
