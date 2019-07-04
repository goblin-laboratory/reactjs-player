import React from 'react';
import PropTypes from 'prop-types';
// import ReactSWF from 'react-swf';
import numeral from 'numeral';
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

const getValue = (e, rect, duration) => {
  const w = e.clientX - rect.left;
  if (0 >= w) {
    return 0;
  }
  if (w >= rect.width) {
    return duration;
  }
  return Math.round((duration * (e.clientX - rect.left)) / rect.width);
};

const getBufferedTranslateX = ({ buffered, currentTime, sliding, duration }) => {
  if (0 >= duration || sliding) {
    return '-100%';
  }
  const e = getBufferedEnd(currentTime, buffered);
  return `${(100 * e) / duration - 100}%`;
};

const getTrackTranslateX = ({ duration, currentTime, value, sliding }) => {
  if (0 > duration) {
    return '0';
  }
  if (0 === duration) {
    return '-100%';
  }
  if (sliding) {
    return `${(100 * value) / duration - 100}%`;
  }
  return `${(100 * currentTime) / duration - 100}%`;
};

const getMouseTranslateX = ({ duration, mousePos }) => {
  if (0 >= duration) {
    return '0';
  }
  return `${(100 * mousePos) / duration}%`;
};

const Slider = React.memo(({ currentTime, duration, buffered, onChange }) => {
  const [value, setValue] = React.useState(currentTime);
  const [sliding, setSliding] = React.useState(false);
  const [mouseovered, setMouseovered] = React.useState(false);
  const [mousePos, setMousePos] = React.useState(0);
  const sliderRef = React.useRef(null);
  const rectRef = React.useRef(null);

  React.useEffect(() => {
    if ((sliding || mouseovered) && sliderRef && sliderRef.current) {
      rectRef.current = sliderRef.current.getBoundingClientRect();
    }
    return () => {
      rectRef.current = null;
    };
  }, [sliding, mouseovered]);

  const onClick = React.useCallback(
    e => {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      const v = getValue(e, rect, duration);
      onChange(v);
      setSliding(false);
    },
    [onChange, duration],
  );

  const onMouseUp = React.useCallback(
    e => {
      e.preventDefault();
      if (!rectRef || !rectRef.current) {
        return;
      }
      const v = getValue(e, rectRef.current, duration);
      onChange(v);
      setSliding(false);
    },
    [onChange, duration],
  );

  const onMouseMove = React.useCallback(
    e => {
      e.preventDefault();
      if (!rectRef || !rectRef.current) {
        return;
      }
      const v = getValue(e, rectRef.current, duration);
      setValue(v);
    },
    [duration],
  );

  const onMouseDown = React.useCallback(e => {
    e.preventDefault();
    setSliding(true);
  }, []);

  React.useEffect(() => {
    if (sliding) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
    } else {
      return () => {};
    }
  }, [sliding, onMouseMove, onMouseUp]);

  const onSliderMouseOver = React.useCallback(() => {
    if (0 < duration) {
      setMouseovered(true);
    }
  }, [duration]);

  const onSliderMouseOut = React.useCallback(() => {
    setMouseovered(false);
  }, []);

  const onSliderMouseMove = React.useCallback(
    e => {
      e.preventDefault();
      if (0 >= duration || !rectRef || !rectRef.current) {
        return;
      }
      const v = getValue(e, rectRef.current, duration);
      setMousePos(v);
    },
    [duration],
  );

  const bufferedTranslateX = getBufferedTranslateX({ buffered, currentTime, sliding, duration });
  const trackTranslateX = getTrackTranslateX({ duration, currentTime, value, sliding });
  const mouseTranslateX = getMouseTranslateX({ duration, mousePos });

  return (
    <div
      className={sliding ? styles.slidingSlider : styles.slider}
      ref={sliderRef}
      onClick={onClick}
      onMouseOver={onSliderMouseOver}
      onMouseOut={onSliderMouseOut}
      onMouseMove={onSliderMouseMove}
    >
      <div className={styles.sliderRail}>
        <div className={styles.sliderBuffered} style={{ transform: `translateX(${bufferedTranslateX})` }} />
        <div className={styles.sliderTrack} style={{ transform: `translateX(${trackTranslateX})` }} />
      </div>
      <div className={styles.sliderHandleRail} style={{ transform: `translateX(${trackTranslateX})` }}>
        <div tabIndex={0} className={styles.sliderHandle} onMouseDown={onMouseDown} />
      </div>
      <div
        className={styles.mousePosTip}
        style={{ transform: `translateX(${mouseTranslateX})`, visibility: mouseovered ? 'visible' : 'hidden' }}
      >
        <div className={styles.tip}>{numeral(mousePos).format('00:00:00')}</div>
      </div>
    </div>
  );
});

Slider.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  buffered: PropTypes.object,
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
