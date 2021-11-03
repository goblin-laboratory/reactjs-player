import React from 'react';
import PropTypes from 'prop-types';
import useNative from './useNative';

const Native = (props) => {
  useNative(props);
  return null;
};

Native.propTypes = {
  getVideoElement: PropTypes.func.isRequired,
  src: PropTypes.string,
  onMsgChange: PropTypes.func.isRequired,
};

Native.defaultProps = {
  src: '',
};

export default React.memo(
  Native,
  (p, n) => p.getVideoElement === n.getVideoElement && p.src === n.src && p.onMsgChange === n.onMsgChange,
);
