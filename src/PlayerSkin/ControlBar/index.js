import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.less';

const ControlBar = ({ children, extra }) => {
  return (
    <div className={styles.controlBar}>
      <div className={styles.flexItem}>{children}</div>
      {extra}
    </div>
  );
};

ControlBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  extra: PropTypes.node.isRequired,
};

// ControlBar.defaultProps = {
//   // buffered: null,
// };

export default React.memo(ControlBar, (p, n) => p.children === n.children && p.extra === n.extra);
