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

const getEventXCoordinate = (e) => {
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

const getBufferedScaleX = ({ buffered, currentTime, sliding, duration }) => {
  if (0 >= duration || sliding) {
    return 0;
  }
  const e = getBufferedEnd(currentTime, buffered);
  return (e / duration).toFixed(3);
};

const getTrackTranslateX = ({ duration, currentTime }) => {
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

const TimeSlider = React.memo(({ currentTime, duration, buffered, onChange, sliding, value, tooltip, dispatch }) => {
  const ref = React.useRef({});
  const sliderRef = React.useRef(null);

  const onClick = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch({ type: 'update', payload: { sliding: false } });

      const rect = e.currentTarget.getBoundingClientRect();
      const v = getValue(e, rect, duration);
      onChange(v);
    },
    [onChange, duration, dispatch],
  );

  const onMouseDown = React.useCallback(
    (e) => {
      e.preventDefault();
      const react = sliderRef.current.getBoundingClientRect();
      ref.current.react = { left: react.left, width: react.width };
      dispatch({ type: 'update', payload: { sliding: true } });
    },
    [dispatch],
  );

  const update = React.useCallback(() => {
    if (!ref.current.payload) {
      return;
    }
    dispatch({ type: 'update', payload: ref.current.payload });
    delete ref.current.payload;
  }, [dispatch]);

  const onMouseUp = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch({ type: 'update', payload: { sliding: false } });
      if (ref.current.react) {
        const v = getValue(e, ref.current.react, duration);
        ref.current.payload = { value: v };
        update();
        onChange(v);
      }
    },
    [onChange, duration, update, dispatch],
  );

  const onMouseMove = React.useCallback(
    (e) => {
      e.preventDefault();
      if (!ref.current.react) {
        return;
      }
      const v = getValue(e, ref.current.react, duration);
      if (ref.current.payload) {
        ref.current.payload.value = v;
      } else {
        ref.current.payload = { value: v };
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

  const onSliderMouseOver = React.useCallback((e) => {
    e.preventDefault();
    const react = sliderRef.current.getBoundingClientRect();
    ref.current.react = { left: react.left, width: react.width };
  }, []);

  const onSliderMouseMove = React.useCallback(
    (e) => {
      e.preventDefault();
      if (!ref.current.react) {
        return;
      }
      const v = getValue(e, ref.current.react, duration);
      if (ref.current.payload) {
        ref.current.payload.tooltip = v;
      } else {
        ref.current.payload = { tooltip: v };
        global.requestAnimationFrame(update);
      }
    },
    [duration, update],
  );

  const onResize = React.useCallback((e) => {
    e.preventDefault();
    if (!sliderRef || !sliderRef.current) {
      return;
    }
    const react = sliderRef.current.getBoundingClientRect();
    ref.current.react = { left: react.left, width: react.width };
  }, []);

  React.useEffect(() => {
    global.addEventListener('resize', onResize);
    return () => {
      global.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  React.useEffect(() => {
    return () => {
      ref.current = {};
    };
  }, []);

  const bufferedScaleX = getBufferedScaleX({ buffered, currentTime, sliding, duration });
  const trackTranslateX = getTrackTranslateX({ duration, currentTime: sliding ? value : currentTime });

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
      <button type="button" className={styles.sliderButton} onTouchStart={onMouseDown}>
        <span className={styles.slidingTip} style={{ opacity: sliding ? 1 : 0 }}>
          快进到：{numeral(value).format('00:00:00')}
        </span>
      </button>
      <div className={styles.sliderRail}>
        <div className={styles.sliderBuffered} style={{ transform: `scaleX(${bufferedScaleX})` }} />
        <div className={styles.sliderTrack} style={{ transform: `translateX(${trackTranslateX}%)` }} />
      </div>
      <div className={styles.sliderHandleRail} style={{ transform: `translateX(${trackTranslateX}%)` }}>
        <button type="button" className={styles.sliderHandle} onMouseDown={onMouseDown} onTouchStart={onMouseDown} />
      </div>
      <MouseTooltip duration={duration} tooltip={sliding ? value : tooltip} />
    </div>
  );
});

TimeSlider.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  buffered: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  sliding: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  tooltip: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

TimeSlider.defaultProps = {
  buffered: null,
};

export default React.memo(
  TimeSlider,
  (p, n) =>
    p.currentTime === n.currentTime &&
    p.duration === n.duration &&
    p.buffered === n.buffered &&
    p.onChange === n.onChange &&
    p.sliding === n.sliding &&
    p.value === n.value &&
    p.tooltip === n.tooltip &&
    p.dispatch === n.dispatch,
);
