import React from 'react';
import PropTypes from 'prop-types';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';

const FullscreenButton = ({ fullscreen, requestFullscreen, exitFullscreen }) => {
  return fullscreen ? (
    <button type="button" onClick={exitFullscreen}>
      <FullscreenExitOutlined />
    </button>
  ) : (
    <button type="button" onClick={requestFullscreen}>
      <FullscreenOutlined />
    </button>
  );
};

FullscreenButton.propTypes = {
  // fullscreen
  fullscreen: PropTypes.bool.isRequired,
  requestFullscreen: PropTypes.func.isRequired,
  exitFullscreen: PropTypes.func.isRequired,
};

export default React.memo(
  FullscreenButton,
  (p, n) =>
    p.fullscreen === n.fullscreen &&
    p.requestFullscreen === n.requestFullscreen &&
    p.exitFullscreen === n.exitFullscreen,
);
