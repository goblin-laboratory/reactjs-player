/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
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

const getEventXCoordinate = e => {
  if (e.changedTouches && 1 <= e.changedTouches.length) {
    return e.changedTouches[0].pageX;
  }
  return e.clientX || 0;
};

const getValue = (e, rect, duration) => {
  const w = getEventXCoordinate(e) - rect.left;
  if (0 >= w) {
    return 0;
  }
  if (w >= rect.width) {
    return duration;
  }
  return Math.round((duration * w) / rect.width);
};

const getBufferedScaleX = ({ buffered, currentTime, sliding, duration, live }) => {
  if (live || 0 >= duration || sliding) {
    return 0;
  }
  const e = getBufferedEnd(currentTime, buffered);
  return (e / duration).toFixed(3);
};

const getTrackTranslateX = ({ duration, currentTime, live }) => {
  if (live) {
    return 0;
  }
  if (0 === duration) {
    return -100;
  }
  return ((100 * currentTime) / duration - 100).toFixed(1);
};

const getMouseTranslateX = ({ duration, tooltip }) => {
  if (0 >= duration) {
    return 0;
  }
  return ((100 * tooltip) / duration).toFixed(1);
};

const MouseTooltip = React.memo(({ duration, tooltip }) => {
  const translateX = getMouseTranslateX({ duration, tooltip });
  return (
    <div className={styles.tooltip} style={{ transform: `translateX(${translateX}%)` }}>
      <div className={styles.tip}>{numeral(tooltip).format('00:00:00')}</div>
    </div>
  );
});

MouseTooltip.propTypes = {
  duration: PropTypes.number.isRequired,
  tooltip: PropTypes.number.isRequired,
};

const Slider = React.memo(({ live, hiding, currentTime, duration, buffered, onChange, sliding, setSliding }) => {
  const [value, setValue] = React.useState(currentTime);
  const [tooltip, setTooltip] = React.useState(0);

  const sliderRef = React.useRef(null);
  const reactRef = React.useRef(null);
  const updateRef = React.useRef(null);

  const onClick = React.useCallback(
    e => {
      e.preventDefault();
      setSliding(false);
      if (live) {
        return;
      }
      const rect = e.currentTarget.getBoundingClientRect();
      const v = getValue(e, rect, duration);
      onChange(v);
    },
    [onChange, live, duration, setSliding],
  );

  const onMouseDown = React.useCallback(
    e => {
      e.preventDefault();
      if (!sliderRef || !sliderRef.current || !reactRef || live) {
        return;
      }
      const react = sliderRef.current.getBoundingClientRect();
      reactRef.current = { left: react.left, width: react.width };
      setSliding(true);
    },
    [live, setSliding],
  );

  const update = React.useCallback(() => {
    if (!updateRef || !updateRef.current) {
      return;
    }
    // eslint-disable-next-line no-undefined
    if (undefined !== updateRef.current.value) {
      setValue(updateRef.current.value);
    }
    // eslint-disable-next-line no-undefined
    if (undefined !== updateRef.current.tooltip) {
      setTooltip(updateRef.current.tooltip);
    }
    updateRef.current = null;
  }, []);

  const onMouseUp = React.useCallback(
    e => {
      e.preventDefault();
      setSliding(false);
      if (reactRef && reactRef.current && updateRef) {
        const v = getValue(e, reactRef.current, duration);
        updateRef.current = { value: v };
        update();
        onChange(v);
      }
    },
    [onChange, duration, update, setSliding],
  );

  const onMouseMove = React.useCallback(
    e => {
      e.preventDefault();
      if (!reactRef || !reactRef.current || !updateRef) {
        return;
      }
      const v = getValue(e, reactRef.current, duration);
      if (updateRef.current) {
        updateRef.current.value = v;
      } else {
        updateRef.current = { value: v };
        global.requestAnimationFrame(update);
      }
    },
    [duration, update],
  );

  React.useEffect(() => {
    if (sliding) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

      document.addEventListener('touchmove', onMouseMove);
      document.addEventListener('touchcancel', onMouseUp);
      document.addEventListener('touchend', onMouseUp);
      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        document.removeEventListener('touchmove', onMouseMove);
        document.removeEventListener('touchcancel', onMouseUp);
        document.removeEventListener('touchend', onMouseUp);
      };
    }
    return () => {};
  }, [sliding, onMouseMove, onMouseUp]);

  const onSliderMouseOver = React.useCallback(
    e => {
      e.preventDefault();
      if (live) {
        return;
      }
      const react = sliderRef.current.getBoundingClientRect();
      reactRef.current = { left: react.left, width: react.width };
    },
    [live],
  );

  const onSliderMouseMove = React.useCallback(
    e => {
      e.preventDefault();
      if (!reactRef || !reactRef.current || !updateRef) {
        return;
      }
      const v = getValue(e, reactRef.current, duration);
      if (updateRef.current) {
        updateRef.current.tooltip = v;
      } else {
        updateRef.current = { tooltip: v };
        global.requestAnimationFrame(update);
      }
    },
    [duration, update],
  );

  const onResize = React.useCallback(e => {
    e.preventDefault();
    if (!sliderRef || !sliderRef.current) {
      return;
    }
    const react = sliderRef.current.getBoundingClientRect();
    reactRef.current = { left: react.left, width: react.width };
  }, []);

  React.useEffect(() => {
    global.addEventListener('resize', onResize);
    return () => {
      global.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  const bufferedScaleX = getBufferedScaleX({ buffered, currentTime, sliding, duration, live });
  const trackTranslateX = getTrackTranslateX({ duration, currentTime: sliding ? value : currentTime, live });

  return (
    <div
      role="button"
      tabIndex={0}
      className={sliding ? styles.slidingSlider : styles.slider}
      ref={sliderRef}
      onClick={onClick}
      onKeyDown={() => {}}
      onMouseOver={onSliderMouseOver}
      onMouseMove={onSliderMouseMove}
      onFocus={() => {}}
    >
      {!live && (
        <button type="button" className={styles.sliderButton} onTouchStart={onMouseDown}>
          <span className={styles.slidingTip} style={{ opacity: sliding ? 1 : 0 }}>
            快进到：{numeral(value).format('00:00:00')}
          </span>
        </button>
      )}
      <div className={styles.sliderRail}>
        <div className={styles.sliderBuffered} style={{ transform: `scaleX(${bufferedScaleX})` }} />
        <div className={styles.sliderTrack} style={{ transform: `translateX(${trackTranslateX}%)` }} />
      </div>
      <div className={styles.sliderHandleRail} style={{ transform: `translateX(${trackTranslateX}%)` }}>
        <button
          type="button"
          className={`${styles.sliderHandle} ${hiding ? styles.hidingsliderHandle : ''}`}
          onMouseDown={onMouseDown}
          onTouchStart={onMouseDown}
        />
      </div>
      {!live && <MouseTooltip duration={duration} tooltip={sliding ? value : tooltip} />}
    </div>
  );
});

Slider.propTypes = {
  live: PropTypes.bool.isRequired,
  hiding: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  buffered: PropTypes.object,
  onChange: PropTypes.func,
  sliding: PropTypes.bool.isRequired,
  setSliding: PropTypes.func.isRequired,
};

Slider.defaultProps = {
  buffered: null,
  onChange: () => {},
};

export default Slider;
