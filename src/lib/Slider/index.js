import React from 'react';
import PropTypes from 'prop-types';
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

export default class Slider extends React.PureComponent {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    buffered: PropTypes.object.isRequired,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      // src: '',
      value: 100,
    };
    this.sliderRef = React.createRef();
  }

  onClick = e => {
    e.preventDefault();
    if (this.props.disabled) {
      return;
    }
    const value = this.getMouseEventValue(e);
    this.props.onChange(value);
  };

  onMouseDown = e => {
    e.preventDefault();
    if (this.props.disabled) {
      return;
    }
    e.target.onselectstart = () => false;
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  };

  onMouseMove = e => {
    e.preventDefault();
    if (this.props.disabled) {
      return;
    }
    const value = this.getMouseEventValue(e);
    this.props.onChange(value);
  };

  onMouseUp = e => {
    e.preventDefault();
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    if (this.props.disabled) {
      return;
    }
    const value = this.getMouseEventValue(e);
    this.props.onChange(value);
  };

  onTouchStart = e => {
    e.preventDefault();
    if (this.props.disabled) {
      return;
    }
    document.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener('touchend', this.onTouchEnd);
    document.addEventListener('touchcancel', this.onTouchEnd);
  };

  onTouchMove = e => {
    e.preventDefault();
    if (this.props.disabled) {
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
    if (this.props.disabled) {
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
    let value = Math.floor((this.props.max * (e.clientX - rect.left)) / rect.width);
    if (0 > value) {
      value = 0;
    } else if (value > this.props.max) {
      value = this.props.max;
    }
    return value;
  };

  getTouchEventValue = e => {
    if (!this.sliderRef || !this.sliderRef.current) {
      return 0;
    }
    const rect = this.sliderRef.current.getBoundingClientRect();
    let value = Math.floor((this.props.max * (e.changedTouches[0].clientX - rect.left)) / rect.width);
    if (0 > value) {
      value = 0;
    } else if (value > this.props.max) {
      value = this.props.max;
    }
    return value;
  };

  render() {
    const { value, buffered, max } = this.props;
    let bufferedWidth = '0';
    let trackWidth = '100%';
    if (0 < max) {
      const end = getBufferedEnd(value, buffered);
      bufferedWidth = `${(100 * end) / max}%`;
      trackWidth = `${(100 * value) / max}%`;
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
