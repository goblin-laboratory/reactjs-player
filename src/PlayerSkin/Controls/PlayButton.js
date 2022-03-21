import React from 'react';
import PropTypes from 'prop-types';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
// import styles from './index.module.less';

const PlayButton = ({ paused, ended, onPlayClick, onPauseClick }) => {
  return paused || ended ? (
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
  paused: PropTypes.bool.isRequired,
  ended: PropTypes.bool.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
};

export default React.memo(
  PlayButton,
  (p, n) =>
    p.paused === n.paused &&
    p.ended === n.ended &&
    p.onPlayClick === n.onPlayClick &&
    p.onPauseClick === n.onPauseClick,
);
