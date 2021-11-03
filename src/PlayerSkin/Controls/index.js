import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.less';
import bgImg from './bg.png';

const Controls = ({ hiding, dispatch, children }) => {
  const onMouseEnter = React.useCallback(() => {
    if (global.matchMedia) {
      const matched = global.matchMedia('(hover: none), (pointer: coarse)');
      if (matched && matched.matches) {
        return;
      }
    }
    dispatch({ type: 'update', payload: { controlsHovering: true } });
  }, [dispatch]);

  const onMouseLeave = React.useCallback(() => {
    dispatch({ type: 'update', payload: { controlsHovering: false } });
  }, [dispatch]);

  return (
    <div
      className={styles.controls}
      style={{ backgroundImage: `url(${bgImg})`, transform: hiding ? 'translate(0, 48px)' : 'translate(0, 0)' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

Controls.propTypes = {
  hiding: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Controls.defaultProps = {
  // buffered: null,
};

export default React.memo(
  Controls,
  (p, n) => p.hiding === n.hiding && p.dispatch === n.dispatch && p.children === n.children,
);
