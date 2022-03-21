import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@ant-design/icons';
import { ReactComponent as MutedSvg } from '../Volume/muted.svg';
import styles from './index.module.less';

const PreventedTip = ({ src, prevented }) => {
  if (!src || !prevented) {
    return null;
  }
  return (
    <div className={styles.preventedTip}>
      <Icon className={styles.mutedSvg} component={MutedSvg} />
      点击取消静音
    </div>
  );
  // return <div className={styles.preventedTip}>视频播放被阻止</div>;
};

PreventedTip.propTypes = {
  src: PropTypes.string,
  prevented: PropTypes.bool.isRequired,
};

PreventedTip.defaultProps = {
  src: '',
};

export default React.memo(PreventedTip, (p, n) => p.src === n.src && p.prevented === n.prevented);
