import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.less';

const getBufferedEnd = (currentTime, buffered) => {
  for (let i = buffered.length - 1; 0 <= i; i -= 1) {
    const end = buffered.end(i);
    if (currentTime <= end && buffered.start(i) <= currentTime) {
      return end;
    }
  }
  return 0;
};

// const getMousePosition = e => {
//   if (!e || !e.target) {
//     return null;
//   }
//   const p = e.target.getBoundingClientRect();
//   const x = Math.floor((e.target.width * (e.clientX - p.left)) / p.width);
//   const y = Math.floor((e.target.height * (e.clientY - p.top)) / p.height);
//   return { x, y };
// };

// const coordsForTouchEvent = e => {
//   if (!e || !e.target) {
//     return null;
//   }
//   const p = e.target.getBoundingClientRect();
//   const x = Math.round((e.target.width * (e.changedTouches[0].clientX - p.left)) / p.width);
//   const y = Math.round((e.target.height * (e.changedTouches[0].clientY - p.top)) / p.height);
//   return { x, y };
// };

export default class Slider extends React.PureComponent {
  static propTypes = {
    isLive: PropTypes.bool.isRequired,
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    buffered: PropTypes.array,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => {},
    buffered: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      // src: '',
    };
    this.sliderRef = React.createRef();
  }

  onClick = e => {
    e.preventDefault();
    if (this.props.isLive || 0 === this.props.duration) {
      return;
    }
    const value = this.getMouseEventValue(e);
    this.props.onChange(value);
  };

  onMouseDown = e => {
    e.preventDefault();
    if (this.props.isLive || 0 === this.props.duration) {
      return;
    }
    // e.target.onselectstart = () => false;
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  };

  onMouseMove = e => {
    e.preventDefault();
    if (this.props.isLive || 0 === this.props.duration) {
      return;
    }
    const value = this.getMouseEventValue(e);
    this.props.onChange(value);
  };

  onMouseUp = e => {
    e.preventDefault();
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    if (this.props.isLive || 0 === this.props.duration) {
      return;
    }
    const value = this.getMouseEventValue(e);
    this.props.onChange(value);
  };

  onTouchStart = e => {
    e.preventDefault();
    if (this.props.isLive || 0 === this.props.duration) {
      return;
    }
    document.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener('touchend', this.onTouchEnd);
    document.addEventListener('touchcancel', this.onTouchEnd);
  };

  onTouchMove = e => {
    e.preventDefault();
    if (this.props.isLive || 0 === this.props.duration) {
      return;
    }
    const value = this.getTouchEventValue(e);
    this.props.onChange(value);
  };

  onTouchEnd = e => {
    e.preventDefault();
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onTouchEnd);
    document.removeEventListener('touchcancel', this.onTouchEnd);
    if (this.props.isLive || 0 === this.props.duration) {
      return;
    }
    const value = this.getTouchEventValue(e);
    this.props.onChange(value);
  };

  getMouseEventValue = e => {
    if (!this.sliderRef || !this.sliderRef.current) {
      return 0;
    }
    const rect = this.sliderRef.current.getBoundingClientRect();
    let value = Math.floor((this.props.duration * (e.clientX - rect.left)) / rect.width);
    if (0 > value) {
      value = 0;
    } else if (value > this.props.duration) {
      value = this.props.duration;
    }
    return value;
  };

  getTouchEventValue = e => {
    if (!this.sliderRef || !this.sliderRef.current) {
      return 0;
    }
    const rect = this.sliderRef.current.getBoundingClientRect();
    let value = Math.floor((this.props.duration * (e.changedTouches[0].clientX - rect.left)) / rect.width);
    if (0 > value) {
      value = 0;
    } else if (value > this.props.duration) {
      value = this.props.duration;
    }
    return value;
  };

  render() {
    const { isLive, currentTime, buffered, duration } = this.props;
    let bufferedWidth = '0';
    let trackWidth = '100%';
    if (!(isLive || 0 === duration)) {
      const end = getBufferedEnd(currentTime, buffered);
      bufferedWidth = `${(100 * end) / duration}%`;
      trackWidth = `${(100 * currentTime) / duration}%`;
    }
    return (
      // eslint-disable-next-line
      <div ref={this.sliderRef} className={styles.slider} onClick={this.onClick}>
        <div className={styles.sliderRail} />
        <div className={styles.sliderBuffered} style={{ width: bufferedWidth }} />
        <div className={styles.sliderTrack} style={{ width: trackWidth }} />
        {/* eslint-disable-next-line */}
        <div
          className={styles.sliderHandle}
          style={{ left: trackWidth }}
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onTouchStart}
        />
      </div>
    );
  }
}
