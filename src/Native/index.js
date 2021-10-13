import React from 'react';
import PropTypes from 'prop-types';
import useNative from '../hooks/useNative';

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

export default React.memo(Native);
