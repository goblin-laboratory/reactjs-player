import React from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'antd';
import Icon from '@ant-design/icons';
// import 'antd/lib/tooltip/style/index.css';
import 'antd/lib/slider/style/index.css';
// import 'antd/lib/dropdown/style/index.css';
import styles from './index.module.less';

import { ReactComponent as MutedSvg } from './muted.svg';
import { ReactComponent as UnmutedSvg } from './unmuted.svg';
// import bgImg from './bg.png';

const Volume = ({ muted, volume, changeVolume, onMutedClick }) => {
  return (
    <span className={styles.volume}>
      {(muted || 0 === volume) && (
        <button type="button" onClick={onMutedClick}>
          <Icon component={MutedSvg} />
        </button>
      )}
      {!muted && 0 !== volume && (
        <button type="button" onClick={onMutedClick}>
          <Icon component={UnmutedSvg} />
        </button>
      )}
      <span className={styles.volumeSlider}>
        <Slider value={volume * 100} onChange={(v) => changeVolume(v / 100)} max={100} />
      </span>
    </span>
  );
};

Volume.propTypes = {
  // volume
  muted: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  onMutedClick: PropTypes.func.isRequired,
  changeVolume: PropTypes.func.isRequired,
};

export default React.memo(
  Volume,
  (p, n) =>
    p.muted === n.muted &&
    p.volume === n.volume &&
    p.onMutedClick === n.onMutedClick &&
    p.changeVolume === n.changeVolum,
);
