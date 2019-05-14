import React from 'react';
import PropTypes from 'prop-types';
// import ReactSWF from 'react-swf';
import styles from './index.module.less';

const getBufferedEnd = (currentTime, buffered) => {
  if (!buffered) {
    return 0;
  }
  for (let i = buffered.length - 1; 0 <= i; i -= 1) {
    const end = buffered.end(i);
    if (currentTime <= end && buffered.start(i) <= currentTime) {
      return end;
    }
  }
  return 0;
};

const Slider = ({ currentTime, duration, buffered, onChange }) => {
  let bufferedWidth = '0';
  let trackWidth = '100%';
  if (0 < duration) {
    const end = getBufferedEnd(currentTime, buffered);
    bufferedWidth = `${(100 * end) / duration}%`;
    trackWidth = `${(100 * currentTime) / duration}%`;
  }
  return (
    <div className={styles.slider}>
      <div className={styles.sliderRail} />
      <div className={styles.sliderBuffered} style={{ width: bufferedWidth }} />
      <div className={styles.sliderTrack} style={{ width: trackWidth }} />
      <div
        className={styles.sliderHandle}
        style={{ left: trackWidth }}
        // onMouseDown={this.onMouseDown}
        // onTouchStart={this.onTouchStart}
      />
    </div>
  );
};

Slider.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  buffered: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  setSliding: PropTypes.func,
};

Slider.defaultProps = {
  currentTime: 0,
  buffered: null,
  duration: 0,
  onChange: () => {},
  setSliding: () => {},
};

export default Slider;
