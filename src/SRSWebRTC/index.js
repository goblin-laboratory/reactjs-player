import React from 'react';
import PropTypes from 'prop-types';
import useSRSWebRTC from './useSRSWebRTC';

const SRSWebRTC = (props) => {
  useSRSWebRTC(props);
  return null;
};

SRSWebRTC.propTypes = {
  getVideoElement: PropTypes.func.isRequired,
  src: PropTypes.string,
  config: PropTypes.object,
  onPlayClick: PropTypes.func.isRequired,
  onMsgChange: PropTypes.func.isRequired,
};

SRSWebRTC.defaultProps = {
  src: '',
  config: null,
};

export default React.memo(
  SRSWebRTC,
  (p, n) =>
    p.getVideoElement === n.getVideoElement &&
    p.src === n.src &&
    p.config === n.config &&
    p.onPlayClick === n.onPlayClick &&
    p.onMsgChange === n.onMsgChange,
);
