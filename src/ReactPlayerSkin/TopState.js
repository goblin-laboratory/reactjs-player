import React from 'react';
import PropTypes from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';

import styles from './index.module.less';

const TopState = ({ src, loading, duration, currentTime, kernelMsg }) => {
  if (!src) {
    return null;
  }

  if (kernelMsg) {
    return (
      <div className={styles.kernelMsg}>
        {kernelMsg.type}: {kernelMsg.detail}
      </div>
    );
  }
  if (loading || (0 === duration && 0 === currentTime)) {
    return (
      <div className={styles.loading}>
        <LoadingOutlined />
      </div>
    );
  }
  return null;
};

TopState.propTypes = {
  src: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  kernelMsg: PropTypes.object,
};

TopState.defaultProps = {
  kernelMsg: null,
};

export default React.memo(
  TopState,
  (p, n) =>
    p.src === n.src &&
    p.loading === n.loading &&
    p.duration === n.duration &&
    p.currentTime === n.currentTime &&
    p.kernelMsg === n.kernelMsg,
);
