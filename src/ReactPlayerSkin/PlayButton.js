import React from 'react';
import PropTypes from 'prop-types';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import 'antd/lib/dropdown/style/index.css';
// import styles from './index.module.less';

const PlayButton = ({ prevented, paused, ended, onPlayClick, onPauseClick }) => {
  return prevented || paused || ended ? (
    <button type="button" onClick={onPlayClick}>
      <CaretRightOutlined />
    </button>
  ) : (
    <button type="button" onClick={onPauseClick}>
      <PauseOutlined />
    </button>
  );
};

PlayButton.propTypes = {
  prevented: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  ended: PropTypes.bool.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
};

export default React.memo(
  PlayButton,
  (p, n) =>
    p.prevented === n.prevented &&
    p.paused === n.paused &&
    p.ended === n.ended &&
    p.onPlayClick === n.onPlayClick &&
    p.onPauseClick === n.onPauseClick,
);
